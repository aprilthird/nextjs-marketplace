"use client";
import { CloseIcon } from "@/lib/components/icons/close-icon";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  createContext,
  use,
  useEffect,
  useState,
} from "react";

export default function SidebarModal({ children }: React.PropsWithChildren) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      // router.back();
    }, 500);
  }

  useEffect(() => {
    if (pathname.includes("compra")) {
      setIsOpen(false);
    } else if (pathname == "/chat") {
      setIsOpen(true);
    }
  }, [pathname]);

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(true);
    };
  }, []);

  return (
    <React.Fragment>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={(e: any) => {
            if (pathname == "/login") {
              // e.stopPropagation();
            } else {
              closeModal();
            }
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
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-2xl font-medium text-gray-900">
                            Chat
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
