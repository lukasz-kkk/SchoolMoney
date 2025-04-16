import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/lib/apiClient";
import { FinancialAccountService } from "@/features/finances/api/financialAccountService.ts";

export const useFinancialAccount = () => {
    return useQuery({
        queryKey: [QueryKey.FinancialAccount],
        queryFn: FinancialAccountService.getAccount,
    });
};
