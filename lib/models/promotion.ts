import Product from "./product";
import User from "./user";

export default class Promotion {
  id: number = 0;
  title: string = "";
  description: string = "";
  percentage: string = "";
  amount: string = "";
  expires: string = "";
  createDate: string = "";
  coupon: string = "";
  promotionId: number = 0;
  productId: number = 0;
  status: string = "";
  product: Product = new Product();
  user: User = new User();

  static fromJson(jsonObject: any): Promotion {
    var obj = new Promotion();
    obj.id = jsonObject["id"];
    obj.title = jsonObject["titulo"];
    obj.description = jsonObject["descripcion"];
    obj.percentage = jsonObject["porcentaje"];
    obj.amount = jsonObject["monto"];
    obj.expires = jsonObject["vigencia"];
    obj.createDate = jsonObject["fechaCreacion"];
    obj.coupon = jsonObject["cupon"];
    obj.status = jsonObject["estado"];
    obj.promotionId = jsonObject["promocion_id"];
    obj.productId = jsonObject["producto_id"];
    if (jsonObject["producto"] != null) {
      obj.product = Product.fromJson(jsonObject["producto"]);
    }
    return obj;
  }
}
