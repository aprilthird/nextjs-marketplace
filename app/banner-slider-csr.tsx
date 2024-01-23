"use client";

import BannerSkeleton from "@/lib/components/skeletons/banner";
import Slider from "@/lib/components/ui/slider/index";
import Banner from "@/lib/models/banner";
import BannerService from "@/lib/services/banner";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  items: Banner[];
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

export default function BannerSliderCsr({ items }: Props) {
  const router = useRouter();
  const SliderItem = ({ item }: { item: Banner }) => (
    <div
      className="overflow-hidden"
      onClick={() => {
        if (item.link) {
          window.open(item.link, "_blank");
        }
      }}
    >
      <Image
        className={classNames(
          "w-full h-[180px] md:h-[360px] lg:h-[440px] 2xl:h-[540px]",
          item.link ? "cursor-pointer" : ""
        )}
        src={item.illustration}
        alt={item.title}
        width={1920}
        height={720}
      />
    </div>
  );

  return (
    <Slider
      hashId="banner_slider"
      renderItem={SliderItem}
      items={items}
      breakpoints={breakpoints}
      hasFullWidth={true}
      loop={true}
      banner={true}
    />
  );
}
