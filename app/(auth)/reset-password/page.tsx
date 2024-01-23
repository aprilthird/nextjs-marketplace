import ResetPasswordForm from "@/lib/components/reset-password/reset-password-form";
import Link from "next/link";
import React from "react";

export default function ResetPasswordPage() {
  return (
    <React.Fragment>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-2">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Restablecer contraseña
              </h1>
              {/* <p className="text-md leading-tight tracking-tight text-gray-900 md:text-lg">
                Ingresa tu email con el que inicias sesión y presiona el botón
                de confirmar.
              </p>
              <p className="text-md leading-tight tracking-tight text-gray-900 md:text-lg">
                Te llegará un mensaje de texto (SMS) con un código al número
                móvil registrado, con el cual podrás restablecer tu contraseña.
              </p> */}
              <ResetPasswordForm />
              <Link href={"/login"} className="">
                <button className="w-full text-primary bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center">
                  Volver
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
