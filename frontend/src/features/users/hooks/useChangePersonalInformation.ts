import { useMutation } from "@tanstack/react-query";
import { ChangePersonalInformationRequestBody, UsersService } from "@/features/users/api/usersService";
import { useUser } from "@/features/auth/hooks/useUser";

export const useChangePersonalInformation = () => {
    const { user } = useUser();

    const handleChangePersonalInformation = (body: ChangePersonalInformationRequestBody) => {
        if (!user) {
            throw new Error("User is not signed in!");
        }

        return UsersService.changePersonalInformation(body, user.id);
    };

    return useMutation({
        mutationFn: handleChangePersonalInformation,
    });
};
