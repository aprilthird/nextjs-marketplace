"use client";
import { CloseIcon } from "@/lib/components/icons/close-icon";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
  direction?: "right" | "left";
};

export default function Drawer({
  isOpen,
  setIsOpen,
  direction = "right",
  title,
  children,
}: DrawerProps) {
  function closeModal() {
    setIsOpen(false);
  }

  const enterFrom =
    direction === "right" ? "translate-x-full" : "-translate-x-full";
  const leaveTo =
    direction === "right" ? "translate-x-full" : "-translate-x-full";

  return (
    <React.Fragment>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={(e: any) => {
            closeModal();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`pointer-events-none fixed inset-y-0 ${
                  direction === "right" ? "right-0" : "left-0"
                } flex max-w-full ${direction === "right" ? "pl-10" : "pr-10"}`}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom={enterFrom}
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo={leaveTo}
                >
                  <Dialog.Panel
                    className={`pointer-events-auto w-screen max-w-md ${
                      direction === "right" ? "right-0" : "left-0"
                    }`}
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-2xl font-medium text-gray-900">
                            {title}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={closeModal}
                            >
                              <span className="sr-only">Cerrar</span>
                              <CloseIcon className="h-6 w-6" />
                            </button>
                          </div>
                        </div>

                        {children}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );
}
