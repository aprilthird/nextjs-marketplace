import TextUtils from "@/lib/utils/text-utils";
import classNames from "classnames";
import Image from "next/image";

type Props = {
  className?: string;
  size?: string;
  hasImage?: boolean;
  image: string;
  name: string;
  resx?: number;
};

const Avatar = ({
  className,
  size = "normal",
  hasImage = false,
  image,
  name,
  resx = 75,
}: Props) => {
  return (
    <div
      className={classNames(
        "rounded-full overflow-hidden bg-secondary",
        className
      )}
    >
      {hasImage ? (
        <Image
          className={classNames(
            "object-cover",
            size === "extra-large-big"
              ? "w-32 h-32"
              : size === "extra-big"
              ? "w-[120px] h-[120px]"
              : size === "big"
              ? "w-[80px] h-[80px]"
              : "w-[50px] h-[50px]"
          )}
          src={image}
          alt={name}
          width={resx}
          height={resx}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          className={classNames(
            " text-white uppercase font-bold flex justify-center items-center",
            size === "extra-large-big"
              ? "w-32 h-32 text-5xl"
              : size === "extra-big"
              ? "w-[120px] h-[120px] text-3xl"
              : size === "big"
              ? "w-[80px] h-[80px] text-2xl"
              : "w-[50px] h-[50px] text-2xl"
          )}
        >
          {TextUtils.getSignificantCharacters(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
