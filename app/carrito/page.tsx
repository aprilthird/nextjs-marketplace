import ShoppingCartSection from "@/lib/components/cart";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import React, { Suspense } from "react";

export default function ShoppingCartPage() {
  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <Suspense fallback={<ListDefaultSkeleton />}>
          <ShoppingCartSection />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
