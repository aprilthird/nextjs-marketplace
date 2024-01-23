import React, { FC } from "react";

type CartProps = {
  width?: number;
  height?: number;
  className?: string;
};

const CartRegular: FC<CartProps> = ({ width, height, className }) => {
  return (
    <svg
      //   className="w-6 h-6 text-gray-800 dark:text-white"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
      />
    </svg>
  );
};

export default CartRegular;
