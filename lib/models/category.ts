export default class Category {
  id: number = 0;
  value: number = 0;
  slug: string = "";
  name: string = "";
  label: string = "";
  parentId: number = 0;
  order: number = 0;
  image: string = "";
  icon: string = "";
  status: string = "";
  children: Category[] = [];

  static fromJson(jsonObject: any): Category {
    var obj = new Category();
    obj.id = jsonObject["id"];
    obj.value = jsonObject["value"];
    obj.slug = jsonObject["slug"];
    obj.name = jsonObject["name"];
    obj.label = jsonObject["label"];
    obj.parentId = jsonObject["parent_id"];
    obj.order = jsonObject["orden"];
    obj.image = jsonObject["imagen"];
    obj.status = jsonObject["estado"];
    return obj;
  }
}
