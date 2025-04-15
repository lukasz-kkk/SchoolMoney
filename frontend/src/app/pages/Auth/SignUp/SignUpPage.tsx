import classes from "./SignUpPage.module.scss";
import { Box, Card, Heading, Strong, Text } from "@radix-ui/themes";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";
import { useSignUp } from "@/features/auth/hooks/useSignUp.ts";
import { SignUpFormInputs } from "@/features/auth/components/SignUpForm/hooks/useSignUpForm.ts";
import { SignUpForm } from "@/features/auth/components/SignUpForm/SignUpForm.tsx";

export const SignUpPage = () => {
    const { mutateAsync: signUp, isPending } = useSignUp();
    const navigate = useNavigate();

    const register = async ({ password, login, firstName, lastName, dateOfBirth }: SignUpFormInputs) => {
        try {
            await signUp({ password, login, firstName, lastName, dateOfBirth: dateOfBirth.toISOString() });
            navigate(AppRoute.FINANCES);
            toast.success("Rejestracja pomyślna.");
        } catch (e) {
            console.log(e);
            toast.error("Rejestracja się nie udała.");
        }
    };

    return (
        <Box className={classes.container}>
            <Card className={classes.card}>
                <Heading className={classes.title}>Rejestracja</Heading>
                <Text>
                    Zarejestruj się w <Strong>SchoolMoney</Strong>
                </Text>
                <SignUpForm onSubmit={register} isLoading={isPending} />

                <Link to={AppRoute.SIGN_IN} className={classes.link}>
                    Masz już konto? Zaloguj się.
                </Link>
            </Card>
        </Box>
    );
};
