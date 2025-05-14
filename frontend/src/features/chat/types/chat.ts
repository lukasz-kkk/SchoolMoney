export type GroupChat = {
    groupId: number;
    groupName: string;
    lastMessageSent: string | null;
};

export type UserChat = {
    userId: number;
    userFirstName: string;
    userLastName: string;
    lastMessageSent: string | null;
};

export type Message = {
    content: string;
    createdAt: string;
    messageId: number;
    senderFirstName: string;
    senderId: number;
    senderLastName: string;
};
