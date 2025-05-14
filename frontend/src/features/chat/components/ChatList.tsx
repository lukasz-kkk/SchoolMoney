import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import {
  ChatService,
  PossibleReceiverGroup,
  PossibleReceiverUser,
} from "@/features/chat/api/chatService";
import { GroupChat, UserChat } from "../types/chat";

import classes from "./ChatList.module.scss";

type Props = {
  onSelectChat: (chat: GroupChat | UserChat, type: "group" | "user") => void;
};

export const ChatList = ({ onSelectChat }: Props) => {
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [possibleUsers, setPossibleUsers] = useState<PossibleReceiverUser[]>([]);
  const [possibleGroups, setPossibleGroups] = useState<PossibleReceiverGroup[]>([]);
  const [showNewChatList, setShowNewChatList] = useState(false);

  useEffect(() => {
    ChatService.getChatList()
      .then((data) => {
        setGroupChats(data.groupChatList || []);
        setUserChats(data.userChatList || []);
      })
      .catch((err) => {
        console.error("Failed to load chat list", err);
      });
  }, []);

  const handleFetchPossibleReceivers = async () => {
    try {
      const data = await ChatService.getPossibleReceivers();
      setPossibleUsers(data?.users ?? []);
      setPossibleGroups(data?.groups ?? []);
      setShowNewChatList(true);
    } catch (error) {
      console.error("Failed to fetch possible receivers:", error);
      setPossibleUsers([]);
      setPossibleGroups([]);
    }
  };

  return (
    <div className={classes.chatList}>
      <h2 className={classes.sectionTitle}>Czaty grupowe</h2>
      {groupChats.map((chat) => (
        <Button
          key={`group-${chat.groupId}`}
          variant="ghost"
          onClick={() => onSelectChat(chat, "group")}
          className={classes.chatButton}
        >
          {chat.groupName}
        </Button>
      ))}

      <h2 className={classes.sectionTitle}>Czaty z użytkownikami</h2>
      {userChats.map((chat) => (
        <Button
          key={`user-${chat.userId}`}
          variant="ghost"
          onClick={() => onSelectChat(chat, "user")}
          className={classes.chatButton}
        >
          {chat.userFirstName} {chat.userLastName}
        </Button>
      ))}

      <div>
        <Button onClick={handleFetchPossibleReceivers} className={classes.newChatButton}>
          Nowy czat
        </Button>
      </div>

      {showNewChatList && (
        <div className={classes.newChatSection}>
          {possibleGroups?.length > 0 && (
            <>
              <h2 className={classes.sectionTitle}>Dostępne grupy</h2>
              {possibleGroups.map((group) => (
                <Button
                  key={`possible-group-${group.id}`}
                  variant="ghost"
                  onClick={() =>
                    onSelectChat(
                      {
                        groupId: group.id,
                        groupName: group.name,
                        lastMessageSent: null,
                      },
                      "group"
                    )
                  }
                  className={classes.chatButton}
                >
                  {group.name}
                </Button>
              ))}
            </>
          )}

          {possibleUsers?.length > 0 && (
            <>
              <h2 className={classes.sectionTitle}>Dostępni użytkownicy</h2>
              {possibleUsers.map((user) => (
                <Button
                  key={`possible-user-${user.id}`}
                  variant="ghost"
                  onClick={() =>
                    onSelectChat(
                      {
                        userId: user.id,
                        userFirstName: user.firstName,
                        userLastName: user.lastName,
                        lastMessageSent: null,
                      },
                      "user"
                    )
                  }
                  className={classes.chatButton}
                >
                  {user.firstName} {user.lastName}
                </Button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};
