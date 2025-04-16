import classes from "./SignUpForm.module.scss";
import { Box, Button } from "@radix-ui/themes";
import { Input } from "@/components/Input/Input";
import {
    SIGN_UP_CONFIRM_PASSWORD_REQUIREMENT,
    SIGN_UP_DATE_OF_BIRTH_REQUIREMENT,
    SIGN_UP_FIRST_NAME_REQUIREMENT,
    SIGN_UP_LAST_NAME_REQUIREMENT,
    SIGN_UP_LOGIN_REQUIREMENT,
    SIGN_UP_PASSWORD_REQUIREMENT,
    SignUpFormInputs,
    useSignUpForm,
} from "@/features/auth/components/SignUpForm/hooks/useSignUpForm.ts";

type SignUpFormProps = {
    onSubmit: (payload: SignUpFormInputs) => void;
    isLoading: boolean;
};

export const SignUpForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
    const { register, handleSubmit, formState } = useSignUpForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.row}>
                <Input
                    {...register("firstName")}
                    label="Imię"
                    help={SIGN_UP_FIRST_NAME_REQUIREMENT}
                    error={formState.errors?.login?.message}
                />
                <Input
                    {...register("lastName")}
                    label="Nazwisko"
                    help={SIGN_UP_LAST_NAME_REQUIREMENT}
                    error={formState.errors?.login?.message}
                />
            </Box>

            <Box className={classes.row}>
                <Input
                    {...register("login")}
                    label="Login"
                    help={SIGN_UP_LOGIN_REQUIREMENT}
                    error={formState.errors?.login?.message}
                />

                <Input
                    {...register("dateOfBirth")}
                    label="Data urodzenia"
                    type="date"
                    help={SIGN_UP_DATE_OF_BIRTH_REQUIREMENT}
                    error={formState.errors?.dateOfBirth?.message}
                />
            </Box>

            <Input
                {...register("password")}
                label="Hasło"
                type="password"
                help={SIGN_UP_PASSWORD_REQUIREMENT}
                error={formState.errors?.password?.message}
            />
            <Input
                {...register("confirmPassword")}
                label="Potwierdź hasło"
                help={SIGN_UP_CONFIRM_PASSWORD_REQUIREMENT}
                error={formState.errors?.confirmPassword?.message}
                type="password"
            />

            <Button loading={isLoading} className={classes.submitButton}>
                Zarejestruj
            </Button>
        </form>
    );
};
