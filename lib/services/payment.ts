import ApiUtils from "../utils/api-utils";
import { Session } from "next-auth";

export default class PaymentService {
  static url = "aws-api/signed";
  static alturl = "api/payment";
  static paymentGatewayUrl =
    "payment-gateway-api/vads-payment/entry.silentInit.a";

  static sign = async (session: Session): Promise<any> => {
    try {
      const localUrl = `${window.location.origin}/${this.url}`;
      var signData: any = {
        id: session.user.id,
        nombres: session.user.firstName,
        apellidos: session.user.lastName,
        numeroDocumento: session.user.document,
        numeroMovil: session.user.phoneNumber,
        correo: session.user.userLogin,
      };
      const response = await fetch(
        localUrl,
        ApiUtils.defaultJsonRequest(
          session.token,
          "POST",
          JSON.stringify(signData)
        )
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  static altsign = async (
    session: Session,
    action_mode: string
  ): Promise<any> => {
    try {
      const localUrl = `${window.location.origin}/${this.alturl}`;
      var signData: any = {
        id: session.user.id,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        document: session.user.document ?? "77777777",
        phoneNumber: session.user.phoneNumber,
        email: session.user.userLogin,
        action_mode: action_mode,
      };
      const response = await fetch(
        localUrl,
        ApiUtils.defaultJsonRequest(
          session.token,
          "POST",
          JSON.stringify(signData)
        )
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return data.result;
      }
    } catch (e) {
      console.error(e);
    }
  };

  static initPaymentGateway = async (
    session: Session,
    signResponse: any
  ): Promise<any> => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append("signature", signResponse.res?.signature);
      bodyFormData.append("vads_action_mode", signResponse.res?.action_mode);
      bodyFormData.append("vads_ctx_mode", "PRODUCTION");
      // bodyFormData.append("vads_ctx_mode", "TEST");
      bodyFormData.append("vads_currency", "604");
      bodyFormData.append(
        "vads_cust_cell_phone",
        session.user.phoneNumber ?? ""
      );
      bodyFormData.append("vads_cust_country", "PE");
      bodyFormData.append("vads_cust_email", session.user.userLogin ?? "");
      bodyFormData.append("vads_cust_first_name", session.user.firstName ?? "");
      bodyFormData.append("vads_cust_last_name", session.user.lastName ?? "");
      bodyFormData.append(
        "vads_cust_national_id",
        session.user.document ?? "77777777"
      );
      bodyFormData.append("vads_language", "ES");
      bodyFormData.append("vads_page_action", "REGISTER");
      bodyFormData.append("vads_site_id", "22496368");
      bodyFormData.append("vads_trans_date", signResponse.res?.currentDate);
      bodyFormData.append(
        "vads_url_check",
        ApiUtils.awsBaseUrl + "/returnPayres?val1=" + session.user.id
      );
      // bodyFormData.append("vads_url_check", "");
      bodyFormData.append("vads_version", "V2");

      const urlSearchParams = new URLSearchParams();
      for (const pair in bodyFormData) {
        urlSearchParams.append(pair[0], pair[1]);
      }
      const localUrl = `${window.location.origin}/${this.paymentGatewayUrl}`;
      const response = await fetch(localUrl, {
        method: "POST",
        body: bodyFormData,
        credentials: "omit",
        headers: {
          "Set-Cookie": "",
        },
      });
      const data = response.json();
      if (response.ok) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };
}
