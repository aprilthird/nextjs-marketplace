"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children?: React.ReactNode;
};

export interface ModalContextInterface {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  shoppingCartModalOpen: boolean;
  setShoppingCartModalOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  modalOpen: false,
  setModalOpen: (value: boolean) => {},
  shoppingCartModalOpen: false,
  setShoppingCartModalOpen: (value: boolean) => {},
} as ModalContextInterface;

export const ModalContext = createContext(defaultState);

export const ModalProvider = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shoppingCartModalOpen, setShoppingCartModalOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        shoppingCartModalOpen,
        setShoppingCartModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe ser usado dentro de un ModalProvider");
  }
  return context;
};
