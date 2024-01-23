"use client";

import Notification from "@/lib/models/notifications";
import { Switch } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import NotificationCard from "../card";
import classNames from "classnames";

type Props = {
  notifications: Notification[];
  className?: string;
};

const NotificationsList = ({ notifications, className }: Props) => {
  const router = useRouter();
  const session = useSession();
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div className="text-primary font-medium">Alertar notificaciones</div>
        <Switch
          checked={isEnabled}
          onChange={setIsEnabled}
          className={`${isEnabled ? "bg-primary" : "bg-gray-400"}
            relative inline-flex items-center h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only"></span>
          <span
            aria-hidden="true"
            className={`${isEnabled ? "translate-x-5" : "translate-x-0"}
              pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
      {notifications.length > 0 ? (
        <div
          className={classNames(
            "flex flex-col space-y-2 mt-2 pr-2 overflow-y-scroll",
            className
          )}
        >
          {notifications.map((item) => (
            <NotificationCard
              key={`notification_${item.id}`}
              notification={item}
            />
          ))}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center font-bold text-center text-lg my-2">
          No hay notificaciones
        </div>
      )}
    </React.Fragment>
  );
};

export default NotificationsList;
