"use client";

import { StoreProps, useStore } from "@/lib/storeContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";

const StoreInitializer = ({ productBuy, modalFlagUrl }: StoreProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString()).toString();

  useEffect(() => {
    if (pathname == "/" || pathname.includes("/buscar")) {
      //   var fullpath = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}${params}`;
      var fullpath = `${pathname}${params ? "?" + params : ""}`;
      useStore.setState({
        modalFlagUrl: fullpath,
      });
    }
  }, [pathname, params]);
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ productBuy, modalFlagUrl });
    initialized.current = true;
  }
  return null;
};

export default StoreInitializer;
