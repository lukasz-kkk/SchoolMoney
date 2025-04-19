import { useMutation } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useRemoveChild = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: ChildrenService.removeOne,
        onSuccess: () => {
            void invalidate(QueryKey.Children);
        },
    });
};
