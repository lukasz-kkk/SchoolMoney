import { useQuery } from "@tanstack/react-query";
import { FundraisersService } from "@/features/fundraisers/api/fundraisersService.ts";
import { QueryKey } from "@/lib/apiClient";
import { useDecorateFundraiserWithMetadata } from "@/features/fundraisers/hooks/useDecorateFundraiserWithMetadata.ts";

export const useFundraisers = () => {
    const decorate = useDecorateFundraiserWithMetadata();

    return useQuery({
        queryFn: FundraisersService.getAll,
        queryKey: [QueryKey.Fundraisers],
        select: (data) => data.map(decorate),
    });
};
