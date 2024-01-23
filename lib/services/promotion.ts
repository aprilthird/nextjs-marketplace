import PromotionList from "@/lib/models/promotion-list";
import ApiUtils from "@/lib/utils/api-utils";

export default class PromotionService {
  static url = `${ApiUtils.awsBaseUrl}/promociones`;

  static async getAllProducts(): Promise<PromotionList[]> {
    var result: PromotionList[] = [];
    try {
      const localUrl = `${this.url}?tipo=productos`;
      const response = await fetch(localUrl, { next: { revalidate: 3600 } });
      const data = await response.json();
      if (response.ok) {
        result = data.map((e: any) => PromotionList.fromJson(e, true));
        result = result.filter(
          (x) => x.user.catalogStatus === "1" && x.promotions.length > 0
        );
        result.sort((a, b) => a.order - b.order);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }

  static async getAllStores(): Promise<PromotionList[]> {
    var result: PromotionList[] = [];
    try {
      const localUrl = `${this.url}?tipo=tienda`;
      const response = await fetch(localUrl, { next: { revalidate: 3600 } });
      const data = await response.json();
      if (response.ok) {
        result = data.map((x: any) => PromotionList.fromJson(x, false));
        result = result.filter((x) => x.user.catalogStatus === "1");
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
    return result;
  }
}
