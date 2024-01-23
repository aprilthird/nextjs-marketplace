"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import User from "@/lib/models/user";

import Paginator from "../../paginator/paginator";
import StoreCard from "../../store/store-card";

type Props = {
  items: User[];
  itemsCount: number;
};

const StoresGrid = ({ items, itemsCount }: Props) => {
  const searchParams = useSearchParams();
  const queryParam = searchParams?.get("q") ?? "";
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="rounded-xl bg-white mb-4 p-4 flex justify-between items-center">
        <div className="flex gap-1 flex-col md:flex-row flex-1">
          {items?.length > 0 ? (
            <span>
              Se encontraron <strong>{itemsCount}</strong> resultados{" "}
            </span>
          ) : (
            <span>No se encontraron resultados</span>
          )}
          {queryParam && (
            <span>
              {" "}
              para la búsqueda <strong>&quot;{queryParam}&quot;</strong>
            </span>
          )}
        </div>
        <div
          onClick={() => {
            router.push("/buscar/tiendas");
          }}
          className="cursor-pointer text-secondary font-bold hover:text-secondary-dark"
        >
          Limpiar filtros
        </div>
      </div>
      {items?.length > 0 && (
        <div className="mt-2 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
          {items?.map((item: any, i: number) => {
            return <StoreCard key={`store_item_${item.id}`} user={item} />;
          })}
        </div>
      )}
      <Paginator itemsCount={itemsCount} />
    </React.Fragment>
  );
};

export default StoresGrid;
