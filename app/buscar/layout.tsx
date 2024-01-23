import React, { Suspense, useState } from "react";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import CategoryService from "@/lib/services/category";
import CategoryFilter from "@/lib/components/search/category-filter";
import SearchSort from "@/lib/components/search/search-sort";
import GeneralFilter from "@/lib/components/search/general-filter";
import SearchMayor from "@/lib/components/search/search-mayor";

export default function SearchLayout({ children }: React.PropsWithChildren) {
  async function CategoriesSection() {
    const data = await CategoryService.getAll();
    const finalData = data.filter((x) => x.parentId === 0);
    for (var i = 0; i < finalData.length; ++i) {
      finalData[i].children = data
        .filter((x) => x.parentId === finalData[i].id)
        .sort((x, y) => (x.order > y.order ? 1 : -1));
    }

    return <CategoryFilter items={finalData} />;
  }

  function CategoriesSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div
          role="status"
          className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          {Array.from(Array(6).keys()).map((index: number) => (
            <ListDefaultSkeleton
              key={`category_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="max-w-xxl mx-auto">
        <div className="flex justify-between lg:space-x-4">
          <div className="hidden lg:block lg:basis-1/3 xl:basis-1/4 overflow-y-scroll h-screen">
            {/* hidden lg:block md:w-2/12 */}
            <Suspense fallback={<CategoriesSectionLoader />}>
              {/* @ts-expect-error Server Component */}
              <CategoriesSection />
            </Suspense>
          </div>
          {/* w-full lg:w-8/12 */}
          <div className="container mx-auto py-4 px-2">{children}</div>
          {/* hidden lg:block md:w-2/12 */}
          <div className="hidden lg:block">
            <div className="sticky top-[64px]">
              <SearchMayor />
              <SearchSort />
              <GeneralFilter />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
