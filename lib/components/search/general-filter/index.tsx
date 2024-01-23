"use client";

import { useEffect, useState } from "react";
import DefaultSwitch from "@/lib/components/ui/switch";
import DefaultDropdown, {
  DropdownItem,
} from "@/lib/components/ui/dropdown/generic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const conditionOptions: DropdownItem<string>[] = [
  { label: "Todos", id: "0" },
  { label: "Nuevo", id: "5" },
  { label: "Como nuevo", id: "4" },
  { label: "Buen estado", id: "3" },
  { label: "Uso moderado", id: "2" },
  { label: "Bastante usado", id: "1" },
];

const GeneralFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isCompany, setIsCompany] = useState(false);
  const [hasDelivery, setHasDelivery] = useState(false);
  const [hasPickupInStore, setHasPickupInStore] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasDeliveryCost, setHasDeliveryCost] = useState(false);
  const [hasReturnCost, setHasReturnCost] = useState(false);
  // const [productCondition, setProductCondition] = useState(conditionOptions[0]);

  const [urlPath, setUrlPath] = useState("");
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (pathname.includes("buscar")) {
      setUrlPath(`${pathname}`);
    }
  }, [pathname]);

  useEffect(() => {
    if (searchParams.has("business")) {
      setIsCompany(true);
    }
    if (searchParams.has("verified")) {
      setIsVerified(true);
    }
    if (searchParams.has("delivery")) {
      setHasDelivery(true);
    }
    if (searchParams.has("pickup")) {
      setHasPickupInStore(true);
    }
    if (searchParams.has("deliverycost")) {
      setHasDeliveryCost(true);
    }
    if (searchParams.has("returncost")) {
      setHasReturnCost(true);
    }
    // if (searchParams.has("condition")) {
    //   const option =
    //     conditionOptions.find((x) => x.id === searchParams.get("condition")) ??
    //     conditionOptions[0];
    //   setProductCondition(option);
    // }
  }, [searchParams]);

  useEffect(() => {
    if (isCompany) {
      params.set("business", "true");
    } else {
      params.delete("business");
    }
    if (isVerified) {
      params.set("verified", "true");
    } else {
      params.delete("verified");
    }
    if (hasDelivery) {
      params.set("delivery", "true");
    } else {
      params.delete("delivery");
    }
    if (hasPickupInStore) {
      params.set("pickup", "true");
    } else {
      params.delete("pickup");
    }
    if (hasDeliveryCost) {
      params.set("deliverycost", "true");
    } else {
      params.delete("deliverycost");
    }
    if (hasReturnCost) {
      params.set("returncost", "true");
    } else {
      params.delete("returncost");
    }
    params.delete("page");
    // if (productCondition.id !== "0") {
    //   params.set("condition", productCondition.id);
    // } else {
    //   params.delete("condition");
    // }
    const concatParams = params.toString();
    const newUrl = `${urlPath}${concatParams ? "?" + concatParams : ""}`;
    router.push(newUrl);
  }, [
    isCompany,
    hasDelivery,
    hasPickupInStore,
    isVerified,
    hasDeliveryCost,
    hasReturnCost,
    // productCondition,
  ]);

  return (
    <div className="rounded shadow-md p-2 bg-white">
      <h3 className="font-bold">Filtrar por:</h3>
      {/* <div>Categoría</div>
          <select>
            <option>Todas</option>
          </select>
          <div>Subcategoría</div>
          <select>
            <option>Todas</option>
          </select> */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <div>Es verificado</div>
          <div>
            <DefaultSwitch isChecked={isVerified} onChange={setIsVerified} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Es empresa</div>
          <div>
            <DefaultSwitch isChecked={isCompany} onChange={setIsCompany} />
          </div>
        </div>
        {/* <div className="flex justify-between items-center">
          <div>Tiene delivery</div>
          <div>
            <DefaultSwitch isChecked={hasDelivery} onChange={setHasDelivery} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Tiene recojo en tienda</div>
          <div>
            <DefaultSwitch
              isChecked={hasPickupInStore}
              onChange={setHasPickupInStore}
            />
          </div>
        </div> */}
        <div className="flex justify-between items-center">
          <div>Incluye costo de envío</div>
          <div>
            <DefaultSwitch
              isChecked={hasDeliveryCost}
              onChange={setHasDeliveryCost}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Incluye costo de devolución</div>
          <div>
            <DefaultSwitch
              isChecked={hasReturnCost}
              onChange={setHasReturnCost}
            />
          </div>
        </div>
        {/* <div className="flex flex-col">
          <div>Condición del producto</div>
          <DefaultDropdown
            buttonClassName="border"
            items={conditionOptions}
            value={productCondition}
            onChange={setProductCondition}
          />
        </div> */}
      </div>
    </div>
  );
};

export default GeneralFilter;
