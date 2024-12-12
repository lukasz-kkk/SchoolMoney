import { FC } from "react";
import { AppRoute } from "@/app/router";
import { AccessLevel } from "@/features/auth/types/Authorization";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard";

export default function withAuthorization<T extends object>(Component: FC<T>) {
    return (requiredAccess: AccessLevel, redirectTo: AppRoute) => {
        const WrappedComponent = (props: T) => (
            <AccessGuard requiredAccess={requiredAccess} redirectTo={redirectTo}>
                <Component {...props} />
            </AccessGuard>
        );

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
    return withAuthorization<T>(Component)("Parent", AppRoute.SIGN_IN);
}

export function onlyAsCaretaker<T extends object>(Component: FC<T>) {
    return withAuthorization<T>(Component)("Caretaker", AppRoute.SIGN_IN);
}
