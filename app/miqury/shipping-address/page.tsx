import { getServerSession } from "next-auth";
import AddressService from "@/lib/services/address";
import { authOptions } from "@/lib/auth/auth";
import ShippingAddressList from "@/lib/components/shipping-address/list";

export default async function ShippingAddressPages() {
  const session = await getServerSession(authOptions);
  const shippingAddresses = session ? await AddressService.getAll(session) : [];

  return (
    <div className="mt-4 mr-4">
      <ShippingAddressList addresses={shippingAddresses} />
    </div>
  );
}
