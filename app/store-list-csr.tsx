"use client";
import UserAvatar from "@/lib/components/avatar/user";
import ProductCard from "@/lib/components/cards/product";
import { ArrowNextIcon } from "@/lib/components/icons/arrow-next";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import Slider from "@/lib/components/ui/slider/index";
import ScrollSlider from "@/lib/components/ui/slider/scroll-slider";
import Product from "@/lib/models/product";
import PromotionList from "@/lib/models/promotion-list";
import PromotionService from "@/lib/services/promotion";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
  items?: PromotionList[];
};

const breakpoints = {
  320: {
    slidesPerView: 2.3,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2.3,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 4.2,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 5.2,
    spaceBetween: 24,
  },
};

export default function StoreListCsr({ className, items }: Props) {
  const SliderItem = ({ item }: { item: Product }) => {
    return <ProductCard className="w-min-full h-auto" product={item} />;
  };

  return (
    <div className={classNames("", className)}>
      {items?.map((item, i) => (
        <div
          key={`store_list_item_${i}`}
          className="bg-white mb-4 rounded-2xl mx-2 my-4"
        >
          <Link href={`/tienda/${item.user.quryId}`}>
            <div className="p-4 pb-0 flex justify-between items-center text-ellipsis overflow-hidden">
              <div className="flex items-center">
                <UserAvatar user={item.user} className="flex-shrink-0 mr-4" />
                <div className="flex-1 truncate">
                  <h4 className="font-bold text-lg">
                    {item?.user.displayName}
                  </h4>
                  <p className="text-md">{item?.user.description}</p>
                </div>
              </div>
              <ArrowNextIcon className="text-primary-dark mr-4" />
            </div>
          </Link>
          <Slider
            hashId={`store_slider_${item.id}`}
            renderItem={SliderItem}
            items={item.products.sort((x, y) => (x.order > y.order ? 1 : -1))}
            breakpoints={breakpoints}
            className="hidden lg:flex"
          />
          <ScrollSlider
            items={item.products.sort((x, y) => (x.order > y.order ? 1 : -1))}
            className={"lg:hidden"}
            itemClassName="w-[60%] sm:w-[30%] items-center"
            renderItem={SliderItem}
            userId={item.user.quryId}
          />
        </div>
      ))}
    </div>
  );
}
