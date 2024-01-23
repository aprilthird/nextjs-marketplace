import { authOptions } from "@/lib/auth/auth";
import FavoritesTabs from "@/lib/components/favorites/tabs";
import FavoriteService from "@/lib/services/favorite";
import { getServerSession } from "next-auth";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  const favorites = session ? await FavoriteService.getAll(session) : [];

  return (
    <div className="h-full m-4">
      <FavoritesTabs favorites={favorites} />
    </div>
  );
}
