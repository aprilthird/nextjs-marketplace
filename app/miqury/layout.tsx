import React from "react";
import MiQuryProfile from "@/lib/components/miqury/profile";
import MiQuryMenu from "@/lib/components/miqury/menu";

export default function MyQuryLayout({ children }: React.PropsWithChildren) {
  // const headersList = headers();
  // const pathname = headersList.get("x-url") || "";

  return (
    <React.Fragment>
      <div className="container mx-auto my-24 lg:my-40">
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-5/6 xl:w-4/6 mx-auto">
          <MiQuryProfile />
          <hr className="mt-4" />
          <div className="flex flex-col sm:flex-row">
            <MiQuryMenu />
            <div className="grow">{children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
