import Header from "@/lib/components/header/header";
import Footer from "@/lib/components/footer/footer";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import classNames from "classnames";

type Props = {};

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <React.Fragment>{children}</React.Fragment>;
}
