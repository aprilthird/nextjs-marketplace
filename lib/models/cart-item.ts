import Product from "./product";
import ProductPrice from "./product-price";

export default class CartItem {
  product: Product = new Product();
  selectedColor: string = "";
  selectedSize: string = "";
  selectedProductPriceKey: string = "";
  quantity: number = 0;
}
