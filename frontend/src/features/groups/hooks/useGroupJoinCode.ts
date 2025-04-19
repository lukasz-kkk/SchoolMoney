import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey } from "@/lib/apiClient";

export const useGroupJoinCode = (id?: number) => {
    return useQuery({
        queryFn: () => GroupsService.getJoinCode(id ?? 0),
        queryKey: [QueryKey.Groups, "join_code", { id }],
        enabled: !!id,
    });
};
