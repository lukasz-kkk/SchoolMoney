import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export enum QueryKey {
    Users,
    Groups,
    Fundraisers,
    FinancialAccount,
    Transaction,
    Children,
}

export const useInvalidateQuery = () => {
    const client = useQueryClient();

    const invalidate = useCallback(
        async (...queryKeys: QueryKey[]) => {
            for (const key of queryKeys) {
                await client.invalidateQueries({ queryKey: [key] });
            }
        },
        [client]
    );

    return { invalidate };
};
