"use client";

import ProductCard from "@/lib/components/cards/product";
import Slider from "@/lib/components/ui/slider/index";
import ScrollSlider from "@/lib/components/ui/slider/scroll-slider";
import Promotion from "@/lib/models/promotion";
import PromotionList from "@/lib/models/promotion-list";

type Props = {
  items: PromotionList[];
};

const breakpoints = {
  320: {
    slidesPerView: 2.2,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 3.2,
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

export default function PromotionSliderCsr({
  items,
}: React.PropsWithChildren<Props>) {
  const finalItems: Promotion[][] = [];
  const promocionesTotales: Promotion[] = [];

  // items.forEach((list) => {
  //   const activePromotions = list.promotions
  //     .filter((x) => x.product.active === "1")
  //     .sort((x, y) => (x.product.order > y.product.order ? 1 : -1));

  //   console.log(activePromotions);

  //   for (let i = 0; i < activePromotions.length; i += 2) {
  //     const pair: Promotion[] = [];
  //     pair.push({ ...activePromotions[i], user: list.user });
  //     if (activePromotions[i + 1]) {
  //       pair.push({ ...activePromotions[i + 1], user: list.user });
  //     }
  //     finalItems.push(pair);
  //   }
  // });

  items.forEach((lista) => {
    const promocionesActivas = lista.promotions
      .filter((promocion) => promocion.product.active === "1")
      .sort((a, b) => (a.product.order > b.product.order ? 1 : -1))
      .map((promocion) => ({ ...promocion, user: lista.user }));

    promocionesTotales.push(...promocionesActivas);
  });

  for (let i = 0; i < promocionesTotales.length; i += 2) {
    const par: Promotion[] = [promocionesTotales[i]];

    if (promocionesTotales[i + 1]) {
      par.push(promocionesTotales[i + 1]);
    }

    finalItems.push(par);
  }

  const SliderItem = ({ item }: { item: Promotion[] }) => {
    return (
      <div className="vertical-group">
        <ProductCard
          className="w-min-full h-auto"
          product={item[0].product}
          storeName={item[0].user.displayName}
        />
        {item[1] && (
          <ProductCard
            className="w-min-full h-auto"
            product={item[1].product}
            storeName={item[1].user.displayName}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <Slider
        hashId="promotion_slider"
        renderItem={SliderItem}
        items={finalItems}
        breakpoints={breakpoints}
        className="hidden lg:flex"
      />
      <ScrollSlider
        className={"lg:hidden"}
        itemClassName="w-[60%] sm:w-[30%] items-center"
        items={finalItems}
        renderItem={SliderItem}
      />
    </>
  );
}
