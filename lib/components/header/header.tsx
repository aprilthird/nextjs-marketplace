"use client";
import classNames from "classnames";
import Image from "next/image";
import SearchBar from "@/lib/components/search/search-bar";
import NavigationMenu from "@/lib/components/menu/menu";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

export default function Header({ className }: Props) {
  const router = useRouter();
  return (
    <div className={classNames("bg-white sticky top-0 z-20 py-2", className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center justify-center md:items-stretch md:justify-between md:space-x-4 md:flex-nowrap">
            <button
              className="flex shrink-0 w-full justify-center items-center md:w-auto md:min-w-fit"
              onClick={
                () => router.push("/")
                // (window.location.href = "/")
              }
            >
              <Image
                className="block h-10 w-auto lg:hidden"
                src="/assets/images/logo-white-1x.png"
                alt="Qury"
                width="120"
                height="40"
              />
              <Image
                className="hidden h-14 w-auto lg:block"
                src="/assets/images/logo-white-1x.png"
                alt="Qury"
                width="150"
                height="50"
              />
            </button>
            <SearchBar className="grow order-last flex items-center mt-2 md:order-1 md:mt-0 w-100" />
            <NavigationMenu className="order-1 md:order-last" />
          </div>
        </div>
      </div>
    </div>
    /* <Image src="/assets/images/logo-white-1x.png" alt="logo" width="150" height="50" /> */
  );
}
