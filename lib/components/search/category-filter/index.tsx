"use client";
import classNames from "classnames";
import TreeMenu from "@/lib/components/ui/tree-menu/tree-menu";
import Category from "@/lib/models/category";
import { useSearchParams } from "next/navigation";

type Props = {
  className?: string;
  items: Category[];
};

const CategoryFilter = ({ className, items }: Props) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const subCategoryParam = searchParams.get("subcategory") ?? "";

  return (
    <aside className={classNames("", className)}>
      <div className="max-h-full flex-grow overflow-hidden bg-white">
        <TreeMenu
          items={items}
          parentSelected={categoryParam}
          selected={subCategoryParam}
        />
      </div>
    </aside>
  );
};

export default CategoryFilter;
