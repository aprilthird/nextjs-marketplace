"use client";
import Product from "@/lib/models/product";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ProductCard from "../../cards/product";
import classNames from "classnames";
import Paginator from "../../paginator/paginator";
import Drawer from "../../drawer";
import SearchSort from "../search-sort";
import GeneralFilter from "../general-filter";
import { FilterIcon } from "../../icons/filter-icon";
import SearchMayor from "../search-mayor";

type Props = {
  items: Product[];
  itemsCount: number;
};

const ProductsGrid = ({ items, itemsCount }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
        <div className="flex flex-col items-center justify-center gap-2">
          <div
            onClick={() => {
              setIsDrawerOpen(true);
            }}
            className="lg:hidden bg-gray-400 text-white p-2 rounded-md cursor-pointer"
          >
            <FilterIcon className="w-6 h-6" />
          </div>
          <div
            onClick={() => {
              router.push("/buscar/productos");
            }}
            className="cursor-pointer text-secondary font-bold hover:text-secondary-dark"
          >
            Limpiar filtros
          </div>
        </div>
      </div>
      {items?.length > 0 && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
          {items?.map((item: any, i: number) => {
            return (
              <ProductCard
                key={`product_item_${item.id}`}
                product={item}
                storeName={item.displayName}
              />
            );
          })}
        </div>
      )}
      <Paginator itemsCount={itemsCount} />
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} title="Filtros">
        <SearchMayor />
        <SearchSort />
        <GeneralFilter />
      </Drawer>
    </React.Fragment>
  );
};

export default ProductsGrid;
