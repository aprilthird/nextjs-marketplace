export default class Banner {
  title: string = "";
  subtitle: string = "";
  text: string = "";
  link: string = "";
  image: string = "";
  featured: string = "";
  createDate: string = "";
  illustration: string = "";

  static fromJson(jsonObject: any): Banner {
    var obj = new Banner();
    obj.title = jsonObject["titulo"];
    obj.subtitle = jsonObject["subtitulo"];
    obj.link = jsonObject["link"];
    obj.illustration = jsonObject["illustration"];
    return obj;
  }
}
