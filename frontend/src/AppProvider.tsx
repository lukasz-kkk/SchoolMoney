import { QueryClientProvider } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";
import { ThemeProvider } from "@/lib/theme";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const AppProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={apiClient}>
            <Toaster position="bottom-right" closeButton richColors theme="dark" />
            <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
    );
};
