"use client";

import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { ModalSize } from "./enums";
import { CloseIcon } from "../../icons/close-icon";
import { useStore } from "@/lib/storeContext";
import path from "path";

type Props = {
  title?: string;
  size?: ModalSize;
  className?: string;
  closeIcon?: string;
};

const Modal = ({
  title,
  size = ModalSize.Medium,
  className,
  children,
  closeIcon = "left",
}: React.PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 500);
  };

  useEffect(() => {
    if (pathname.includes("compra")) {
      setIsOpen(false);
    }
  }, [pathname]);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(true);
    };
  }, []);

  const getSizeClass = (): string => {
    switch (size) {
      case ModalSize.Medium:
        return "max-w-md";
      case ModalSize.Large:
        return "max-w-lg";
      case ModalSize.ExtraLarge:
        return "max-w-xl";
      case ModalSize.ExtraLarge2:
        return "max-w-2xl";
      case ModalSize.ExtraLarge3:
        return "max-w-3xl";
      case ModalSize.ExtraLarge4:
        return "max-w-4xl";
      case ModalSize.ExtraLarge5:
        return "max-w-5xl";
      case ModalSize.ExtraLarge6:
        return "max-w-6xl";
      case ModalSize.ExtraLarge7:
        return "max-w-7xl";
      case ModalSize.ExtraLarge8:
        return "max-w-8xl";
      default:
        return "max-w-md";
    }
  };

  return (
    <React.Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={classNames(
            "relative",
            pathname == "/login" ? "z-50" : "z-20"
          )}
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    "w-full transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all md:p-5",
                    className,
                    getSizeClass()
                  )}
                >
                  <div
                    className={classNames(
                      "fixed text-center w-10 top-0 rounded-full bg-gray-200 cursor-pointer m-2 p-2 z-10",
                      closeIcon == "left" ? "left-0" : "right-0"
                    )}
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </div>
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};

export default Modal;
