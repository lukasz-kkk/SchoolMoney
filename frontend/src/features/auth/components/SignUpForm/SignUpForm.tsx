import classes from "./SignUpForm.module.scss";
import { Button } from "@radix-ui/themes";
import { Input } from "@/components/Input/Input";
import {
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

            <Input
                {...register("login")}
                label="Login"
                help={SIGN_UP_LOGIN_REQUIREMENT}
                error={formState.errors?.login?.message}
            />
            <Input
                {...register("password")}
                label="Hasło"
                type="password"
                help={SIGN_UP_PASSWORD_REQUIREMENT}
                error={formState.errors?.password?.message}
            />
            <Button loading={isLoading} className={classes.submitButton}>
                Zarejestruj
            </Button>
        </form>
    );
};
