import User from "@/lib/models/user";
import TextUtils from "@/lib/utils/text-utils";
import classNames from "classnames";
import Image from "next/image";
import Avatar from "../base";

type Props = {
  className?: string;
  size?: string;
  user: User;
  resx?: number;
};

const UserAvatar = ({ className, size = "normal", user, resx = 75 }: Props) => {
  return (
    <Avatar
      className={className}
      size={size}
      hasImage={user.image ? true : false}
      image={user.fullUrlProfileImage}
      name={user.displayName}
      resx={resx}
    />
  );
};

export default UserAvatar;
