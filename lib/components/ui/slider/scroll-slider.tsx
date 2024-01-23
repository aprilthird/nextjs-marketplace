"use client";

import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import ProductCard from "../../cards/product";
import classNames from "classnames";
import { useRouter } from "next/navigation";

type Props<ItemT> = {
  className?: string;
  itemClassName?: string;
  items: ItemT[];
  renderItem: React.FC<{ item: ItemT }>;
  userId?: string;
};

const ScrollSlider = <ItemT,>({
  items = [],
  className,
  renderItem: RenderItemComponent,
  itemClassName,
  userId = "",
}: React.PropsWithChildren<Props<ItemT>>) => {
  const router = useRouter();

  return (
    <div className={classNames("", className)}>
      <div className="flex no-scrollbar overflow-auto">
        {Array.isArray(items) &&
          items.map((item: any, i: number) => (
            <div
              key={`item_${i}`}
              className={classNames("flex-none", itemClassName)}
            >
              <RenderItemComponent item={item} />
              {/* <ProductCard product={item} /> */}
            </div>
          ))}
        {userId && (
          <div
            className="cursor-pointer flex flex-none font-semibold items-center px-5 text-lg text-primary"
            onClick={() => {
              router.push(`tienda/${userId}`);
            }}
          >
            Ver todo
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollSlider;
