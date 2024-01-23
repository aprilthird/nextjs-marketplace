import { authOptions } from "@/lib/auth/auth";
import ChatList from "@/lib/components/chat/list";
import ChatService from "@/lib/services/chat";
import { getServerSession } from "next-auth";

export default async function ChatsPage() {
  const session = await getServerSession(authOptions);
  const messages = session ? await ChatService.getAll(session) : [];

  return (
    <div className="m-4 h-full">
      <ChatList messages={messages} />
    </div>
  );
}
