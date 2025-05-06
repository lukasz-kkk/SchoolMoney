import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey } from "@/lib/apiClient";

export const useAllGroups = () => {
    return useQuery({
        queryFn: GroupsService.getAll,
        queryKey: [QueryKey.Groups, { all: true }],
    });
};
