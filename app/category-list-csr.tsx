"use client";
import CategoryCard from "@/lib/components/cards/category";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import Slider from "@/lib/components/ui/slider/index";
import Category from "@/lib/models/category";
import CategoryService from "@/lib/services/category";
import classNames from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
  items: Category[];
  justOne?: boolean;
};

const breakpoints = {
  320: {
    slidesPerView: 3.4,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 4.4,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 4.4,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 5.4,
    spaceBetween: 24,
  },
};

export default function CategoryListCsr({
  className,
  items,
  justOne = false,
}: Props) {
  const SliderItem = ({ item }: { item: Category }) => {
    return (
      <Link
        href={`/buscar/productos?q=&category=${item.parentId}&subcategory=${item.id}`}
      >
        <CategoryCard className="" category={item} />
      </Link>
    );
  };

  const RenderMesaRedonda = ({
    subCategories,
  }: {
    subCategories: Category[];
  }) => {
    const groupedItems = [];
    for (let i = 0; i < subCategories.length; i += 3) {
      groupedItems.push(subCategories.slice(i, i + 3));
    }

    return (
      <Slider
        hashId={`store_slider_mesa_redonda`}
        renderItem={({ item: group }) => (
          <div className="flex flex-col gap-2">
            {group.map((cat: Category) => (
              <SliderItem key={cat.id} item={cat} />
            ))}
          </div>
        )}
        items={groupedItems}
        breakpoints={breakpoints}
      />
    );
  };

  if (justOne) {
    if (items.length > 10) {
      return <RenderMesaRedonda subCategories={items} />;
    } else {
      return (
        <Slider
          hashId={`store_slider`}
          renderItem={SliderItem}
          items={items}
          breakpoints={breakpoints}
        />
      );
    }
  }

  return (
    <div className={classNames("", className)}>
      {items
        ?.filter((x) => x.parentId == 0)
        .map((item, i) => {
          if (justOne && i != 1) {
            return;
          }

          const subCategories = items
            .filter((x) => x.parentId == item.id)
            .sort((x, y) => (x.order > y.order ? 1 : -1));

          return (
            <div key={`category_list_item_${i}`} className="my-4">
              <div className="flex mx-4 mb-2">
                <h3 className="font-bold text-xl">
                  {!justOne ? item.name : ""}
                </h3>
              </div>

              {item.name == "Mesa redonda / Mercado central" ? (
                <RenderMesaRedonda subCategories={subCategories} />
              ) : (
                <Slider
                  hashId={`store_slider_${item.id}`}
                  renderItem={SliderItem}
                  items={subCategories}
                  breakpoints={breakpoints}
                />
              )}
            </div>
          );
        })}
    </div>
  );
}
