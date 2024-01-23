import Address from "@/lib/models/address";
import { HomeIcon } from "../../icons/home-icon";
import classNames from "classnames";

type Props = {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onClick?: (address?: Address) => void;
  active?: Boolean;
};

const ShippingAddressCard = ({
  address,
  onEdit,
  onDelete,
  onClick,
  active = false,
}: Props) => {
  return (
    <div
      className={classNames(
        "rounded-lg bg-white p-4 border-2 shadow-md w-full hover:border-primary",
        active ? "border-primary" : "border-white"
      )}
      onClick={() => {
        if (onClick) {
          onClick(address);
        }
      }}
    >
      <div className="flex space-x-4 justify-between items-center">
        <HomeIcon />
        <div className="flex-grow">
          <div className="font-bold">{address.name}</div>
          <div className="text-sm">{address.street}</div>
          <div className="text-sm">
            Nro. {address.streetNumber} - Int/Tda. {address.inside}
          </div>
          <div className="text-sm">{address.district}</div>
          <div className="text-sm">
            {address.province}, {address.department}
          </div>
          <div className="text-sm">{address.reference}</div>
          <div className="text-sm">Teléfono: {address.phoneNumber}</div>
        </div>
        <div>
          <div
            className="text-secondary font-bold cursor-pointer hover:underline"
            onClick={() => onEdit(address)}
          >
            Editar
          </div>
          <div
            className="text-red-500 font-bold cursor-pointer hover:underline"
            onClick={() => onDelete(address)}
          >
            Eliminar
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressCard;
