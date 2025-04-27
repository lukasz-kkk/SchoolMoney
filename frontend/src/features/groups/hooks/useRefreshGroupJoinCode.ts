import { useMutation } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useRefreshGroupJoinCode = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: GroupsService.refreshJoinCode,
        onSuccess: async () => {
            void invalidate(QueryKey.GroupJoinCode);
        },
    });
};
