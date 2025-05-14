import { useEffect, useState, useRef } from "react";
import { Message, GroupChat, UserChat } from "../types/chat";
import { ChatService } from "@/features/chat/api/chatService";

type Props = {
  chat: GroupChat | UserChat;
  type: "group" | "user";
};

export const ChatWindow = ({ chat, type }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = async () => {
    try {
      const params =
        type === "group"
          ? { receiverGroupId: (chat as GroupChat).groupId }
          : { receiverUserId: (chat as UserChat).userId };

      const data = await ChatService.getMessages(params);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]); // Safe fallback
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, [chat, type]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    var body;

    if (type === "group") {
      body = {
        content: newMessage,
        receiverGroupId: (chat as GroupChat).groupId,
      };
    } else {
      body = {
        content: newMessage,
        receiverUserId: (chat as UserChat).userId
      };
    }

    try {
      await ChatService.sendMessage(body);
      setNewMessage("");
      await fetchMessages(); // Refresh after sending
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Nie udało się wysłać wiadomości.");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        {type === "group" ? (chat as GroupChat).groupName : (chat as UserChat).userFirstName+" "+(chat as UserChat).userLastName}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 border rounded p-3">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm text-gray-500">{msg.senderFirstName + " " + msg.senderLastName}</span>
              <div className="bg-gray-100 p-2 rounded">{msg.content}</div>
              <span className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">Brak wiadomości</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 border rounded px-4 py-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Wpisz wiadomość..."
        />
        <button
          className="bg-jade-500 text-white px-4 py-2 rounded hover:bg-jade-600"
          onClick={sendMessage}
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};
