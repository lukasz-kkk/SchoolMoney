import { useMutation } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useAddChildToGroup = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: GroupsService.addChildToGroup,
        onSuccess: async () => {
            void invalidate(QueryKey.Children);
        },
    });
};
