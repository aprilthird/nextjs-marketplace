"use client";

import { signIn as nextAuthSignIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Spinner from "../../ui/spinner";
import { toastMessage } from "@/lib/utils/toast";
import { useModal } from "@/lib/providers/modal-provider";
import config from "@/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import {
  getCurrentUser,
  signIn,
  fetchAuthSession,
  fetchUserAttributes,
} from "@aws-amplify/auth";
import InputPassword from "../../ui/input/password";
import InputText from "../../ui/input/text";

type Props = {
  isDialog?: boolean;
};

interface IFormInput {
  email: string;
  password: string;
}

const initialState: IFormInput = {
  email: "",
  password: "",
};

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: "us-east-1_ZPe1B2fvp",
        userPoolClientId: "4mqcbuvs553kiucfp5jqtju0n5",
        identityPoolId: "us-east-1:3746ad8b-3173-4910-8372-745db1e0555b",
      },
    },
  },
  {
    ssr: true,
  }
);

const LoginForm = ({ isDialog = false }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    register,
    reset,
    handleSubmit,
    watch,
    setError,
  } = useForm<IFormInput>({
    defaultValues: initialState,
  });

  const processSignIn = async (data: IFormInput) => {
    const { email, password } = data;
    try {
      setLoading(true);
      setErrorMessage(null);

      var metadata = {};

      try {
        await signIn({
          username: email,
          password: password,
          options: {
            serviceOptions: {
              clientMetadata: metadata,
              // authFlowType: "USER_SRP_AUTH",
            },
          },
        });
      } catch (err: any) {
        if (err.message.includes("Incorrect username or password")) {
          toastMessage("error", "Usuario o contraseña incorrecta");
          setErrorMessage("Usuario o contraseña incorrecta");
          setLoading(false);
          console.error(err);
          return;
        } else if (err.message.includes("User does not exis")) {
          toastMessage("error", "Email no registrado");
          setErrorMessage("Email no registrado");
          setLoading(false);
          console.error(err);
          return;
        }
      }

      const redirectUrl = searchParams.has("callbackUrl")
        ? `${window.location.origin}/${searchParams.get("callbackUrl")}`
        : window.location.origin;

      var result: any = await nextAuthSignIn("credentials", {
        redirect: !isDialog,
        email: email,
        password: password,
        callbackUrl: redirectUrl,
      });
      if (result.error) {
        setLoading(false);
        toastMessage("error", result.error);
        setErrorMessage(result.error);
      } else {
        setErrorMessage(null);
        if (isDialog) {
          router.back();
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="mt-2 space-y-4 md:space-y-6"
        onSubmit={handleSubmit(processSignIn)}
      >
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "El correo electrónico es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "El correo electrónico no es válido",
              },
            }}
            render={({ field }) => (
              <InputText
                {...field}
                type="email"
                id="email"
                placeholder="Correo electrónico"
              />
            )}
          />
          {/* <input
            {...register("email", {
              required: "El correo electrónico es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "El correo electrónico no es válido",
              },
            })}
            type="email"
            name="email"
            id="email"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary"
            placeholder="Correo electrónico"
          /> */}
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <Controller
            control={control}
            name="password"
            rules={{ required: "La contraseña es requerida" }}
            render={({ field }) => (
              <InputPassword
                {...field}
                id="password"
                placeholder="Contraseña"
              />
            )}
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            {/* <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Recordar
            </label>
          </div> */}
          </div>
          <button
            className="text-sm font-medium text-primary hover:underline dark:text-primary-dark"
            onClick={() => {
              window.location.href = "/reset-password";
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
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
            Iniciar sesión
          </button>
        )}
      </form>
      <p className="mt-2 text-sm font-light text-gray-500">
        ¿No tienes cuenta?{" "}
        <button
          // href={"signup"}
          className="font-medium text-primary hover:underline"
          onClick={() => {
            window.location.href = "/signup";
            // setIsOpen(false);
          }}
        >
          Regístrate aquí
        </button>
      </p>
    </>
  );
};

export default LoginForm;
