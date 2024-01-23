import { Suspense } from "react";
import SidebarModal from "./sidebar-modal";
import NotificationsList from "@/lib/components/notifications/list";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import NotificationService from "@/lib/services/notifications";

export default async function NotificationsModalPage() {
  const session = await getServerSession(authOptions);
  const notifications = session
    ? await NotificationService.getAll(session)
    : [];

  return (
    <SidebarModal>
      <Suspense fallback={<ListDefaultSkeleton />}>
        <NotificationsList
          notifications={notifications}
          className="max-h-[600px]"
        />
      </Suspense>
    </SidebarModal>
  );
}
