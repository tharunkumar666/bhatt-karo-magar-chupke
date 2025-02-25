
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createNewRoom = () => {
    const newRoomId = crypto.randomUUID();
    navigate(`/chat/${newRoomId}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-background to-muted p-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">Private Chat Room</h1>
      </div>

      <div className="grid w-full max-w-lg gap-6">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium">Create a New Chat Room</h2>
          <Button onClick={createNewRoom} className="w-full">
            Create Room
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium">Join Existing Room</h2>
          <form onSubmit={joinRoom} className="flex gap-2">
            <Input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID..."
              className="flex-1"
            />
            <Button type="submit" disabled={!roomId.trim()}>
              Join
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
