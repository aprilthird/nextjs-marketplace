import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function Footer({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <footer
      className={classNames(
        "w-full max-w-screen-xl mx-auto p-4 md:py-8",
        className
      )}
    >
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
        © 2023 Qury™
      </span>
      <div className="flex items-center justify-center text-center text-gray-500 flex-col sm:flex-row">
        <div>Con el respaldo del grupo</div>
        <Link
          href={"https://www.ajegroup.com/"}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src="/assets/images/aje.png"
            alt="Logo Aje"
            width={80}
            height={50}
          />
        </Link>
      </div>
    </footer>
  );
}
