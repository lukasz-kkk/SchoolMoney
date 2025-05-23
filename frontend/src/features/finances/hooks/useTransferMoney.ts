import { useMutation } from "@tanstack/react-query";
import { FinancialAccountService } from "@/features/finances/api/financialAccountService.ts";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useTransferMoney = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: FinancialAccountService.transferMoney,
        onSuccess: () => {
            void invalidate(QueryKey.FinancialAccount);
            void invalidate(QueryKey.Transaction);
            void invalidate(QueryKey.Fundraisers);
            void invalidate(QueryKey.Children);
        },
    });
};
