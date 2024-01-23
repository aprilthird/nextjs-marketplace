"use client";

import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DefaultDropdown, { DropdownItem } from "../../ui/dropdown/generic";

type Props = {
  className?: string;
};

const options: DropdownItem<string>[] = [
  { label: "Productos", id: "Productos" },
  { label: "Tiendas", id: "Tiendas" },
];

export default function SearchBar({ className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  // const [category, setCategory] = useState(searchParams.get("category") ?? "");
  // const [subCategory, setSubCategory] = useState(
  //   searchParams.get("subcategory") ?? ""
  // );
  const [option, setOption] = useState(options[0]);

  const goToSearch = useCallback(
    (query: String, forceRedirect = false) => {
      let path = option == options[0] ? "productos" : "tiendas";
      let url = `/buscar/${path}?q=${query}`;
      // if (category) {
      //   url += `&category=${category}`;
      // }
      // if (subCategory) {
      //   url += `&subcategory=${subCategory}`;
      // }
      if (forceRedirect || query) {
        router.push(url);
      }
    },
    [option]
    // [option, category, subCategory]
  );

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams.get("q")]);

  useEffect(() => {
    const timedOutId = setTimeout(() => goToSearch(query), 500);
    return () => clearTimeout(timedOutId);
  }, [query, goToSearch]);

  return (
    <form className={classNames("", className)}>
      <div className="flex rounded-md shadow-sm grow max-w-[600px] mx-auto">
        <span className="inline-flex items-center min-w-fit rounded-l-md bg-white text-sm text-gray-500">
          <DefaultDropdown
            value={option}
            onChange={(value) => {
              setOption(value);
              if (value.id == "Productos") {
                router.push(`/buscar/productos?q=${query}`);
              } else {
                router.push(`/buscar/tiendas?q=${query}`);
              }
            }}
            items={options}
            className="border"
          />
        </span>
        <div className="relative flex items-center grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="buscar"
            id="default-search"
            className="bg-gray-50 text-gray-900 py-2 pl-11 block w-full border border-gray-300 shadow-sm rounded-r-md text-base focus:z-10 outline-offset-0 outline-primary pr-4"
            placeholder={
              option == options[0] ? "Busca un producto" : "Busca una tienda"
            }
            required
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (pathname.includes("buscar") && event.target.value === "") {
                goToSearch("", true);
              }
            }}
            onTouchEndCapture={() => {
              goToSearch(query);
            }}
            onClick={() => {
              if (!pathname.includes("buscar")) {
                goToSearch(query, true);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </form>
  );
}
