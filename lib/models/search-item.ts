export default class SearchItem<T> {
  item: T;
  textMatch: number = 0;
  highlights: any[] = [];

  constructor(item: T) {
    this.item = item;
  }

  static fromJson<T>(
    jsonObject: any,
    transform: (source: any) => T
  ): SearchItem<T> {
    var obj = new SearchItem<T>(transform(jsonObject["document"]));
    obj.textMatch = jsonObject["found"];
    obj.highlights = jsonObject["highlights"];
    return obj;
  }
}
