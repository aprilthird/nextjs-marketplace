"use client";

import ResetPassword from "@/lib/models/reset-password";
import AuthService from "@/lib/services/auth";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../../ui/spinner";

type Props = {
  resetPassword: ResetPassword;
  afterSubmit: (resetPassword: ResetPassword) => void;
  isLoading: boolean;
};

const EmailForm = ({ resetPassword, afterSubmit, isLoading }: Props) => {
  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: resetPassword,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;
  const searchParams = useSearchParams();

  const onSubmit = async (data: any, e: any) => {
    afterSubmit(fields);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            {/* <label htmlFor="otp_code" className="text-sm font-medium">
              Introduce el código de 6 dígitos
            </label> */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </label>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                    placeholder="Correo electrónico"
                  />
                )}
              />
              {errors.email && (
                <span className="text-xs text-red-600">
                  Este campo es obligatorio
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <button
          type="submit"
          className="w-full mt-2 text-white bg-primary font-bold rounded-lg px-5 py-2.5 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
        >
          Continuar
        </button>
      )}
    </form>
  );
};

export default EmailForm;
