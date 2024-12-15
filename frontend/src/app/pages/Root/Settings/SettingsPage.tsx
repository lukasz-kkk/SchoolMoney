import { Box, Heading, Strong, Text } from "@radix-ui/themes";
import { ChangePasswordForm } from "@/features/users/components/ChangePasswordForm/ChangePasswordForm";
import classes from "./SettingsPage.module.scss";
import { useChangePassword } from "@/features/users/hooks/useChangePassword";
import { ChangePasswordFormInputs } from "@/features/users/components/ChangePasswordForm/hooks/useChangePasswordForm";
import { toast } from "sonner";
import { Page } from "@/components/Page/Page";

export const SettingsPage = () => {
    const { mutateAsync: changePassword, isPending } = useChangePassword();

    const handlePasswordChange = async (inputs: ChangePasswordFormInputs, clearForm: () => void) => {
        try {
            await changePassword(inputs);
            toast.success("Hasło zostało zmienione.");
            clearForm();
        } catch (e) {
            toast.error("Nie udało się zmienić hasła.");
        }
    };

    return (
        <Page.Root>
            <Page.Header title="Ustawienia" />

            <Page.Content>
                <Heading as="h2" className={classes.sectionTitle}>
                    Zmiana hasła
                </Heading>
                <Text>
                    Zalecamy zmianę hasła zaraz po założeniu konta przez administratora aplikacji{" "}
                    <Strong>Przedszkole+</Strong>
                </Text>
                <Box className={classes.formContainer}>
                    <ChangePasswordForm onSubmit={handlePasswordChange} isLoading={isPending} />
                </Box>
            </Page.Content>
        </Page.Root>
    );
};
