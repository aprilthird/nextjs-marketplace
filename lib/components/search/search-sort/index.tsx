"use client";

import DefaultDropdown, {
  DropdownItem,
} from "@/lib/components/ui/dropdown/generic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const sortTypeOptions: DropdownItem<string>[] = [
  { label: "Publicación: nuevos", id: "5" },
  // { label: "Publicación: antiguos", id: "6" },
  { label: "Ventas: unidades", id: "1" },
  { label: "Ventas: suma valor", id: "2" },
  // { label: "Precio: menor a mayor", id: "3" },
  // { label: "Precio: mayor a menor", id: "4" },
];

const SearchSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortType, setSortType] = useState(sortTypeOptions[0]);
  const [urlPath, setUrlPath] = useState("");

  useEffect(() => {
    if (pathname.includes("buscar")) {
      setUrlPath(`${pathname}`);
    }
  }, [pathname]);

  useEffect(() => {
    if (searchParams.has("sort")) {
      const option =
        sortTypeOptions.find((x) => x.id === searchParams.get("sort")) ??
        sortTypeOptions[0];
      setSortType(option);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortType) {
      params.set("sort", sortType.id);
    } else {
      params.delete("sort");
    }
    params.delete("page");
    const concatParams = params.toString();
    const newUrl = `${urlPath}${concatParams ? "?" + concatParams : ""}`;
    router.push(newUrl);
  }, [sortType]);

  return (
    <>
      {urlPath.includes("productos") && (
        <div className="rounded shadow-md p-2 bg-white mb-4">
          <h3 className="font-bold">Ordenar por: </h3>
          <DefaultDropdown
            buttonClassName="border"
            optionsClassName="w-full"
            items={sortTypeOptions}
            value={sortType}
            onChange={setSortType}
          />
        </div>
      )}
    </>
  );
};

export default SearchSort;
