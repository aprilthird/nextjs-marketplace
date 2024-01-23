"use client";

import NewUser from "@/lib/models/new-user";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Spinner from "../../ui/spinner";
import Image from "next/image";

type Props = {
  newUser: NewUser;
  afterSubmit: () => void;
  signInLoading: boolean;
};

const SuccessMessage = ({ newUser, afterSubmit, signInLoading }: Props) => {
  const [isExploding, setIsExploding] = useState(false);

  const onContinue = () => {
    afterSubmit();
  };

  useEffect(() => {
    if (isExploding) {
      setTimeout(() => {
        setIsExploding(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsExploding(true);
      }, 2500);
    }
  }, [isExploding]);

  return (
    <React.Fragment>
      <Image
        className="h-[180px] w-auto mx-auto mt-5"
        src="/assets/images/welcome_qury.jpg"
        alt="Imágen Bienvenida"
        width={125}
        height={125}
        unoptimized
      />
      <div className="my-8 text-lg text-center">
        Bienvenido{" "}
        <strong>
          {newUser.isBusiness
            ? newUser.businessName
            : newUser.firstName + " " + newUser.lastName}
        </strong>
        , ya eres parte de la familia Qury.
      </div>
      <div className="flex justify-center">
        {isExploding && <ConfettiExplosion />}
      </div>
      {signInLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <button
          onClick={onContinue}
          className="flex mx-auto text-white bg-primary font-bold rounded-lg px-5 py-2.5 hover:bg-primary-dark focus:ring-2 focus:outline-none focus:ring-primary"
        >
          Completar
        </button>
      )}
    </React.Fragment>
  );
};

export default SuccessMessage;
