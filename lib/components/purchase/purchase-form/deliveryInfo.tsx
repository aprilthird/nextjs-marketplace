import { Disclosure } from "@headlessui/react";
import { ArrowNextIcon } from "../../icons/arrow-next";
import React from "react";
import User from "@/lib/models/user";
import NumberUtils from "@/lib/utils/number-utils";

type Props = {
  deliveryCost: number;
  user: User;
  department: string;
};

export const DeliveryInfo = ({ deliveryCost, user, department }: Props) => {
  return (
    <div className="pb-4 mx-auto">
      {user.hasDeliveryQury ? (
        <>
          {/* <div className="text-sm">Entrega realizada por Qury</div> */}
          <div className="flex items-center justify-between py-1">
            <div>
              Costo delivery:
              <div className="text-xs">
                {department == "Lima"
                  ? "Costo de envío y empaque"
                  : "Costo de envío y embalaje a la agencia (Transporte debe pagarse en destino)"}
              </div>
            </div>
            <div className="font-semibold"> S/ {deliveryCost}</div>
          </div>
          <Disclosure>
            {({ open }) => (
              <React.Fragment>
                <Disclosure.Button
                  className={
                    "font-bold text-sm flex items-center justify-between mt-2 hover:text-primary"
                  }
                >
                  <div>Políticas generales</div>
                  <ArrowNextIcon
                    className={open ? "w-4 h-4 rotate-90 transform" : "w-4 h-4"}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={"text-sm flex flex-col justify-between"}
                >
                  <div className="flex space-x-2">
                    <div>Tiempo de entrega:</div>
                    <div className="text-primary">2 días</div>
                  </div>
                  <div className="flex space-x-2">
                    <div>Incluye costo de devolución:</div>
                    <div className="text-primary">
                      {user?.hasDevolutionCost ? "Sí" : "No"}
                    </div>
                  </div>
                </Disclosure.Panel>
              </React.Fragment>
            )}
          </Disclosure>
        </>
      ) : (
        <>
          <div>Entrega realizada por el vendedor</div>
          <Disclosure>
            {({ open }) => (
              <React.Fragment>
                <Disclosure.Button
                  className={
                    "font-bold text-sm flex items-center justify-between mt-2 hover:text-primary"
                  }
                >
                  <div>Políticas generales</div>
                  <ArrowNextIcon
                    className={open ? "w-4 h-4 rotate-90 transform" : "w-4 h-4"}
                  />
                </Disclosure.Button>
                <Disclosure.Panel
                  className={"text-sm flex flex-col justify-between"}
                >
                  <div className="flex space-x-2">
                    <div>Tiempo de entrega:</div>
                    <div className="text-primary">
                      {user?.deliveryTime &&
                        NumberUtils.getTimeStampHoursToDays(user?.deliveryTime)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div>Incluye costo de envío:</div>
                    <div className="text-primary">
                      {user?.hasDeliveryCost ? "Sí" : "No"}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div>Incluye costo de devolución:</div>
                    <div className="text-primary">
                      {user?.hasDevolutionCost ? "Sí" : "No"}
                    </div>
                  </div>
                </Disclosure.Panel>
              </React.Fragment>
            )}
          </Disclosure>
          {user?.disclaimer && (
            <Disclosure>
              {({ open }) => (
                <React.Fragment>
                  <Disclosure.Button
                    className={
                      "font-bold text-sm flex items-center justify-between mt-2 hover:text-primary"
                    }
                  >
                    <div>Políticas adicionales</div>
                    <ArrowNextIcon
                      className={
                        open ? "w-4 h-4 rotate-90 transform" : "w-4 h-4"
                      }
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={"text-sm flex flex-col justify-between"}
                  >
                    {user?.disclaimer}
                  </Disclosure.Panel>
                </React.Fragment>
              )}
            </Disclosure>
          )}
        </>
      )}
    </div>
  );
};
