"use client";

import DefaultDropdown, {
  DropdownItem,
} from "@/lib/components/ui/dropdown/generic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const sortTypeOptions: DropdownItem<string>[] = [
  { label: "Todos", id: "0" },
  { label: "1 Unidad", id: "1" },
  { label: "3 Unidades", id: "3" },
  { label: "10 Unidades", id: "10" },
  { label: "12 Unidades", id: "12" },
  { label: "50 Unidades", id: "50" },
  { label: "100 Unidades", id: "100" },
  { label: "500 Unidades", id: "500" },
  { label: "1000 Unidades", id: "1000" },
];

const SearchMayor = () => {
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
    if (searchParams.has("pricem")) {
      const option =
        sortTypeOptions.find((x) => x.id === searchParams.get("pricem")) ??
        sortTypeOptions[0];
      setSortType(option);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortType) {
      params.set("pricem", sortType.id);
    } else {
      params.delete("pricem");
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
          <h3 className="font-bold">Mayorista: </h3>
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

export default SearchMayor;
