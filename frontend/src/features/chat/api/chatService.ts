import { requestClient } from "@/lib/request/requestClient";
import type { GroupChat, UserChat, Message } from "@/features/chat/types/chat.ts";

type SendMessageRequestBody = {
  receiverGroupId?: number | null;
  receiverUserId?: number | null;
  content: string;
};

type GetMessagesRequestParams = {
  receiverUserId?: number; 
  receiverGroupId?: number;
};

type PossibleReceiverUserDto = {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
};

type PossibleReceiverGroupDto = {
  id: number;
  name: string;
};

type PossibleReceiversResponseDto = {
  userList: PossibleReceiverUserDto[];
  groupList: PossibleReceiverGroupDto[];
};

type ChatListResponseDto = {
  userChatList: UserChat[];
  groupChatList: GroupChat[];
};

export type PossibleReceiverUser = PossibleReceiverUserDto;
export type PossibleReceiverGroup = PossibleReceiverGroupDto;

export type PossibleReceivers = {
    users: PossibleReceiverUser[];
    groups: PossibleReceiverGroup[];
};


export class ChatService {
  public static async sendMessage(body: SendMessageRequestBody): Promise<void> {
    await requestClient.post("/Chat/Message", body);
  }

  public static async getChatList(): Promise<ChatListResponseDto> {
    const { data } = await requestClient.get<ChatListResponseDto>("/Chat/List");
    return data;
  }

  public static async getMessages(params: GetMessagesRequestParams): Promise<Message[]> {
    const queryParams = new URLSearchParams();
    if (params.receiverUserId !== undefined) {
      queryParams.append("ReceiverUserId", String(params.receiverUserId));
    }
    if (params.receiverGroupId !== undefined) {
      queryParams.append("ReceiverGroupId", String(params.receiverGroupId));
    }

    const { data } = await requestClient.get<Message[]>(`/Chat?${queryParams.toString()}`);
    return data;
  }

  public static async getPossibleReceivers(): Promise<PossibleReceivers> {
    const { data } = await requestClient.get<PossibleReceiversResponseDto>("/Chat/PossibleReceivers");
    return {
        users: data.userList,
        groups: data.groupList,
    };
  }
}
