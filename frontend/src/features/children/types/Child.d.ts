import { User } from "@/types/User";
import { Group } from "@/features/groups/types/Group";

export type BaseChild = {
    id: number;
    firstName: string;
    lastName: string;
    parentId: number;
    groupId: number;
    isAccepted: boolean;
    dateOfBirth: Date;
    createdAt: Date;
};

export type Child = BaseChild & {
    parent?: User;
    group?: Group;
};

export type FundraiserChild = Child & {
    hasPaid: boolean;
};
