export type FinancialAccount = {
    accountNumber: FinancialAccountNumber;
    balance: number;
};

type FinancialAccountNumber = string;

export type Transaction = {
    id: number;
    name: string;
    amount: number;
    sourceAccountNumber: FinancialAccountNumber;
    targetAccountNumber: FinancialAccountNumber;
    createdAt: Date;
};
