import { Session } from "next-auth";
import ApiUtils from "../utils/api-utils";

export default class PurchaseService {
  static updateTransactionUrl = `${ApiUtils.awsBaseUrl}/updatetransacction`;
  static url = "aws-api/updatetransaction";

  static async updateTransaction(session: Session, body: any) {
    try {
      //Agrego credentials Omit porque Cookies generaba error de Encabezado largo
      const localUrl = `${window.location.origin}/${this.url}`;
      const response = await fetch(localUrl, {
        credentials: "omit",
        ...ApiUtils.defaultJsonRequest(
          session.token,
          "POST",
          JSON.stringify(body) //JSON.stringify(body.toJson())
        ),
      });
      const data = await response.json();
      if (data[0]) {
        return data[0];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
