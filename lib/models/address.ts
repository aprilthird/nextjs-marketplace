export default class Address {
  id: number = 0;
  name: string = "";
  phoneNumber: string = "";
  street: string = "";
  department: string = "";
  province: string = "";
  district: string = "";
  reference: string = "";
  userId: number = 0;
  streetNumber: string = "";
  inside: string = "";
  addressType: string = "";
  latitude: string = "";
  longitude: string = "";
  status: string = "";

  static fromJson(jsonObject: any): Address {
    var obj = new Address();
    obj.id = jsonObject["id"];
    obj.name = jsonObject["nombre"];
    obj.phoneNumber = jsonObject["telefono"];
    obj.street = jsonObject["direccion"];
    obj.department = jsonObject["departamento"];
    obj.province = jsonObject["provincia"];
    obj.district = jsonObject["distrito"];
    obj.reference = jsonObject["referencia"];
    obj.userId = jsonObject["usuario_id"];
    obj.streetNumber = jsonObject["numero"];
    obj.inside = jsonObject["interior"];
    obj.addressType = jsonObject["tipoEntrega"];
    obj.latitude = jsonObject["latitud"];
    obj.longitude = jsonObject["longitud"];
    obj.status = jsonObject["estado"];
    return obj;
  }

  toJson(): any {
    var jsonObject: any = {};
    jsonObject["id"] = this.id;
    jsonObject["nombre"] = this.name;
    jsonObject["telefono"] = this.phoneNumber;
    jsonObject["direccion"] = this.street;
    jsonObject["departamento"] = this.department;
    jsonObject["provincia"] = this.province;
    jsonObject["distrito"] = this.district;
    jsonObject["referencia"] = this.reference;
    jsonObject["usuario_id"] = this.userId;
    jsonObject["numero"] = this.streetNumber;
    jsonObject["interior"] = this.inside;
    jsonObject["tipoEntrega"] = this.addressType;
    jsonObject["latitud"] = this.latitude;
    jsonObject["longitud"] = this.longitude;
    return jsonObject;
  }
}
