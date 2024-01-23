import { create } from "zustand";

export type StoreProps = {
  modalFlagUrl: string;
  productBuy: any;
};

export const useStore = create<StoreProps>((set) => ({
  modalFlagUrl: "/",
  productBuy: {},
}));
