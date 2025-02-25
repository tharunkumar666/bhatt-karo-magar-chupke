
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-message-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p className="break-words text-sm">{message.content}</p>
        <span className="mt-1 block text-[10px] opacity-70">
          {format(message.timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
};
