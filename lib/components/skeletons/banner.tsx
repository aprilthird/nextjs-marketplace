import classNames from "classnames";

type Props = {
  className?: string;
};

export default function BannerSkeleton({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse ",
        className
      )}
    >
      <svg
        className="w-12 h-12 text-gray-200 dark:text-gray-600"
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          d="M0,0v455h455V0H0z M259.405,80c17.949,0,32.5,14.551,32.5,32.5s-14.551,32.5-32.5,32.5s-32.5-14.551-32.5-32.5
	S241.456,80,259.405,80z M375,375H80v-65.556l83.142-87.725l96.263,68.792l69.233-40.271L375,299.158V375z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
