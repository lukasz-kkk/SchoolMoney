import { Input } from "@/components/Input/Input";
import { Box, Button } from "@radix-ui/themes";

import classes from "./ChangePasswordForm.module.scss";
import {
    CHANGE_PASSWORD_CONFIRM_PASSWORD_REQUIREMENT,
    CHANGE_PASSWORD_CURRENT_PASSWORD_REQUIREMENT,
    CHANGE_PASSWORD_PASSWORD_REQUIREMENT,
    ChangePasswordFormInputs,
    useChangePasswordForm,
} from "@/features/users/components/ChangePasswordForm/hooks/useChangePasswordForm";

type ChangePasswordFormProps = {
    onSubmit: (inputs: ChangePasswordFormInputs, clearForm: () => void) => void;
    isLoading: boolean;
};

export const ChangePasswordForm = ({ onSubmit, isLoading }: ChangePasswordFormProps) => {
    const { register, handleSubmit, formState, reset } = useChangePasswordForm();

    const internalOnSubmit = (inputs: ChangePasswordFormInputs) => {
        onSubmit(inputs, reset);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(internalOnSubmit)}>
            <Input
                {...register("oldPassword")}
                label="Stare hasło"
                help={CHANGE_PASSWORD_CURRENT_PASSWORD_REQUIREMENT}
                error={formState.errors?.oldPassword?.message}
                type="password"
            />
            <Input
                {...register("newPassword")}
                label="Nowe hasło"
                help={CHANGE_PASSWORD_PASSWORD_REQUIREMENT}
                error={formState.errors?.newPassword?.message}
                type="password"
            />
            <Input
                {...register("confirmNewPassword")}
                label="Potwierdź nowe hasło"
                help={CHANGE_PASSWORD_CONFIRM_PASSWORD_REQUIREMENT}
                error={formState.errors?.confirmNewPassword?.message}
                type="password"
            />
            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" type="submit" loading={isLoading} variant="soft">
                    Zapisz
                </Button>
            </Box>
        </form>
    );
};
