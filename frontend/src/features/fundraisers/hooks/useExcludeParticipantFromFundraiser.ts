import { useMutation } from "@tanstack/react-query";
import { FundraisersService } from "@/features/fundraisers/api/fundraisersService.ts";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useExcludeParticipantFromFundraiser = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: FundraisersService.excludeParticipant,
        onSuccess: () => {
            void invalidate(QueryKey.Children);
            void invalidate(QueryKey.Fundraisers);
        },
    });
};
