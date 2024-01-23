import ApiUtils from "@/lib/utils/api-utils";
import Category from "@/lib/models/category";

export default class CategoryService {
  static url = `${ApiUtils.awsBaseUrl}/categories`;

  static async getAll(): Promise<Category[]> {
    var result: Category[] = [];
    try {
      const response = await fetch(this.url, { next: { revalidate: 3600 } });
      const data = await response.json();
      if (response.ok) {
        result = data.map((x: any) => Category.fromJson(x));
        result = result
          .filter((x) => x.order !== 0)
          .sort((x, y) => (x.order > y.order ? 1 : -1));
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
}
