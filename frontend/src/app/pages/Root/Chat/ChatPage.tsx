import { useState } from "react";
import { ChatList } from "@/features/chat/components/ChatList";
import { ChatWindow } from "@/features/chat/components/ChatWindow";
import { GroupChat, UserChat } from "@/features/chat/types/chat";
import { Page } from "@/components/Page/Page";

export const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<GroupChat | UserChat | null>(null);
  const [chatType, setChatType] = useState<"group" | "user" | null>(null);

  return (
    <Page.Root>
      <Page.Header items={[{ label: "Czaty" }]} />
      <Page.Content>
        <div className="flex h-[calc(100vh-100px)] border rounded-lg overflow-hidden">
          <ChatList
            onSelectChat={(chat, type) => {
              setSelectedChat(chat);
              setChatType(type);
            }}
          />
          {selectedChat && chatType ? (
            <ChatWindow chat={selectedChat} type={chatType} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Wybierz czat z listy
            </div>
          )}
        </div>
      </Page.Content>
    </Page.Root>
  );
};