import { Session } from "next-auth";
import PaymentMethod from "../models/payment-method";
import ApiUtils from "../utils/api-utils";
import { getSession } from "next-auth/react";
import UrlUtils from "../utils/url-utils";

export default class PaymentMethodService {
  static paymentMethodPath = "payment";
  static url = "aws-api/payment";

  static getAll = async (session: Session): Promise<PaymentMethod[]> => {
    var result: PaymentMethod[] = [];
    try {
      const response = await fetch(
        UrlUtils.getURL(`${this.url}?usuario_id=${session.user.id}`),
        ApiUtils.defaultRequest(session.token)
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        result = data.map((e: any) => PaymentMethod.fromJson(e));
        result = result.filter((x) => x.status === "1");
      }
    } catch (e: any) {
      console.log(e.stack);
    }
    return result;
  };

  static create = async (session: Session, paymentMethod: PaymentMethod) => {
    try {
      paymentMethod.userId = parseInt(session!.user.id);
      const response = await fetch(UrlUtils.getURL(this.url), {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "POST",
          JSON.stringify(paymentMethod)
        ),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  };

  static delete = async (session: Session, paymentMethod: PaymentMethod) => {
    try {
      const requestData: any = {
        id: paymentMethod.id,
      };
      const response = await fetch(UrlUtils.getURL(this.url), {
        credentials: "omit",
        cache: "no-store",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "DELETE",
          JSON.stringify(requestData)
        ),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log(data);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  };
}
