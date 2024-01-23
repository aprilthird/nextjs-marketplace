import SearchItem from "./search-item";

export default class SearchList<T> {
  total: number = 0;
  results: SearchItem<T>[] = [];

  static fromJson<T>(
    jsonObject: any,
    transform: (source: any) => T
  ): SearchList<T> {
    var obj = new SearchList<T>();
    obj.total = jsonObject["found"];
    if (jsonObject["hits"] != null) {
      obj.results = jsonObject["hits"].map((e: any) =>
        SearchItem.fromJson<T>(e, transform)
      );
    }
    return obj;
  }
}
