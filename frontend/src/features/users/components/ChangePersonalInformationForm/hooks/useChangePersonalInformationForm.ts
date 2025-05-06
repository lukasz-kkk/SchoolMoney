import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export type ChangePersonalInformationFormInputs = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string;
};

export const CHANGE_PERSONAL_INFORMATION_DATE_OF_BIRTH_REQUIREMENT =
    "Data urodzenia jest wymagana. Daty z przyszłości nie są dozwolone.";
export const CHANGE_PERSONAL_INFORMATION_FIRST_NAME_REQUIREMENT = "Imię jest wymagane.";
export const CHANGE_PERSONAL_INFORMATION_LAST_NAME_REQUIREMENT = "Nazwisko jest wymagane.";

export const useChangePersonalInformationForm = (defaultValues?: ChangePersonalInformationFormInputs) => {
    const requirements = yup.object({
        firstName: yup.string().required(CHANGE_PERSONAL_INFORMATION_FIRST_NAME_REQUIREMENT),
        lastName: yup.string().required(CHANGE_PERSONAL_INFORMATION_LAST_NAME_REQUIREMENT),
        dateOfBirth: yup
            .date()
            .required(CHANGE_PERSONAL_INFORMATION_DATE_OF_BIRTH_REQUIREMENT)
            .min(dayjs().subtract(100, "years"), CHANGE_PERSONAL_INFORMATION_DATE_OF_BIRTH_REQUIREMENT)
            .max(dayjs(), CHANGE_PERSONAL_INFORMATION_DATE_OF_BIRTH_REQUIREMENT),
    });

    return useForm<ChangePersonalInformationFormInputs>({
        resolver: yupResolver<ChangePersonalInformationFormInputs>(requirements),
        defaultValues,
    });
};
