import { useQuery } from "@tanstack/react-query";
import { GroupsService } from "@/features/groups/api/groupsService";
import { QueryKey } from "@/lib/apiClient";
import { useUser } from "@/features/auth/hooks/useUser.ts";

export const useGroups = () => {
    const { user } = useUser();

    return useQuery({
        queryFn: user?.role === "Admin" ? GroupsService.getAll : GroupsService.getOwn,
        queryKey: [QueryKey.Groups],
    });
};
