"use client";

import Image from "next/image";
import { WhatsAppWidget } from "react-whatsapp-widget";

const imagenLogo = () => {
  return (
    <Image
      style={{
        objectFit: "contain",
        height: 45,
        width: 45,
        borderRadius: "100%",
      }}
      width={45}
      height={45}
      src="/assets/images/logo-white-1x.png"
      alt="Logo de qury"
    />
  );
};

const WhatsappWidget = () => {
  return (
    <WhatsAppWidget
      CompanyIcon={imagenLogo}
      phoneNumber="+51914022496"
      companyName="Soporte Qury"
      replyTimeText=""
      message="Hola! 👋🏼  ¿Cómo te podemos ayudar?"
      sendButtonText='Enviar'
      inputPlaceHolder= 'Escribe un mensaje'
    />
  );
};

export default WhatsappWidget;
