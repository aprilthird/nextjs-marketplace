import User from "@/lib/models/user";
import { User as SessionUser } from "next-auth/core/types";
import ApiUtils from "@/lib/utils/api-utils";
import UrlUtils from "../utils/url-utils";
import { Session } from "next-auth";
import ChatMessage from "../models/chat-message";

export default class ChatService {
  static chatUrl = `aws-api/bandejaMensajes`;
  static messageUrl = `aws-api/message`;

  static async getAll(session: Session): Promise<ChatMessage[]> {
    var result: ChatMessage[] = [];
    try {
      const response = await fetch(UrlUtils.getURL(`${this.chatUrl}`), {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(session.token),
      });
      const data = await response.json();
      if (response.ok) {
        result = data.map((e: any) => ChatMessage.fromJson(e));
        result = result.sort((x, y) =>
          new Date(x.creationDate) > new Date(y.creationDate) ? 1 : -1
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }

  static send = async (session: Session, chatMessage: ChatMessage) => {
    try {
      const response = await fetch(UrlUtils.getURL(this.messageUrl), {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "POST",
          JSON.stringify(chatMessage.toJson())
        ),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  };
}
