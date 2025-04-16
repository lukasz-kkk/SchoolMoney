import { requestClient } from "@/lib/request/requestClient";
import { FinancialAccount, FinancialAccountNumber } from "@/features/finances/types/Finances";

type AccountDto = {
    accountNumber: FinancialAccountNumber;
    balance: number;
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

    private static mapDtoToAccount({ balance, accountNumber }: AccountDto): FinancialAccount {
        return {
            balance,
            accountNumber,
        };
    }
}
