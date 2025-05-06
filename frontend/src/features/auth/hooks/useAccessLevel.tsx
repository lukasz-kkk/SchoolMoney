import { useUser } from "@/features/auth/hooks/useUser";
import { useCallback } from "react";
import { AccessLevel } from "@/features/auth/types/Authorization";

export const useAccessValidation = () => {
    const { user } = useUser();

    const validateAccessLevel = useCallback(
        (requiredAccessLevel: AccessLevel) => {
            switch (requiredAccessLevel) {
                case "unauthenticated":
                    return !user;

                case "authenticated":
                    return !!user;

                default:
                    return user?.role === requiredAccessLevel;
            }
        },
        [user]
    );

    const validateUserIdentifier = useCallback(
        (id: number | number[]) => {
            if (!user) {
                return false;
            }

            if (typeof id === "number") {
                return user?.id === id;
            } else {
                return id.includes(user.id);
            }
        },
        [user]
    );

    return { validateAccessLevel, validateUserIdentifier };
};
