import classNames from "classnames";
import Image from "next/image";
import { HeartFillIcon } from "../icons/heart-fill";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";
import { HomeIcon } from "../icons/home-icon";
import { UserIcon } from "../icons/user-icon";
import { CartOutlinedIcon } from "../icons/cart-outlined";
import { CheckedIcon } from "../icons/checked";
import {
  BeautyHealth,
  DressingTable,
  HandBags,
  HomeCleaning,
  LaptopBags,
  Lips,
  Pants,
  PetCare,
  ShavingNeeds,
  ShoulderBags,
} from "@/lib/components/icons/category";
import CartCheckBag from "../icons/cart-check-bag";
import { CheckMark } from "../icons/checkmark";
import { BookIcon, DressIcon } from "@/lib/components/icons/groups";
import { Check } from "../icons";
import { HeartOutlineIcon } from "../icons/heart-outline";
import Cart from "../icons/cart";
import { StarIcon } from "../icons/star-icon";
import { HelpIcon } from "../icons/help-icon";
import { PencilIcon } from "../icons/pencil-icon";
import Category from "@/lib/models/category";
import Link from "next/link";

type Props = {
  className?: string;
  category: Category;
  parentCategory?: Category;
};

export default function CategoryCard({
  children,
  category,
  parentCategory,
  className,
}: React.PropsWithChildren<Props>) {
  function CategoryIcon({ category }: { category: string }) {
    if (category == "store") {
      return (
        <div className="flex flex-col items-center">
          <div className="font-semibold p-2 text-center">
            Mesa Redonda / Mercado Central
          </div>
          <Image
            className=" transition duration-150 ease-in group-hover:scale-110 rounded-full h-[135px] w-[150px]"
            src="/assets/images/mesa_redonda.jpg"
            alt="Imágen Mesa Redonda"
            layout="responsive"
            width={125}
            height={125}
          />
        </div>
      );
    }
    if (category === "shopping-bag") {
      // return <StarIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_moda.png"
          alt="Imágen Moda"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "home") {
      // return <HomeIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_hogar.png"
          alt="Imágen Hogat"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "laptop") {
      // return <ShoppingBagIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_tecnologia.png"
          alt="Imágen Tecnología"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "heart") {
      // return <HeartFillIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_belleza.png"
          alt="Imágen Belleza"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "users") {
      // return <UserIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_familia.png"
          alt="Imágen Familia"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "bicycle") {
      // return <PencilIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_deporte.png"
          alt="Imágen Deporte"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "check-square") {
      // return <PencilIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_especialidad.jpg"
          alt="Imágen Deporte"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "shopping-cart") {
      // return <PencilIcon className="w-[120px] h-[120px]" />;
      return (
        <Image
          className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
          src="/assets/images/cat_otros.jpg"
          alt="Imágen Deporte"
          layout="responsive"
          width={75}
          height={75}
        />
      );
    }
    if (category === "bookmark") {
      return <Cart className="w-[120px] h-[120px]" />;
    }
    if (category === "check-square") {
      return <CheckedIcon className="w-[120px] h-[120px]" />;
    }
    if (category === "shopping-cart") {
      return <CartCheckBag className="w-[120px] h-[120px]" />;
    }
    return <div>{category}</div>;
  }

  return (
    <div
      className={classNames(
        "aspect-square rounded-full overflow-hidden w-28 h-28 md:w-auto md:h-auto md:max-w-[14rem] md:max-h-[14rem] box-border shadow-md border-white border-4 p-2 hover:border-primary mx-auto bg-white group",
        className
      )}
    >
      {category.image === "shopping-bag" ||
      category.image === "home" ||
      category.image === "bicycle" ||
      category.image === "users" ||
      category.image === "heart" ||
      category.image === "store" ||
      category.image === "check-square" ||
      category.image === "shopping-cart" ||
      category.image === "laptop" ||
      category.image?.includes("/") ? (
        category.image?.includes("/") ? (
          <Image
            className="w-full h-auto transition duration-150 ease-in group-hover:scale-110"
            src={
              category.image.includes("/")
                ? category.image
                : "https://cdn1.iconfinder.com/data/icons/image-manipulations/100/13-512.png"
            }
            alt={category.label}
            layout="responsive"
            width={75}
            height={75}
          />
        ) : (
          <CategoryIcon category={category.image} />
        )
      ) : (
        <div className="h-[12rem] text-primary mx-auto flex flex-col items-center justify-center space-y-2">
          <CategoryIcon category={category.image} />
          <div className="text-center text-sm max-w-[10rem]">
            {category.name}
          </div>
        </div>
      )}
    </div>
  );
}
