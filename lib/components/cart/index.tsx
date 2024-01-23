"use client";
import CartCheckBag from "@/lib/components/icons/cart-check-bag";
import CartList from "@/lib/models/cart-list";
import CartItem from "@/lib/models/cart-item";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "@/lib/providers/shopping-cart-provider";
import NumberUtils from "@/lib/utils/number-utils";
("@/app/@modal/(...)cart/cart-modal");
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProductCartItem from "./product-cart-item";

export default function ShoppingCartSection() {
  const { lists } = useShoppingCart();
  const router = useRouter();
  const session = useSession();

  function goToPurchase(listIndex: number) {
    if (session.status == "authenticated") {
      router.push("/compra/" + listIndex);
    } else if (session.status == "loading") {
      return;
    } else {
      router.push("/login");
    }
  }

  if (lists.length == 0) {
    return (
      <div className="bg-white text-center">
        <Image
          className="w-auto h-[350px] object-cover mx-auto"
          src={"/assets/images/empty_cart.png"}
          alt={"Imágen de Carrito Vacio"}
          width={75}
          height={75}
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div className="font-bold pb-4">Tu carrito está vacio</div>
        <div className="">
          No has agregado ningún producto a tu carrito. ¡Vamos a comprar algo!
        </div>
        <button
          onClick={() => {
            window.location.href = "/buscar/productos";
            // router.push("/buscar/productos")
          }}
          className="bg-primary focus:outline-none my-4 focus:ring-2 focus:ring-primary font-bold hover:bg-primary-dark mx-auto px-10 py-2.5 rounded-full text-center text-white cursor-pointer"
        >
          Buscar
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {lists.map((list: CartList, listIndex: number) => (
            <div key={`cart_list_${listIndex}`}>
              <Link
                href={`/tienda/${list.user?.quryId}`}
                className="shadow-lg bg-white rounded p-2 flex justify-center"
              >
                <div className="rounded-full overflow-hidden mr-4">
                  {list.user?.profileImage != null &&
                  list.user?.profileImage != "" ? (
                    <Image
                      className="w-[50px] h-[50px] object-cover"
                      src={list.user?.fullUrlProfileImage}
                      alt={list.user?.displayName ?? "Imágen de Tienda"}
                      width={75}
                      height={75}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <CartCheckBag className="w-[50px] h-[50px] text-primary" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-bold">{list.user?.displayName}</div>
                  {/* <div className="text-sm">{list.user?.description}</div> */}
                </div>
              </Link>
              {list.items.map((item: CartItem) => (
                <ProductCartItem
                  key={`cart_item_${item.product.id}_${item.selectedColor}_${item.selectedSize}_${item.selectedProductPriceKey}`}
                  item={item}
                />
              ))}
              <div className="border-t border-gray-200 py-4">
                <button
                  onClick={() => goToPurchase(listIndex)}
                  className="w-full text-white bg-primary font-bold rounded-lg px-5 py-2.5 flex justify-between items-center hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
                >
                  <div className="text-left">Comprar</div>
                  <div className="flex justify-start flex-col">
                    <div className="text-left">
                      S/{" "}
                      {NumberUtils.getFormattedPriceOrDiscount(
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
                        }, 0)
                      )}
                    </div>
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
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
