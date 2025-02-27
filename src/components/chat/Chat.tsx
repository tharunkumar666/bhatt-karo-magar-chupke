
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface ChatProps {
  roomId: string;
}

export const Chat = ({ roomId }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const copyRoomLink = () => {
    const url = `${window.location.origin}/chat/${roomId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share this link with someone to start chatting.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

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
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage("This is a simulated response!", "other");
    }, 2000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-background to-muted">
      <div className="flex items-center justify-between gap-2 border-b bg-background/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold">Private Chat</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={copyRoomLink}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          Share Link
        </Button>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-primary/60" />
            </div>
          )}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
