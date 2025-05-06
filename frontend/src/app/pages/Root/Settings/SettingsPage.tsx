import { Box, Card, Heading } from "@radix-ui/themes";
import { ChangePasswordForm } from "@/features/users/components/ChangePasswordForm/ChangePasswordForm";
import classes from "./SettingsPage.module.scss";
import { useChangePassword } from "@/features/users/hooks/useChangePassword";
import { ChangePasswordFormInputs } from "@/features/users/components/ChangePasswordForm/hooks/useChangePasswordForm";
import { toast } from "sonner";
import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization.tsx";
import { ChangePersonalInformationForm } from "@/features/users/components/ChangePersonalInformationForm/ChangePersonalInformationForm.tsx";
import { ChangePersonalInformationFormInputs } from "@/features/users/components/ChangePersonalInformationForm/hooks/useChangePersonalInformationForm.ts";
import { useChangePersonalInformation } from "@/features/users/hooks/useChangePersonalInformation.ts";
import { formatISODate } from "@/utils/dateFormat.ts";
import { useUser } from "@/features/auth/hooks/useUser.ts";

const BaseSettingsPage = () => {
    const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword();
    const { mutateAsync: changePersonalInformation, isPending: isChangingPersonalInformation } =
        useChangePersonalInformation();

    const { user } = useUser();

    const handlePasswordChange = async (inputs: ChangePasswordFormInputs, clearForm: () => void) => {
        try {
            await changePassword(inputs);
            toast.success("Hasło zostało zmienione.");
            clearForm();
        } catch (e) {
            toast.error("Nie udało się zmienić hasła.");
        }
    };

    const handlePersonalInformationChange = async (inputs: ChangePersonalInformationFormInputs) => {
        try {
            await changePersonalInformation({ ...inputs, dateOfBirth: formatISODate(inputs.dateOfBirth) });
            toast.success("Dane zostały zmienione.");
        } catch (e) {
            toast.error("Nie udało się zmienić danych osobowych.");
        }
    };

    if (!user) {
        return;
    }

    return (
        <Page.Root>
            <Page.Header items={[{ label: "Ustawienia" }]} />

            <Page.Content>
                <Box className={classes.container}>
                    <Card className={classes.section}>
                        <Heading as="h2" className={classes.sectionTitle}>
                            Zmiana hasła
                        </Heading>

                        <Box className={classes.formContainer}>
                            <ChangePasswordForm onSubmit={handlePasswordChange} isLoading={isChangingPassword} />
                        </Box>
                    </Card>

                    <Card className={classes.section}>
                        <Heading as="h2" className={classes.sectionTitle}>
                            Zmiana danych osobowych
                        </Heading>

                        <Box className={classes.formContainer}>
                            <ChangePersonalInformationForm
                                onSubmit={handlePersonalInformationChange}
                                isLoading={isChangingPersonalInformation}
                                defaultValues={user}
                            />
                        </Box>
                    </Card>
                </Box>
            </Page.Content>
        </Page.Root>
    );
};

export const SettingsPage = onlyAsAuthenticated(BaseSettingsPage);
