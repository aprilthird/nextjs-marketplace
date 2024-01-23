import ProductDetail from "@/lib/components/product/product-detail";
import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import ProductService from "@/lib/services/product";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await ProductService.getByQuryId(params.id);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product?.name,
    openGraph: {
      images: [product?.fullUrlImage || "", ...previousImages],
    },
  };
}

export default function ProductPage({ params }: Props) {
  function ProductDetailLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="relative flex items-center justify-between">
          <CarouselDefaultSkeleton className="basis-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <Suspense fallback={<ProductDetailLoader />}>
          {/* @ts-expect-error Server Component */}
          <ProductDetail quryId={params["id"]} />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
