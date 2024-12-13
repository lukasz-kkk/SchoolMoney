import { PropsWithChildren } from "react";

import { Theme } from "@radix-ui/themes";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <Theme accentColor="purple" grayColor="mauve" radius="large" scaling="95%">
            {children}
        </Theme>
    );
};
