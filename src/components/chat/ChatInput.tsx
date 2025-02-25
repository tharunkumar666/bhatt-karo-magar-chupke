
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t bg-background/50 p-4 backdrop-blur-sm"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-background/50 backdrop-blur-sm"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim()}
        className="transition-transform active:scale-95"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
