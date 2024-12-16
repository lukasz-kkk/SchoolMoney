import { AppProvider } from "@/AppProvider";
import { Outlet } from "react-router-dom";
import { onlyAsUnauthenticated } from "@/features/auth/hoc/withAuthorization";

import classes from "./AuthPage.module.scss";
import { Box } from "@radix-ui/themes";
import { useSeamlessSignIn } from "@/features/auth/hooks/useSeamlessSignIn";

const Page = () => {
    useSeamlessSignIn();

    return (
        <AppProvider>
            <Box className={classes.container}>
                <Box className={classes.content}>
                    <Outlet />
                </Box>
            </Box>
        </AppProvider>
    );
};

export const AuthPage = onlyAsUnauthenticated(Page);
