import ApiUtils from "@/lib/utils/api-utils";
import User from "./user";
import Category from "./category";
import NumberUtils from "@/lib/utils/number-utils";
import ProductPrice from "./product-price";

export default class Product {
  id: number = 0;
  name: string = "";
  shortName: string = "";
  description: string = "";
  image: string = "";
  image1: string = "";
  image2: string = "";
  image3: string = "";
  displayName: string = "";
  terms: string = "";
  currency: string = "";
  new: string = "";
  deliveryCost: string = "";
  quryId: string = "";
  currentStock: number = 0;
  stockStatus: string = "";
  createDate: string = "";
  active: string = "";
  status: string = "";
  catalogStatus: string = "";
  views: number = 0;
  order: number = 0;
  productId: string = "";
  userId: number = 0;
  typeId: number = 0;
  categoryId: number = 0;
  subCategoryId: number = 0;

  fullUrlImage: string = "";
  fullUrlImage1: string = "";
  fullUrlImage2: string = "";
  fullUrlImage3: string = "";

  hasManyPrices: boolean = false;
  prices: ProductPrice[] = [];

  defaultPrice: number = 0;
  formattedDefaultPrice: string = "";

  defaultQuantity: number = 0;

  rangeMinPrice: number = 0;
  rangeMaxPrice: number = 0;
  rangeFormattedMinPrice: string = "";
  rangeFormattedMaxPrice: string = "";
  rangeMinPriceWithDiscount: number = 0;
  rangeMaxPriceWithDiscount: number = 0;
  rangeFormattedMinPriceWithDiscount: string = "";
  rangeFormattedMaxPriceWithDiscount: string = "";

  hasDiscount: boolean = false;
  discount: string = "";
  parsedDiscount: number = 0;
  formattedDiscount: string = "";

  defaultPriceWithDiscount: number = 0;
  formattedDefaultPriceWithDiscount: string = "";

  storeName: string = "";

  user?: User;
  category?: Category;
  subCategory?: Category;

  colors: string[] = [];
  sizes: string[] = [];

  static conditions = [
    { label: "Nuevo", value: "5" },
    { label: "Como nuevo", value: "4" },
    { label: "Buen estado", value: "3" },
    { label: "Uso moderado", value: "2" },
    { label: "Bastante usado", value: "1" },
  ];

  conditionText: string = "";

