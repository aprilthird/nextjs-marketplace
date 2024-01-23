import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import React, { Suspense } from "react";
import Modal from "@/lib/components/ui/modal";
import { ModalSize } from "@/lib/components/ui/modal/enums";
import ProductDetail from "@/lib/components/product/product-detail";

type Props = {
  params: { id: string };
};

export default function ProductModalPage({ params }: Props) {
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
    <Modal size={ModalSize.ExtraLarge6}>
      <Suspense fallback={<ProductDetailLoader />}>
        {/* @ts-expect-error Server Component */}
        <ProductDetail quryId={params["id"]} replace={true} />
      </Suspense>
    </Modal>
  );
}
