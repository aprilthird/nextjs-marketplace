import Product from "@/lib/models/product";
import ApiUtils from "@/lib/utils/api-utils";
import SearchList from "../models/search-list";
import User from "../models/user";
import UrlUtils from "../utils/url-utils";

export default class SearchService {
  static productsUrl = `typesense-api/collections/productos/documents/search`;
  static storesUrl = `typesense-api/collections/tiendas/documents/search`;

  static async getAllProducts(
    page: number,
    recordsPerPage: number,
    query: string,
    category: string | null = null,
    subCategory: string | null = null,
    isBusiness: boolean = false,
    isVerified: boolean = false,
    hasDelivery: boolean = false,
    hasPickupInStore: boolean = false,
    hasDeliveryCost: boolean = false,
    hasReturnCost: boolean = false,
    productCondition: string | null = null,
    sortBy: string | null = null,
    priceM: string | null = null
  ): Promise<SearchList<Product>> {
    var result = new SearchList<Product>();
    try {
      const filters = ["activo:=1", "estado:=1", "estadoCatalogo:=1"];

      if (category) {
        filters.push("categoria:=" + category);
      }
      if (subCategory) {
        filters.push("subcategoria:=" + subCategory);
      }
      if (isBusiness) {
        filters.push("esEmpresa:=1");
      }
      if (isVerified) {
        filters.push("verificado:=1");
      }
      if (hasDelivery) {
        filters.push("envio:=1");
      }
      if (hasPickupInStore) {
        filters.push("recojo:=1");
      }
      if (hasDeliveryCost) {
        filters.push("costoEnvio:=1");
      }
      if (hasReturnCost) {
        filters.push("costoDevolucion:=1");
      }
      if (productCondition) {
        filters.push("nuevo:=" + productCondition);
      }
      if (priceM) {
        if (priceM == "0") {
        } else if (priceM == "1") {
          filters.push("precio:>0");
        } else {
          filters.push(`precio${priceM}:>0`);
        }
      }

      const getOrderKeyFilter = (k: string | null) => {
        switch (k) {
          case "1":
            return "sumaCantidad:desc";
          case "2":
            return "sumaVenta:desc";
          case "3":
            return "precio:asc";
          case "4":
            return "precio:desc";
          case "5":
            return "";
          case "6":
            return "fechaCreacionUnixTimestamp:asc";
          default:
            return "";
        }
      };

      var params: any = {
        page: page,
        per_page: recordsPerPage,
        q: encodeURIComponent(query),
        query_by: "nombre,descripcion,displayName,quryId",
        filter_by: encodeURIComponent(filters.join("&&")),
        sort_by: getOrderKeyFilter(sortBy),
      };

      const urlQueryParms = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + params[k])
        .join("&");
      const localUrl = UrlUtils.getURL(`/${this.productsUrl}?${urlQueryParms}`);
      const response = await fetch(localUrl, {
        ...ApiUtils.defaultTypeSenseHeaders(),
      });
      const data = await response.json();
      if (response.ok) {
        result = SearchList.fromJson<Product>(data, (source: any) =>
          Product.fromJson(source)
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }

  static async getAllStores(
    page: number,
    recordsPerPage: number,
    query: string,
    category: string | null = null,
    subCategory: string | null = null,
    isBusiness: boolean = false,
    isVerified: boolean = false,
    hasDelivery: boolean = false,
    hasPickupInStore: boolean = false,
    hasDeliveryCost: boolean = false,
    hasReturnCost: boolean = false,
    sortBy: string | null = null
  ): Promise<SearchList<User>> {
    var result = new SearchList<User>();
    try {
      const filters = ["estado:=1", "estadoCatalogo:=1"];

      if (category) {
        filters.push("categoria:=" + category);
      }
      if (subCategory) {
        filters.push("subcategoria:=" + subCategory);
      }
      if (isBusiness) {
        filters.push("esEmpresa:=1");
      }
      if (isVerified) {
        filters.push("verificado:=1");
      }
      if (hasDelivery) {
        filters.push("envio:=1");
      }
      if (hasPickupInStore) {
        filters.push("recojo:=1");
      }
      if (hasDeliveryCost) {
        filters.push("costoEnvio:=1");
      }
      if (hasReturnCost) {
        filters.push("costoDevolucion:=1");
      }

      const getOrderKeyFilter = (k: string | null) => {
        switch (k) {
          case "1":
            return "sumaCantidad:desc";
          case "2":
            return "sumaVenta:desc";
          case "3":
            return "precio:asc";
          case "4":
            return "precio:desc";
          case "5":
            return "fechaCreacionUnixTimestamp:desc";
          case "6":
            return "fechaCreacionUnixTimestamp:asc";
          default:
            return "";
        }
      };

      const params: any = {
        page: page,
        per_page: recordsPerPage,
        q: encodeURIComponent(query),
        query_by: "displayName,quryId",
        filter_by: encodeURIComponent(filters.join("&&")),
        sort_by: getOrderKeyFilter(sortBy),
      };

      const urlQueryParms = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + params[k])
        .join("&");
      const localUrl = UrlUtils.getURL(`/${this.storesUrl}?${urlQueryParms}`);

      const response = await fetch(
        localUrl,
        ApiUtils.defaultTypeSenseHeaders()
      );
      const data = await response.json();
      if (response.ok) {
        result = SearchList.fromJson<User>(data, (source: any) =>
          User.fromJson(source)
        );
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
}
