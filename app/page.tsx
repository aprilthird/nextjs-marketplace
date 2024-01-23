"use-client";
import { Tab, Tabs } from "@/lib/components/ui/tabs/tabs";
import React, { Suspense } from "react";
import PromotionService from "@/lib/services/promotion";
import PromotionSliderCsr from "./promotion-slider-csr";
import CarouselDefaultSkeleton from "@/lib/components/skeletons/carousel-default";
import BannerService from "@/lib/services/banner";
import BannerSliderCsr from "./banner-slider-csr";
import BannerSkeleton from "@/lib/components/skeletons/banner";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import StoreListCsr from "./store-list-csr";
import CategoryService from "@/lib/services/category";
import CategoryListCsr from "./category-list-csr";
import NewsService from "@/lib/services/news";
import NewsListCsr from "./news-list-csr";
import CategorySidebarCsr from "./category-sidebar-csr";
import CategoryCard from "@/lib/components/cards/category";
import Link from "next/link";
import OnBoardingModal from "./modal-test";
import { CountdownTimer } from "@/lib/components/countdown/countdown";
import Banner from "@/lib/models/banner";

export default function HomePage() {
  function MainBannerSection() {
    return (
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">Qury 2023</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            Aprovecha desde este <strong>19 al 26 de Junio</strong> la temporada
            de ofertas.
          </p>
          <a
            href="#"
            className="flex-none rounded-full bg-primary-dark px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Inscríbete ahora <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  async function BannerSection() {
    // const data = await BannerService.getAll();
    const b1 = new Banner();
    b1.illustration = "/assets/images/banner navidad.jpg";
    b1.link = "/buscar/productos?q=&category=63&subcategory=95";
    const b2 = new Banner();
    b2.illustration = "/assets/images/banner_2.jpg";
    b2.link = "/category/63";
    // const b3 = new Banner();
    // b3.illustration = "/assets/images/banner_3.jpg";
    // b3.link = "/buscar/productos?q=&category=63&subcategory=94";
    const b4 = new Banner();
    b4.illustration = "/assets/images/banner_4.jpg";
    b4.link = "/tienda/YKG9901";

    const data = [b1, b2, b4];

    return <BannerSliderCsr items={data} />;
  }

  function BannerSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="relative flex items-center justify-between">
          {Array.from(Array(3).keys()).map((index: number) => (
            <BannerSkeleton
              key={`banner_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  function CountDownSection() {
    return (
      <div className="relative lg:my-6 isolate rounded-2xl flex-row items-center justify-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 mb-4 lg:mb-auto">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"></div>
        </div>
        <div className="flex flex-wrap text-center justify-center items-center gap-x-4 gap-y-2 text-sm leading-6 text-gray-900">
          <p>Las siguientes ofertas vencen en</p>
          <CountdownTimer targetDate={new Date("2023-10-31").getTime()} />
        </div>
      </div>
    );
  }

  function MiniBannersSection() {
    return (
      <div className="pt-4">
        {/* <div className="grid grid-cols-6 grid-flow-row h-[400px] gap-4 mb-4">
          <div className="col-span-2 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 1
          </div>
          <div className="col-span-2 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 2
          </div>
          <div className="col-span-2 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 3
          </div>
        </div>
        <div className="grid grid-cols-6 grid-flow-row h-[600px] gap-4 mb-4">
          <div className="col-span-2 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 1
          </div>
          <div className="col-span-4 bg-red-400 rounded-2xl flex items-center justify-center "></div>
          <div className="col-span-4 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 3
          </div>
          <div className="col-span-2 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 4
          </div>
          <div className="col-span-3 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 5
          </div>
          <div className="col-span-3 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 6
          </div>
        </div> */}
        <div className="grid grid-cols-6 grid-flow-row h-[300px] gap-4 mb-4">
          <div className="col-span-3 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 5
          </div>
          <div className="col-span-3 bg-red-400 p-4 rounded-2xl flex items-center justify-center">
            Banner 6
          </div>
        </div>
      </div>
    );
  }

  async function PromotionsSection() {
    const data = await PromotionService.getAllProducts();

    return <PromotionSliderCsr items={data} />;
  }

  function PromotionsSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div className="relative flex items-center justify-between">
          {Array.from(Array(3).keys()).map((index: number) => (
            <CarouselDefaultSkeleton
              key={`promotion_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  async function MainCategoriesSection() {
    var data = await CategoryService.getAll();
    var mesaRedonda = data.find((value) => value.id === 63);
    var navidad = data.find((value) => value.id === 95);
    data = data
      .filter((value, index) => value.parentId === 0 && value.id !== 63)
      .filter((_, index) => index < 10);

    return (
      <>
        {mesaRedonda && (
          <div className="flex gap-2 items-center justify-center">
            {navidad && (
              <Link href={"/buscar/productos?q=&category=63&subcategory=95"}>
                <CategoryCard category={navidad} />
              </Link>
            )}
            <Link href={"/category/" + mesaRedonda?.id}>
              <CategoryCard category={mesaRedonda} />
            </Link>
          </div>
        )}
        <div className="text-center text-2xl font-semibold my-6 text-gray-900">
          y también a tiendas del Perú:
        </div>
        <div className="grid grid-cols-2 gap-2 content-center sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5 xl:gap-5">
          {data.map((item, i) => {
            return (
              <Link key={`category_link_${i}`} href={"/category/" + item.id}>
                <CategoryCard category={item} />
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  async function StoresSection() {
    const data = await PromotionService.getAllStores();

    return <StoreListCsr items={data} />;
  }

  function StoresSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div
          role="status"
          className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          {Array.from(Array(6).keys()).map((index: number) => (
            <ListDefaultSkeleton
              key={`store_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  async function CategoriesSidebarSection() {
    const data = await CategoryService.getAll();
    const finalData = data.filter((x) => x.parentId === 0);
    for (var i = 0; i < finalData.length; ++i) {
      finalData[i].children = data
        .filter((x) => x.parentId === finalData[i].id)
        .sort((x, y) => (x.order > y.order ? 1 : -1));
    }

    return <CategorySidebarCsr items={finalData} />;
  }

  async function CategoriesSection() {
    const data = await CategoryService.getAll();

    return <CategoryListCsr items={data} />;
  }

  function CategoriesSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div
          role="status"
          className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          {Array.from(Array(6).keys()).map((index: number) => (
            <ListDefaultSkeleton
              key={`category_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  async function NewsSection() {
    const data = await NewsService.getAll();

    return <NewsListCsr items={data} />;
  }

  function NewsSectionLoader() {
    return (
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <div
          role="status"
          className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          {Array.from(Array(6).keys()).map((index: number) => (
            <ListDefaultSkeleton
              key={`news_skeleton_${index}`}
              className="basis-1/3"
            />
          ))}
        </div>
      </div>
    );
  }

  function LogosSection() {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Nuestras tiendas oficiales
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width="158"
              height="48"
            />
          </div>
        </div>
      </div>
    );
  }

  function SubscribeSection() {
    return (
      <section className="bg-white rounded-2xl">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Suscríbete
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl">
              Mantente al día con las últimas promociones y novedades en{" "}
              <strong>Qury</strong>.
            </p>
            <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-gray-900"
                  >
                    Correo electrónico
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Correo electrónico"
                    type="email"
                    id="email"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary sm:rounded-none sm:rounded-r-lg hover:bg-primary-dark focus:ring-1 focus:ring-primary-dark"
                  >
                    Enviar
                  </button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                Nos preocupamos por la protección de tus datos.{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Lee nuestras Políticas de Privacidad
                </a>
                .
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  function DownloadAppSection() {
    return (
      <section className="bg-primary-light rounded-2xl">
        <div className="pt-8 px-4 mx-auto max-w-screen-xl flex flex-col justify-between md:flex-row md:space-x-2 lg:pt-16 lg:px-6">
          <div className="flex flex-col justify-center space-y-4 mb-3">
            <div className="text-3xl font-bold">
              Descarga nuestra aplicación móvil.
            </div>
            <div className="text-md text-gray-700 font-bold">
              Tienda, Pedidos, Chats y más!
            </div>
            <div className="flex space-x-2">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://apps.apple.com/pe/app/qury/id1574598568"
                className="flex mt-3 w-48 h-14 bg-black text-white rounded-xl items-center justify-center"
              >
                <div className="mr-3 scale-75 lg:scale-100">
                  <svg viewBox="0 0 384 512" width="30">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Descárgalo en el</div>
                  <div className="text-lg lg:text-xl font-semibold font-sans -mt-1">
                    App Store
                  </div>
                </div>
              </a>

              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.qury"
                className="flex mt-3 w-48 h-14 bg-black text-white rounded-lg items-center justify-center"
              >
                <div className="mr-3 scale-75 lg:scale-100">
                  <svg viewBox="30 336.7 120.9 129.2" width="30">
                    <path
                      fill="#FFD400"
                      d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                    />
                    <path
                      fill="#FF3333"
                      d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                    />
                    <path
                      fill="#48FF48"
                      d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                    />
                    <path
                      fill="#3BCCFF"
                      d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs">DiSPONIBLE EN</div>
                  <div className="text-lg lg:text-xl font-semibold font-sans -mt-1">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="flex mt-2 md:mt-0 items-end gap-1 lg:gap-2">
            <img className="w-1/2" src="/assets/images/app_screen_1.svg" />
            <img className="w-1/2" src="/assets/images/app_screen_2.svg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <OnBoardingModal />
      {/* <MainBannerSection /> */}
      <Suspense fallback={<BannerSectionLoader />}>
        {/* @ts-expect-error Server Component */}
        <BannerSection />
      </Suspense>
      <div className="hidden lg:block max-w-7xl mx-auto px-6 md:px-8">
        {/* <MiniBannersSection /> */}
        <div className="text-center text-2xl font-semibold my-6 text-gray-900">
          Compra al por mayor y menor en los emporios comerciales:
        </div>
        <Suspense fallback={<CategoriesSectionLoader />}>
          {/* @ts-expect-error Server Component */}
          <MainCategoriesSection />
        </Suspense>
        <CountDownSection />
        <div className="text-center text-2xl font-semibold my-6 text-gray-900">
          Productos promocionados
        </div>
        <Suspense fallback={<PromotionsSectionLoader />}>
          {/* @ts-expect-error Server Component */}
          <PromotionsSection />
        </Suspense>
        <div className="flex justify-center space-x-4">
          {/* <div className="flex-shrink-0 w-3/12">
            <h2 className="text-2xl font-bold mb-2">Categorías</h2>
            <Suspense fallback={<CategoriesSectionLoader />}>
              <CategoriesSidebarSection />
            </Suspense>
          </div> */}
          <div className="flex-shrink-0 w-full">
            <div className="text-center my-6 text-2xl font-semibold text-gray-900">
              Tiendas promocionadas
            </div>
            <Suspense fallback={<StoresSectionLoader />}>
              {/* @ts-expect-error Server Component */}
              <StoresSection />
            </Suspense>
          </div>
          {/* <div className="flex-shrink-0 w-3/12">
            <h2 className="text-2xl font-bold mb-2">Noticias</h2>
            <Suspense fallback={<NewsSectionLoader />}>
              <NewsSection />
            </Suspense>
          </div> */}
        </div>
      </div>
      <Tabs className="lg:hidden">
        <Tab label="Promociones">
          <CountDownSection />
          <h2 className="text-xl font-bold mb-2 mx-4">
            Productos promocionados
          </h2>
          <Suspense fallback={<PromotionsSectionLoader />}>
            {/* @ts-expect-error Server Component */}
            <PromotionsSection />
          </Suspense>
          <h2 className="text-xl font-bold mb-2 mx-4 mt-2">
            Tiendas promocionadas
          </h2>
          <Suspense fallback={<StoresSectionLoader />}>
            {/* @ts-expect-error Server Component */}
            <StoresSection />
          </Suspense>
        </Tab>
        <Tab label="Categorías">
          <Suspense fallback={<CategoriesSectionLoader />}>
            {/* @ts-expect-error Server Component */}
            <CategoriesSection />
          </Suspense>
        </Tab>
      </Tabs>
      {/* <div className="max-w-7xl mx-auto px-6 md:px-8">
        <LogosSection />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SubscribeSection />
      </div> */}
      <div className="max-w-7xl mx-auto px-6 mt-4 md:mt-8 md:px-8">
        <DownloadAppSection />
      </div>
      {/*<div className="lg:hidden max-w-xxl mx-auto px-6 md:px-8">
         <h2 className="py-4 text-2xl font-bold mb-2">Noticias</h2>
        <Suspense fallback={<NewsSectionLoader />}>
          <NewsSection />
        </Suspense> 
      </div>*/}
    </React.Fragment>
  );
}
