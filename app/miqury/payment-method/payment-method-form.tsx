"use client";
import Spinner from "@/lib/components/ui/spinner";
import PaymentService from "@/lib/services/payment";
import { toastMessage } from "@/lib/utils/toast";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { getSession } from "next-auth/react";
import React, { Fragment, useState } from "react";

export default function PaymentMethodForm() {
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState("");
  const [loadCountFlag, setLoadCountFlag] = useState(0);
  const [pageLoad, setPageLoad] = useState(false);

  const openPaymentGateway = async () => {
    const session = await getSession();
    setShowForm(true);
    if (session) {
      var action_mode = "IFRAME";
      const signResponse = await PaymentService.altsign(session, action_mode);
      const paymentResponse = await PaymentService.initPaymentGateway(
        session,
        signResponse
      );
      if (paymentResponse) {
        setUrl(paymentResponse.redirect_url);
      } else {
        setShowForm(false);
        toastMessage(
          "error",
          "Ocurrió un problema, por favor intente nuevamente"
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div
        className="text-secondary font-bold mt-2 hover:text-primary cursor-pointer"
        onClick={() => openPaymentGateway()}
      >
        {showForm ? "x Cerrar" : "+ Agregar nuevo método de pago"}
      </div>
      <Transition appear show={showForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => {
            setPageLoad(false);
            setShowForm(false);
            setUrl("");
            if (loadCountFlag >= 3) {
              window.location.reload();
            } else {
              setLoadCountFlag(0);
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
                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all lg:w-[800px]">
                  <iframe
                    src={url}
                    className={classNames(
                      "w-full h-[400px] lg:w-[800px]",
                      pageLoad ? "block" : "hidden"
                    )}
                    id="paymentIframe"
                    onLoad={(e) => {
                      if (loadCountFlag == 1) {
                        setPageLoad(true);
                      }
                      setLoadCountFlag((prev) => prev + 1);
                    }}
                  />
                  {!pageLoad && (
                    <div className="w-full h-[400px] lg:w-[800px] flex justify-center items-center">
                      <Spinner className="h-20 w-20" />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
}
