"use client";

import NewUser from "@/lib/models/new-user";
import AuthService from "@/lib/services/auth";
import UserService from "@/lib/services/user";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import Spinner from "../../ui/spinner";

type Props = {
  newUser: NewUser;
  afterSubmit: (newUser: NewUser) => void;
  loading: boolean;
};

const PersonForm = ({ newUser, afterSubmit, loading }: Props) => {
  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: newUser,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;

  const selectStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      outlineColor: "#f05523",
      outlineWidth: "0px",
      outline: "solid",
      boxShadow: "none",
      //   border: 0,
      //   boxShadow: "none",
      ":hover": {
        // boxShadow: "5px",
        // outlineWidth: ".15rem",
        borderColor: "orange",
      },
    }),
    container: (styles) => ({
      ...styles,
      //   backgroundColor: "transparent",
      //   outlineColor: "#f05523",
      //   outlineWidth: "0px",
      ":hover": {
        boxShadow: "5px",
        outlineWidth: ".15rem",
      },
    }),
  };

  const documentTypes = [
    { label: "DNI", value: "DNI" },
    { label: "Carnet de extranjería", value: "Carnet de extranjería" },
    { label: "Pasaporte", value: "Pasaporte" },
  ];

  const onSubmit = async (data: any, e: any) => {
    // await UserService.deleteUser(fields.email);
    // await AuthService.signUp(fields);
    afterSubmit(fields);
  };

  return (
    <form
      className="space-y-4 md:space-y-6 py-4 px-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex space-x-4">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="first_name" className="text-sm font-medium">
              Nombres
            </label>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="first_name"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Nombres"
                />
              )}
            />
            {errors.firstName && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="last_name" className="text-sm font-medium">
              Apellidos
            </label>
            <Controller
              control={control}
              name="lastName"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="last_name"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Apellidos"
                />
              )}
            />
            {errors.lastName && (
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
            <label htmlFor="document_type" className="text-sm font-medium">
              Tipo de documento
            </label>
            <Controller
              control={control}
              name="documentType"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  ref={ref}
                  onChange={(val: any) => onChange(val.value)}
                  options={documentTypes}
                  styles={selectStyles}
                  id="document_type"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Tipo de documento"
                />
              )}
            />
            {errors.documentType && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="document" className="text-sm font-medium">
              Número de documento
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
                  placeholder="Número de documento"
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
      </div>
      <div className="flex">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Nombre de usuario (Opcional)
            </label>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="username"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Nombre de usuario"
                />
              )}
            />
          </div>
        </div>
      </div>
      {/* <div>
    <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
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

export default PersonForm;
