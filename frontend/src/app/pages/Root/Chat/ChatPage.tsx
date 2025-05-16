import { useState } from "react";
import { ChatList } from "@/features/chat/components/ChatList";
import { ChatWindow } from "@/features/chat/components/ChatWindow";
import { GroupChat, UserChat } from "@/features/chat/types/chat";
import { Page } from "@/components/Page/Page";
import classes from "./ChatPage.module.scss";

export const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<GroupChat | UserChat | null>(null);
  const [chatType, setChatType] = useState<"group" | "user" | null>(null);

  return (
    <Page.Root>
      <Page.Header items={[{ label: "Czaty" }]} />
      <Page.Content>
        <div className={classes.chatPageContainer}>
          <div className={classes.chatListWrapper}>
            <ChatList
              onSelectChat={(chat, type) => {
                setSelectedChat(chat);
                setChatType(type);
              }}
            />
          </div>

          <div className={classes.chatWindowWrapper}>
            {selectedChat && chatType ? (
              <ChatWindow chat={selectedChat} type={chatType} />
            ) : (
              <div className={classes.noChatSelected}>
                Wybierz czat z listy
              </div>
            )}
          </div>
        </div>
      </Page.Content>
    </Page.Root>
  );
};
