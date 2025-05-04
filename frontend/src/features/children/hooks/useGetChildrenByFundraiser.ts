import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/lib/apiClient";
import { ChildrenService } from "@/features/children/api/childrenService.ts";
import { useDecorateChildWithMetadata } from "@/features/children/hooks/useDecorateChildWithMetadata.ts";

export const useGetChildrenByFundraiser = (fundraiserId?: number) => {
    const decorate = useDecorateChildWithMetadata();

    return useQuery({
        queryFn: () => ChildrenService.getByFundraiser(fundraiserId ?? 0),
        queryKey: [QueryKey.Children, { fundraiserId }],
        enabled: !!fundraiserId,
        select: (children) => children.map((child) => ({ ...child, ...decorate(child) })),
    });
};
