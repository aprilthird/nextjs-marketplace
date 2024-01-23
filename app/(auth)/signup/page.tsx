import SignupForm from "@/lib/components/signup/signup-form";
import React from "react";

export default function SignupPage() {
  return (
    <React.Fragment>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-2 py-8 mx-auto md:px-6">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-2">
            <SignupForm />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
