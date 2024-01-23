"use client";
import classNames from "classnames";
import { HomeIcon } from "@/lib/components/icons/home-icon";
import { ShoppingBagIcon } from "@/lib/components/icons/shopping-bag-icon";
import { UserOutlinedIcon } from "@/lib/components/icons/user-outlined";
import Link from "next/link";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import { signOut } from "aws-amplify/auth";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "@/lib/components/icons/arrow-down";
import TextUtils from "@/lib/utils/text-utils";
import { usePathname, useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import NotificationService from "@/lib/services/notifications";
import { toastMessage } from "@/lib/utils/toast";
import NotificationCard from "../notifications/card";
import Notification from "@/lib/models/notifications";

type Props = {
  className?: string;
};

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: "us-east-1_ZPe1B2fvp",
        userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
        identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
      },
    },
  },
  {
    ssr: true,
  }
);

export default function NavigationMenu({ className }: Props) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (session.data) {
      setTimeout(async () => {
        try {
          const tmpNotifications = await NotificationService.getAll(
            session.data
          );
          setNotifications(tmpNotifications.slice(0, 4));
        } catch (err) {
          console.error(err);
          toastMessage("error", "Ocurrió un error:" + err);
        }
      }, 0);
    }
  }, [session]);

  return (
    <nav className={classNames(className)}>
      <div className="h-full absolute top-0 right-0 md:relative md:top-auto md:right-auto hidden sm:block">
        <div className="h-full flex items-start space-x-4 md:items-center">
          {session.status == "unauthenticated" && (
            <Link
              href={"/login"}
              className="text-gray-700 hover:text-primary rounded-md text-sm font-medium"
            >
              <div className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
                Ingresar
              </div>
            </Link>
          )}
          {session.status == "authenticated" && (
            <React.Fragment>
              <div className="flex items-center space-x-3">
                {/* <Link
                  href={"/"}
                  className="text-gray-700 hover:text-primary rounded-md text-sm font-medium"
                >
                  <svg
                    className="w-7 h-7"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 18"
                    fill="currentColor"
                  >
                    <path
                      d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link> */}
                <Link
                  href={"/"}
                  className="text-gray-700 hover:text-primary rounded-md text-sm font-medium"
                >
                  <svg
                    className="w-7 h-7"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                  </svg>
                </Link>
                <Link
                  href={"/notificaciones"}
                  className="text-gray-700 hover:text-primary rounded-md text-sm font-medium"
                >
                  <svg
                    className="w-7 h-7"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
                  </svg>
                </Link>
                {/* <Menu
                  as="div"
                  className="relative text-gray-700 rounded-md text-sm font-medium hidden md:inline-block"
                >
                  {({ open }) => (
                    <React.Fragment>
                      <Menu.Button className="flex space-x-2 justify-center items-center">
                        <div className="text-gray-700 hover:text-primary rounded-md text-sm font-medium">
                          <svg
                            className="w-7 h-7"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
                          </svg>
                        </div>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="flex flex-col space-y-2">
                            {notifications.map((item) => (
                              <Menu.Item key={`notification_${item.id}`}>
                                {({ active }: any) => (
                                  <NotificationCard
                                    notification={item}
                                    hasBorder={false}
                                  />
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }: any) => (
                                <Link
                                  href={"/miqury/notifications"}
                                  className="text-gray-700 hover:text-primary rounded-md text-sm font-medium pl-4"
                                >
                                  {" "}
                                  Mostrar todas
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </React.Fragment>
                  )}
                </Menu> */}
                <Menu
                  as="div"
                  className="relative text-gray-700 rounded-md text-sm font-medium hidden md:inline-block"
                >
                  {({ open }) => (
                    <React.Fragment>
                      <Menu.Button className="flex space-x-2 justify-center items-center">
                        <div className="bg-secondary rounded-full overflow-hidden">
                          <div className="w-[40px] h-[40px] text-xl p-1 text-white uppercase font-bold flex justify-center items-center">
                            {TextUtils.getSignificantCharacters(
                              session.data.user.displayName
                            )}
                          </div>
                        </div>
                        <div>{session.data.user.email}</div>
                        <ArrowDownIcon
                          className={classNames(
                            "h-[10px] w-[10px]",
                            open ? "rotate-180" : ""
                          )}
                        />{" "}
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="flex flex-col space-y-2">
                            {/* <Menu.Item>
                          {({ active }) => (
                            <Link
                              className="p-2 hover:text-primary"
                              href={"/miqury/favorites"}
                            >
                              Mi Tienda
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className="p-2 hover:text-primary"
                              href={"/miqury/favorites"}
                            >
                              Mis Pedidos
                            </Link>
                          )}
                        </Menu.Item> */}
                            <Menu.Item>
                              {({ active }: any) => (
                                <Link
                                  className="p-2 hover:text-primary"
                                  href={"/miqury/notifications"}
                                >
                                  Mi Qury
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }: any) => (
                                <button
                                  className="p-2 hover:text-primary"
                                  onClick={async () => {
                                    await signOut();
                                    nextAuthSignOut({
                                      redirect: true,
                                    });
                                  }}
                                >
                                  Cerrar Sesión
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </React.Fragment>
                  )}
                </Menu>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="block fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 sm:hidden">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <Link
            href={"/"}
            className={classNames(
              "inline-flex flex-col items-center justify-center",
              pathname === "/" ? "bg-gray-50" : ""
            )}
          >
            <HomeIcon
              className={classNames(
                "w-6 h-6 mb-1",
                pathname === "/" ? "text-primary" : "text-gray-500"
              )}
              fill="currentColor"
            />

            <span
              className={classNames(
                "text-xs",
                pathname === "/" ? "text-primary" : "text-gray-500"
              )}
            >
              Inicio
            </span>
          </Link>
          <button
            // href={"/carrito"}
            onClick={() => (window.location.href = "/carrito")}
            className={classNames(
              "inline-flex flex-col items-center justify-center",
              pathname === "/carrito" ? "bg-gray-50" : ""
            )}
          >
            <ShoppingBagIcon
              className={classNames(
                "w-6 h-6 mb-1",
                pathname === "/carrito" ? "text-primary" : "text-gray-500"
              )}
              fill="currentColor"
            />
            <span
              className={classNames(
                "text-xs",
                pathname === "/carrito" ? "text-primary" : "text-gray-500"
              )}
            >
              Carrito
            </span>
          </button>
          {/* <Link
            href={"/miqury"}
            className={classNames(
              "inline-flex flex-col items-center justify-center",
              pathname === "/" ? "bg-gray-50" : ""
            )}
          >
            <SearchIcon
              className={classNames(
                "w-6 h-6 mb-1",
                pathname === "/" ? "text-primary" : "text-gray-500"
              )}
              fill="currentColor"
            />
            <span
              className={classNames(
                "text-xs",
                pathname === "/shipping-address"
                  ? "text-primary"
                  : "text-gray-500"
              )}
            >
              Pedidos
            </span>
          </Link>
          <Link
            href={"/miqury"}
            className={classNames(
              "inline-flex flex-col items-center justify-center",
              pathname === "/" ? "bg-gray-50" : ""
            )}
          >
            <HeartOutlineIcon
              className={classNames(
                "w-6 h-6 mb-1",
                pathname === "/" ? "text-primary" : "text-gray-500"
              )}
              fill="currentColor"
            />
            <span
              className={classNames(
                "text-xs",
                pathname === "/shipping-address"
                  ? "text-primary"
                  : "text-gray-500"
              )}
            >
              Mi Tienda
            </span>
          </Link> */}
          <div
            // href={"/miqury/shipping-address"}
            className={classNames(
              "inline-flex flex-col items-center justify-center cursor-pointer",
              pathname.includes("miqury") ? "bg-gray-50" : ""
            )}
            onClick={() => {
              if (session.status == "authenticated") {
                router.push("/miqury/shipping-address");
              } else if (session.status == "loading") {
                return;
              } else {
                router.push("/login");
              }
            }}
          >
            <UserOutlinedIcon
              className={classNames(
                "w-6 h-6 mb-1",
                pathname.includes("miqury") ? "text-primary" : "text-gray-500"
              )}
              fill="currentColor"
            />
            <span
              className={classNames(
                "text-xs",
                pathname.includes("miqury") ? "text-primary" : "text-gray-500"
              )}
            >
              Mi Qury
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
