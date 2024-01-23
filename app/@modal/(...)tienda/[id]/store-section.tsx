import ProductCard from "@/lib/components/cards/product";
import UserService from "@/lib/services/user";
import React from "react";
import StoreDisplay from "@/lib/components/store/store-display";
import StoreSummary from "@/lib/components/store/store-summary";

type Props = {
  quryId: string;
};

export default async function StoreSection({
  children,
  quryId,
}: React.PropsWithChildren<Props>) {
  const user = await UserService.getByQuryId(quryId.substring(0, 7));
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center p-1 mx-auto md:flex-row md:p-2 lg:px-6 lg:py-4">
        {user && (
          <StoreSummary user={user} className="md:hidden" link={false} />
        )}
        {user && (
          <StoreDisplay
            user={user}
            className="hidden md:inline-block md:basis-1/2"
          />
        )}
        {user != null && user.relatedProducts.length > 0 ? (
          <div className="grid mt-4 md:mt-0 grid-cols-2 gap sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
            {user.relatedProducts.map((item, i) => {
              return (
                <ProductCard
                  key={`related_product_${i}`}
                  product={item}
                  className="bg-primary"
                />
              );
            })}
          </div>
        ) : (
          <h2 className="text-center mt-4 py-4">Sin resultados</h2>
        )}
      </div>
    </React.Fragment>
  );
}
