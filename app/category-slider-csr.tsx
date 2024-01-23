"use client";
import CategoryCard from "@/lib/components/cards/category";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import Slider from "@/lib/components/ui/slider/index";
import Category from "@/lib/models/category";
import CategoryService from "@/lib/services/category";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
  items: Category[];
};

const breakpoints = {
  320: {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 3,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 5,
    spaceBetween: 24,
  },
};

export default function CategorySliderCsr({ className, items }: Props) {
  const SliderItem = ({ item }: { item: Category }) => {
    return <CategoryCard className="w-full" category={item} />;
  };

  return (
    <div className={classNames("", className)}>
      {items
        ?.filter((x) => x.parentId == 0)
        .map((item, i) => {
          const subCategories = items
            .filter((x) => x.parentId == item.id)
            .sort((x, y) => (x.order > y.order ? 1 : -1));
          return (
            <div key={`category_slider_item_${i}`}>
              <div className="flex">
                <h3 className="font-bold text-2xl">{item.name}</h3>
              </div>
              <Slider
                hashId={`store_slider_${item.id}`}
                renderItem={SliderItem}
                items={subCategories}
                breakpoints={breakpoints}
              />
            </div>
          );
        })}
    </div>
  );
}
