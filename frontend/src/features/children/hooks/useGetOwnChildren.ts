import { useQuery } from "@tanstack/react-query";
import { ChildrenService } from "@/features/children/api/childrenService";
import { QueryKey } from "@/lib/apiClient";
import { useDecorateChildWithMetadata } from "@/features/children/hooks/useDecorateChildWithMetadata";

export const useGetOwnChildren = () => {
    const decorate = useDecorateChildWithMetadata();

    return useQuery({
        queryKey: [QueryKey.Children, "Own"],
        queryFn: ChildrenService.getOwn,
        select: (children) => children.map(decorate),
    });
};
