"use client";
import { Suspense } from "react";
import ShoppingCartModal from "./cart-modal";
import ShoppingCartSection from "@/lib/components/cart";
import Modal from "@/lib/components/ui/modal";

export default function ShoppingCartModalPage() {
  return (
    <ShoppingCartModal>
      <Suspense fallback={null}>
        <ShoppingCartSection />
      </Suspense>
    </ShoppingCartModal>
  );
}
