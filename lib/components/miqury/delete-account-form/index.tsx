"use client";

import UserService from "@/lib/services/user";
import { toastMessage } from "@/lib/utils/toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../../ui/spinner";

const initialState = {
  testText: "",
};

const MiQuryDeleteAccountForm = () => {
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
        await UserService.delete(session.data);
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
        <Controller
          control={control}
          name="testText"
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="text_text"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
              placeholder='Ingrese "acepto eliminar mi cuenta qury"'
            />
          )}
        />
        {errors.testText && (
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

export default MiQuryDeleteAccountForm;
