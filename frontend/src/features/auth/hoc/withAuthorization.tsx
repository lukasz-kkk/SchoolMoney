import { FC } from "react";
import { AppRoute } from "@/app/router";
import { AccessLevel } from "@/features/auth/types/Authorization";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";
import { useSeamlessSignIn } from "@/features/auth/hooks/useSeamlessSignIn.ts";
import { Spinner } from "@radix-ui/themes";

export default function withAuthorization<T extends object>(Component: FC<T>) {
    return (requiredAccess: AccessLevel, redirectTo: AppRoute) => {
        const WrappedComponent = (props: T) => {
            const { isPending } = useSeamlessSignIn();

            if (isPending) {
                return <Spinner />;
            }

            return (
                <AccessGuard requiredAccess={requiredAccess} redirectTo={redirectTo}>
                    <Component {...props} />
                </AccessGuard>
            );
        };

        WrappedComponent.displayName = `withAuthorization(${Component.displayName || Component.name || "Component"})`;
        return WrappedComponent;
    };
}

export function onlyAsUnauthenticated<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)("unauthenticated", AppRoute.ROOT);
}

export function onlyAsAuthenticated<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)("authenticated", AppRoute.SIGN_IN);
}

export function onlyAsParent<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)("User", AppRoute.FINANCES);
}

export function onlyAsAdmin<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)("Admin", AppRoute.FINANCES);
}
