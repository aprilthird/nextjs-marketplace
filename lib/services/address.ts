import ApiUtils from "../utils/api-utils";
import { Session } from "next-auth";
import Address from "../models/address";
import { getSession } from "next-auth/react";
import UrlUtils from "../utils/url-utils";

export default class AddressService {
  static addressPath = "direccion";
  static url = `aws-api/direccion`;

  static getAll = async (session: Session): Promise<Address[]> => {
    var result: Address[] = [];
    try {
      const response = await fetch(
        UrlUtils.getURL(`${this.url}?usuario_id=${session.user.id}`),
        ApiUtils.defaultRequest(session.token)
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        result = data.map((e: any) => Address.fromJson(e));
        result = result.filter((x) => x.status === "1");
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  };

  static create = async (session: Session, address: Address) => {
    try {
      // const session = await getServerSession(authOptions);
      address.userId = parseInt(session.user.id);
      //Agrego credentials Omit porque Cookies generaba error de Encabezado largo
      const response = await fetch(UrlUtils.getURL(this.url), {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "POST",
          JSON.stringify(address.toJson())
        ),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  };

  static update = async (session: Session, address: Address) => {
    try {
      address.userId = parseInt(session.user.id);
      //Agrego credentials Omit porque Cookies generaba error de Encabezado largo
      const response = await fetch(UrlUtils.getURL(this.url), {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "PATCH",
          JSON.stringify(address.toJson())
        ),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  };

  static delete = async (session: Session, address: Address) => {
    try {
      address.userId = parseInt(session.user.id);
      const requestData: any = {
        id: address.id,
        estado: "0",
      };
      //Agrego credentials Omit porque Cookies generaba error de Encabezado largo
      const response = await fetch(UrlUtils.getURL(this.url), {
        credentials: "omit",
        cache: "no-store",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "PATCH",
          JSON.stringify(requestData)
        ),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  };
}
