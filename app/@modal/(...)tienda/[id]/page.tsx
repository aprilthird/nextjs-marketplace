import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import { Suspense } from "react";
import Modal from "@/lib/components/ui/modal";
import { ModalSize } from "@/lib/components/ui/modal/enums";
import StoreDetail from "@/lib/components/store/store-detail";

type Props = {
  params: { id: string };
};

export default function StoreModalPage({ params }: Props) {
  function StoreDetailLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="relative flex items-center justify-between">
          <CarouselDefaultSkeleton className="basis-1/3" />
        </div>
      </div>
    );
  }

  return (
    <Modal size={ModalSize.ExtraLarge6}>
      <Suspense fallback={<StoreDetailLoader />}>
        {/* @ts-expect-error Server Component */}
        <StoreDetail quryId={params["id"]} />
      </Suspense>
    </Modal>
  );
}
