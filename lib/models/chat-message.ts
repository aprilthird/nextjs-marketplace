import ApiUtils from "../utils/api-utils";
import ChatUser from "./chat-user";

export default class ChatMessage {
  id: number = 0;
  messageNumber: number = 0;
  seen: string = "";
  message: string = "";
  image: string = "";
  issuingUserId: number = 0;
  receivingUserId: number = 0;
  buyerUserId: number = 0;
  sellerUserId: number = 0;
  creationDate: string = "";
  transactionId: string = "";
  transactionStatus: string = "";
  type: string = "";
  index: number = 0;
  user: ChatUser = new ChatUser();

  fullUrlImage: string = "";

  static fromJson(jsonObject: any): ChatMessage {
    var obj = new ChatMessage();
    obj.id = jsonObject["id"];
    obj.messageNumber = jsonObject["mensajeNumero"];
    obj.seen = jsonObject["leido"];
    obj.message = jsonObject["mensaje"];
    obj.image = jsonObject["image"];
    obj.creationDate = jsonObject["fechaCreacion"];
    obj.issuingUserId = jsonObject["usuario_id"];
    obj.receivingUserId = jsonObject["usuario_id_receptor"];
    obj.buyerUserId = jsonObject["usuario_id_comprador"];
    obj.sellerUserId = jsonObject["usuario_id_vendedor"];
    obj.transactionId = jsonObject["transaccion_id"];
    obj.transactionStatus = jsonObject["estadoTransaccion"];
    obj.type = jsonObject["tipo"];
    if (obj.image) {
      obj.fullUrlImage = `${ApiUtils.quryStorage}/${obj.image}`;
    }
    if (jsonObject["actor"]) {
      obj.user = ChatUser.fromJson(jsonObject["actor"]);
    }
    return obj;
  }

  toJson(): any {
    var jsonObject: any = {};
    jsonObject["texto"] = this.message;
    jsonObject["leido"] = 0;
    jsonObject["mensaje"] = this.message;
    jsonObject["estado"] = 1;
    jsonObject["image"] = this.image;
    jsonObject["transaccion_id"] =
      this.type === "MENSAJE" ? null : this.transactionId;
    jsonObject["usuario_id_receptor"] =
      this.type === "MENSAJE" ? this.user.id : null;
    jsonObject["usuario_id"] = this.issuingUserId;
    jsonObject["uType"] = this.index;
    jsonObject["nombreEmisor"] = this.user.name;
    jsonObject["arnDestino"] = this.user.arn;
    jsonObject["mensajeNumero"] =
      this.type === "PEDIDO"
        ? null
        : !this.messageNumber
        ? null
        : this.messageNumber;
    jsonObject["tipo"] = this.type;
    return jsonObject;
  }
}
