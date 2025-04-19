import { useMutation } from "@tanstack/react-query";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";
import { ChildrenService } from "@/features/children/api/childrenService";

export const useAcceptChild = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: ChildrenService.accept,
        onSuccess: async () => {
            void invalidate(QueryKey.Children);
        },
    });
};
