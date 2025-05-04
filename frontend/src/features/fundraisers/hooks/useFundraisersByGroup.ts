import { useQuery } from "@tanstack/react-query";
import { FundraisersService } from "@/features/fundraisers/api/fundraisersService.ts";
import { QueryKey } from "@/lib/apiClient";

export const useFundraisersByGroup = (groupId?: number) => {
    return useQuery({
        queryFn: () => FundraisersService.getByGroup(groupId ?? 0),
        queryKey: [QueryKey.Fundraisers],
        enabled: !!groupId,
    });
};
