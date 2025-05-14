import { useEffect, useState, useRef } from "react";
import { Message, GroupChat, UserChat } from "../types/chat";
import { ChatService } from "@/features/chat/api/chatService";
import classes from "./ChatWindow.module.scss";

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
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, [chat, type]);

  const initialScrollDone = useRef(false);

  useEffect(() => {
    if (!initialScrollDone.current && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      initialScrollDone.current = true;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const body =
      type === "group"
        ? {
            content: newMessage,
            receiverGroupId: (chat as GroupChat).groupId,
          }
        : {
            content: newMessage,
            receiverUserId: (chat as UserChat).userId,
          };

    try {
      await ChatService.sendMessage(body);
      setNewMessage("");
      await fetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Nie udało się wysłać wiadomości.");
    }
  };

  return (
    <div data-theme="dark" className={classes.chatWindow}>
      <h2 className={classes.chatTitle}>
        {type === "group"
          ? (chat as GroupChat).groupName
          : `${(chat as UserChat).userFirstName} ${(chat as UserChat).userLastName}`}
      </h2>

      <div className={classes.messagesContainer}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={classes.message}>
              <span className={classes.senderName}>
                {msg.senderFirstName} {msg.senderLastName}
              </span>
              <div className={classes.messageContent}>{msg.content}</div>
              <span className={classes.timestamp}>
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <div className={classes.noMessages}>Brak wiadomości</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={classes.inputSection}>
        <input
          className={classes.input}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Wpisz wiadomość..."
        />
        <button className={classes.sendButton} onClick={sendMessage}>
          Wyślij
        </button>
      </div>
    </div>
  );
};
