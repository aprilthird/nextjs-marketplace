import User from "@/lib/models/user";
import classNames from "classnames";
import UserAvatar from "../../avatar/user";
import Link from "next/link";
import {
  AccessTimeSVGIcon,
  StoreSVGIcon,
  MotorcycleSVGIcon,
  AppsSVGIcon,
} from "@react-md/material-icons";
import NumberUtils from "@/lib/utils/number-utils";

type Props = {
  className?: string;
  user: User;
};

const StoreCard = ({ className, user }: Props) => {
  const getCostText = () => {
    if (!user.hasDeliveryCost && !user.hasDevolutionCost)
      return "No incluye costo de envío y devolución";
    else if (user.hasDeliveryCost && !user.hasDevolutionCost)
      return "Incluye costo de envío";
    else if (!user.hasDeliveryCost && user.hasDevolutionCost)
      return "Incluye costo de devolución";
    else return "Incluye costo de envío y devolución";
  };

  return (
    <div className={classNames("rounded shadow-md p-2 bg-white", className)}>
      <Link href={`/tienda/${user.quryId}`}>
        <div className="flex items-center h-[85px]">
          <UserAvatar user={user} className="flex-shrink-0 mr-4" />
          <div className="flex-1">
            <h4 className="text-left font-bold text-lg capitalize">
              {user.displayName}
            </h4>
            {user.description && (
              <p className="leading-tight text-left text-md overflow-hidden group-hover:text-primary max-h-[40px] flex">
                {user.description}
              </p>
            )}
          </div>
        </div>
        <hr />
        <div className="flex justify-between my-4">
          <div className="flex items-center">
            <AppsSVGIcon className="w-5 h-5 mr-2" />
            <div>Categoría: Moda</div>
          </div>
          <div className="flex items-center">
            <StoreSVGIcon className="w-5 h-5 mr-2" />
            <div>Sub categoría: Accesorios</div>
          </div>
        </div>
        <hr />
        <div className="my-2">
          <div className="flex items-center">
            <AccessTimeSVGIcon className="w-5 h-5 mr-2" />
            <div>
              Entrega:{" "}
              {user?.deliveryTime &&
                NumberUtils.getTimeStampHoursToDays(user?.deliveryTime)}{" "}
              (delivery)
            </div>
          </div>
          <div className="flex items-center">
            <MotorcycleSVGIcon className="w-5 h-5 mr-2" />
            <div>{getCostText()}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoreCard;
