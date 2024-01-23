"use client";

import NewUser from "@/lib/models/new-user";
import AuthService from "@/lib/services/auth";
import UserService from "@/lib/services/user";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../../ui/spinner";

type Props = {
  newUser: NewUser;
  afterSubmit: (newUser: NewUser) => void;
  loading: boolean;
};

const BusinessForm = ({ newUser, afterSubmit, loading }: Props) => {
  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: newUser,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data: any, e: any) => {
    // await UserService.deleteUser(fields.email);
    // await AuthService.signUp(fields);
    fields.isBusiness = true;
    afterSubmit(fields);
  };

  return (
    <form
      className="space-y-4 md:space-y-6 py-4 px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <label htmlFor="business_name" className="text-sm font-medium">
              Razón/Denominación social
            </label>
            <Controller
              control={control}
              name="businessName"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="business_name"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Razón/Denominación social"
                />
              )}
            />
            {errors.businessName && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="document" className="text-sm font-medium">
              Número de RUC
            </label>
            <Controller
              control={control}
              name="document"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="document"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Número de RUC"
                />
              )}
            />
            {errors.document && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="tradename" className="text-sm font-medium">
              Nombre comercial
            </label>
            <Controller
              control={control}
              name="tradename"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="tradename"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Nombre comercial"
                />
              )}
            />
            {errors.tradename && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Domicilio fiscal
            </label>
            <Controller
              control={control}
              name="address"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="address"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Domicilio fiscal"
                />
              )}
            />
            {errors.address && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <div>
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
    <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
</div> */}
      {loading ? (
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

export default BusinessForm;
