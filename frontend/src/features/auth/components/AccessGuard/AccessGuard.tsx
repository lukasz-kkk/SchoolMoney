import { PropsWithChildren } from "react";
import { AccessLevel } from "@/features/auth/types/Authorization";
import { AppRoute } from "@/app/router";
import { Navigate } from "react-router-dom";
import { useAccessValidation } from "@/features/auth/hooks/useAccessLevel";

type BaseAccessGuardProps = PropsWithChildren<{
    redirectTo?: AppRoute;
}>;

type AccessGuardProps = BaseAccessGuardProps &
    (
        | {
              requiredAccess: AccessLevel;
          }
        | {
              userId: number;
          }
    );

export const AccessGuard = ({ children, redirectTo, ...rest }: AccessGuardProps) => {
    const { validateAccessLevel, validateUserIdentifier } = useAccessValidation();
    const isAllowed =
        "requiredAccess" in rest ? validateAccessLevel(rest.requiredAccess) : validateUserIdentifier(rest.userId);

    if (!isAllowed && redirectTo) {
        return <Navigate to={redirectTo} replace />;
    }

    if (!isAllowed) {
        return null;
    }

    return <>{children}</>;
};
