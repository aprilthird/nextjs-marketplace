import { authOptions } from "@/lib/auth/auth";
import NotificationsList from "@/lib/components/notifications/list";
import NotificationService from "@/lib/services/notifications";
import { getServerSession } from "next-auth";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  const notifications = session
    ? await NotificationService.getAll(session)
    : [];
  return (
    <div className="m-4 h-full">
      <NotificationsList
        notifications={notifications}
        className="max-h-[800px]"
      />
    </div>
  );
}
