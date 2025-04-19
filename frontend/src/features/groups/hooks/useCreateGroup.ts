import { useMutation } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useCreateGroup = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: GroupsService.create,
        onSuccess: async () => {
            void invalidate(QueryKey.Groups);
        },
    });
};
