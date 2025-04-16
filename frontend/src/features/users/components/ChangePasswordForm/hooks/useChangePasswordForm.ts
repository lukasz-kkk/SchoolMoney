import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type ChangePasswordFormInputs = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const MIN_PASSWORD_LENGTH = 12;

export const CHANGE_PASSWORD_CURRENT_PASSWORD_REQUIREMENT = "Podaj aktualne hasło";
export const CHANGE_PASSWORD_PASSWORD_REQUIREMENT = `Hasło musi zawierać min. ${MIN_PASSWORD_LENGTH} znaków.`;
export const CHANGE_PASSWORD_CONFIRM_PASSWORD_REQUIREMENT = "Hasła muszą się zgadzać.";
export const useChangePasswordForm = () => {
    const requirements = yup.object({
        oldPassword: yup.string().required(CHANGE_PASSWORD_CURRENT_PASSWORD_REQUIREMENT),
        newPassword: yup
            .string()
            .required(CHANGE_PASSWORD_PASSWORD_REQUIREMENT)
            .min(MIN_PASSWORD_LENGTH, CHANGE_PASSWORD_PASSWORD_REQUIREMENT),
        confirmNewPassword: yup
            .string()
            .required(CHANGE_PASSWORD_CONFIRM_PASSWORD_REQUIREMENT)
            .test("passwords-match", CHANGE_PASSWORD_CONFIRM_PASSWORD_REQUIREMENT, function (value) {
                return this.parent.newPassword === value;
            }),
    });

    return useForm<ChangePasswordFormInputs>({
        resolver: yupResolver<ChangePasswordFormInputs>(requirements),
    });
};
