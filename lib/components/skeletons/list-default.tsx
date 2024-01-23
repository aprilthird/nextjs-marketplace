import classNames from "classnames";

type Props = {
  className?: string;
};

export default function ListDefaultSkeleton({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={classNames(
        "flex items-center justify-between py-2",
        className
      )}
    >
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-primary w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full "></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full  w-12"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
