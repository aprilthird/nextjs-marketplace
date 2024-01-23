"use client";

import CartItem from "@/lib/models/cart-item";
import CartList from "@/lib/models/cart-list";
import React, { Fragment, useContext, useState } from "react";
import Product from "@/lib/models/product";
import User from "@/lib/models/user";
import { useShoppingCart } from "@/lib/providers/shopping-cart-provider";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CheckIcon from "@/lib/components/icons/check-icon";
import NumberUtils from "@/lib/utils/number-utils";
import ProductPrice from "@/lib/models/product-price";
import CustomDropdown from "@/lib/components/ui/dropdown/custom";
import ProductMetadataSelector from "../product-metadata-selector";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  user: User;
};

export default function ProductCart({
  children,
  product,
  user,
}: React.PropsWithChildren<Props>) {
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const { lists, setLists } = useShoppingCart();
  const [selectedPrice, setSelectedPrice] = useState(product.prices[0]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [addingCart, setAddingCart] = useState(false);
  const session = useSession();
  const router = useRouter();

  const increaseQuantity = (e: any) => {
    if (quantity === product.currentStock) {
      return;
    }
    let tmp = quantity + 1;
    setQuantity(tmp);
  };

  const decreaseQuantity = (e: any) => {
    if (quantity === 1) {
      return;
    }
    let tmp = quantity - 1;
    setQuantity(tmp);
  };

  const buy = () => {
    addToCart();
    if (session.status == "authenticated") {
      router.push("/compra/0");
    } else if (session.status == "loading") {
      return;
    } else {
      router.push("/login");
    }
  };

  const addToCart = () => {
    const jsonCart = localStorage.getItem("cart");
    let items: CartList[] = jsonCart
      ? (JSON.parse(jsonCart) as CartList[])
      : [];

    // Buscar la tienda en el carrito
    let cartList = items.find((item) => item.user.id === user?.id);

    if (!cartList) {
      cartList = new CartList(user!);
      items.unshift(cartList); // Si es una nueva tienda, la añadimos al principio
    } else {
      // Si la tienda ya existe, la removemos y luego la añadimos al principio
      items = items.filter((item) => item.user.id !== user?.id);
      items.unshift(cartList);
    }

    // Buscar el producto en la tienda específica, considerando las propiedades seleccionadas
    let cartItem = cartList.items.find(
      (item) =>
        item.product.id === product?.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize &&
        item.selectedProductPriceKey === selectedPrice.key
    );

    if (!cartItem) {
      cartItem = new CartItem();
      cartList.items.push(cartItem); // Si es un nuevo producto, lo añadimos al carrito de la tienda
    }

    cartItem.quantity += quantity;
    cartItem.product = product!;
    cartItem.selectedProductPriceKey = selectedPrice.key;
    cartItem.selectedColor = selectedColor;
    cartItem.selectedSize = selectedSize;

    const newJsonCart = JSON.stringify(items);
    localStorage.setItem("cart", newJsonCart);

    setLists(items);
  };

  return (
    <React.Fragment>
      {(product.colors.length > 0 || product.sizes.length > 0) && (
        <div className="py-2 space-y-2 lg:py-5">
          {product.colors.length > 1 && (
            <ProductMetadataSelector
              label="Colores"
              options={product.colors}
              onChange={(selectedOption) => setSelectedColor(selectedOption)}
            />
          )}
          {product.sizes.length > 1 && (
            <ProductMetadataSelector
              label="Tamaños"
              options={product.sizes}
              onChange={(selectedOption) => setSelectedSize(selectedOption)}
            />
          )}
        </div>
      )}
      <div className="py-2 lg:py-5">
        <div className="font-bold text-sm">Descripción del producto</div>
        <div className="flex flex-col">
          {product?.description.length > 200 ? (
            <React.Fragment>
              <div className="text-sm">
                {product.description
                  .substring(
                    0,
                    showDescription ? product.description.length : 200
                  )
                  .concat(showDescription ? "" : "...")}
              </div>
              <div
                className="text-center text-secondary font-medium hover:text-primary cursor-pointer"
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? "- Ver menos" : "+ Ver más"}
              </div>
            </React.Fragment>
          ) : (
            <div className="text-sm">{product.description}</div>
          )}
        </div>
      </div>
      <div
        className={`py-5 ${
          product.hasManyPrices ? "" : "flex justify-between"
        }`}
      >
        {/* {!product.hasManyPrices && <div>Cantidad</div>} */}
        <div className="font-bold text-md lg:text-lg mb-1 lg:mb-2">
          Cantidad:
        </div>
        <div className="flex justify-between items-baseline">
          {product.hasManyPrices && (
            <CustomDropdown
              value={selectedPrice}
              onChange={(item) => {
                setSelectedPrice(item);
              }}
              items={product.prices}
              buttonClassName="border-2"
              optionsClassName="absolute"
              renderItem={({
                item,
                selected,
              }: {
                item: ProductPrice;
                selected: boolean;
              }) => (
                <React.Fragment>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    <span className="text-sm">
                      S/ {item.formattedUnitPriceWithDiscount} x u
                    </span>
                    <span className="text-xs ml-3">{item.label}</span>
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 group-hover:text-white group-focus:text-white">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                  ) : null}
                </React.Fragment>
              )}
              renderSelected={({ item }: { item: ProductPrice }) => (
                <span className="block truncate">
                  <span className="text-sm font-bold">{item.label}</span>
                  <span className="text-sm ml-2">
                    S/ {item.formattedUnitPriceWithDiscount} x u
                  </span>
                </span>
              )}
            />
          )}

          {/* {product.hasManyPrices && <div className="font-bold text-lg">x</div>} */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="rounded-full h-[30px] w-[30px] flex flex-col justify-center items-center text-white text-2xl font-bold text-center bg-secondary hover:bg-secondary-dark"
            >
              -
            </button>
            <div className="font-bold text-lg text-center px-2">{quantity}</div>
            <button
              type="button"
              onClick={increaseQuantity}
              className="rounded-full h-[30px] w-[30px] flex justify-center items-baseline text-white text-lg font-bold text-center bg-secondary hover:bg-secondary-dark"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="py-2">
        <button
          type="button"
          onClick={() => {
            if (addingCart) return;
            addToCart();
            setAddingCart(true);
            setTimeout(() => {
              router.push("/carrito");
              setAddingCart(false);
            }, 500);
          }}
          className="w-full border-2 border-primary font-bold px-5 py-2.5 text-center hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-primary rounded-lg"
        >
          {addingCart ? "Agregado" : "Agregar al Carrito"}
        </button>
        <button
          type="button"
          onClick={buy}
          className="w-full mt-2 text-white bg-primary font-bold rounded-lg px-5 py-2.5 flex justify-between items-center hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
        >
          <div className="text-left">Comprar</div>
          <div className="flex justify-start flex-col">
            <div className="text-left">
              S/{" "}
              {NumberUtils.getFormattedPriceOrDiscount(
                quantity * selectedPrice?.quantity * selectedPrice?.unitPrice
              )}
            </div>
            <div className="text-left text-sm font-medium">
              {quantity * selectedPrice?.quantity} Unidades
            </div>
          </div>
        </button>
      </div>
    </React.Fragment>
  );
}
