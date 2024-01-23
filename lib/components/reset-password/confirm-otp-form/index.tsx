"use client";

import ResetPassword from "@/lib/models/reset-password";
import AuthService from "@/lib/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import Spinner from "../../ui/spinner";

type Props = {
  resetPassword: ResetPassword;
  afterSubmit: (resetPassword: ResetPassword) => void;
  isLoading: boolean;
};

const ConfirmOTPForm = ({ resetPassword, afterSubmit, isLoading }: Props) => {
  const { control, formState, reset, handleSubmit, watch, setError } = useForm({
    defaultValues: resetPassword,
  });
  const fields = watch();
  const { isValid, dirtyFields, errors } = formState;
  const searchParams = useSearchParams();

  const onSubmit = async (data: any, e: any) => {
    afterSubmit(fields);
  };

  const onResendOtpCode = async () => {
    await AuthService.resendSignUpCode(resetPassword.email);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <label htmlFor="otp_code" className="text-sm font-medium">
              Introduce el código de 6 dígitos
            </label>
            <div className="flex flex-col items-center space-y-2">
              <Controller
                control={control}
                name="otpCode"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <OtpInput
                    value={value}
                    onChange={onChange}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    inputStyle={{
                      border: "1px solid transparent",
                      borderColor: "gray",
                      backgroundColor: "ghostwhite",
                      borderRadius: "8px",
                      width: "48px",
                      height: "48px",
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "blue",
                    }}
                    renderInput={(props) => <input {...props} className="" />}
                  />
                )}
              />
              <div
                className="font-medium underline cursor-pointer"
                onClick={onResendOtpCode}
              >
                Reenviar código
              </div>
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

export default ConfirmOTPForm;
