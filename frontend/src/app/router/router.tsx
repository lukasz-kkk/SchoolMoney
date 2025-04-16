import React from "react";
import { createBrowserRouter } from "react-router-dom";

const RootPage = React.lazy(() => import("@/app/pages/Root/Root").then((module) => ({ default: module.RootPage })));

const AuthPage = React.lazy(() => import("@/app/pages/Auth/AuthPage").then((module) => ({ default: module.AuthPage })));

const SignInPage = React.lazy(() =>
    import("@/app/pages/Auth/SignIn/SignInPage").then((module) => ({ default: module.SignInPage }))
);

const SignUpPage = React.lazy(() =>
    import("@/app/pages/Auth/SignUp/SignUpPage").then((module) => ({ default: module.SignUpPage }))
);

const ClassesPage = React.lazy(() =>
    import("@/app/pages/Root/Classes/ClassesPage.tsx").then((module) => ({ default: module.ClassesPage }))
);

const FundraisersPage = React.lazy(() =>
    import("@/app/pages/Root/Fundraisers/FundraisersPage.tsx").then((module) => ({ default: module.FundraisersPage }))
);

const FinancesPage = React.lazy(() =>
    import("@/app/pages/Root/Finances/FinancesPage.tsx").then((module) => ({ default: module.FinancesPage }))
);

const UsersPage = React.lazy(() =>
    import("@/app/pages/Root/Users/UsersPage.tsx").then((module) => ({ default: module.UsersPage }))
);

const SettingsPage = React.lazy(() =>
    import("@/app/pages/Root/Settings/SettingsPage.tsx").then((module) => ({ default: module.SettingsPage }))
);

const NotFoundPage = React.lazy(() => import("@/app/pages/404").then((module) => ({ default: module.NotFoundPage })));

import { AppRoute } from "@/app/router/AppRoute";
import { WithSuspense } from "@/app/router/components/WithSuspense";

export const router = createBrowserRouter([
    {
        path: AppRoute.AUTH,
        element: WithSuspense(<AuthPage />),
        children: [
            {
                path: AppRoute.SIGN_IN,
                element: WithSuspense(<SignInPage />),
            },
            {
                path: AppRoute.SIGN_UP,
                element: WithSuspense(<SignUpPage />),
            },
            {
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
    {
        path: AppRoute.ROOT,
        element: WithSuspense(<RootPage />),
        children: [
            {
                path: AppRoute.FUNDRAISERS,
                element: WithSuspense(<FundraisersPage />),
            },
            {
                path: AppRoute.CLASSES,
                element: WithSuspense(<ClassesPage />),
            },
            {
                path: AppRoute.FINANCES,
                element: WithSuspense(<FinancesPage />),
            },
            {
                path: AppRoute.USERS,
                element: WithSuspense(<UsersPage />),
            },
            {
                path: AppRoute.SETTINGS,
                element: WithSuspense(<SettingsPage />),
            },
            {
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
]);
