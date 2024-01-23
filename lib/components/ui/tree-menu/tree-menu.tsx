"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import cn from "classnames";
import { ExpandLessIcon } from "@/lib/components/icons/expand-less-icon";
import { ExpandMoreIcon } from "@/lib/components/icons/expand-more-icon";
import * as CategoryIcons from "@/lib/components/icons/category";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TreeMenuItemProps {
  item: any;
  className?: string;
  depth?: number;
  isActive: boolean;
  selected?: string;
}

const TreeMenuItem: React.FC<TreeMenuItemProps> = ({
  className,
  item,
  selected,
  isActive,
  depth = 0,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id, name, children: items, image, icon, parentId } = item;
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [urlPath, setUrlPath] = useState("");

  useEffect(() => {
    if (pathname.includes("buscar")) {
      setUrlPath(`${pathname}`);
    }
  }, [pathname]);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const toggleCollapse = () => {
    setOpen((prevValue) => !prevValue);
  };

  const onClick = () => {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", parentId);
      params.set("subcategory", id);
      params.delete("page");
      const concatParams = params.toString();
      const newUrl = `${urlPath}${concatParams ? "?" + concatParams : ""}`;
      router.push(newUrl);
    }
  };

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="h-3 w-3" />
    ) : (
      <ExpandMoreIcon className="h-3 w-3" />
    );
  }

  return (
    <React.Fragment>
      <motion.li
        initial={false}
        animate={{ backgroundColor: "#ffffff" }}
        onClick={onClick}
        className="p-2"
      >
        <button
          className={cn(
            "flex justify-between items-center hover:text-primary w-full items-center ml-0 py-1 font-semibold text-body-dark outline-none transition-all ease-in-expo focus:text-primary focus:outline-none focus:ring-0",
            isOpen ? "text-primary" : "text-body-dark",
            className ? className : "text-sm"
          )}
        >
          <div className="flex space-x-2 justify-between items-center">
            {image && parentId !== 0 && (
              <span className="flex items-center justify-center">
                <Image src={image} alt={name} width={50} height={50} />
              </span>
            )}
            <span className="text-start">{name}</span>
          </div>

          <span className="ml-auto">{expandIcon}</span>
        </button>
      </motion.li>
      {/* initial={false} */}
      <AnimatePresence>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="text-xs ml-4"
            >
              {items.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <TreeMenuItem
                    key={`${currentItem.name}`}
                    item={currentItem}
                    depth={childDepth}
                    isActive={selected == currentItem.id}
                    className={cn("text-sm text-body")}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </React.Fragment>
  );
};
interface TreeMenuProps {
  items: any[];
  className?: string;
  parentSelected?: string;
  selected?: string;
}

function TreeMenu({
  items,
  className,
  parentSelected,
  selected,
}: TreeMenuProps) {
  return (
    <ul className={cn("text-xs", className)}>
      {items?.map((item: any) => (
        <TreeMenuItem
          key={`${item.name}`}
          item={item}
          selected={selected}
          isActive={parentSelected == item.id}
        />
      ))}
    </ul>
  );
}

export default TreeMenu;
