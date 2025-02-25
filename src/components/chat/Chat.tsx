
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addMessage = (content: string, sender: "user" | "other") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = (content: string) => {
    addMessage(content, "user");
    // Simulate received message
    setTimeout(() => {
      addMessage("This is a simulated response!", "other");
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-background to-muted">
      <div className="flex items-center justify-center border-b bg-background/50 p-4 backdrop-blur-sm">
        <h1 className="text-xl font-semibold">Chat App</h1>
      </div>
      
      <ScrollArea
        ref={scrollRef}
        className="flex-1 p-4"
      >
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
