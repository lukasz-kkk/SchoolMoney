export type FinancialAccount = {
    accountNumber: FinancialAccountNumber;
    balance: number;
};

type FinancialAccountNumber = string;

export type Transaction = {
    senderId: number;
    name: string;
    amount: number;
    sourceAccountNumber: FinancialAccountNumber;
    targetAccountNumber: FinancialAccountNumber;
    senderFirstName: string;
    senderLastName: string;
    date: Date;
};
