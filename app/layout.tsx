import Header from "@/lib/components/header/header";
import Footer from "@/lib/components/footer/footer";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-chat-elements/dist/main.css";
import { Inter } from "next/font/google";
import { ReactElement, Suspense } from "react";
import classNames from "classnames";
import ScrollToTop from "@/lib/components/scroll-to-top/scroll-to-top";
import CookieConsent from "@/lib/components/cookie-consent/cookie-consent";
import FloatingShoppingCart from "@/lib/components/cart/floating-shopping-cart";
import { NextAuthProvider } from "@/lib/providers/next-auth-provider";
import { ShoppingCartProvider } from "@/lib/providers/shopping-cart-provider";
import { ToastContainer } from "react-toastify";
import StoreInitializer from "@/lib/components/storeInitializer";
import { ModalProvider } from "@/lib/providers/modal-provider";
import WhatsappWidget from "@/lib/components/ui/whatsapp-widget";
import { Analytics } from "@vercel/analytics/react";
import ChatBubble from "@/lib/components/chat/bubble";
import ChatBox from "@/lib/components/chat/box";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Qury",
  description: "Marketplace de los mayoristas peruanos",
};

type Props = {
  authModal: ReactElement;
  modal: ReactElement;
};

export default function RootLayout({
  children,
  authModal,
  modal,
}: React.PropsWithChildren<Props>) {
  return (
    <html lang="en">
      <head>
        {/* <Script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></Script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pace-js@latest/pace-theme-default.min.css"
        /> */}
      </head>
      <body
        className={classNames("bg-gray-100 pb-[75px] sm:pb-0", inter.className)}
      >
        <NextAuthProvider>
          <StoreInitializer productBuy={null} modalFlagUrl={""} />
          <ShoppingCartProvider>
            <ModalProvider>
              <WhatsappWidget />
              {authModal}
              {modal}
              <Header />
              {children}
              <Analytics />
              <FloatingShoppingCart />
              <CookieConsent />
              <ScrollToTop />
              <Footer />
              <ToastContainer />
              <ChatBox />
              {/* <ChatBubble /> */}
            </ModalProvider>
          </ShoppingCartProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
