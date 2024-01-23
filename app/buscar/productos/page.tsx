import React, { Suspense, useEffect, useState } from "react";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import CategoryService from "@/lib/services/category";
import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import SearchService from "@/lib/services/search";
import ProductCard from "@/lib/components/cards/product";
import { headers } from "next/headers";
import ProductsGrid from "@/lib/components/search/products-grid";

type Props = {
  params: {};
  searchParams: { [key: string]: string | undefined };
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const ProductsSection = async () => {
    const queryParam = searchParams["q"] ?? "";
    const categoryParam = searchParams["category"] ?? "";
    const subCategoryParam = searchParams["subcategory"] ?? "";
    const isBusinessParam = searchParams["business"] ?? "";
    const isVerifiedParam = searchParams["verified"] ?? "";
    const hasDeliveryParam = searchParams["delivery"] ?? "";
    const hasPickupInStoreParam = searchParams["pickup"] ?? "";
    const hasDeliveryCost = searchParams["deliverycost"] ?? "";
    const hasReturnCost = searchParams["returncost"] ?? "";
    const productConditionParam = searchParams["condition"] ?? "";
    const sortByParam = searchParams["sort"] ?? "5";
    const priceM = searchParams["pricem"] ?? "0";

    const page = Number(searchParams["page"] ?? 1);

    var response = await SearchService.getAllProducts(
      page,
      40,
      queryParam,
      categoryParam,
      subCategoryParam,
      isBusinessParam === "true",
      isVerifiedParam === "true",
      hasDeliveryParam === "true",
      hasPickupInStoreParam === "true",
      hasDeliveryCost === "true",
      hasReturnCost === "true",
      productConditionParam,
      sortByParam,
      priceM
    );

    var data = response.results.map((x) => x.item);
    return <ProductsGrid itemsCount={response.total} items={data} />;
  };

  function ProductsSectionLoader() {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:grid-cols-3 xl:grid-cols-3">
        {Array.from(Array(12).keys()).map((index: number) => (
          <CarouselDefaultSkeleton key={`product_skeleton_${index}`} />
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      <Suspense fallback={<ProductsSectionLoader />}>
        {/* @ts-expect-error Server Component */}
        <ProductsSection />
      </Suspense>
    </React.Fragment>
  );
}
