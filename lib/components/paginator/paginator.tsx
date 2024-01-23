"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  itemsCount: number;
};

export default function Paginator({
  itemsCount,
  className,
}: React.PropsWithChildren<Props>) {
  const [urlPath, setUrlPath] = useState("");
  const [paginatorArray, setPaginatorArray] = useState<any>([]);
  const [currentPageState, setCurrentPageState] = useState(1);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pageParam = searchParams?.get("page");
  const currentPage = Number(pageParam) || 1;
  const totalPages = Math.ceil(itemsCount / 40);

  useEffect(() => {
    if (pathname.includes("buscar")) {
      params.delete("page");
      setUrlPath(`${pathname}?${params}`);
      setPaginatorArray(getPaginationNumbers(currentPage, totalPages));
      setCurrentPageState(currentPage);
    }
  }, [pathname, searchParams]);

  const getPaginationNumbers = (current: number, total: number) => {
    const numbers = [];
    const numbersToShow = 3;

    if (total <= numbersToShow + 2) {
      for (let i = 1; i <= total; i++) {
        numbers.push(i);
      }
      return numbers.map((num) => {
        if (typeof num === "number") {
          return {
            value: num,
            showInMobile:
              num === current || num === current - 1 || num === current + 1,
          };
        }
        return {
          value: num,
          showInMobile: false,
        };
      });
    }

    numbers.push(1);

    if (current === 1) {
      for (let i = 2; i <= 2 + numbersToShow && i < total; i++) {
        numbers.push(i);
      }
      if (total > 2 + numbersToShow) {
        numbers.push("...");
      }
    } else if (current <= numbersToShow) {
      for (let i = 2; i < 2 + numbersToShow && i < total; i++) {
        numbers.push(i);
      }
      if (total > numbersToShow + 1) {
        numbers.push("...");
      }
    } else if (current >= total - numbersToShow + 1) {
      numbers.push("...");
      for (let i = total - numbersToShow + 1; i < total; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push("...");
      for (
        let i = current - Math.floor(numbersToShow / 2);
        i <= current + Math.floor(numbersToShow / 2);
        i++
      ) {
        numbers.push(i);
      }
      if (current + Math.floor(numbersToShow / 2) < total - 1) {
        numbers.push("...");
      }
    }

    numbers.push(total);
    return numbers.map((num) => {
      if (typeof num === "number") {
        return {
          value: num,
          showInMobile:
            num === current || num === current - 1 || num === current + 1,
        };
      }
      return {
        value: num,
        showInMobile: false,
      };
    });
  };

  return (
    <nav className="mt-4 mx-2 flex justify-center">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {currentPageState > 1 && (
          <li>
            <Link
              href={`${urlPath}&page=${currentPageState - 1}`}
              className="cursor-pointer  flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:text-white dark:text-gray-400 hover:bg-primary dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          </li>
        )}
        {itemsCount > 40 &&
          paginatorArray.map((page: any, index: any) => {
            if (page.value === "...") {
              return (
                <li key={`pagination_dots_${index}`}>
                  <div className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
                    ...
                  </div>
                </li>
              );
            }
            return (
              <li key={`pagination_item_${page.value}`}>
                <Link
                  href={`${urlPath}&page=${page.value}`}
                  className={classNames(
                    "flex items-center justify-center px-4 h-10 leading-tight border border-gray-300",
                    currentPageState == page.value
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary text-gray-500 hover:text-white cursor-pointer ",
                    !page.showInMobile ? "hidden md:flex" : ""
                  )}
                >
                  {page.value}
                </Link>
              </li>
            );
          })}

        {currentPageState < totalPages && (
          <li>
            <Link
              href={`${urlPath}&page=${currentPageState + 1}`}
              className="cursor-pointer flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:text-white dark:text-gray-400 hover:bg-primary dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
