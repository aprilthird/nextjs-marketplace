"use client";

import Favorite from "@/lib/models/favorite";
import Product from "@/lib/models/product";
import User from "@/lib/models/user";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import ProductCard from "../../cards/product";
import StoreCard from "../../store/store-card";

type Props = {
  favorites: Favorite[];
};

const FavoritesTabs = ({ favorites }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<User[]>([]);

  useEffect(() => {
    setProducts(favorites.filter((x) => x.isProduct).map((x) => x.product));
    setStores(favorites.filter((x) => x.isUser).map((x) => x.user));
  }, [favorites]);

  return (
    <Tab.Group>
      <Tab.List className={"flex justify-center space-x-4"}>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                "p-2 border border-primary rounded-lg",
                selected ? "bg-primary text-white" : ""
              )}
            >
              Productos
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={classNames(
                "p-2 border border-primary rounded-lg",
                selected ? "bg-primary text-white" : ""
              )}
            >
              Tiendas
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel
          className={
            "w-full h-full flex justify-center items-center text-center"
          }
        >
          {products.length > 0 ? (
            <div className="flex flex-col space-y-2 mt-2">
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
                {products.map((item) => (
                  <ProductCard key={`product_${item.id}`} product={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-center">
              No hay productos agregados a su lista de favoritos
            </div>
          )}
        </Tab.Panel>
        <Tab.Panel
          className={
            "w-full h-full flex justify-center items-center text-center"
          }
        >
          {stores.length > 0 ? (
            <div className="flex flex-col space-y-2 mt-2">
              {stores.map((item) => (
                <StoreCard key={`store_${item.id}`} user={item} />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-center">
              No hay tiendas agregadas a su lista de favoritos
            </div>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default FavoritesTabs;
