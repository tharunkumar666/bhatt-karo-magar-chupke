
export interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  createdAt: Date;
}
