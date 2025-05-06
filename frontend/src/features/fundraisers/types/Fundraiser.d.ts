import { FinancialAccount } from "@/features/finances/types/Finances";

export type Fundraiser = {
    id: number;
    name: string;
    description: string;
    amountPerPerson: number;
    startDate: Date;
    endDate: Date;
    groupId: number;
    ownerId: number;
    treasurerId?: number;
    isBlocked: boolean;
    hasStarted: boolean;
    hasFinished: boolean;
    account: FinancialAccount;
};
