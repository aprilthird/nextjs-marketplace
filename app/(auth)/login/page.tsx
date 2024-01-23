import LoginForm from "@/lib/components/login/form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <React.Fragment>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:px-6">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Bienvenido
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
