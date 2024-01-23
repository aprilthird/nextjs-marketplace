"use client";

import CartItem from "@/lib/models/cart-item";
import React from "react";
import Link from "next/link";
import Trash from "../icons/trash";
import { useShoppingCart } from "@/lib/providers/shopping-cart-provider";
import ApiUtils from "@/lib/utils/api-utils";

export default function ProductCartItem({
  item,
  renderQuantity = true,
}: {
  item: CartItem;
  renderQuantity?: boolean;
}) {
  const { increaseQuantity, decreaseQuantity } = useShoppingCart();

  const imageUrl = item.product.fullUrlImage1;

  return (
    <React.Fragment>
      <div className="flex py-4 justify-between items-center">
        <Link href={`/producto/${item.product.quryId}`} className="flex">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={imageUrl ? imageUrl : ApiUtils.URLS3_NOT_IMAGE}
              alt={item.product.name}
              className="h-full w-full object-cover object-center"
            />
            {item.product.hasDiscount && (
              <div className="absolute text-center top-[0.35rem] right-[0.35rem] z-10">
                <div className="bg-primary text-white p-1 rounded font-bold text-xs">
                  {item.product.formattedDiscount} %
                </div>
              </div>
            )}
          </div>
          <div className="ml-4 flex flex-col">
            <h3 className="text-sm font-medium">{item.product.name}</h3>
            <div className="flex flex-col text-xs">
              {item.product.colors.length > 1 &&
                (item.selectedColor ? (
                  <div>
                    Color:{" "}
                    <span className="text-primary">{item.selectedColor}</span>
                  </div>
                ) : (
                  <div className="text-secondary">Elige un Color</div>
                ))}
              {item.product.sizes.length > 1 &&
                (item.selectedSize ? (
                  <div>
                    Tamaño:{" "}
                    <span className="text-primary">{item.selectedSize}</span>
                  </div>
                ) : (
                  <div className="text-secondary">Elige un Tamaño</div>
                ))}
            </div>
            <div className="flex space-x-2 items-center">
              <h2 className="text-lg">
                S/{" "}
                {
                  item.product.prices.find(
                    (e: any) => e.key == item.selectedProductPriceKey
                  )?.formattedUnitPriceWithDiscount
                }{" "}
              </h2>
              {item.product.hasDiscount && (
                <h4 className="line-through text-xs">
                  S/{" "}
                  {
                    item.product.prices.find(
                      (e: any) => e.key == item.selectedProductPriceKey
                    )?.formattedUnitPrice
                  }
                </h4>
              )}
            </div>
            <div className="text-xs">
              {
                item.product.prices.find(
                  (e: any) => e.key == item.selectedProductPriceKey
                )?.label
              }
            </div>
          </div>
        </Link>
        {renderQuantity && (
          <div className="flex flex-col space-y-1 justify-center text-sm">
            <button
              type="button"
              onClick={() => increaseQuantity(item)}
              className="rounded-full h-[30px] w-[30px] px-2 text-white text-lg font-bold text-center bg-secondary hover:bg-secondary-dark"
            >
              +
            </button>
            <div className="font-bold text-lg px-2 text-center">
              {item.quantity}
            </div>
            <button
              type="button"
              onClick={() => decreaseQuantity(item)}
              className="rounded-full h-[30px] w-[30px] px-2 text-white text-lg font-bold text-center bg-secondary hover:bg-secondary-dark"
            >
              {item.quantity !== 1 ? "-" : <Trash />}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
