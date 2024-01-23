export default class TextUtils {
  static getSignificantCharacters(text: string): string {
    try {
      var chars = text.replace(/[^A-Z]+/g, "");
      if (chars == "") {
        chars = text.length > 1 ? text.substring(0, 2) : text.substring(0, 2);
      } else {
        chars = chars.length > 1 ? chars.substring(0, 2) : chars;
      }
      return chars;
    } catch (e) {
      console.log(e);
    }
    return "";
  }
}
