import { useMutation } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useRenameGroup = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: GroupsService.rename,
        onSuccess: async () => {
            void invalidate(QueryKey.Groups);
        },
    });
};
