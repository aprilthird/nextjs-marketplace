"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomDropdown from "../../ui/dropdown/custom";
import { Disclosure } from "@headlessui/react";
import { ArrowDownIcon } from "../../icons/arrow-down";
import {
  CodeSVGIcon,
  SettingsApplicationsSVGIcon,
} from "@react-md/material-icons";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import { signOut } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";

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

const MiQuryMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const MenuLargeBar = () => {
    return (
      <div className="w-64 text-gray-900 bg-white border border-gray-200 rounded-lg m-3 hidden lg:block">
        {MenuItems.map((item, index) => {
          if (item.options.length > 0) {
            return (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-medium border-b focus:outline-none focus-visible:ring">
                      <span className="inline-flex items-center">
                        {item.icon}
                        {item.label}
                      </span>
                      <ArrowDownIcon
                        className={`${
                          !open ? "rotate-180 transform" : ""
                        } h-3 w-3`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {item.options.map((item, index) => {
                        return (
                          <Link
                            key={index}
                            href={`/miqury/${item.path}`}
                            className={classNames(
                              "border-b focus:z-10 font-medium inline-flex items-center px-4 py-2 rounded-t-lg text-sm w-full",
                              pathname == `/miqury/${item.path}`
                                ? "text-primary"
                                : "hover:text-primary focus:text-primary hover:bg-gray-100"
                            )}
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        );
                      })}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          } else {
            if (item.path == "close") {
              return (
                <div
                  key={index}
                  className={classNames(
                    "cursor-pointer border-b focus:z-10 font-medium inline-flex text-red-500 hover:text-red-900 focus:text-red-900 hover:bg-gray-100 items-center px-4 py-2 rounded-t-lg text-sm w-full "
                  )}
                  onClick={async () => {
                    await signOut();
                    nextAuthSignOut({
                      redirect: true,
                    });
                  }}
                >
                  {item.label}
                </div>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={`/miqury/${item.path}`}
                  className={classNames(
                    "border-b focus:z-10 font-medium inline-flex items-center px-4 py-2 rounded-t-lg text-sm w-full",
                    pathname == `/miqury/${item.path}`
                      ? "text-primary"
                      : "hover:text-primary focus:text-primary hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            }
          }
        })}
      </div>
    );
  };

  const MenuMobileMar = () => {
    const subMenuItems = MenuItems.filter((x) => x.options.length > 0)
      .map((x) => x.options)
      .flat(1);
    const tmpMenuItems = [
      ...MenuItems.filter((x) => x.options.length === 0).splice(
        0,
        MenuItems.filter((x) => x.options.length === 0).length - 1
      ),
      subMenuItems,
      MenuItems[MenuItems.length - 1],
    ].flat(1);
    const [selectedItem, setSelectedItem] = useState(
      tmpMenuItems.find(
        (filterItem: any) => `/miqury/${filterItem.path}` === pathname
      )
    );
    return (
      <div className="lg:hidden">
        <CustomDropdown
          value={selectedItem}
          onChange={async (item) => {
            if (item.path == "close") {
              await signOut();
              nextAuthSignOut({
                redirect: true,
              });
            } else {
              setSelectedItem(item);
              router.push("/miqury/" + item.path);
            }
          }}
          items={tmpMenuItems}
          buttonClassName="border-2"
          className="w-full py-2 px-4 flex flex-col"
          optionsClassName="w-full z-50"
          renderItem={({
            item,
            selected,
          }: {
            item: any;
            selected: boolean;
          }) => (
            <React.Fragment>
              <div
                className={classNames(
                  "flex items-center",
                  selected ? "font-medium" : "font-normal",
                  item?.path == "close"
                    ? "text-red-500 flex justify-center pr-10"
                    : ""
                )}
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span className="text-xs ml-3">{item.label}</span>
              </div>
              {/* {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 group-hover:text-white group-focus:text-white">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                  ) : null} */}
            </React.Fragment>
          )}
          renderSelected={({ item }: { item: any }) => (
            <div className="flex items-center">
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span className="text-md font-bold">{item.label}</span>
            </div>
          )}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      <MenuLargeBar />
      <MenuMobileMar />
    </React.Fragment>
  );
};

const MenuItems = [
  {
    path: "favorites",
    label: "Favoritos",
    icon: (
      <svg
        className="w-3 h-3 mr-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 14 20"
      >
        <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
      </svg>
    ),
    options: [],
  },
  {
    path: "notifications",
    label: "Notificaciones",
    icon: (
      <svg
        className="w-3 h-3 mr-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
      </svg>
    ),
    options: [],
  },
  // {
  //   path: "chats",
  //   label: "Chat",
  //   icon: (
  //     <svg
  //       className="w-3 h-3 mr-2.5"
  //       aria-hidden="true"
  //       xmlns="http://www.w3.org/2000/svg"
  //       viewBox="0 0 20 18"
  //       fill="currentColor"
  //     >
  //       <path
  //         d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
  //         fill="currentColor"
  //       />
  //       <path
  //         d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
  //         fill="currentColor"
  //       />
  //     </svg>
  //   ),
  //   options: [],
  // },
  {
    path: "profile",
    label: "Perfil",
    icon: (
      <svg
        className="w-3 h-3 mr-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
    ),
    options: [],
  },
  {
    path: "shipping-address",
    label: "Direcciones de envío",
    icon: (
      <svg
        className="w-3 h-3 mr-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
    ),
    options: [],
  },
  {
    path: "payment-method",
    label: "Métodos de pago",
    icon: (
      <svg
        className="w-3 h-3 mr-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
    ),
    options: [],
  },
  {
    path: "",
    label: "Sistema e información",
    icon: <SettingsApplicationsSVGIcon className="w-4 h-4 mr-2.5" />,
    options: [
      {
        path: "update-password",
        label: "Reiniciar contraseña",
        icon: (
          <svg
            className="w-3 h-3 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
        ),
        options: [],
      },
      {
        path: "terms-and-conditions",
        label: "Términos y condiciones",
        icon: (
          <svg
            className="w-3 h-3 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
        ),
        options: [],
      },
      {
        path: "complaints-book",
        label: "Libro de reclamaciones",
        icon: (
          <svg
            className="w-3 h-3 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
        ),
        options: [],
      },
      {
        path: "delete-account",
        label: "Eliminar cuenta",
        icon: (
          <svg
            className="w-3 h-3 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
        ),
        options: [],
      },
    ],
  },
  {
    path: "close",
    label: "Cerrar sesión",
    icon: null,
    options: [],
  },
];

export default MiQuryMenu;
