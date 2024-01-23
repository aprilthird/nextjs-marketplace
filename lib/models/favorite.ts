import Product from "./product";
import User from "./user";

export default class Favorite {
  id: number = 0;
  userId: number = 0;
  productId: number = 0;
  isUser: boolean = false;
  isProduct: boolean = false;
  userCatalogId: number = 0;
  product: Product = new Product();
  user: User = new User();

  static fromJson(jsonObject: any): Favorite {
    const obj = new Favorite();
    obj.id = jsonObject["id"];
    obj.isUser =
      jsonObject["producto_id"] === null && jsonObject["usuario_id"] !== null;
    obj.isProduct =
      jsonObject["producto_id"] !== null && jsonObject["usuario_id"] !== null;
    if (jsonObject["productos"]) {
      obj.product = Product.fromJson(jsonObject["productos"]);
    }
    if (jsonObject["usuarios"]) {
      obj.user = User.fromJson(jsonObject["usuarios"]);
    }
    return obj;
  }
}
