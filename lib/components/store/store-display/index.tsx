import User from "@/lib/models/user";
import classNames from "classnames";
import UserAvatar from "../../avatar/user";
import React from "react";
import NumberUtils from "@/lib/utils/number-utils";
import StoreSocial from "../store-social";

type Props = {
  className?: string;
  user: User;
};

const StoreDisplay = ({ className, user }: Props) => {
  return (
    <div className={classNames("rounded shadow-md p-2 bg-white", className)}>
      <div className="flex flex-col justify-center items-center space-y-4">
        <UserAvatar user={user} size="extra-big" />
        <div className="text-center font-bold">{user.displayName}</div>
        <div className="text-center text-sm">{user.description}</div>
        {/* <StoreSocial user={user} /> */}
        <div className="text-center text-sm font-bold">Políticas generales</div>
        <div className="flex space-x-2">
          <div className="text-center text-xs">
            Tiempo de entrega:{" "}
            <span className="text-primary">
              {user?.deliveryTime &&
                NumberUtils.getTimeStampHoursToDays(user?.deliveryTime)}
            </span>
          </div>
        </div>
        {/* <div className="flex space-x-2">
          <div className="text-center text-xs">
            Tiempo de confirmación:{" "}
            <span className="text-primary">
              {user?.confirmationTime &&
                NumberUtils.getTimeStampHoursToDays(user?.confirmationTime)}
            </span>
          </div>
        </div> */}
        <div className="flex space-x-2">
          <div className="text-center text-xs">
            Incluye costo de envío:{" "}
            <span className="text-primary">
              {user?.hasDeliveryCost ? "Sí" : "No"}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="text-center text-xs">
            Incluye costo de devolución:{" "}
            <span className="text-primary">
              {user?.hasDevolutionCost ? "Sí" : "No"}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="text-center text-xs">
            Delivery Qury:{" "}
            <span className="text-primary">
              {user?.hasDeliveryQury ? "Sí" : "No"}
            </span>
          </div>
        </div>
        {user.disclaimer && (
          <React.Fragment>
            <div className="text-center text-sm font-bold">
              Políticas adicionales
            </div>
            <div className="text-center text-sm">{user.disclaimer}</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default StoreDisplay;
