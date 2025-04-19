import { useQuery } from "@tanstack/react-query";
import { UsersService } from "@/features/users/api/usersService";
import { QueryKey } from "@/lib/apiClient";

export const useUsers = () => {
    return useQuery({
        queryFn: UsersService.getAll,
        queryKey: [QueryKey.Users],
    });
};
