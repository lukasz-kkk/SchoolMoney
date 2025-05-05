import { Outlet } from "react-router-dom";
import { AppProvider } from "@/AppProvider";

import { Navigation } from "@/app/navigation/Navigation";

export const RootPage = () => {
    return (
        <AppProvider>
            <Navigation>
                <Outlet />
            </Navigation>
        </AppProvider>
    );
};
