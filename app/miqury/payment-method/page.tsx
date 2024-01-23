import PaymentMethodService from "@/lib/services/payment-method";
import PaymentMethodForm from "./payment-method-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import PaymentMethodList from "@/lib/components/payment-method/list";

export default async function PaymentMethodPage() {
  const session = await getServerSession(authOptions);
  const paymentMethods = session
    ? await PaymentMethodService.getAll(session)
    : [];

  return (
    <div className="m-4">
      <PaymentMethodList paymentMethods={paymentMethods} />
      <PaymentMethodForm />
    </div>
  );
}
