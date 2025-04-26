import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { formatISODate } from "@/utils/dateFormat.ts";

export type AddChildFormInputs = {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | string;
};

export const CHILD_FIRST_NAME_HELP = "Imię jest wymagane";
export const CHILD_LAST_NAME_HELP = "Nazwisko jest wymagane";
export const CHILD_BIRTHDATE_HELP = "Dziecko może mieć od 3 do 18 lat";

export const useAddChildForm = (initialValue?: Partial<AddChildFormInputs>) => {
    const requirements = yup.object({
        firstName: yup.string().required(CHILD_FIRST_NAME_HELP),
        lastName: yup.string().required(CHILD_LAST_NAME_HELP),
        dateOfBirth: yup
            .date()
            .required(CHILD_BIRTHDATE_HELP)
            .max(dayjs().subtract(3, "years"), "Dziecko musi mieć min. 3 lata")
            .min(dayjs().subtract(19, "years"), "Dziecko musi mieć max. 18 lat"),
    });

    return useForm<AddChildFormInputs>({
        resolver: yupResolver<AddChildFormInputs>(requirements),
        defaultValues: {
            ...initialValue,
            dateOfBirth: initialValue?.dateOfBirth ? formatISODate(initialValue.dateOfBirth) : undefined,
        },
    });
};
