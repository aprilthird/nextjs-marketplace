import React, { Suspense } from "react";
import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import SearchService from "@/lib/services/search";
import StoresGrid from "@/lib/components/search/stores-grid";

type Props = {
  params: {};
  searchParams: { [key: string]: string | undefined };
};

export default function StoresPage({ params, searchParams }: Props) {
  async function StoresSection() {
    const queryParam = searchParams["q"] ?? "";
    const categoryParam = searchParams["category"] ?? "";
    const subCategoryParam = searchParams["subcategory"] ?? "";
    const isBusinessParam = searchParams["business"] ?? "";
    const isVerifiedParam = searchParams["verified"] ?? "";
    const hasDeliveryParam = searchParams["delivery"] ?? "";
    const hasPickupInStoreParam = searchParams["pickup"] ?? "";
    const hasDeliveryCost = searchParams["deliverycost"] ?? "";
    const hasReturnCost = searchParams["returncost"] ?? "";
    const sortByParam = searchParams["sort"] ?? "";

    const page = Number(searchParams["page"] ?? 1);

    var response = await SearchService.getAllStores(
      page,
      20,
      queryParam,
      categoryParam,
      subCategoryParam,
      isBusinessParam === "true",
      isVerifiedParam === "true",
      hasDeliveryParam === "true",
      hasPickupInStoreParam === "true",
      hasDeliveryCost === "true",
      hasReturnCost === "true",
      sortByParam
    );

    var data = response.results.map((x) => x.item);
    return <StoresGrid itemsCount={response.total} items={data} />;
  }

  function StoresSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="relative flex items-center justify-between">
          {Array.from(Array(3).keys()).map((index: number) => (
            <CarouselDefaultSkeleton
              key={`store_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Suspense fallback={<StoresSectionLoader />}>
        {/* @ts-expect-error Server Component */}
        <StoresSection />
      </Suspense>
    </React.Fragment>
  );
}
