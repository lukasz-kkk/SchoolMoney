import { useMutation } from "@tanstack/react-query";
import { UsersService } from "@/features/users/api/usersService";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useEnableUser = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: UsersService.enableOne,
        onSuccess: () => invalidate(QueryKey.Users),
    });
};
