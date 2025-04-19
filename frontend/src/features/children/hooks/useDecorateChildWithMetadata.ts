import { BaseChild } from "@/features/children/types/Child";
import { useCallback } from "react";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useGroups } from "@/features/groups/hooks/useGroups";

export const useDecorateChildWithMetadata = () => {
    const { data: parents } = useUsers();
    const { data: groups } = useGroups();

    return useCallback(
        (child: BaseChild) => {
            const parent = parents?.find((p) => p.id === child.parentId);
            const group = groups?.find((g) => g.id === child.groupId);

            return { ...child, parent, group };
        },
        [groups, parents]
    );
};
