import { useCallback } from "react";
import { useAllGroups } from "@/features/groups/hooks/useAllGroups.ts";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";

export const useDecorateFundraiserWithMetadata = () => {
    const { data: groups } = useAllGroups();

    return useCallback(
        (fundraiser: Fundraiser) => {
            const group = groups?.find((g) => g.id === fundraiser.groupId);
            return { ...fundraiser, treasurerId: group?.treasurer?.id };
        },
        [groups]
    );
};
