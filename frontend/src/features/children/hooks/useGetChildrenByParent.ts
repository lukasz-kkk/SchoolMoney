import { useQuery } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { QueryKey } from "@/lib/apiClient";
import { useDecorateChildWithMetadata } from "@/features/children/hooks/useDecorateChildWithMetadata";

type UseGetChildrenByParentOptions = {
    parentId: number;
};

export const useGetChildrenByParent = ({ parentId }: UseGetChildrenByParentOptions) => {
    const decorate = useDecorateChildWithMetadata();

    return useQuery({
        queryKey: [QueryKey, { parentId }],
        queryFn: () => ChildrenService.getByParent(parentId),
        select: (children) => children.map(decorate),
    });
};
