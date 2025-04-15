import classes from "./SignInPage.module.scss";
import { Box, Card, Heading, Strong, Text } from "@radix-ui/themes";
import { SignInForm } from "@/features/auth/components/SignInForm/SignInForm";
import { useSignIn } from "@/features/auth/hooks/useSignIn";
import { SignInFormInputs } from "@/features/auth/components/SignInForm/hooks/useSignInForm";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";

export const SignInPage = () => {
    const { mutateAsync: signIn, isPending } = useSignIn();
    const navigate = useNavigate();

    const login = async ({ password, login }: SignInFormInputs) => {
        try {
            await signIn({ password, login });
            navigate(AppRoute.FINANCES);
            toast.success("Logowanie pomyślne.");
        } catch (e) {
            console.log(e);
            toast.error("Logowanie się nie udało.");
        }
    };

    return (
        <Box className={classes.container}>
            <Card className={classes.card}>
                <Heading className={classes.title}>Logowanie</Heading>
                <Text>
                    Zaloguj się do aplikacji <Strong>SchoolMoney</Strong>
                </Text>
                <SignInForm onSubmit={login} isLoading={isPending} />

                <Link to={AppRoute.SIGN_UP} className={classes.link}>
                    Nie masz jeszcze konta? Zarejestruj się.
                </Link>
            </Card>
        </Box>
    );
};
