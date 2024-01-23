import Product from "@/lib/models/product";
import ApiUtils from "@/lib/utils/api-utils";

export default class ProductService {
  static searchUrl = `${ApiUtils.awsBaseUrl}/busqueda`;

  static async getByQuryId(quryId: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.searchUrl}/${quryId}`, {
        next: { revalidate: 0 },
      });
      const data = await response.json();
      if (data[0]?.id) {
        const result = data?.map((e: any) => Product.fromJson(e));
        return result.length > 0 ? result[0] : null;
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return null;
  }
}
