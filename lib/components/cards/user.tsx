import classNames from "classnames";
import Image from "next/image";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";
import { HelpIcon } from "../icons/help-icon";
import {
  BookIcon,
  DressIcon,
  FurnitureIcon,
} from "@/lib/components/icons/groups";
import User from "@/lib/models/user";
import Link from "next/link";
import UserAvatar from "../avatar/user";

type Props = {
  className?: string;
  user: User;
};

export default function UserCard({ user, className }: Props) {
  return (
    <div className={classNames("rounded shadow-md p-2 bg-white", className)}>
      <Link href={`/tienda/${user.quryId}`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-[3.25rem]">
            <UserAvatar user={user} />
          </div>
          <h3 className="font-bold text-xl">{user.displayName}</h3>
        </div>
        <div>{user.description}</div>
        <div className="flex justify-between mb-4">
          <div className="flex">
            <BookIcon className="mr-4" />
            <div>Categoría: Moda</div>
          </div>
          <div className="flex">
            <DressIcon className="mr-4" />
            <div>Sub categoría: Accesorios</div>
          </div>
        </div>
        <div className="flex mb-4">
          <FurnitureIcon className="mr-4" />
          <div>Entrega: 1 día (delivery o recojo en tienda)</div>
        </div>
        <div className="flex">
          <ShoppingBagIcon className="mr-4" />
          <div>No incluye costo de envío y devolución</div>
        </div>
      </Link>
    </div>
  );
}
