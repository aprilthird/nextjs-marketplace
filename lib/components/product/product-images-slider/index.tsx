"use client";
import Slider from "@/lib/components/ui/slider/index";
import Image from "next/image";
import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

type Props = {
  images: string[];
};

const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1024: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1920: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
};

export default function ProductImagesSlider({
  images,
}: React.PropsWithChildren<Props>) {
  const SliderItem = ({ item }: { item: string }) => (
    <>
      {/* <Image
        className="w-full object-cover"
        src={item}
        alt={item}
        width={320}
        height={320}
        style={{ objectFit: "cover" }}
      />
       */}
      <InnerImageZoom
        src={item}
        zoomSrc={item}
        // width={500}
        hasSpacer={true}
        // zoomType="hover"
        zoomPreload={true}
        fullscreenOnMobile={true}
        className="w-full max-h-[500px] h-auto object-cover flex items-center pt-3 px-3 lg:p-0 justify-center"
      />
      {/* <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: item,
          },
          largeImage: {
            src: item,
            width: 1200,
            height: 1800,
          },
        }}
      /> */}
    </>
  );

  const ThumbnailItem = ({
    item,
    isActive,
  }: {
    item: string;
    isActive: boolean;
  }) => (
    <div
      className={`border-2 rounded-lg overflow-hidden w-[75px] h-[75px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[150px] lg:h-[150px] ${
        isActive ? "border-primary" : "border-grey-800"
      }`}
    >
      <Image
        className="object-cover w-[75px] h-[75px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[150px] lg:h-[150px]"
        src={item}
        alt={item}
        width={120}
        height={120}
        style={{ objectFit: "cover" }}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Slider
        hashId="product_slider"
        renderItem={SliderItem}
        breakpoints={breakpoints}
        items={images}
        hasThumbnails={true}
        renderThumbnail={ThumbnailItem}
        // className="max-h-[350px]"
      />
    </React.Fragment>
  );
}
