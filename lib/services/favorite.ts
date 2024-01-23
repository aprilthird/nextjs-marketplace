import { Session } from "next-auth";
import ApiUtils from "../utils/api-utils";
import Favorite from "../models/favorite";

export default class FavoriteService {
  static url = `${ApiUtils.awsBaseUrl}/favorite`;

  static async getAll(session: Session): Promise<Favorite[]> {
    var result: Favorite[] = [];
    try {
      const localUrl = `${this.url}?usuario_id=` + session.user.id;
      const response = await fetch(localUrl, {
        ...ApiUtils.defaultRequest(session.token),
        credentials: "omit",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        result = data.map((e: any) => Favorite.fromJson(e));
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
}
