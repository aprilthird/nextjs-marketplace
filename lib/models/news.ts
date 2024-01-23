import ApiUtils from "@/lib/utils/api-utils";

export default class News {
  title: string = "";
  text: string = "";
  link: string = "";
  image: string = "";
  fullImageUrl: string = "";
  createDate: string = "";

  static fromJson(jsonObject: any): News {
    var obj = new News();
    obj.title = jsonObject["titulo"];
    obj.text = jsonObject["texto"];
    obj.link = jsonObject["imagen"];
    obj.image = jsonObject["imagen"];
    obj.createDate = jsonObject["fechaCreacion"];

    obj.fullImageUrl = `${ApiUtils.quryStorage}/noticias/${obj.image}`;

    return obj;
  }
}
