import BannerService from "@/lib/services/banner";
import BannerSliderCsr from "../../banner-slider-csr";
import BannerSkeleton from "@/lib/components/skeletons/banner";
import PromotionSliderCsr from "../../promotion-slider-csr";
import PromotionService from "@/lib/services/promotion";
import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import CategoryListCsr from "../../category-list-csr";
import CategoryService from "@/lib/services/category";
import React, { Suspense } from "react";
import SearchService from "@/lib/services/search";
import ProductCard from "@/lib/components/cards/product";

type Props = {
  params: { id: string };
};

export default function CategoryPage({ params }: Props) {
  // async function BannerSection() {
  //   const data = await BannerService.getAll();

  //   return <BannerSliderCsr items={data} />;
  // }

  // function BannerSectionLoader() {
  //   return (
  //     <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
  //       <div className="relative flex items-center justify-between">
  //         {Array.from(Array(3).keys()).map((index: number) => (
  //           <BannerSkeleton
  //             key={`banner_skeleton_${index}`}
  //             className="basis-1/3"
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  // async function PromotionsSection() {
  //   const data = await PromotionService.getAllProducts();

  //   return <PromotionSliderCsr items={data} />;
  // }

  // function PromotionsSectionLoader() {
  //   return (
  //     <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
  //       <div className="relative flex items-center justify-between">
  //         {Array.from(Array(3).keys()).map((index: number) => (
  //           <CarouselDefaultSkeleton
  //             key={`promotion_skeleton_${index}`}
  //             className="basis-1/3"
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  async function CategoriesSection() {
    var data = await CategoryService.getAll();
    var paramId = parseInt(params["id"]);
    var parentCategory = data.find((item) => item.id === paramId);

    data = data.filter((item) => item.parentId === paramId);
    return (
      <>
        <h2 className="text-center my-5 text-lg lg:text-2xl font-semibold leading-8 text-gray-900">
          {`Subcategorías de ${parentCategory?.label}`}
        </h2>
        <CategoryListCsr items={data} justOne={true} />
      </>
    );
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

  const ProductsSection = async () => {
    const data = await SearchService.getAllProducts(
      1,
      40,
      "",
      params["id"],
      null,
      false
    );
    return (
      <React.Fragment>
        {data.results.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-3 md:gap-3 xl:grid-cols-4 xl:gap-4">
            {data.results.map((item, i) => {
              return (
                <ProductCard key={`product_item_${i}`} product={item.item} />
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  };

  function ProductsSectionLoader() {
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

  function LogosSection() {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Nuestras marcas
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width="158"
              height="48"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* <Suspense fallback={<BannerSectionLoader />}> */}
      {/* <BannerSection />
      </Suspense> */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Suspense fallback={<CategoriesSectionLoader />}>
          {/* @ts-expect-error Server Component */}
          <CategoriesSection />
        </Suspense>
        <h2 className="text-center mt-6 text-lg lg:text-2xl font-semibold leading-8 text-gray-900">
          Productos de categoría
        </h2>
        <Suspense fallback={<ProductsSectionLoader />}>
          {/* @ts-expect-error Server Component */}
          <ProductsSection />
        </Suspense>
      </div>

      {/* <LogosSection /> */}
    </React.Fragment>
  );
}
