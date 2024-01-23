"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function CookieConsent({ className }: Props) {
  const [display, setDisplay] = useState("hidden");

  const acceptCookies = () => {
    // Establece la cookie "acceptedCookies" para que expire en 365 días.
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = "acceptedCookies=true; " + expires + "; path=/";
    setDisplay("hidden");
  };

  useEffect(() => {
    // Si no se encuentra la cookie "acceptedCookies", muestra el banner.
    if (
      !document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("acceptedCookies="))
    ) {
      setDisplay("block");
    }
  }, []);

  return (
    <div
      className={classNames(
        `${display} flex justify-between items-center gap-2 bg-gray-200 px-4 py-3 fixed bottom-0 left-0 w-full z-50`,
        className
      )}
    >
      <p className="text-sm text-gray-700">
        Usamos cookies para asegurarte una mejor experiencia en nuestra web.
        Conocer más&nbsp;
        <a href="#" className="underline">
          aquí
        </a>
        .
      </p>
      <button
        onClick={acceptCookies}
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
      >
        Aceptar
      </button>
    </div>
  );
}
