import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey } from "@/lib/apiClient";

export const useGroups = () => {
    return useQuery({
        queryFn: GroupsService.getOwn,
        queryKey: [QueryKey.Groups],
    });
};
