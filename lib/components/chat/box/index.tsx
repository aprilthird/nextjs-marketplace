"use client";

import ChatMessage from "@/lib/models/chat-message";
import ChatUser from "@/lib/models/chat-user";
import ChatService from "@/lib/services/chat";
import { AddSVGIcon } from "@react-md/material-icons";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MessageList } from "react-chat-elements";

const ChatBox = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const router = useRouter();
  const session = useSession();
  const [message, setMessage] = useState("");
  const [openChats, setOpenChats] = useState<number[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ChatMessage[][]>([]);
  const messageListReferance = React.createRef<MessageList>();

  useEffect(() => {
    setTimeout(async () => {
      if (session.data) {
        const messages = session ? await ChatService.getAll(session.data) : [];

        var storedValue = localStorage.getItem("chats");
        var currentChats: ChatMessage[] = storedValue
          ? (JSON.parse(storedValue) as ChatMessage[])
          : [];
        setChats(currentChats);

        const tmpUsers: ChatUser[] = [];
        messages.forEach((x) => {
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
        console.log("CHAT");
        console.log(tmpUsers);
        setUsers(tmpUsers.toReversed());
        tmpUsers.forEach((user, index) => {
          setFilteredMessages([...filteredMessages, user.messages]);
        });
      }
    }, 0);
  }, [session]);

  useEffect(() => {}, [session.data?.user.id]);

  const openChat = (user: ChatUser) => {
    if (openChats.includes(user.id)) {
      console.log(openChats.indexOf(user.id));
      console.log(openChats.splice(openChats.indexOf(user.id), 1));
      setOpenChats(openChats.splice(openChats.indexOf(user.id), 1));
    } else {
      console.log([...openChats, user.id]);
      setOpenChats([...openChats, user.id]);
    }
  };

  const sendMessage = (index: number) => {
    if (session.data) {
      if (message) {
        console.log(message);
        var lastMessage = filteredMessages[index][0];
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
        const newFilteredMessages = filteredMessages[index];
        newFilteredMessages.push(newMessage);
        filteredMessages[index] = newFilteredMessages;
        setFilteredMessages(filteredMessages);
        setMessage("");
        // router.refresh();
      }
    }
  };

  return (
    <div className="hidden sm:flex flex-col items-center justify-center pt-3.5 fixed bottom-0 right-0 mr-12 z-40">
      {users.length > 0 &&
        users.map(
          (user, index) =>
            index < 2 && (
              <div
                key={`chatbox_${index}`}
                className={classNames(
                  "flex flex-col bg-gray-100",
                  openChats.includes(user.id) ? "h-[400px] w-[350px]" : ""
                )}
              >
                <div
                  className={classNames(
                    "cursor-pointer p-3 text-white text-sm font-semibold focus:outline-none hover:bg-primary-dark",
                    openChats.includes(user.id)
                      ? "bg-primary-dark"
                      : "bg-primary"
                  )}
                  onClick={() => openChat(user)}
                >
                  {user.name}
                </div>
                {openChats.includes(user.id) && (
                  <MessageList
                    referance={messageListReferance}
                    className="message-list flex-grow bg-gray-100 overflow-y-scroll"
                    lockable={true}
                    toBottomHeight={"100%"}
                    dataSource={filteredMessages[index].map((x, idx) => {
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
                )}
                {openChats.includes(user.id) && (
                  <div className="flex mt-1 shadow-lg bg-white p-2 rounded">
                    {/* <button className="text-white bg-secondary font-bold rounded-lg px-5 py-2.5 hover:bg-secondary-dark focus:ring-2 focus:outline-none focus:ring-secondary">
                      <AddSVGIcon className="w-5 h-5" color="white" />
                    </button> */}
                    <input
                      type="text"
                      name="message"
                      id="message"
                      className="w-full ml-1 p-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                      placeholder="Escribe un mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                      className="ml-1 text-white bg-primary font-bold rounded-lg px-2 py-1 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
                      onClick={() => sendMessage(index)}
                    >
                      Enviar
                    </button>
                  </div>
                )}
              </div>
            )
        )}
    </div>
  );
};

export default ChatBox;
