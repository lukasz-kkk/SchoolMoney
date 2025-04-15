import { useMutation } from "@tanstack/react-query";
import { UsersService } from "@/features/users/api/usersService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useDisableUser = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: UsersService.disableOne,
        onSuccess: () => invalidate(QueryKey.Users),
    });
};
