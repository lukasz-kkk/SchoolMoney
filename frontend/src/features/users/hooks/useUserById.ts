import { useUsers } from "@/features/users/hooks/useUsers.ts";

export const useUserById = (id?: number) => {
    const { data, ...rest } = useUsers();
    return { ...rest, data: data?.find((user) => user.id === id) };
};
