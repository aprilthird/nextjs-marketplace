"use client";

import React, { useState } from "react";
import CheckIcon from "@/lib/components/icons/check-icon";
import GeneralForm from "@/lib/components/signup/general-form";
import AccountForm from "@/lib/components/signup/account-form";
import ConfirmOTPForm from "@/lib/components/signup/confirm-otp-form";
import SuccessMessage from "@/lib/components/signup/sucess-message";
import NewUser from "@/lib/models/new-user";
import UserService from "@/lib/services/user";
import AuthService from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { toastMessage } from "@/lib/utils/toast";
import { signIn } from "@aws-amplify/auth";
import { signIn as nextAuthSignIn } from "next-auth/react";

const initialState = new NewUser();

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [newUser, setNewUser] = useState(initialState);
  const [completed, setCompleted] = useState(false);
  const [signInData, setSignInData] = useState<any>({});
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const [load1, setLoad1] = useState<boolean>(false);
  const [load2, setLoad2] = useState<boolean>(false);
  const [load3, setLoad3] = useState<boolean>(false);

  const onCompleteStep1 = async (value: NewUser) => {
    setLoad1(true);
    if (value.username) {
      var exists = await UserService.usernameExists(value.username);
      if (exists) {
        toastMessage(
          "error",
          `El usuario '${value.username}' ya se encuentra registrado`
        );
        setLoad1(false);
        return;
      }
    }
    setNewUser(value);
    setStep(step + 1);
    setLoad1(false);
  };

  const onCompleteStep2 = async (value: NewUser) => {
    setLoad2(true);
    setNewUser(value);
    setSignInData({ email: value.email, password: value.password });
    await UserService.deleteUser(value.email);
    try {
      await AuthService.signUp(value);
      setStep(step + 1);
      setLoad2(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        toastMessage("error", e.message);
        setLoad2(false);
      }
      try {
        await AuthService.resendSignUpCode(newUser.email);
        setLoad2(false);
        setStep(step + 1);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setLoad2(false);
          toastMessage("error", e.message);
        }
      }
    }
  };

  const onCompleteStep3 = async (value: string) => {
    try {
      setLoad3(true);
      await AuthService.confirmSignUp(newUser.email, value);
      setStep(step + 1);
      setCompleted(true);
      setLoad3(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        toastMessage("error", e.message);
        setLoad3(false);
      }
    }
  };

  const onRedirect = async () => {
    try {
      setSignInLoading(true);
      await signIn({
        username: signInData.email,
        password: signInData.password,
        options: {
          serviceOptions: {
            clientMetadata: {},
            // authFlowType: "USER_SRP_AUTH",
          },
        },
      });
    } catch (err: any) {
      setSignInLoading(false);
      if (err.message.includes("Incorrect username or password")) {
        toastMessage("error", "Usuario o contraseña incorrecta");
        console.error(err);
        return;
      } else if (err.message.includes("User does not exis")) {
        toastMessage("error", "Email no registrado");
        console.error(err);
        return;
      }
    }

    var result: any = await nextAuthSignIn("credentials", {
      redirect: false,
      email: signInData.email,
      password: signInData.password,
      callbackUrl: window.location.origin,
    });
    if (result.error) {
      setSignInLoading(false);
      toastMessage("error", result.error);
    } else {
      router.push("/");
    }
  };

  const onBack = () => {
    setStep(step - 1);
  };

  return (
    <React.Fragment>
      {completed ? (
        <SuccessMessage
          newUser={newUser}
          afterSubmit={onRedirect}
          signInLoading={signInLoading}
        />
      ) : (
        <React.Fragment>
          <ol className="flex justify-center items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
            <li
              className={classNames(
                "flex items-center space-x-2.5",
                step >= 1 ? "text-blue-600" : "text-gray-600"
              )}
            >
              <span
                className={classNames(
                  "flex items-center justify-center w-8 h-8 border rounded-full shrink-0",
                  step >= 1 ? "border-blue-600" : ""
                )}
              >
                {step > 1 ? <CheckIcon /> : "1"}
              </span>
              <span>
                <h3 className="font-medium leading-tight">Datos generales</h3>
                <p className="text-sm">Persona o negocio</p>
              </span>
            </li>
            <li
              className={classNames(
                "flex items-center space-x-2.5",
                step >= 2 ? "text-blue-600" : "text-gray-600"
              )}
            >
              <span
                className={classNames(
                  "flex items-center justify-center w-8 h-8 border rounded-full shrink-0",
                  step >= 2 ? "border-blue-600" : ""
                )}
              >
                {step > 2 ? <CheckIcon /> : "2"}
              </span>
              <span>
                <h3 className="font-medium leading-tight">Datos de cuenta</h3>
                <p className="text-sm">Correo y teléfono</p>
              </span>
            </li>
            <li
              className={classNames(
                "flex items-center space-x-2.5",
                step >= 3 ? "text-blue-600" : "text-gray-600"
              )}
            >
              <span
                className={classNames(
                  "flex items-center justify-center w-8 h-8 border rounded-full shrink-0",
                  step >= 3 ? "border-blue-600" : ""
                )}
              >
                {step > 3 ? <CheckIcon /> : "3"}
              </span>
              <span>
                <h3 className="font-medium leading-tight">Verificación</h3>
                <p className="text-sm">Por código SMS</p>
              </span>
            </li>
            {/* <li
        className={classNames(
          "flex items-center space-x-2.5",
          step >= 4 ? "text-blue-600" : "text-gray-600"
        )}
      >
        <span
          className={classNames(
            "flex items-center justify-center w-8 h-8 border rounded-full shrink-0",
            step >= 4 ? "border-blue-600" : ""
          )}
        >
          {step > 4 ? <CheckIcon /> : "4"}
        </span>
        <span>
          <h3 className="font-medium leading-tight">Finalización</h3>
          <p className="text-sm">Registro completado</p>
        </span>
      </li> */}
          </ol>
          <div className="mt-4">
            {step === 1 && (
              <GeneralForm
                newUser={newUser}
                afterSubmit={onCompleteStep1}
                loading={load1}
              />
            )}
            {step === 2 && (
              <AccountForm
                newUser={newUser}
                afterSubmit={onCompleteStep2}
                loading={load2}
              />
            )}
            {step === 3 && (
              <ConfirmOTPForm
                newUser={newUser}
                afterSubmit={onCompleteStep3}
                loading={load3}
              />
            )}
            {/* {step === 4 && (
        <SuccessMessage newUser={newUser} afterSubmit={onRedirect} />
      )} */}
            {step > 1 && step != 3 && (
              <button
                onClick={onBack}
                className="w-full mt-2 border-2 border-primary font-bold px-5 py-2.5 text-center hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-primary rounded-lg"
              >
                Volver
              </button>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SignupForm;
