import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type SignUpFormInputs = {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

export const SIGN_UP_DATE_OF_BIRTH_REQUIREMENT = "Data urodzenia jest wymagana.";
export const SIGN_UP_FIRST_NAME_REQUIREMENT = "Imię jest wymagane.";
export const SIGN_UP_LAST_NAME_REQUIREMENT = "Nazwisko jest wymagane.";
export const SIGN_UP_LOGIN_REQUIREMENT = "Login musi zawierać min. 3 znaki.";
export const SIGN_UP_PASSWORD_REQUIREMENT = "Hasło musi zawierać min. 12 znaków.";

export const useSignUpForm = () => {
    const requirements = yup.object({
        password: yup.string().required(SIGN_UP_PASSWORD_REQUIREMENT).min(12, SIGN_UP_PASSWORD_REQUIREMENT),
        login: yup.string().required(SIGN_UP_LOGIN_REQUIREMENT).min(3, SIGN_UP_PASSWORD_REQUIREMENT),
        firstName: yup.string().required(SIGN_UP_FIRST_NAME_REQUIREMENT),
        lastName: yup.string().required(SIGN_UP_LAST_NAME_REQUIREMENT),
        dateOfBirth: yup.date().required(SIGN_UP_DATE_OF_BIRTH_REQUIREMENT),
    });

    return useForm<SignUpFormInputs>({
        resolver: yupResolver<SignUpFormInputs>(requirements),
    });
};
