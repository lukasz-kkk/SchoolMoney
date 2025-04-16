import { useMutation } from "@tanstack/react-query";
import { ChangePasswordRequestBody, UsersService } from "@/features/users/api/usersService";
import { useUser } from "@/features/auth/hooks/useUser";

export const useChangePassword = () => {
    const { user } = useUser();

    const handleChangePassword = (body: ChangePasswordRequestBody) => {
        if (!user) {
            throw new Error("User is not signed in!");
        }

        return UsersService.changePassword(body, user.id);
    };

    return useMutation({
        mutationFn: handleChangePassword,
    });
};
