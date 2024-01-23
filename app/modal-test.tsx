"use client";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnBoardingModal() {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    sessionStorage.setItem("onboarding", "true");
  }

  function openModal() {
    const onboarding = sessionStorage.getItem("onboarding");
    if (!onboarding) {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      openModal();
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Image
                    // src="https://qurystorage.s3.us-east-1.amazonaws.com/carrusel/1655264787171_carrusel.png"
                    src="/assets/images/pop_up.gif"
                    alt="welcome"
                    width={1200}
                    height={800}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
}
