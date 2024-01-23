import Product from "./product";
import Promotion from "./promotion";
import User from "./user";

export default class PromotionList {
  id: number = 0;
  title: string = "";
  description: string = "";
  type: string = "";
  expires: string = "";
  order: number = 0;
  status: string = "";
  user: User = new User();
  promotions: Promotion[] = [];
  products: Product[] = [];

  static fromJson(jsonObject: any, hasPromotions: boolean): PromotionList {
    var obj = new PromotionList();
    obj.id = jsonObject["id"];
    obj.title = jsonObject["titulo"];
    obj.description = jsonObject["descripcion"];
    obj.type = jsonObject["tipo"];
    obj.expires = jsonObject["vigencia"];
    obj.order = jsonObject["orden"];
    obj.status = jsonObject["estado"];
    if (jsonObject["usuario"] != null) {
      obj.user = User.fromJson(jsonObject["usuario"]);
    }
    if (jsonObject["productos"] != null) {
      if (hasPromotions) {
        obj.promotions = jsonObject["productos"].map((e: any) =>
          Promotion.fromJson(e)
        );
      } else {
        obj.products = jsonObject["productos"].map((e: any) =>
          Product.fromJson(e)
        );
      }
    }
    return obj;
  }
}
