import NewUser from "@/lib/models/new-user";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../../ui/spinner";

type Props = {
  newUser: NewUser;
  afterSubmit: (newUser: NewUser) => void;
  loading: boolean;
};

const AccountForm = ({ newUser, afterSubmit, loading }: Props) => {
  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: newUser,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (data: any, e: any) => {
    afterSubmit(fields);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
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
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone_number" className="text-sm font-medium">
              Teléfono
            </label>
            <Controller
              control={control}
              name="phoneNumber"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="phone_number"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Teléfono"
                />
              )}
            />
            {errors.phoneNumber && (
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
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: 8,
                pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Contraseña"
                />
              )}
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-xs text-red-600">
                Este campo es obligatorio
              </span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="text-xs text-red-600">
                Este campo debe tener 8 caracteres como mínimo
              </span>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <span className="text-xs text-red-600">
                Este campo no cumple los requisitos de validación
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-2">
            <label htmlFor="repeat_password" className="text-sm font-medium">
              Repetir contraseña
            </label>
            <Controller
              control={control}
              name="repeatPassword"
              rules={{
                required: true,
                minLength: 8,
                pattern: /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="repeat_password"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
                  placeholder="Repetir contraseña"
                />
              )}
            />
            {errors.repeatPassword &&
              errors.repeatPassword.type === "required" && (
                <span className="text-xs text-red-600">
                  Este campo es obligatorio
                </span>
              )}
            {errors.repeatPassword &&
              errors.repeatPassword.type === "minLength" && (
                <span className="text-xs text-red-600">
                  Este campo debe tener 8 caracteres como mínimo
                </span>
              )}
            {errors.repeatPassword &&
              errors.repeatPassword.type === "pattern" && (
                <span className="text-xs text-red-600">
                  Este campo no cumple los requisitos de validación
                </span>
              )}
          </div>
        </div>
      </div>
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

export default AccountForm;
