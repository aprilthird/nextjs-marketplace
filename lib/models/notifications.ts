export default class Notification {
  id: number = 0;
  text: string = "";
  userId: number = 0;
  status: string = "";

  static fromJson(jsonObject: any): Notification {
    var obj = new Notification();
    obj.id = jsonObject["id"];
    obj.text = jsonObject["texto"];
    obj.userId = jsonObject["usuario_id"];
    obj.status = jsonObject["estado"];

    return obj;
  }

  toJson(): any {
    var jsonObject: any = {};
    jsonObject["id"] = this.id;
    jsonObject["texto"] = this.text;
    jsonObject["usuario_id"] = this.userId;
    jsonObject["estado"] = this.status;

    return jsonObject;
  }
}
