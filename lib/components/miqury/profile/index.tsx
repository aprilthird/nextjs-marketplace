"use client";

import User from "@/lib/models/user";
import { useSession } from "next-auth/react";
import React from "react";
import UserAvatar from "@/lib/components/avatar/user";

const MiQuryProfile = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user ? User.fromJson(sessionData.user) : null;

  const formatQuryId = (quryid: string) => {
    if (!quryid) return "";
    return quryid.substring(0, 3) + "-" + quryid.substring(3, 7);
  };

  return (
    <React.Fragment>
      <div className="flex justify-center">
        {user ? (
          <UserAvatar
            user={user}
            size="extra-large-big"
            className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
            resx={250}
          />
        ) : null}
      </div>
      <div className="pt-16">
        <h1 className="font-bold text-center text-3xl text-gray-900">
          {user?.displayName}
        </h1>
        <p className="text-center text-sm text-gray-400 font-medium mt-2">
          {user?.userLogin}
        </p>
        <p className="text-center text-secondary font-medium mt-2">
          Mi qury-ID: {formatQuryId(user?.quryId ?? "")}
        </p>
      </div>
    </React.Fragment>
  );
};

export default MiQuryProfile;
