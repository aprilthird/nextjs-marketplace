"use client";

import PaymentMethod from "@/lib/models/payment-method";
import PaymentMethodService from "@/lib/services/payment-method";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  paymentMethods: PaymentMethod[];
};

const PaymentMethodList = ({ paymentMethods }: Props) => {
  const router = useRouter();
  const session = useSession();

  const onDelete = async (item: PaymentMethod) => {
    if (session.data) {
      if (confirm("¿Seguro de que desea eliminar este método de pago?")) {
        try {
          PaymentMethodService.delete(session.data, item);
          toast.success("Método de pago eliminado con éxito.");
          setTimeout(() => {
            router.refresh();
          }, 2000);
        } catch (err) {
          console.error(err);
          toast.error("Ocurrió un error:" + err);
        }
      }
    }
  };

  return (
    <React.Fragment>
      {paymentMethods.length > 0 ? (
        <div className="flex flex-col space-y-2">
          {paymentMethods.map((item) => (
            <div
              key={`payment_method_${item.id}`}
              className="rounded-lg p-4 border-2 shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex column space-x-4">
                  <div className="flex items-center justify-center">
                    {item.brand.toUpperCase() === "AMEX" && (
                      <Image
                        className="h-16 w-auto"
                        src="/assets/images/amex_logo.png"
                        alt="Amex"
                        width="25"
                        height="25"
                      />
                    )}
                    {item.brand.toUpperCase() === "VISA" && (
                      <Image
                        className="h-6 w-16"
                        src="/assets/images/visa_logo.png"
                        alt="Amex"
                        width="25"
                        height="25"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm">{item.accountNumber}</div>
                    <div className="text-sm">{item.brand}</div>
                  </div>
                </div>

                <div>
                  <div
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => onDelete(item)}
                  >
                    Eliminar
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg p-4 border-2 shadow-md">
          No hay métodos de pago registrados
        </div>
      )}
    </React.Fragment>
  );
};

export default PaymentMethodList;
