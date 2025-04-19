import { useQuery } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { QueryKey } from "@/lib/apiClient";
import { useDecorateChildWithMetadata } from "@/features/children/hooks/useDecorateChildWithMetadata";

export const useGetChildrenByGroup = (groupId?: number) => {
    const decorate = useDecorateChildWithMetadata();

    return useQuery({
        queryKey: [QueryKey.Children, { groupId }],
        enabled: !!groupId,
        queryFn: () => ChildrenService.getByGroup(groupId ?? 0),
        select: (children) => children.map(decorate),
    });
};
