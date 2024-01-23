import { authOptions } from "@/lib/auth/auth";
import NotificationsList from "@/lib/components/notifications/list";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import NotificationService from "@/lib/services/notifications";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  const notifications = session
    ? await NotificationService.getAll(session)
    : [];

  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <Suspense fallback={<ListDefaultSkeleton />}>
          <NotificationsList
            notifications={notifications}
            className="max-h-[800px]"
          />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
