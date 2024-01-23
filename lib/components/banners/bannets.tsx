"use client";
import { ArrowNext, ArrowPrev } from "@/lib/components/icons";
import { Navigation, Swiper, SwiperSlide } from "@/lib/types/slider";
import Image from "next/image";

const offerSliderBreakpoints = {
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
const sliders = [
  {
    id: "902",
    original:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
    thumbnail:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg",
  },
  {
    id: "903",
    original:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
    thumbnail:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg",
  },
  {
    id: "904",
    original:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
    thumbnail:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg",
  },
  {
    id: "905",
    original:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
    thumbnail:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg",
  },
  {
    id: "906",
    original:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
    thumbnail:
      "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg",
  },
];

export default function BannerSliderTest() {
  return (
    <div className="px-6 py-5 border-t md:p-8 border-border-200 bg-light">
      <div className="relative">
        <Swiper
          id="offer"
          //TODO: need discussion
          // loop={true}
          breakpoints={offerSliderBreakpoints}
          modules={[Navigation]}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
          }}
        >
          {sliders?.map((d) => (
            <SwiperSlide key={d.id}>
              <Image
                className="w-full h-auto"
                src={d.original}
                alt={d.id}
                layout="responsive"
                width="580"
                height="270"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer prev top-2/4 ltr:-left-4 rtl:-right-4 ltr:md:-left-5 rtl:md:-right-5 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">Atrás</span>
          <ArrowPrev width={18} height={18} />
        </div>
        <div
          className="absolute z-10 flex items-center justify-center w-8 h-8 -mt-4 transition-all duration-200 border rounded-full shadow-xl cursor-pointer next top-2/4 ltr:-right-4 rtl:-left-4 ltr:md:-right-5 md:-mt-5 md:w-9 md:h-9 bg-light border-border-200 border-opacity-70 text-heading hover:bg-accent hover:text-light hover:border-accent"
          role="button"
        >
          <span className="sr-only">Siguiente</span>
          <ArrowNext width={18} height={18} />
        </div>
      </div>
    </div>
  );
}
