import { Input } from "@/components/Input/Input";
import { Box, Button } from "@radix-ui/themes";

import classes from "./ChangePersonalInformationForm.module.scss";

import {
    ChangePersonalInformationFormInputs,
    useChangePersonalInformationForm,
} from "@/features/users/components/ChangePersonalInformationForm/hooks/useChangePersonalInformationForm.ts";
import {
    SIGN_UP_DATE_OF_BIRTH_REQUIREMENT,
    SIGN_UP_FIRST_NAME_REQUIREMENT,
    SIGN_UP_LAST_NAME_REQUIREMENT,
} from "@/features/auth/components/SignUpForm/hooks/useSignUpForm.ts";

type ChangePersonalInformationFormProps = {
    onSubmit: (inputs: ChangePersonalInformationFormInputs, clearForm: () => void) => void;
    defaultValues?: ChangePersonalInformationFormInputs;
    isLoading: boolean;
};

export const ChangePersonalInformationForm = ({
    onSubmit,
    isLoading,
    defaultValues,
}: ChangePersonalInformationFormProps) => {
    const { register, handleSubmit, formState, reset } = useChangePersonalInformationForm(defaultValues);

    const internalOnSubmit = (inputs: ChangePersonalInformationFormInputs) => {
        onSubmit(inputs, reset);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(internalOnSubmit)}>
            <Box className={classes.row}>
                <Input
                    {...register("firstName")}
                    label="Imię"
                    help={SIGN_UP_FIRST_NAME_REQUIREMENT}
                    error={formState.errors?.firstName?.message}
                />
                <Input
                    {...register("lastName")}
                    label="Nazwisko"
                    help={SIGN_UP_LAST_NAME_REQUIREMENT}
                    error={formState.errors?.lastName?.message}
                />
            </Box>

            <Box className={classes.row}>
                <Input
                    {...register("dateOfBirth")}
                    label="Data urodzenia"
                    type="date"
                    help={SIGN_UP_DATE_OF_BIRTH_REQUIREMENT}
                    error={formState.errors?.dateOfBirth?.message}
                />
            </Box>

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
