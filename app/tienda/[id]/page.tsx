import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import StoreDetail from "@/lib/components/store/store-detail";
import UserService from "@/lib/services/user";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await UserService.getByQuryId(params.id.substring(0, 7));
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: user?.displayName,
    openGraph: {
      images: [user?.fullUrlProfileImage || "", ...previousImages],
    },
  };
}

export default function ProductPage({ params }: Props) {
  function StoreDetailLoader() {
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
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-4">
        <Suspense fallback={<StoreDetailLoader />}>
          {/* @ts-expect-error Server Component */}
          <StoreDetail quryId={params["id"]} />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
