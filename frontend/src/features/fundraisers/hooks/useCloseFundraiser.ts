import { useMutation } from "@tanstack/react-query";
import { FundraisersService } from "@/features/fundraisers/api/fundraisersService.ts";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useCloseFundraiser = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: FundraisersService.close,
        onSuccess: () => {
            void invalidate(QueryKey.Fundraisers);
        },
    });
};
