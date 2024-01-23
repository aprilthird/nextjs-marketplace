import CartItem from "./cart-item";
import User from "./user";

export default class CartList {
  items: CartItem[] = [];
  user: User = new User();
  
  constructor(user: User) {
    this.user = user;
  }
}
