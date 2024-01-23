import { authOptions } from "@/lib/auth/auth";
import PurchaseForm from "@/lib/components/purchase/purchase-form";
import AddressService from "@/lib/services/address";
import PaymentMethodService from "@/lib/services/payment-method";
import { getServerSession } from "next-auth";

type Props = {
  params: { id: string };
};

export default async function PurchasePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const shippingAddresses = session ? await AddressService.getAll(session) : [];
  const paymentMethods = session
    ? await PaymentMethodService.getAll(session)
    : [];

  return (
    <section className="bg-gray-50">
      <PurchaseForm
        id={params.id}
        shippingAddresses={shippingAddresses}
        paymentMethods={paymentMethods}
      />
    </section>
  );
}
