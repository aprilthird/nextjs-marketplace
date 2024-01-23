export default class UrlUtils {
  static getURL(path: string) {
    const IS_SERVER = typeof window === "undefined";
    const baseURL = IS_SERVER
      ? process.env.NEXT_PUBLIC_SITE_URL
      : window.location.origin;
    return new URL(path, baseURL).toString();
  }
}
