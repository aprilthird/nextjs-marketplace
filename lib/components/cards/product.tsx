"use-client";
import classNames from "classnames";
import Image from "next/image";
import { UserOutlinedIcon } from "../icons/user-outlined";
import Link from "next/link";
import Product from "@/lib/models/product";
import ApiUtils from "@/lib/utils/api-utils";

type Props = {
  className?: string;
  storeName?: string;
  product: Product;
  replace?: boolean;
};

export default function ProductCard({
  children,
  product,
  storeName,
  className,
  replace = false,
}: React.PropsWithChildren<Props>) {
  const imageUrl = product.fullUrlImage1;

  return (
    <div
      className={classNames(
        "group rounded-2xl shadow-md hover:shadow-lg p-2 m-2 bg-white relative",
        className
      )}
    >
      <Link
        href={`/producto/${product.quryId}`}
        replace={replace ? true : false}
      >
        <div className="overflow-hidden w-full rounded-2xl">
          <Image
            className="h-[180px] w-full flex-1 mx-auto md:w-[240px] md:h-[160px] lg:w-[350px] object-cover transition duration-150 ease-in group-hover:scale-125"
            src={imageUrl ? imageUrl : ApiUtils.URLS3_NOT_IMAGE}
            alt={product.name}
            width={180}
            height={180}
          />
          {product.hasDiscount && (
            <div className="absolute text-center min-w-[3.25rem] top-[1rem] right-[1rem] z-10">
              <div className="bg-primary text-white p-1 rounded font-bold">
                {product.formattedDiscount} %
              </div>
            </div>
          )}
        </div>
        {/* <h2 className="leading-tight text-md overflow-hidden group-hover:text-primary h-[46px] md:h-[60px] flex items-center capitalize"> */}
        <h2 className="leading-tight text-md overflow-hidden group-hover:text-primary h-[40px] my-2 flex capitalize">
          {product.name}
        </h2>
        {!product.hasManyPrices ? (
          <>
            <div className="flex space-x-2 items-center">
              <h2 className="text-lg">
                S/ {product.formattedDefaultPriceWithDiscount}
              </h2>
              {product.hasDiscount && (
                <h4 className="line-through text-xs">
                  S/ {product?.formattedDefaultPrice}
                </h4>
              )}
            </div>
            <div className="text-xs">Precio por {product.prices[0]?.label}</div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="flex space-x-2 items-center">
              <div className="text-xs w-[90px]">{`${product.prices[0]?.label}:`}</div>
              <div className="whitespace-nowrap">{` S/ ${product.rangeFormattedMaxPriceWithDiscount}`}</div>
              {product.hasDiscount && (
                <h4 className="line-through text-xs">
                  S/ {product.rangeFormattedMaxPrice}
                </h4>
              )}
            </div>
            <div className="flex space-x-2 items-center">
              <div className="text-xs w-[90px]">{`${
                product.prices[product.prices.length - 1]?.label
              }:`}</div>
              <div className="whitespace-nowrap">{` S/ ${product.rangeFormattedMinPriceWithDiscount}`}</div>
              {product.hasDiscount && (
                <h4 className="line-through text-xs">
                  S/ {product.rangeFormattedMinPrice}
                </h4>
              )}
            </div>
          </div>
        )}
        {/* {storeName ? (
          <div className="flex items-center text-sm">
            <UserOutlinedIcon
              className="w-5 h-5 mr-1 text-gray-500 group-hover:text-primary"
              fill="currentColor"
            />
            <h5 className="group-hover:text-primary capitalize">{storeName}</h5>
          </div>
        ) : null} */}
      </Link>
    </div>
  );
}
