import { Suspense } from "react";
import SidebarModal from "./sidebar-modal";
import ListDefaultSkeleton from "@/lib/components/skeletons/list-default";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import ChatService from "@/lib/services/chat";
import ChatView from "@/lib/components/chat/view";

export default async function ChatModalPage() {
  const session = await getServerSession(authOptions);
  const messages = session ? await ChatService.getAll(session) : [];
  return (
    <SidebarModal>
      <Suspense fallback={<ListDefaultSkeleton />}>
        <ChatView messages={messages} fullView={false} />
      </Suspense>
    </SidebarModal>
  );
}
