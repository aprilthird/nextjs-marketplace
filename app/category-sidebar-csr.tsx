"use client";
import CategoryCard from "@/lib/components/cards/category";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import Slider from "@/lib/components/ui/slider/index";
import TreeMenu from "@/lib/components/ui/tree-menu/tree-menu";
import Category from "@/lib/models/category";
import CategoryService from "@/lib/services/category";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
  items: Category[];
};

export default function CategorySidebarCsr({ className, items }: Props) {
  return (
    <aside className={classNames("sticky", className)}>
      <div className="max-h-full flex-grow overflow-hidden bg-white">
        <TreeMenu items={items} />

        {/* {items
        ?.filter((x) => x.parentId == 0)
        .map((item, i) => {
          const subCategories = items
            .filter((x) => x.parentId == item.id)
            .sort((x, y) => (x.order > y.order ? 1 : -1));
          return (
            <div className="px-5">
            </div>
          );
        })} */}
      </div>
    </aside>
  );
}
