import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const RootPage = React.lazy(() => import("@/app/pages/Root/Root").then((module) => ({ default: module.RootPage })));

const AuthPage = React.lazy(() => import("@/app/pages/Auth/AuthPage").then((module) => ({ default: module.AuthPage })));

const SignInPage = React.lazy(() =>
    import("@/app/pages/Auth/SignIn/SignInPage").then((module) => ({ default: module.SignInPage }))
);

const SignUpPage = React.lazy(() =>
    import("@/app/pages/Auth/SignUp/SignUpPage").then((module) => ({ default: module.SignUpPage }))
);

const GroupsPage = React.lazy(() =>
    import("@/app/pages/Root/Groups/GroupsPage.tsx").then((module) => ({ default: module.GroupsPage }))
);

const GroupPage = React.lazy(() =>
    import("@/app/pages/Root/Group/GroupPage.tsx").then((module) => ({ default: module.GroupPage }))
);

const FundraisersPage = React.lazy(() =>
    import("@/app/pages/Root/Fundraisers/FundraisersPage.tsx").then((module) => ({ default: module.FundraisersPage }))
);

const FundraiserPage = React.lazy(() =>
    import("@/app/pages/Root/Fundraiser/FundraiserPage.tsx").then((module) => ({ default: module.FundraiserPage }))
);

const FinancesPage = React.lazy(() =>
    import("@/app/pages/Root/Finances/FinancesPage.tsx").then((module) => ({ default: module.FinancesPage }))
);

const UsersPage = React.lazy(() =>
    import("@/app/pages/Root/Users/UsersPage.tsx").then((module) => ({ default: module.UsersPage }))
);

const ChildrenPage = React.lazy(() =>
    import("@/app/pages/Root/Children/ChildrenPage.tsx").then((module) => ({ default: module.ChildrenPage }))
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
        element: <Navigate to={AppRoute.FINANCES} replace />,
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
                path: AppRoute.FUNDRAISER,
                element: WithSuspense(<FundraiserPage />),
            },
            {
                path: AppRoute.GROUPS,
                element: WithSuspense(<GroupsPage />),
            },
            {
                path: AppRoute.GROUP,
                element: WithSuspense(<GroupPage />),
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
                path: AppRoute.CHILDREN,
                element: WithSuspense(<ChildrenPage />),
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
