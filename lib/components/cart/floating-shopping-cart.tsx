"use client";
import Link from "next/link";
import { useShoppingCart } from "@/lib/providers/shopping-cart-provider";
import CartList from "@/lib/models/cart-list";
import CartItem from "@/lib/models/cart-item";
import NumberUtils from "@/lib/utils/number-utils";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import CartRegular from "../icons/cart-regular";

type Props = {};

export default function FloatingShoppingCart({}: Props) {
  const { lists } = useShoppingCart();
  const pathname = usePathname();

  function totalItems(total: number): string {
    return total.toFixed(0);
  }

  return (
    <Link
      href={"/carrito"}
      className={classNames(
        "hidden sm:flex flex-col items-center justify-center p-3 pt-3.5 fixed top-1/2 -mt-12 right-0 z-40 shadow-900 rounded rounded-tr-none rounded-br-none bg-primary text-white text-sm font-semibold focus:outline-none hover:bg-primary-dark",
        pathname.includes("/compra") || pathname.includes("/producto")
          ? "group transition-all duration-200 hover:w-auto w-[65px]"
          : ""
      )}
    >
      <span className="flex pb-0.5 items-center">
        <CartRegular className="shrink-0" width={25} height={25} />
        <span className={classNames("flex ml-2 text-lg")}>
          {totalItems(
            lists.reduce((sum: number, list: CartList) => {
              return (
                sum +
                list.items.reduce((subSum: number, item: CartItem) => {
                  const selectedProductPrice = item.product.prices.find(
                    (e) => e.key == item.selectedProductPriceKey
                  );
                  return selectedProductPrice
                    ? subSum + selectedProductPrice.quantity * item.quantity
                    : subSum;
                }, 0)
              );
            }, 0)
          )}
        </span>
      </span>
      <span
        className={classNames(
          "bg-white rounded w-full py-2 px-2 text-primary mt-3 ",
          pathname.includes("/compra") || pathname.includes("/producto")
            ? "hidden group-hover:block transition-all"
            : ""
        )}
      >
        S/{" "}
        {NumberUtils.getFormattedPriceOrDiscount(
          lists.reduce((sum: number, list: CartList) => {
            return (
              sum +
              list.items.reduce((subSum: number, item: CartItem) => {
                const selectedProductPrice = item.product.prices.find(
                  (e) => e.key == item.selectedProductPriceKey
                );
                return selectedProductPrice
                  ? subSum +
                      selectedProductPrice.unitPriceWithDiscount *
                        selectedProductPrice.quantity *
                        item.quantity
                  : subSum;
              }, 0)
            );
          }, 0)
        )}
      </span>
    </Link>
  );
}
