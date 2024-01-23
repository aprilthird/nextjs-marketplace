import { authOptions } from "@/lib/auth/auth";
import ChatView from "@/lib/components/chat/view";
import NotificationsList from "@/lib/components/notifications/list";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import ChatService from "@/lib/services/chat";
import NotificationService from "@/lib/services/notifications";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  const messages = session ? await ChatService.getAll(session) : [];

  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 lg:py-4">
        <Suspense fallback={<ListDefaultSkeleton />}>
          <ChatView messages={messages} />
        </Suspense>
      </div>
    </React.Fragment>
  );
}
