"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { User } from "next-auth/core/types";
import AuthService from "@/lib/services/auth";
import { toastMessage } from "@/lib/utils/toast";
import UpdatePassword from "@/lib/models/update-password";
import Spinner from "../../ui/spinner";

const initialState: UpdatePassword = {
  newPassword: "",
  oldPassword: "",
};

const UpdatePasswordForm = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: initialState,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async () => {
    console.log(fields);
    try {
      setIsLoading(true);
      if (session.data) {
        await AuthService.updatePassword(fields);
        toastMessage("success", "Se guardaron los cambios");
        reset(initialState);
      }
    } catch (err) {
      console.error(err);
      toastMessage("error", "Ha ocurrido un error: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-4 flex flex-col space-y-2">
        <label htmlFor="oldPassword" className="text-sm font-medium">
          Contraseña
        </label>
        <Controller
          control={control}
          name="oldPassword"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              id="oldPassword"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
              placeholder="Contraseña"
            />
          )}
        />
        {errors.oldPassword && (
          <span className="text-xs text-red-600">
            Este campo es obligatorio
          </span>
        )}
        <label htmlFor="newPassword" className="text-sm font-medium">
          Nueva Contraseña
        </label>
        <Controller
          control={control}
          name="newPassword"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              id="newPassword"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
              placeholder="Nueva Contraseña"
            />
          )}
        />
        {errors.newPassword && (
          <span className="text-xs text-red-600">
            Este campo es obligatorio
          </span>
        )}
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full mt-2 text-white bg-primary font-bold rounded-lg px-5 py-2.5 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
          >
            Guardar
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
