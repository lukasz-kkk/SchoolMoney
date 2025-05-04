import { PropsWithChildren } from "react";

import { Theme } from "@radix-ui/themes";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <Theme accentColor="blue" grayColor="mauve" radius="large" scaling="95%" appearance="dark">
            {children}
        </Theme>
    );
};
