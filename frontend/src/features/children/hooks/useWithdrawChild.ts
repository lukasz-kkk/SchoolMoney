import { useMutation } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useWithdrawChild = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: ChildrenService.withdraw,
        onSuccess: () => {
            void invalidate(QueryKey.Children);
        },
    });
};
