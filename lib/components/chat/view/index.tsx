"use client";

import ChatMessage from "@/lib/models/chat-message";
import ChatUser from "@/lib/models/chat-user";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, ChatList, Input, MessageList } from "react-chat-elements";
import UserAvatar from "../../avatar/user";
import {
  AddSVGIcon,
  CameraAltSVGIcon,
  CameraSVGIcon,
  PhotoSVGIcon,
} from "@react-md/material-icons";
import Link from "next/link";
import ChatService from "@/lib/services/chat";
import Avatar from "../../avatar/base";
import Spinner from "../../ui/spinner";

type Props = {
  messages: ChatMessage[];
  fullView?: boolean;
  isSearchEnabled?: boolean;
};

const ChatView = ({
  messages,
  fullView = true,
  isSearchEnabled = true,
}: Props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<ChatUser[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ChatMessage[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const router = useRouter();
  const session = useSession();
  const [isEnabled, setIsEnabled] = useState(true);
  const messageListReferance = React.createRef<MessageList>();
  const inputReferance = React.createRef();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const sendMessage = () => {
    if (session.data) {
      if (message) {
        console.log(message);
        var lastMessage = filteredMessages[0];
        var newMessage = new ChatMessage();
        // var chatUser = new ChatUser();
        // chatUser.id = session.data?.user.id ?? 0;
        // chatUser.name = session.data?.user.displayName ?? "";
        newMessage.message = message;
        // newMessage.messageNumber = lastMessage.messageNumber;
        newMessage.index =
          lastMessage.receivingUserId === parseInt(session.data.user.id)
            ? 2
            : 1;
        newMessage.transactionId = lastMessage.transactionId;
        newMessage.issuingUserId = lastMessage.issuingUserId;
        newMessage.type = lastMessage.type;
        newMessage.user = lastMessage.user;
        ChatService.send(session.data, newMessage);
        const newFilteredMessages = filteredMessages;
        newFilteredMessages.push(newMessage);
        setFilteredMessages(newFilteredMessages);
        setMessage("");
        // router.refresh();
      }
    }
  };

  const generateUsers = () => {};

  useEffect(() => {
    const tmpUsers: ChatUser[] = [];
    messages.forEach((x) => {
      //   const idx = tmpUsers.findIndex(
      //     (u) =>
      //       (x.type === "MENSAJE" &&
      //         (u.id === x.receivingUserId || u.id === x.issuingUserId)) ||
      //       (x.type === "PEDIDO" &&
      //         (u.id === x.buyerUserId || u.id === x.sellerUserId))
      //   );
      const idx = tmpUsers.findIndex(
        (u) =>
          u.type === x.type &&
          u.transactionId === x.transactionId &&
          (u.id === x.receivingUserId ||
            u.id === x.issuingUserId ||
            u.id === x.buyerUserId ||
            u.id === x.sellerUserId)
      );

      if (idx !== -1) {
        tmpUsers[idx].messages.push(x);
      } else {
        x.user.type = x.type;
        x.user.transactionId = x.transactionId;
        x.user.transactionStatus = x.transactionStatus;
        x.user.isBuyer =
          x.buyerUserId === parseInt(session.data?.user.id ?? "0");
        x.user.isSeller =
          x.sellerUserId === parseInt(session.data?.user.id ?? "0");
        x.user.messages.push(x);
        tmpUsers.push(x.user);
      }
    });
    tmpUsers.sort((x, y) =>
      new Date(x.messages.toReversed()[0].creationDate) >
      new Date(y.messages.toReversed()[0].creationDate)
        ? 1
        : -1
    );
    setFilteredUsers(tmpUsers.toReversed());
    // setUsers(
    //   messages
    //     .filter((x) => x.user.profileImage)
    //     .map((x) => x.user)
    //     .filter((value, index, self) => {
    //       return self.findIndex((x) => x.id === value.id) === index;
    //     })
    // );
    setIsLoading(false);
  }, [messages, session.data?.user.id]);

  useEffect(() => {
    if (search) {
      const tmpUsers = filteredUsers.filter((x) =>
        x.name.toUpperCase().includes(search.toUpperCase())
      );
      setIsSearching(true);
      setFilteredUsers(tmpUsers);
    } else {
      const tmpUsers: ChatUser[] = [];
      messages.forEach((x) => {
        //   const idx = tmpUsers.findIndex(
        //     (u) =>
        //       (x.type === "MENSAJE" &&
        //         (u.id === x.receivingUserId || u.id === x.issuingUserId)) ||
        //       (x.type === "PEDIDO" &&
        //         (u.id === x.buyerUserId || u.id === x.sellerUserId))
        //   );
        const idx = tmpUsers.findIndex(
          (u) =>
            u.type === x.type &&
            u.transactionId === x.transactionId &&
            (u.id === x.receivingUserId ||
              u.id === x.issuingUserId ||
              u.id === x.buyerUserId ||
              u.id === x.sellerUserId)
        );

        if (idx !== -1) {
          tmpUsers[idx].messages.push(x);
        } else {
          x.user.type = x.type;
          x.user.transactionId = x.transactionId;
          x.user.transactionStatus = x.transactionStatus;
          x.user.isBuyer =
            x.buyerUserId === parseInt(session.data?.user.id ?? "0");
          x.user.isSeller =
            x.sellerUserId === parseInt(session.data?.user.id ?? "0");
          x.user.messages.push(x);
          tmpUsers.push(x.user);
        }
      });
      tmpUsers.sort((x, y) =>
        new Date(x.messages.toReversed()[0].creationDate) >
        new Date(y.messages.toReversed()[0].creationDate)
          ? 1
          : -1
      );
      setIsSearching(false);
      setFilteredUsers(tmpUsers.toReversed());
    }
  }, [filteredUsers, messages, search, session.data?.user.id]);

  return (
    <React.Fragment>
      <div
        className={classNames(
          "flex justify-center items-center",
          fullView && "space-x-2"
        )}
      >
        {isLoading && (
          <div className="min-h-[600px] flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {!isLoading && filteredUsers.length === 0 && !isSearching ? (
          <div className="min-h-[600px] flex flex-col justify-center items-center space-y-4 font-bold text-center text-lg">
            <Image
              src={"/assets/images/no_search.png"}
              alt="icon"
              width={300}
              height={300}
            />
            <div>Aún no tienes mensajes</div>
          </div>
        ) : (
          <React.Fragment>
            <div className={classNames("", fullView && "basis-2/5")}>
              <div className="flex flex-col space-y-2 cursor-pointer h-[600px] overflow-y-scroll">
                {isSearchEnabled && (
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                    placeholder="Busca un chat..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={`user_${user.id}_${user.type}_${user.transactionId}`}
                      className={classNames(
                        "rounded-lg p-4 border-2 shadow-md",
                        user.id === selectedUser?.id &&
                          user.type === selectedUser?.type &&
                          user.transactionId === selectedUser?.transactionId
                          ? "bg-primary text-white"
                          : "bg-white"
                      )}
                      onClick={() => {
                        if (fullView) {
                          setSearch("");
                          setSelectedUser(user);
                          setFilteredMessages(
                            messages.filter(
                              (x) =>
                                x.type === user?.type &&
                                x.transactionId === user?.transactionId &&
                                (user.id === x.receivingUserId ||
                                  user.id === x.issuingUserId ||
                                  user.id === x.buyerUserId ||
                                  user.id === x.sellerUserId)
                            )
                          );
                          console.log(
                            messages.filter(
                              (x) =>
                                x.type === user?.type &&
                                x.transactionId === user?.transactionId &&
                                (user.id === x.receivingUserId ||
                                  user.id === x.issuingUserId ||
                                  user.id === x.buyerUserId ||
                                  user.id === x.sellerUserId)
                            )
                          );
                          var storedValue = localStorage.getItem("chats");
                          var currentChats: ChatMessage[] = storedValue
                            ? (JSON.parse(storedValue) as ChatMessage[])
                            : [];
                          localStorage.setItem(
                            "chats",
                            JSON.stringify(
                              currentChats
                                .concat(
                                  messages.filter(
                                    (x) =>
                                      x.type === user?.type &&
                                      x.transactionId === user?.transactionId &&
                                      (user.id === x.receivingUserId ||
                                        user.id === x.issuingUserId ||
                                        user.id === x.buyerUserId ||
                                        user.id === x.sellerUserId)
                                  )
                                )
                                .map((x) => x.toJson())
                            )
                          );
                          console.log(
                            currentChats
                              .concat(
                                messages.filter(
                                  (x) =>
                                    x.type === user?.type &&
                                    x.transactionId === user?.transactionId &&
                                    (user.id === x.receivingUserId ||
                                      user.id === x.issuingUserId ||
                                      user.id === x.buyerUserId ||
                                      user.id === x.sellerUserId)
                                )
                              )
                              .map((x) => x.toJson())
                          );
                        } else {
                          var storedValue = localStorage.getItem("chats");
                          var currentChats: ChatMessage[] = storedValue
                            ? (JSON.parse(storedValue) as ChatMessage[])
                            : [];
                          localStorage.setItem(
                            "chats",
                            JSON.stringify(
                              currentChats.concat(
                                messages.filter(
                                  (x) =>
                                    x.type === user?.type &&
                                    x.transactionId === user?.transactionId &&
                                    (user.id === x.receivingUserId ||
                                      user.id === x.issuingUserId ||
                                      user.id === x.buyerUserId ||
                                      user.id === x.sellerUserId)
                                )
                              )
                            )
                          );
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex column space-x-4">
                          <div className="flex items-center justify-center">
                            <Avatar
                              hasImage={user.profileImage ? true : false}
                              image={user.fullUrlProfileImage}
                              name={user.name}
                            />
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            {user.type === "PEDIDO" && (
                              <div className="flex space-x-2 text-sm italic">
                                <div className="font-medium">
                                  Pedido #{user.transactionId}{" "}
                                </div>
                                <div className="font-medium">
                                  [{user.isBuyer ? "Comprador" : "Vendedor"}
                                  {" - "}
                                  {[
                                    "CAN",
                                    "EXP",
                                    "REQ",
                                    "REC",
                                    "ANU",
                                    "FIQ",
                                    "REE",
                                    "CNF",
                                  ].includes(user.transactionStatus)
                                    ? "Terminado"
                                    : "En curso"}
                                  ]
                                </div>
                              </div>
                            )}
                            <div className="text-sm">
                              {user.messages.toReversed()[0].image ? (
                                <div className="flex space-x-1">
                                  <CameraAltSVGIcon className="w-5 h-5" />{" "}
                                  <div>Imagen</div>
                                </div>
                              ) : (
                                user.messages.toReversed()[0].message
                              )}
                            </div>
                            <div className="text-sm">
                              {/* {user.messages[0].creationDate} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="font-medium text-lg text-center">
                    Ningún chat coincide con la búsqueda
                  </div>
                )}
              </div>
            </div>
            {fullView && selectedUser != null ? (
              <div className="basis-3/5 mt-6 lg:mt-0 sticky top-[85px] h-fit md:mr-[30px] 2xl:mr-0 min-h-[600px] flex flex-col">
                <div className="shadow-lg bg-white p-4 rounded flex items-center space-x-4">
                  <Avatar
                    hasImage={selectedUser.profileImage ? true : false}
                    image={selectedUser.fullUrlProfileImage}
                    name={selectedUser.name}
                    size="big"
                  />
                  <div className="flex flex-col justify-center space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium">{selectedUser.name}</div>
                      <div className="font-medium text-primary">
                        <Link href={`/tienda/${selectedUser.quryId}`}>
                          Ver tienda
                        </Link>
                      </div>
                    </div>
                    {selectedUser.type === "PEDIDO" && (
                      <div className="flex space-x-2 text-sm">
                        <div className="font-medium">
                          Pedido #{selectedUser.transactionId}{" "}
                        </div>
                        <div className="font-medium">
                          [{selectedUser.isBuyer ? "Comprador" : "Vendedor"}
                          {" - "}
                          {[
                            "CAN",
                            "EXP",
                            "REQ",
                            "REC",
                            "ANU",
                            "FIQ",
                            "REE",
                            "CNF",
                          ].includes(selectedUser.transactionStatus)
                            ? "Terminado"
                            : "En curso"}
                          ]
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <MessageList
                  referance={messageListReferance}
                  className="message-list flex-grow my-4"
                  lockable={true}
                  toBottomHeight={"100%"}
                  dataSource={filteredMessages.map((x, idx) => {
                    var position =
                      x.type === "MENSAJE"
                        ? x.issuingUserId ===
                          parseInt(session.data?.user.id ?? "0")
                          ? "right"
                          : "left"
                        : x.buyerUserId ===
                          parseInt(session.data?.user.id ?? "0")
                        ? "right"
                        : "left";
                    return {
                      position: position,
                      type: x.image ? "photo" : "text",
                      text: x.message,
                      data: {
                        uri: x.fullUrlImage,
                      },
                      date: new Date(x.creationDate),
                    } as any;
                  })}
                />
                {/* <Input
              referance={inputReferance}
              placeholder="Type here..."
              multiline={true}
              value={message}
              rightButtons={
                <Button color="white" backgroundColor="black" text="Send" />
              }
            /> */}
                <div className="flex mt-4 shadow-lg bg-white p-4 rounded ">
                  <button className="text-white bg-secondary font-bold rounded-lg px-5 py-2.5 hover:bg-secondary-dark focus:ring-2 focus:outline-none focus:ring-secondary">
                    <AddSVGIcon className="w-7 h-7" color="white" />
                  </button>
                  <input
                    type="text"
                    name="message"
                    id="message"
                    className="w-full ml-2 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    className="ml-2 text-white bg-primary font-bold rounded-lg px-5 py-2.5 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
                    onClick={sendMessage}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            ) : (
              <div className="basis-3/5 min-h-[600px] flex flex-col justify-center items-center space-y-4 font-bold text-center text-lg">
                <Image
                  src={"/assets/images/no_search.png"}
                  alt="icon"
                  width={300}
                  height={300}
                />
                <div>Ningún chat seleccionado</div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default ChatView;
