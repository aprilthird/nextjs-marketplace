export default class PaymentMethod {
  id: number = 0;
  name: string = "";
  surname: string = "";
  type: string = "";
  entity: string = "";
  brand: string = "";
  currency: string = "";
  accountNumber: string = "";
  cci: string = "";
  documentType: string = "";
  document: string = "";
  status: string = "";
  userId: number = 0;

  static fromJson(jsonObject: any): PaymentMethod {
    var obj = new PaymentMethod();
    obj.id = jsonObject["id"];
    obj.name = jsonObject["nombre"];
    obj.surname = jsonObject["apellido"];
    obj.type = jsonObject["tipo"];
    obj.entity = jsonObject["entidad"];
    obj.brand = jsonObject["marca"];
    obj.currency = jsonObject["moneda"];
    obj.accountNumber = jsonObject["numero"];
    obj.cci = jsonObject["numeroCCI"];
    obj.documentType = jsonObject["tipoDocumento"];
    obj.document = jsonObject["numeroDocumento"];
    obj.status = jsonObject["estado"];
    obj.userId = jsonObject["usuario_id"];
    return obj;
  }

  toJson(): any {
    var jsonObject: any = {};
    jsonObject["id"] = this.id;
    jsonObject["nombre"] = this.name;
    jsonObject["apellido"] = this.surname;
    jsonObject["tipo"] = this.type;
    jsonObject["entidad"] = this.entity;
    jsonObject["marca"] = this.brand;
    jsonObject["moneda"] = this.currency;
    jsonObject["numero"] = this.accountNumber;
    jsonObject["numeroCCI"] = this.cci;
    jsonObject["tipoDocumento"] = this.documentType;
    jsonObject["usuario_id"] = this.userId;
    return jsonObject;
  }
}
