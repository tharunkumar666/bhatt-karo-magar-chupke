
import { Chat } from "@/components/chat/Chat";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId: string }>();

  if (!roomId) {
    return <div>Invalid room ID</div>;
  }

  return <Chat roomId={roomId} />;
}
