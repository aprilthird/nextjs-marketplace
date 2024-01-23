"use client";

import UserAvatar from "@/lib/components/avatar/user";
import { ArrowNextIcon } from "@/lib/components/icons/arrow-next";
import User from "@/lib/models/user";
import NumberUtils from "@/lib/utils/number-utils";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import Link from "next/link";

type Props = {
  className?: string;
  user: User;
  link?: boolean;
};

export default function StoreSummary({ className, user, link = false }: Props) {
  const innerComp = () => {
    return (
      <>
        <div className="flex items-center gap-2">
          {user != null && <UserAvatar user={user} />}
          <div className="font-bold lg:hidden">{user?.displayName}</div>
        </div>
        <div className="flex flex-col justify-center grow flex-1">
          <div className="font-bold hidden lg:block">{user?.displayName}</div>
          <div className="text-sm text-justify">{user?.description}</div>
          {/* <Disclosure>
      {({ open }) => (
        <React.Fragment>
          <Disclosure.Button
            className={
              "font-bold text-sm flex items-center justify-between mt-2 hover:text-primary"
            }
          >
            <div>Políticas generales</div>
            <ArrowNextIcon
              className={open ? "w-4 h-4 rotate-90 transform" : "w-4 h-4"}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={"text-sm flex flex-col justify-between"}
          >
            <div className="flex space-x-2">
              <div>Tiempo de entrega:</div>
              <div className="text-primary">
                {user?.deliveryTime &&
                  NumberUtils.getTimeStampHoursToDays(user?.deliveryTime)}
              </div>
            </div>
            <div className="flex space-x-2">
              <div>Tiempo de confirmación:</div>
              <div className="text-primary">
                {user?.confirmationTime &&
                  NumberUtils.getTimeStampHoursToDays(
                    user?.confirmationTime
                  )}
              </div>
            </div>
            <div className="flex space-x-2">
              <div>Incluye costo de envío:</div>
              <div className="text-primary">
                {user?.hasDeliveryCost ? "Sí" : "No"}
              </div>
            </div>
            <div className="flex space-x-2">
              <div>Incluye costo de devolución:</div>
              <div className="text-primary">
                {user?.hasDevolutionCost ? "Sí" : "No"}
              </div>
            </div>
          </Disclosure.Panel>
        </React.Fragment>
      )}
    </Disclosure>
    {user?.disclaimer && (
      <Disclosure>
        {({ open }) => (
          <React.Fragment>
            <Disclosure.Button
              className={
                "font-bold text-sm flex items-center justify-between mt-2 hover:text-primary"
              }
            >
              <div>Políticas adicionales</div>
              <ArrowNextIcon
                className={open ? "w-4 h-4 rotate-90 transform" : "w-4 h-4"}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              className={"text-sm flex flex-col justify-between"}
            >
              {user?.disclaimer}
            </Disclosure.Panel>
          </React.Fragment>
        )}
      </Disclosure>
    )} */}
        </div>
      </>
    );
  };
  return link ? (
    <Link
      href={`/tienda/${user?.quryId}`}
      className={classNames(
        "shadow-lg w-full bg-white rounded-xl p-4 flex flex-col items-center space-y-2 lg:flex-row lg:space-x-3",
        className
      )}
    >
      {innerComp()}
    </Link>
  ) : (
    <div
      className={classNames(
        "shadow-lg w-full bg-white rounded-xl p-4 flex flex-col items-center space-y-2 lg:flex-row lg:space-x-3",
        className
      )}
    >
      {innerComp()}
    </div>
  );
}
