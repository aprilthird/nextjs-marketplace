"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface ProductModalContextInterface {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  isOpen: true,
  setIsOpen: (value: boolean) => {},
} as ProductModalContextInterface;

export const StoreModalContext = createContext(defaultState);

export default function StoreModal({ children }: React.PropsWithChildren) {
  let [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 500);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <React.Fragment>
      <StoreModalContext.Provider value={{ isOpen, setIsOpen }}>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-20" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center m-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-6xl my-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </StoreModalContext.Provider>
    </React.Fragment>
  );
}
