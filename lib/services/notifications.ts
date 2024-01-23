import ApiUtils from "../utils/api-utils";
import { Session } from "next-auth";
import Notification from "../models/notifications";
import UrlUtils from "../utils/url-utils";

export default class NotificationService {
  static notificationPath = "/aws-api/tray";

  static getAll = async (session: Session): Promise<Notification[]> => {
    var result: Notification[] = [];
    try {
      const localUrl = UrlUtils.getURL(this.notificationPath);
      // const localUrl = `${ApiUtils.awsBaseUrl}/${this.notificationPath}?usuario_id=${session.user.id}`;
      console.log(localUrl);
      const response = await fetch(localUrl, {
        ...ApiUtils.defaultRequest(session.token),
        credentials: "omit",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        result = data.map((e: any) => Notification.fromJson(e));
        result = result.filter((x) => x.status === "1");
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  };
}
