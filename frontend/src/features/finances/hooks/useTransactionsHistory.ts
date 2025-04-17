import { FinancialAccountNumber } from "@/features/finances/types/Finances";
import { useQuery } from "@tanstack/react-query";
import { FinancialAccountService } from "@/features/finances/api/financialAccountService.ts";
import { QueryKey } from "@/lib/apiClient";

type UseTransactionsHistoryOptions = {
    accountNumber?: FinancialAccountNumber;
};

export const useTransactionsHistory = ({ accountNumber }: UseTransactionsHistoryOptions) => {
    return useQuery({
        queryFn: async () => FinancialAccountService.getHistory(accountNumber ?? ""),
        queryKey: [QueryKey.Transaction],
        enabled: !!accountNumber,
    });
};
