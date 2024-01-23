"use client";

import ResetPassword from "@/lib/models/reset-password";
import AuthService from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SuccessMessage from "../success-message";
import classNames from "classnames";
import CheckIcon from "../../icons/check-icon";
import EmailForm from "../email-form";
import ConfirmOTPForm from "../confirm-otp-form";
import NewPasswordForm from "../new-password-form";
import { toastMessage } from "@/lib/utils/toast";

const initialState = new ResetPassword();

const ResetPasswordForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [resetPassword, setResetPassword] = useState(initialState);
  const [completed, setCompleted] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);

  const onCompleteEmail = async (value: ResetPassword) => {
    try {
      setIsLoading1(true);
      await AuthService.resetPassword(value.email);
      setResetPassword(value);
      setStep(step + 1);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        toastMessage("error", e.message);
      }
    } finally {
      setIsLoading1(false);
    }
  };

  const onCompleteOtpCode = async (value: ResetPassword) => {
    try {
      setIsLoading2(true);
      setResetPassword(value);
      setStep(step + 1);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        toastMessage("error", e.message);
      }
    } finally {
      setIsLoading2(false);
    }
  };

  const onCompleteNewPassword = async (value: ResetPassword) => {
    try {
      setIsLoading3(true);
      await AuthService.confirmResetPassword(value);
      setResetPassword(value);
      setStep(step + 1);
      setCompleted(true);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        toastMessage("error", e.message);
      }
    } finally {
      setIsLoading3(false);
    }
  };

  const onRedirect = () => {
    router.push("/");
  };

  const onBack = () => {
    setStep(step - 1);
  };

  return (
    <React.Fragment>
      {completed ? (
        <SuccessMessage
          resetPassword={resetPassword}
          afterSubmit={onRedirect}
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
                <h3 className="font-medium leading-tight">Datos de cuenta</h3>
                <p className="text-sm">Correo electrónico</p>
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
                <h3 className="font-medium leading-tight">Verificación</h3>
                <p className="text-sm">Por código SMS</p>
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
                <h3 className="font-medium leading-tight">Actualización</h3>
                <p className="text-sm">Nueva contraseña</p>
              </span>
            </li>
          </ol>
          <div className="mt-4">
            {step === 1 && (
              <EmailForm
                resetPassword={resetPassword}
                afterSubmit={onCompleteEmail}
                isLoading={isLoading1}
              />
            )}
            {step === 2 && (
              <ConfirmOTPForm
                resetPassword={resetPassword}
                afterSubmit={onCompleteOtpCode}
                isLoading={isLoading2}
              />
            )}
            {step === 3 && (
              <NewPasswordForm
                resetPassword={resetPassword}
                afterSubmit={onCompleteNewPassword}
                isLoading={isLoading3}
              />
            )}
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

export default ResetPasswordForm;
