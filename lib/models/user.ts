import ApiUtils from "@/lib/utils/api-utils";
import Product from "./product";

export default class User {
  id: number = 0;
  userLogin: string = "";
  firstName: string = "";
  lastName: string = "";
  document: string = "";
  documentType: string = "";
  phoneNumber: string = "";
  quryId: string = "";
  views: number = 0;
  description: string = "";
  address: string = "";
  latitude: number = 0.0;
  longitude: number = 0.0;
  status: string = "";
  image: string = "";
  profileImage: string = "";
  displayName: string = "";
  catalogStatus: string = "";

  confirmationTime: number = 0;
  deliveryTime: number = 0;
  hasDeliveryCost: boolean = false;
  hasDevolutionCost: boolean = false;
  disclaimer: string = "";
  hasDeliveryQury: boolean = false;

  hasDelivery: boolean = false;
  hasPickUpInStore: boolean = false;

  categoryId: number = 0;
  subCategoryId: number = 0;

  fullUrlProfileImage: string = "";

  relatedProducts: Product[] = [];

  website: string = "";
  instagram: string = "";
  facebook: string = "";
  whatsapp: string = "";
  tiktok: string = "";

  affiliateId: number = 0;

  static fromJson(jsonObject: any): User {
    var obj = new User();
    obj.id = jsonObject["id"];
    obj.userLogin = jsonObject["userLogin"];
    obj.firstName = jsonObject["nombres"];
    obj.lastName = jsonObject["apellidos"];
    obj.userLogin = jsonObject["userLogin"];
    obj.document = jsonObject["numeroDocumento"];
    obj.documentType = jsonObject["tipoDocumento"];
    obj.phoneNumber = jsonObject["numeroMovil"];
    obj.quryId = jsonObject["quryId"];
    obj.views = jsonObject["visitas"];
    obj.description = jsonObject["descripcion"];
    obj.address = jsonObject["direccion"];
    obj.latitude = jsonObject["latitud"];
    obj.longitude = jsonObject["longitud"];
    obj.status = jsonObject["estado"];
    obj.image = jsonObject["imagen"];
    obj.profileImage = jsonObject["profileImage"];
    obj.displayName = jsonObject["displayName"];
    obj.catalogStatus = jsonObject["estadoCatalogo"];

    obj.confirmationTime = jsonObject["tiempoConfirmacion"] ?? 5;
    obj.deliveryTime = jsonObject["tiempoEntrega"];
    obj.hasDeliveryCost = jsonObject["costoEnvio"] === "1";
    obj.hasDevolutionCost = jsonObject["costoDevolucion"] === "1";
    obj.disclaimer = jsonObject["disclaimer"];

    obj.hasDelivery = jsonObject["envio"] === "1";
    obj.hasPickUpInStore = jsonObject["recojo"] === "1";
    obj.hasDeliveryQury = jsonObject["deliveryQury"] === 1;

    if (jsonObject["categoria"]) {
      obj.categoryId = parseInt(jsonObject["categoria"]);
    }
    if (jsonObject["subcategoria"]) {
      obj.subCategoryId = parseInt(jsonObject["subcategoria"]);
    }

    if (obj.image) {
      obj.fullUrlProfileImage = `${ApiUtils.quryStorage}/${obj.image}`;
    }
    if (obj.profileImage) {
      obj.fullUrlProfileImage = `${ApiUtils.quryStorage}/${obj.profileImage}`;
    }

    if (jsonObject["website"]) {
      obj.website = jsonObject["website"];
    }
    if (jsonObject["instagram"]) {
      obj.website = jsonObject["instagram"];
    }
    if (jsonObject["facebook"]) {
      obj.website = jsonObject["facebook"];
    }
    if (jsonObject["whatsapp"]) {
      obj.website = jsonObject["whatsapp"];
    }
    if (jsonObject["tiktok"]) {
      obj.website = jsonObject["tiktok"];
    }

    if (jsonObject["afiliadoId"]) {
      obj.affiliateId = jsonObject["afiliadoId"];
    }

    if (jsonObject["productos"]) {
      obj.relatedProducts = jsonObject["productos"].map((e: any) =>
        Product.fromJson(e)
      );
    }

    return obj;
  }
}
