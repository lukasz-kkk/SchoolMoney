import { requestClient } from "@/lib/request/requestClient";
import { FinancialAccount, FinancialAccountNumber, Transaction } from "@/features/finances/types/Finances";

type AccountDto = {
    accountNumber: FinancialAccountNumber;
    balance: number;
};

type TransactionDto = {
    amount: number;
    name: string;
    sourceAccountNumber: FinancialAccountNumber;
    targetAccountNumber: FinancialAccountNumber;
    senderFirstName: string;
    senderLastName: string;
    senderId: number;
    date: string;
};

type TransferMoneyRequestBody = {
    amount: number;
    name: string;
    sourceAccountNumber: FinancialAccountNumber;
    targetAccountNumber: FinancialAccountNumber;
};

export class FinancialAccountService {
    public static async getAccount(): Promise<FinancialAccount> {
        const { data } = await requestClient.get<AccountDto>("/FinancialAccount/ByLoggedUser");
        return FinancialAccountService.mapDtoToAccount(data);
    }

    public static async transferMoney(body: TransferMoneyRequestBody): Promise<void> {
        await requestClient.post("/FinancialAccount/Transaction", body);
    }

    public static async getHistory(accountNumber: FinancialAccountNumber): Promise<Transaction[]> {
        const { data } = await requestClient.get(`/FinancialAccount/TransactionsHistory/${accountNumber}`);
        return data.map(FinancialAccountService.mapDtoToTransaction);
    }

    private static mapDtoToAccount({ balance, accountNumber }: AccountDto): FinancialAccount {
        return {
            balance,
            accountNumber,
        };
    }

    private static mapDtoToTransaction(dto: TransactionDto): Transaction {
        return {
            name: dto.name,
            amount: dto.amount,
            sourceAccountNumber: dto.sourceAccountNumber,
            targetAccountNumber: dto.targetAccountNumber,
            senderFirstName: dto.senderFirstName,
            senderLastName: dto.senderLastName,
            senderId: dto.senderId,
            date: new Date(dto.date),
        };
    }
}
