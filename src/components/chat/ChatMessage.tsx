
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex w-full animate-message-fade-in items-end gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-primary" />
      )}
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-2 shadow-md transition-all",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-muted-foreground"
        )}
      >
        <p className="break-words text-sm leading-relaxed">{message.content}</p>
        <span className="mt-1 block text-[10px] opacity-70">
          {format(message.timestamp, "HH:mm")}
        </span>
      </div>
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-accent" />
      )}
    </div>
  );
};