  static fromJson(jsonObject: any): Product {
    var obj = new Product();
    obj.id = jsonObject["id"];
    obj.name = jsonObject["nombre"];
    obj.shortName = jsonObject["nombreCorto"];
    obj.description = jsonObject["descripcion"];
    obj.image = jsonObject["imagen"];
    obj.image1 = jsonObject["imagen1"];
    obj.image2 = jsonObject["imagen2"];
    obj.image3 = jsonObject["imagen3"];
    obj.terms = jsonObject["politicas"];
    obj.currency = jsonObject["moneda"];
    obj.displayName = jsonObject["displayName"];

    obj.new = jsonObject["nuevo"];
    obj.deliveryCost = jsonObject["gastosEnvio"];
    obj.quryId = jsonObject["quryId"];
    obj.productId = jsonObject["productoId"];
    obj.views = jsonObject["visitas"];
    obj.order = jsonObject["orden"];
    obj.currentStock = jsonObject["cantidadActual"];
    obj.stockStatus = jsonObject["cantidadEstado"];
    obj.createDate = jsonObject["fechaCreacion"];
    obj.active = jsonObject["activo"];
    obj.status = jsonObject["estado"];
    obj.catalogStatus = jsonObject["estadoCatalogo"];
    obj.userId = jsonObject["usuario_id"];
    obj.typeId = jsonObject["tipo_id"];
    obj.categoryId = jsonObject["categoria_id"];
    obj.subCategoryId = jsonObject["subcategoria"];

    if (obj.image) {
      obj.fullUrlImage1 = `${ApiUtils.quryStorage}/${obj.image}`;
    }
    if (obj.image1) {
      obj.fullUrlImage1 = `${ApiUtils.quryStorage}/${obj.image1}`;
    }
    if (obj.image2) {
      obj.fullUrlImage2 = `${ApiUtils.quryStorage}/${obj.image2}`;
    }
    if (obj.image3) {
      obj.fullUrlImage3 = `${ApiUtils.quryStorage}/${obj.image3}`;
    }

    obj.discount = jsonObject["descuento"];
    obj.discount = obj.discount || "0";
    obj.parsedDiscount = parseFloat(obj.discount);
    obj.formattedDiscount = NumberUtils.getFormattedPriceOrDiscount(
      obj.parsedDiscount
    );
    obj.hasDiscount = obj.parsedDiscount != 0;

    const price = jsonObject["precio"];
    const price3 = jsonObject["precio3"];
    const price10 = jsonObject["precio10"];
    const price12 = jsonObject["precio12"];
    const price50 = jsonObject["precio50"];
    const price100 = jsonObject["precio100"];
    const price500 = jsonObject["precio500"];
    const price1000 = jsonObject["precio1000"];

    if (price && price != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.UNIT,
          parseFloat(price),
          obj.parsedDiscount
        )
      );
    }
    if (price3 && price3 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.THREE,
          parseFloat(price3),
          obj.parsedDiscount
        )
      );
    }
    if (price10 && price10 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.TEN,
          parseFloat(price10),
          obj.parsedDiscount
        )
      );
    }
    if (price12 && price12 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.DOZEN,
          parseFloat(price12),
          obj.parsedDiscount
        )
      );
    }
    if (price50 && price50 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.HALF_HUNDRED,
          parseFloat(price50),
          obj.parsedDiscount
        )
      );
    }
    if (price100 && price100 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.HUNDRED,
          parseFloat(price100),
          obj.parsedDiscount
        )
      );
    }
    if (price500 && price500 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.HALF_THOUSAND,
          parseFloat(price500),
          obj.parsedDiscount
        )
      );
    }
    if (price1000 && price1000 != 0) {
      obj.prices.push(
        new ProductPrice(
          ProductPrice.THOUSAND,
          parseFloat(price1000),
          obj.parsedDiscount
        )
      );
    }

    obj.hasManyPrices = obj.prices.length > 1;
    const defaultProductPrice =
      price && price != 0
        ? obj.prices.filter((item) => item.key == ProductPrice.UNIT)[0]
        : obj.prices[0];
    if (defaultProductPrice) {
      obj.defaultPrice = defaultProductPrice.unitPrice;
      obj.formattedDefaultPrice = defaultProductPrice.formattedUnitPrice;
      obj.defaultPriceWithDiscount = defaultProductPrice.unitPriceWithDiscount;
      obj.formattedDefaultPriceWithDiscount =
        defaultProductPrice.formattedUnitPriceWithDiscount;
    }
    if (obj.hasManyPrices) {
      const minProductPrice = obj.prices.sort((x, y) =>
        x.unitPrice > y.unitPrice ? 1 : -1
      )[0];
      const maxProductPrice = obj.prices.sort((x, y) =>
        x.unitPrice > y.unitPrice ? -1 : 1
      )[0];
      if (minProductPrice) {
        obj.rangeMinPrice = minProductPrice.unitPrice;
        obj.rangeFormattedMinPrice = minProductPrice.formattedUnitPrice;
        obj.rangeMinPriceWithDiscount = minProductPrice.unitPriceWithDiscount;
        obj.rangeFormattedMinPriceWithDiscount =
          minProductPrice.formattedUnitPriceWithDiscount;
      }
      if (maxProductPrice) {
        obj.rangeMaxPrice = maxProductPrice.unitPrice;
        obj.rangeFormattedMaxPrice = maxProductPrice.formattedUnitPrice;
        obj.rangeMaxPriceWithDiscount = maxProductPrice.unitPriceWithDiscount;
        obj.rangeFormattedMaxPriceWithDiscount =
          maxProductPrice.formattedUnitPriceWithDiscount;
      }
    }

    obj.conditionText = Product.conditions.filter(
      (x) => x.value == obj.stockStatus
    )[0]?.label;

    if (jsonObject["metadata"] != null) {
      if (jsonObject["metadata"]["tallas"] != null) {
        obj.sizes = jsonObject["metadata"]["tallas"];
      }
      if (jsonObject["metadata"]["colores"] != null) {
        obj.colors = jsonObject["metadata"]["colores"];
      }
    }

    if (jsonObject["usuario"] != null) {
      obj.user = new User();
      obj.user.id = jsonObject["usuario"]["id"];
      obj.user.catalogStatus = jsonObject["usuario"]["estadoCatalogo"];
      obj.user.status = jsonObject["usuario"]["estado"];
    }

    if (jsonObject["categorias"] != null) {
      obj.category = new Category();
      obj.category.id = jsonObject["categorias"]["id"];
      obj.category.name = jsonObject["categorias"]["name"];
      obj.category.image = jsonObject["categorias"]["imagen"];
    }

    if (jsonObject["subcategorias"] != null) {
      obj.subCategory = new Category();
      obj.subCategory.id = jsonObject["subcategorias"]["id"];
      obj.subCategory.name = jsonObject["subcategorias"]["name"];
      obj.subCategory.image = jsonObject["subcategorias"]["imagen"];
    }

    return obj;
  }
}
