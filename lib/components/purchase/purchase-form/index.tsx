"use client";
import React, { useEffect, useState } from "react";
import CartList from "@/lib/models/cart-list";
import User from "@/lib/models/user";
import { getSession } from "next-auth/react";
import NumberUtils from "@/lib/utils/number-utils";
import Address from "@/lib/models/address";
import PaymentMethod from "@/lib/models/payment-method";
import classNames from "classnames";
import StoreSummary from "../../store/store-summary";
import PurchaseService from "@/lib/services/purchase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toastMessage } from "@/lib/utils/toast";
import { useShoppingCart } from "@/lib/providers/shopping-cart-provider";
import ProductCartItem from "../../cart/product-cart-item";
import PaymentMethodForm from "@/app/miqury/payment-method/payment-method-form";
import Spinner from "../../ui/spinner";
import { DeliveryInfo } from "./deliveryInfo";
import ShippingAddressForm from "../../shipping-address/form";
import ShippingAddressList from "../../shipping-address/list";

type Props = {
  id: string;
  shippingAddresses: Address[];
  paymentMethods: PaymentMethod[];
};

const PurchaseForm = (params: Props) => {
  const router = useRouter();
  const { lists, removeList } = useShoppingCart();
  const [list, setList] = useState(new CartList(new User()));

  const [savedStore, setSavedStore] = useState(new CartList(new User()));

  const [shippingAddresses, setShippingAddresses] = useState(
    params.shippingAddresses
  );
  const [paymentMethods, setPaymentMethods] = useState(params.paymentMethods);

  const [paymentCategory, setPaymentCategory] = useState("card");

  const [addressChoosed, setAddressChoosed] = useState<any>(
    shippingAddresses[shippingAddresses.length - 1] ?? {}
  );
  const [paymentChoosed, setPaymentChoosed] = useState<any>(
    paymentMethods[paymentMethods.length - 1] ?? {}
  );

  const [thankYou, setThankYou] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalPay, setTotalPay] = useState("0");

  function loadCartList() {
    setList(lists[parseInt(params.id)]);
  }

  function calculateDelivery(bool: boolean) {
    if (bool) {
      if (addressChoosed.department == "Lima") {
        setDeliveryCost(12);
      } else {
        setDeliveryCost(8);
      }
    } else {
      setDeliveryCost(0);
    }
  }

  const onCheckout = async () => {
    if (!addressChoosed.id) {
      toastMessage("error", "Tiene que seleccionar una dirección");
      return;
    }
    if (!paymentChoosed.id) {
      toastMessage("error", "Tiene que seleccionar una método de pago");
      return;
    }
    const session = await getSession();
    const quantity = list.items.reduce((sum, item) => {
      const selectedProductPrice = item.product.prices.find(
        (e) => e.key == item.selectedProductPriceKey
      );
      return selectedProductPrice
        ? sum + selectedProductPrice.quantity * item.quantity
        : sum;
    }, 0);
    const total = list.items.reduce((sum, item) => {
      const selectedProductPrice = item.product.prices.find(
        (e) => e.key == item.selectedProductPriceKey
      );
      return selectedProductPrice
        ? sum +
            selectedProductPrice.unitPriceWithDiscount *
              selectedProductPrice.quantity *
              item.quantity
        : sum;
    }, 0);
    var body = {
      usuarioIdVendedor: list.user.id,
      usuarioIdComprador: session?.user.id,
      metodoPago: paymentChoosed.id,
      cantidad: quantity,
      //NO AGREGR DELIVERY AL PRECIO TOTAL, SE SUMA APARTE EN EL PROCEDURE
      precioTotal: total,
      estadoTransaccionNuevo: "CRE",
      tipoEntrega: addressChoosed.addressType,
      direccionId: addressChoosed.id,
      tiempoEntrega: list?.user?.hasDeliveryQury ? 24 : list.user.deliveryTime,
      codigoTransaccion: -1,
      codigoConfirmacionIn: -1,
      codigoCancelacionIn: -1,
      tipoPago: paymentCategory == "card" ? "TARJETA" : "TRANSFERENCIA",
      descripcion: "{}",
      detalleTransaccion: list.items.map((producto) => {
        return {
          producto_id: producto.product.id,
          precio: producto.product.defaultPrice,
          cantidad: producto.quantity,
          cantidadTipo: NumberUtils.getCantidadTipo(
            producto.selectedProductPriceKey
          ),
          estado: "1",
          descuento: producto.product.discount,
          metadata: {
            colores: producto.product.colors,
            tallas: producto.product.sizes,
            ...(producto.selectedColor && { color: producto.selectedColor }),
            ...(producto.selectedSize && { talla: producto.selectedSize }),
          },
        };
      }),
    };

    try {
      setLoading(true);
      var responseTransaction = await PurchaseService.updateTransaction(
        session!,
        body
      );
      if (responseTransaction?.id) {
        setLoading(false);
        setThankYou(true);
        setSavedStore(list);
        removeList(parseInt(params.id));
        toastMessage("success", "Compra realizada con éxito.");
        //LLamo temporalmente el servicio de Email hasta arreglarlo en Servidor
        // fetch(
        //   `http://qurynest.us-east-1.elasticbeanstalk.com/emails/notification/${responseTransaction.id}`
        // );
        // fetch(
        //   `https://quryapi.com/emails/notification/${responseTransaction.id}`
        // );
      } else {
        setLoading(false);
        toastMessage(
          "error",
          "Ocurrío un error al realizar la compra, intente nuevamente."
        );
      }
    } catch (e: unknown) {
      setLoading(false);
      if (e instanceof Error) {
        toastMessage("error", e.message);
      }
    }
  };

  useEffect(() => {
    if (lists) {
      loadCartList();
    }
  }, [lists]);

  useEffect(() => {
    if (addressChoosed.id) {
      calculateDelivery(list?.user?.hasDeliveryQury);
    }
  }, [addressChoosed, list]);

  useEffect(() => {
    if (list?.items) {
      var calculatePayment = NumberUtils.getFormattedPriceOrDiscount(
        list.items.reduce((sum, item) => {
          const selectedProductPrice = item.product.prices.find(
            (e) => e.key == item.selectedProductPriceKey
          );
          return selectedProductPrice
            ? sum +
                selectedProductPrice.unitPriceWithDiscount *
                  selectedProductPrice.quantity *
                  item.quantity
            : sum;
        }, 0) + deliveryCost
      );
      setTotalPay(calculatePayment);
    }
  }, [deliveryCost, list]);

  if (thankYou) {
    return (
      <div className="flex flex-col justify-center p-5 max-w-[650px] mx-auto">
        <div className="bg-primary text-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">
            ¡Gracias por tu compra!
          </h2>

          <p className="mt-4 text-sm lg:text-md">
            Recibirás una confirmación por correo electrónico con los detalles
            de tu compra.
          </p>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="mt-4 bg-white text-black px-4 py-2 rounded-lg shadow-md hover:scale-105 pointer hover:text-primary"
          >
            Volver al Inicio
          </button>
        </div>
        <div className="py-4">
          <StoreSummary user={savedStore.user} link={true} />
          {savedStore.items.map((item) => (
            <ProductCartItem
              key={`cart_item_${item.product.id}_${item.selectedColor}_${item.selectedSize}_${item.selectedProductPriceKey}`}
              item={item}
              renderQuantity={false}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="container flex justify-between px-6 py-8 mx-auto flex-col md:flex-row gap-x-8">
        <div className="basis-3/5">
          <div className="text-xl">Seleccionar dirección de entrega:</div>
          {/* {list && (
            <div className="flex space-x-4">
              {list.user.hasDelivery && (
                <div
                  className={classNames(
                    "shadow-lg rounded p-4 flex items-center mt-4 cursor-pointer border-2 hover:border-secondary",
                    sentCategory == "delivery" ? "border-secondary" : ""
                  )}
                  onClick={() => setSentCategory("delivery")}
                >
                  <div className="font-bold">Delivery</div>
                </div>
              )}
              {list.user.hasPickUpInStore && (
                <div
                  className={classNames(
                    "shadow-lg rounded p-4 flex items-center mt-4 cursor-pointer border-2 hover:border-secondary",
                    sentCategory == "pickup" ? "border-secondary" : ""
                  )}
                  onClick={() => setSentCategory("pickup")}
                >
                  <div className="font-bold">Recojo en Tienda</div>
                </div>
              )}
            </div>
          )} */}
          <div className="flex space-x-4 mt-2">
            <div className="flex flex-col gap-4">
              <ShippingAddressList
                addresses={shippingAddresses}
                onClick={(item) => {
                  setAddressChoosed(item);
                }}
                addressChoosed={addressChoosed}
              />
            </div>

            {/* {sentCategory == "pickup" && (
              <div>No se encontraron direcciones de recojo.</div>
            )} */}
          </div>
          <div className="mt-8 text-xl">Seleccionar método de pago:</div>
          <div className="flex space-x-4">
            <div
              className={classNames(
                "shadow-lg rounded p-4 flex items-center mt-4 cursor-pointer border-2 hover:border-secondary",
                paymentCategory === "card" ? "border-secondary" : ""
              )}
              onClick={() => setPaymentCategory("card")}
            >
              <div className="font-bold">Tarjeta de crédito o débito</div>
            </div>
            <div
              className={classNames(
                "shadow-lg rounded p-4 flex items-center mt-4 cursor-pointer border-2 hover:border-secondary",
                paymentCategory === "transfer" ? "border-secondary" : ""
              )}
              onClick={() => setPaymentCategory("transfer")}
            >
              <div className="font-bold">Transferencia</div>
            </div>
          </div>
          <div className="flex space-x-4 mt-2">
            {paymentCategory == "card" && (
              <div className="flex flex-col gap-4">
                {paymentMethods.length > 0 ? (
                  <div className="flex flex-col space-y-2">
                    {paymentMethods.map((item) => (
                      <div
                        key={`payment_method_${item.id}`}
                        onClick={() => setPaymentChoosed(item)}
                        className={classNames(
                          "rounded-lg bg-white p-4 border-2 shadow-md hover:border-primary",
                          paymentChoosed.id == item.id
                            ? "border-primary"
                            : "border-white"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex column space-x-4">
                            <div className="flex items-center justify-center">
                              {item.brand.toUpperCase() === "AMEX" && (
                                <Image
                                  className="h-16 w-auto"
                                  src="/assets/images/amex_logo.png"
                                  alt="Amex"
                                  width="25"
                                  height="25"
                                  unoptimized
                                />
                              )}
                              {item.brand.toUpperCase() === "VISA" && (
                                <Image
                                  className="h-6 w-16"
                                  src="/assets/images/visa_logo.png"
                                  alt="Amex"
                                  width="25"
                                  height="25"
                                  unoptimized
                                />
                              )}
                            </div>
                            <div>
                              <div className="font-bold">{item.name}</div>
                              <div className="text-sm">
                                {item.accountNumber}
                              </div>
                              <div className="text-sm">{item.brand}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg p-4 border-2 shadow-md bg-white">
                    No hay tarjetas registradas
                  </div>
                )}
                <PaymentMethodForm />
              </div>
            )}
            {paymentCategory === "transfer" && (
              <div className="flex flex-col space-y-2">
                {MetodosTransferencias.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames(
                        "shadow-lg bg-white rounded p-4 flex items-center mt-4 cursor-pointer border-2 hover:border-primary",
                        paymentChoosed.entidad === item.entidad
                          ? "border-primary"
                          : "border-white"
                      )}
                      onClick={() => setPaymentChoosed(item)}
                    >
                      <div className="overflow-hidden">
                        <img src={item.logo} className="w-[80px] h-[50px]" />
                      </div>
                      <div className="ms-4">
                        <div className="font-bold">{item.entidad}</div>
                        <div className="text-sm">
                          Titular: {item.razonSocial}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="shadow-lg bg-white rounded p-4 basis-2/5 mt-6 lg:mt-0 sticky top-[105px] h-fit md:mr-[30px] 2xl:mr-0">
          <h3 className="font-bold text-lg">Resumen de Compra</h3>
          {list && (
            <React.Fragment>
              <StoreSummary user={list.user} link={true} />
              {list.items.map((item) => (
                <ProductCartItem
                  key={`cart_item_${item.product.id}_${item.selectedColor}_${item.selectedSize}_${item.selectedProductPriceKey}`}
                  item={item}
                />
              ))}
              <DeliveryInfo
                deliveryCost={deliveryCost}
                user={list.user}
                department={addressChoosed.department}
              />
            </React.Fragment>
          )}
          <div className="border-t border-gray-200 py-4">
            {list &&
              (loading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <button
                  onClick={onCheckout}
                  className={classNames(
                    "w-full font-bold rounded-lg px-5 py-2.5 flex justify-between items-center focus:ring-2 focus:outline-none border-2 border-primary",
                    addressChoosed.id && paymentChoosed.id
                      ? "bg-primary  hover:bg-primary-dark focus:ring-primary text-white "
                      : ""
                  )}
                >
                  <div className="text-left">Comprar</div>
                  <div className="flex justify-start flex-col">
                    <div className="text-left">S/ {totalPay}</div>
                    <div className="text-left text-sm font-medium">
                      {list.items.reduce((sum, item) => {
                        const selectedProductPrice = item.product.prices.find(
                          (e) => e.key == item.selectedProductPriceKey
                        );
                        return selectedProductPrice
                          ? sum + selectedProductPrice.quantity * item.quantity
                          : sum;
                      }, 0)}{" "}
                      Unidades
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PurchaseForm;

const MetodosTransferencias = [
  {
    id: 2,
    nombre: "BCP soles",
    numero: 1939621904047,
    entidad: "BCP",
    razonSocial: "Quipucamayoc Technology S.A.C.",
    logo: "https://logovtor.com/wp-content/uploads/2020/03/banco-de-credito-del-peru-bcp-logo-vector.png",
  },
  {
    id: 1,
    nombre: "INTERBANK soles",
    numero: 2003004147861,
    entidad: "Interbank",
    razonSocial: "Quipucamayoc Technology S.A.C.",
    logo: "/assets/images/interbank.png",
  },
  {
    id: 10,
    nombre: "YAPE",
    numero: 914022496,
    entidad: "YAPE",
    razonSocial: "Quipucamayoc Technology S.A.C.",
    logo: "/assets/images/yape.png",
  },
];
