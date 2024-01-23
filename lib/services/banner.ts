import Banner from "@/lib/models/banner";
import ApiUtils from "@/lib/utils/api-utils";

export default class BannerService {
  static url = `${ApiUtils.awsBaseUrl}/carrusel`;

  static async getAll(): Promise<Banner[]> {
    var result: Banner[] = [];
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      if (response.ok) {
        result = data.map((e: any) => Banner.fromJson(e));
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
}
