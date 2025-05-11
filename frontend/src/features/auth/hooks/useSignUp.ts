import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/features/auth/api/authService";
import { useUser } from "@/features/auth/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";
import { User } from "@/types/User";

export const useSignUp = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    const onSuccess = (user: User) => {
        login(user);
        navigate(AppRoute.GROUPS);
    };

    return useMutation({ mutationFn: AuthService.signUp, onSuccess });
};
