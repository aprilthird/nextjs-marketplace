import News from "@/lib/models/news";
import ApiUtils from "@/lib/utils/api-utils";

export default class NewsService {
  static url = `${ApiUtils.awsBaseUrl}/news`;

  static async getAll(): Promise<News[]> {
    var result: News[] = [];
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      if (response.ok) {
        result = data.map((e: any) => News.fromJson(e));
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
}
