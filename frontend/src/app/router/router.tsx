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
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
]);
