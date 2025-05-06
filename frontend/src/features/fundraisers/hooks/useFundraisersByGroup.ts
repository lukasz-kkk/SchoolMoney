import { useQuery } from "@tanstack/react-query";
import { FundraisersService } from "@/features/fundraisers/api/fundraisersService.ts";
import { QueryKey } from "@/lib/apiClient";
import { useDecorateFundraiserWithMetadata } from "@/features/fundraisers/hooks/useDecorateFundraiserWithMetadata.ts";

export const useFundraisersByGroup = (groupId?: number) => {
    const decorate = useDecorateFundraiserWithMetadata();

    return useQuery({
        queryFn: () => FundraisersService.getByGroup(groupId ?? 0),
        queryKey: [QueryKey.Fundraisers],
        enabled: !!groupId,
        select: (data) => data.map(decorate),
    });
};
