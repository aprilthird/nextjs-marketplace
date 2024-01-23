import React, { useContext, useEffect } from "react";
import Modal from "@/lib/components/ui/modal";
import LoginForm from "@/lib/components/login/form";

export default function LoginModalPage({}: any) {
  return (
    <Modal title="Bienvenido" className="p-4" closeIcon="right">
      <LoginForm isDialog={true} />
    </Modal>
  );
}
