import ApiUtils from "../utils/api-utils";
import ChatMessage from "./chat-message";

export default class ChatUser {
  id: number = 0;
  name: string = "";
  quryId: string = "";
  profileImage: string = "";
  arn: string = "";

  fullUrlProfileImage: string = "";

  message: string = "";
  type: string = "";
  transactionId: string = "";
  transactionStatus = "";
  isSeller: boolean = false;
  isBuyer: boolean = false;

  messages: ChatMessage[] = [];

  static fromJson(jsonObject: any): ChatUser {
    var obj = new ChatUser();
    obj.id = jsonObject["id"];
    obj.name = jsonObject["nombre"];
    obj.quryId = jsonObject["quryId"];
    obj.arn = jsonObject["arn"];
    obj.profileImage = jsonObject["profileImage"];
    if (obj.profileImage) {
      obj.fullUrlProfileImage = `${ApiUtils.quryStorage}/${obj.profileImage}`;
    }
    return obj;
  }
}
