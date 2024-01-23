"use client";

import NewUser from "@/lib/models/new-user";
import ResetPassword from "@/lib/models/reset-password";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

type Props = {
  resetPassword: ResetPassword;
  afterSubmit: () => void;
};

const SuccessMessage = ({ resetPassword, afterSubmit }: Props) => {
  const [isExploding, setIsExploding] = useState(false);

  const onContinue = () => {
    afterSubmit();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsExploding(true);
    }, 1500);
  }, []);

  return (
    <React.Fragment>
      <div className="my-8 text-lg text-center">
        Excelente, la contraseña de tu cuenta{" "}
        <strong>{resetPassword.email}</strong>
        ha sido cambiada con éxito.
      </div>
      <div className="flex justify-center">
        {isExploding && <ConfettiExplosion />}
      </div>
      <button
        onClick={onContinue}
        className="w-full mt-2 text-white bg-primary font-bold rounded-lg px-5 py-2.5 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
      >
        Completar
      </button>
    </React.Fragment>
  );
};

export default SuccessMessage;
