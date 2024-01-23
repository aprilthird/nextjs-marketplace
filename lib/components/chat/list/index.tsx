"use client";

import ChatMessage from "@/lib/models/chat-message";
import ChatUser from "@/lib/models/chat-user";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  messages: ChatMessage[];
  showOnlyUsers?: boolean;
};

const ChatList = ({ messages, showOnlyUsers = false }: Props) => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const router = useRouter();
  const session = useSession();
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const tmpUsers: ChatUser[] = [];
    messages
      .filter((x) => x.user.profileImage)
      .forEach((x) => {
        if (tmpUsers.includes(x.user)) {
          const idx = tmpUsers.findIndex(
            (u) => u.id === x.receivingUserId || u.id === x.issuingUserId
          );
          tmpUsers[idx].messages.push(x);
        } else {
          x.user.messages.push(x);
          tmpUsers.push(x.user);
        }
      });
    setUsers(
      messages
        .filter((x) => x.user.profileImage)
        .map((x) => x.user)
        .filter((value, index, self) => {
          return self.findIndex((x) => x.id === value.id) === index;
        })
    );
  }, [messages]);
  
  const messageIdGenerator = () => {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  return (
    <React.Fragment>
      {/* <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <Image
            className="hidden h-5 w-auto lg:block"
            src="/assets/images/logo-white-1x.png"
            alt="Qury"
            width="75"
            height="25"
          />
          <div className="font-medium">Soporte Qury {messages.length}</div>
        </div>
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
      </div> */}
      <div className={classNames("flex mt-2", !showOnlyUsers && "space-x-2")}>
        <div className={classNames("", !showOnlyUsers && "basis-2/5")}>
          {users.length > 0 ? (
            <div className="flex flex-col space-y-2 cursor-pointer">
              {users.map((user) => (
                <div
                  key={`user_${user.id}`}
                  className={classNames(
                    "rounded-lg p-4 border-2 shadow-md",
                    user.id === selectedUser?.id
                      ? "bg-primary text-white"
                      : "bg-white"
                  )}
                  onClick={() => {
                    console.log(
                      messages.filter(
                        (x) =>
                          x.receivingUserId === selectedUser?.id ||
                          x.issuingUserId === selectedUser?.id
                      )
                    );
                    setSelectedUser(user);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex column space-x-4">
                      <div className="flex items-center justify-center">
                        <Image
                          className="w-16 h-16 rounded-full"
                          src={user.fullUrlProfileImage}
                          alt="fullUrlProfileImage"
                          width="50"
                          height="50"
                        />
                      </div>
                      <div>
                        <div className="font-bold">
                          {user.id} - {user.name}
                        </div>
                        {/* <div className="text-sm">
                          {user.messages[0].message}
                        </div>
                        <div className="text-sm">
                          {user.messages[0].creationDate}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center font-bold text-center text-lg">
              Aún no tienes pedidos
            </div>
          )}
        </div>
        {!showOnlyUsers && (
          <div className="shadow-lg bg-white rounded p-4 basis-2/5 mt-6 lg:mt-0 sticky top-[105px] h-fit md:mr-[30px] 2xl:mr-0">
            {users.length > 0 ? (
              <div className="flex flex-col space-y-2 mt-2 bg-white">
                {messages
                  .filter(
                    (x) =>
                      x.receivingUserId === selectedUser?.id ||
                      x.issuingUserId === selectedUser?.id
                  )
                  .map((message) => (
                    <div
                      key={`payment_method_${message.user.id}`}
                      className="rounded-lg p-4 border-2 shadow-md"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex column space-x-4">
                          <div className="flex items-center justify-center">
                            <Image
                              className="w-16 h-16 rounded-full"
                              src={message.user.fullUrlProfileImage}
                              alt="fullUrlProfileImage"
                              width="50"
                              height="50"
                            />
                          </div>
                          <div>
                            <div className="font-bold">{message.user.name}</div>
                            <div className="text-sm">{message.message}</div>
                            <div className="text-sm">
                              {message.creationDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center font-bold text-center text-lg">
                Aún no tienes pedidos
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ChatList;
