import { useEffect, useState } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import { AuthService } from "@/features/auth/api/authService";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";

export const useSeamlessSignIn = () => {
    const { user, login } = useUser();
    const [isPending, setIsPending] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setIsPending(false);
            return;
        }

        const handleSeamlessSignIn = async () => {
            setIsPending(true);

            try {
                const myself = await AuthService.getMyself();
                login(myself);
            } catch (err) {
                navigate(AppRoute.SIGN_IN);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        };

        void handleSeamlessSignIn();
    }, [login, navigate, user]);

    return { isPending };
};
