import { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import {
  ChatService,
  PossibleReceiverGroup,
  PossibleReceiverUser,
} from "@/features/chat/api/chatService";
import { GroupChat, UserChat } from "../types/chat";

type Props = {
  onSelectChat: (chat: GroupChat | UserChat, type: "group" | "user") => void;
};

export const ChatList = ({ onSelectChat }: Props) => {
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [userChats, setUserChats] = useState<UserChat[]>([]);
  const [possibleUsers, setPossibleUsers] = useState<PossibleReceiverUser[] | null>(null);
  const [possibleGroups, setPossibleGroups] = useState<PossibleReceiverGroup[] | null>(null);
  const [showDebugList, setShowDebugList] = useState(false);

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
      setShowDebugList(true);
    } catch (error) {
      console.error("Failed to fetch possible receivers:", error);
      setPossibleUsers([]);
      setPossibleGroups([]);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 border-r border-gray-300 overflow-y-auto">
      <h2 className="font-semibold text-lg mb-2">Czaty grupowe</h2>
      {groupChats.map((chat) => (
        <Button
          key={`group-${chat.groupId}`}
          variant="ghost"
          onClick={() => onSelectChat(chat, "group")}
          className="w-full justify-start"
        >
          {chat.groupName}
        </Button>
      ))}

      <h2 className="font-semibold text-lg mt-4 mb-2">Czaty z użytkownikami</h2>
      {userChats.map((chat) => (
        <Button
          key={`user-${chat.userId}`}
          variant="ghost"
          onClick={() => onSelectChat(chat, "user")}
          className="w-full justify-start"
        >
          {chat.userFirstName+""+chat.userLastName}
        </Button>
      ))}

      <div className="mt-6">
        <Button onClick={handleFetchPossibleReceivers} className="w-full">
          Nowy czat
        </Button>
      </div>

      {showDebugList && (
        <div className="mt-4 text-sm">
            <h3 className="font-semibold">Grupy:</h3>
            <ul className="mb-2 pl-4 list-disc">
            {(possibleGroups ?? []).map((group) => (
                <li
                key={`possible-group-${group.id}`}
                className="cursor-pointer hover:underline"
                onClick={() =>
                    onSelectChat(
                    {
                        groupId: group.id,
                        groupName: group.name,
                        lastMessageSent: null, // placeholder
                    },
                    "group"
                    )
                }
                >
                {group.name}
                </li>
            ))}
            </ul>

            <h3 className="font-semibold">Użytkownicy:</h3>
            <ul className="pl-4 list-disc">
            {(possibleUsers ?? []).map((user) => (
                <li
                key={`possible-user-${user.id}`}
                className="cursor-pointer hover:underline"
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
                >
                {user.firstName} {user.lastName}
                </li>
            ))}
            </ul>
        </div>
        )}
    </div>
  );
};
