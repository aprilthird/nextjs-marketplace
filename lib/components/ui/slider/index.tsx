"use client";

import { Navigation, Swiper, SwiperSlide, SwiperRef } from "@/lib/types/slider";
import { ArrowNext, ArrowPrev } from "@/lib/components/icons";
import React, { useRef, useState } from "react";
import classNames from "classnames";
import { Autoplay } from "swiper";

type Props<ItemT> = {
  className?: string;
  hashId: string;
  breakpoints?: any;
  loop?: boolean;
  renderItem: React.FC<{ item: ItemT }>;
  items: ItemT[];
  hasArrowButtons?: boolean;
  hasThumbnails?: boolean;
  hasFullWidth?: boolean;
  renderThumbnail?: React.FC<{ item: ItemT; isActive: boolean }>;
  banner?: boolean;
};

const defaultBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
};

const Slider = <ItemT,>({
  className,
  hashId,
  breakpoints = defaultBreakpoints,
  loop = false,
  banner = false,
  renderItem: RenderItemComponent,
  items,
  hasArrowButtons = true,
  hasFullWidth = false,
  hasThumbnails = false,
  renderThumbnail: RenderThumbnailComponent,
}: React.PropsWithChildren<Props<ItemT>>) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideTo = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <React.Fragment>
      <div className="bg-light">
        <div className="relative">
          <Swiper
            id={hashId}
            ref={swiperRef}
            className={className}
            loop={loop}
            breakpoints={breakpoints}
            modules={[Navigation, Autoplay]}
            autoplay={loop ? { delay: 3000 } : false}
            onTransitionEnd={(e: any) => {
              setActiveIndex(e.activeIndex);
            }}
            // grabCursor={true}
            // freeMode={true}
            // speed={600}
            navigation={{
              nextEl: `.next.${hashId}-next`,
              prevEl: `.prev.${hashId}-prev`,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
            }}
            wrapperClass="flex items-center"
          >
            {items?.map((item, i) => (
              <SwiperSlide
                key={`${hashId}_item_${i}`}
                className="overflow-hidden"
              >
                <RenderItemComponent item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {hasArrowButtons && (
            <div
              className={classNames(
                "hidden absolute z-10 items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer prev top-2/4 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading bg-white text-primary hover:bg-primary hover:text-white hover:border-accent",
                hasFullWidth ? "ml-2 md:ml-3" : "left-0 md:-left-5",
                `${hashId}-prev`,
                items.length > 1 ? "md:flex" : "hidden"
              )}
              role="button"
            >
              <span className="sr-only">Atrás</span>
              <ArrowPrev width={18} height={18} />
            </div>
          )}
          {hasArrowButtons && (
            <div
              className={classNames(
                "hidden absolute z-10 items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer next top-2/4 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading bg-white text-primary hover:bg-primary hover:text-white hover:border-accent",
                hasFullWidth ? "right-0 mr-2 md:mr-3" : "right-0 md:-right-5",
                `${hashId}-next`,
                items.length > 1 ? "md:flex" : "hidden"
              )}
              role="button"
            >
              <span className="sr-only">Siguiente</span>
              <ArrowNext width={18} height={18} />
            </div>
          )}
        </div>
      </div>
      {hasThumbnails && items.length > 1 && (
        <div className="flex space-x-2 mt-2 px-3">
          {items?.map(
            (item, i) =>
              RenderThumbnailComponent && (
                <div
                  key={`slider_thumbnail_item_${i}`}
                  className="cursor-pointer"
                  onClick={() => {
                    slideTo(i);
                  }}
                >
                  <RenderThumbnailComponent
                    item={item}
                    isActive={activeIndex === i}
                  />
                </div>
              )
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Slider;
