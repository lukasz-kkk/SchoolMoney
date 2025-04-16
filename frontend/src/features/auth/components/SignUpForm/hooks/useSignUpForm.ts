import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export type SignUpFormInputs = {
    login: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
};

const MIN_PASSWORD_LENGTH = 12;
const MIN_LOGIN_LENGTH = 5;

export const SIGN_UP_DATE_OF_BIRTH_REQUIREMENT = "Data urodzenia jest wymagana. Daty z przyszłości nie są dozwolone.";
export const SIGN_UP_FIRST_NAME_REQUIREMENT = "Imię jest wymagane.";
export const SIGN_UP_LAST_NAME_REQUIREMENT = "Nazwisko jest wymagane.";
export const SIGN_UP_LOGIN_REQUIREMENT = `Login musi zawierać min. ${MIN_LOGIN_LENGTH} znaków.`;
export const SIGN_UP_PASSWORD_REQUIREMENT = `Hasło musi zawierać min. ${MIN_PASSWORD_LENGTH} znaków.`;
export const SIGN_UP_CONFIRM_PASSWORD_REQUIREMENT = "Hasła muszą się zgadzać.";

export const useSignUpForm = () => {
    const requirements = yup.object({
        password: yup
            .string()
            .required(SIGN_UP_PASSWORD_REQUIREMENT)
            .min(MIN_PASSWORD_LENGTH, SIGN_UP_PASSWORD_REQUIREMENT),
        confirmPassword: yup
            .string()
            .required(SIGN_UP_CONFIRM_PASSWORD_REQUIREMENT)
            .test("passwords-match", SIGN_UP_CONFIRM_PASSWORD_REQUIREMENT, function (value) {
                return this.parent.newPassword === value;
            }),
        login: yup.string().required(SIGN_UP_LOGIN_REQUIREMENT).min(MIN_LOGIN_LENGTH, SIGN_UP_PASSWORD_REQUIREMENT),
        firstName: yup.string().required(SIGN_UP_FIRST_NAME_REQUIREMENT),
        lastName: yup.string().required(SIGN_UP_LAST_NAME_REQUIREMENT),
        dateOfBirth: yup
            .date()
            .required(SIGN_UP_DATE_OF_BIRTH_REQUIREMENT)
            .min(dayjs().subtract(100, "years"), SIGN_UP_DATE_OF_BIRTH_REQUIREMENT)
            .max(dayjs(), SIGN_UP_DATE_OF_BIRTH_REQUIREMENT),
    });

    return useForm<SignUpFormInputs>({
        resolver: yupResolver<SignUpFormInputs>(requirements),
    });
};
