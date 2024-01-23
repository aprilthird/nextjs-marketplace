import NumberUtils from "../utils/number-utils";

export default class ProductPrice {
  static UNIT: string = "UNIT";
  static THREE: string = "THREE";
  static TEN: string = "TEN";
  static DOZEN: string = "DOZEN";
  static HALF_HUNDRED: string = "HALF_HUNDRED";
  static HUNDRED: string = "HUNDRED";
  static HALF_THOUSAND: string = "HALF_THOUSAND";
  static THOUSAND: string = "THOUSAND";

  static labels: { [key: string]: string } = {
    UNIT: "Unidad",
    THREE: "3 Unidades (3)",
    TEN: "Decena (10)",
    DOZEN: "Docena (12)",
    HALF_HUNDRED: "Media centena (50)",
    HUNDRED: "Centena (100)",
    HALF_THOUSAND: "Medio millar (500)",
    THOUSAND: "Millar (1000)",
  };

  static quantities: { [key: string]: number } = {
    UNIT: 1,
    THREE: 3,
    TEN: 10,
    DOZEN: 12,
    HALF_HUNDRED: 50,
    HUNDRED: 100,
    HALF_THOUSAND: 500,
    THOUSAND: 1000,
  };

  constructor(key: string, price: number, discount: number) {
    this.key = key;
    this.quantity = ProductPrice.quantities[key];
    this.label = ProductPrice.labels[key];
    this.price = price;
    this.formattedPrice = NumberUtils.getFormattedPriceOrDiscount(price);
    this.unitPrice = this.price / this.quantity;
    this.formattedUnitPrice = NumberUtils.getFormattedPriceOrDiscount(
      this.unitPrice
    );
    this.unitPriceWithDiscount = this.unitPrice * (1 - discount / 100);
    this.formattedUnitPriceWithDiscount =
      NumberUtils.getFormattedPriceOrDiscount(this.unitPriceWithDiscount);
  }

  key: string = "";
  label: string = "";
  quantity: number = 0;
  price: number = 0;
  formattedPrice: string = "";
  unitPrice: number = 0;
  formattedUnitPrice: string = "";
  unitPriceWithDiscount: number = 0;
  formattedUnitPriceWithDiscount: string = "";
}
