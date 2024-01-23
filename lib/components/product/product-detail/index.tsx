import ProductService from "@/lib/services/product";
import UserService from "@/lib/services/user";
import React from "react";
import ProductCard from "@/lib/components/cards/product";
import ProductImagesSlider from "../product-images-slider";
import StoreSummary from "../../store/store-summary";
import ProductCart from "../product-cart";
import Image from "next/image";
import ApiUtils from "@/lib/utils/api-utils";

type Props = {
  quryId: string;
  replace?: boolean;
};

export default async function ProductDetail({
  children,
  quryId,
  replace = false,
}: React.PropsWithChildren<Props>) {
  const product = await ProductService.getByQuryId(quryId);
  const user = await UserService.getByQuryId(quryId.substring(0, 7));

  const imageData = [] as string[];
  if (product?.image1) {
    imageData.push(product.fullUrlImage1);
  }
  if (product?.image2) {
    imageData.push(product.fullUrlImage2);
  }
  if (product?.image3) {
    imageData.push(product.fullUrlImage3);
  }

  return (
    <React.Fragment>
      {product?.id ? (
        <>
          <div className="flex flex-col items-center justify-center p-1 md:p-2 lg:px-6 lg:py-4 mx-auto lg:flex-row">
            <div className="relative w-full lg:w-1/2">
              {imageData.length > 0 ? (
                <ProductImagesSlider images={imageData} />
              ) : (
                <Image
                  src={ApiUtils.URLS3_NOT_IMAGE}
                  alt={"Producto sin Imá]ágen"}
                  width={180}
                  height={180}
                  className="w-full max-h-[250px] h-auto object-cover pt-3 px-3 lg:p-0"
                />
              )}
              {product?.hasDiscount && (
                <div className="absolute text-center min-w-[4rem] top-[1.5rem] right-[1.5rem] z-50">
                  <div className="bg-primary text-white px-1 py-2 rounded-lg font-bold text-lg">
                    {product?.formattedDiscount} %
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-start py-5 lg:pl-10 lg:w-1/2 px-4 w-full">
              <div className="py-5 lg:pt-0 lg:pb-5">
                <div className="font-bold text-lg lg:text-xl capitalize">
                  {product?.name}
                </div>
                <div className="text-sm">
                  {product?.category?.name + " > " + product?.subCategory?.name}
                </div>
              </div>
              <div className="py-2 lg:py-5 flex flex-col justify-between space-y-2 lg:flex-row">
                <div className="flex space-x-2 items-center">
                  {product && (
                    <h2 className="text-2xl">
                      S/{" "}
                      {product.hasManyPrices
                        ? `${product.rangeFormattedMinPriceWithDiscount} - ${product.rangeFormattedMaxPriceWithDiscount}`
                        : product.formattedDefaultPriceWithDiscount}
                    </h2>
                  )}
                  {product?.hasDiscount && (
                    <h4 className="line-through ps-2 text-sm">
                      S/{" "}
                      {product.hasManyPrices
                        ? `${product.rangeFormattedMinPrice} - ${product.rangeFormattedMaxPrice}`
                        : product?.formattedDefaultPrice}
                    </h4>
                  )}
                </div>
                <div>
                  <div>{product?.conditionText}</div>
                  {product != null &&
                  product.currentStock >= 0 &&
                  product.stockStatus == "1" ? (
                    <div className="text-sm">
                      {product.currentStock}{" "}
                      {product.currentStock > 1 ? "disponibles" : "disponible"}
                    </div>
                  ) : null}
                </div>
              </div>
              {product && user && <ProductCart product={product} user={user} />}
              {user && (
                <div className="py-2 lg:py-5">
                  <StoreSummary user={user} link={true} />
                </div>
              )}
            </div>
          </div>
          {user != null && user.relatedProducts.length > 0 && (
            <>
              <div className="font-bold mx-4 text-xl">Más del vendedor</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap">
                {user.relatedProducts.map((item, i) => {
                  return (
                    <ProductCard
                      key={`related_product_${i}`}
                      product={item}
                      replace={replace}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <h2 className="text-center py-4">Sin resultados</h2>
      )}
    </React.Fragment>
  );
}
