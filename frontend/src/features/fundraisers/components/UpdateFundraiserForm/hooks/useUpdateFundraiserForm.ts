import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatISODate } from "@/utils/dateFormat.ts";

export type UpdateFundraiserFormInputs = {
    name: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
};

export const FUNDRAISER_NAME_HELP = "Wymagane min. 10 znaków";
export const FUNDRAISER_DESCRIPTION_HELP = "Wymagane min. 50 znaków";
export const FUNDRAISER_START_DATE_HELP = "Data rozpoczęcia zbiórki jest wymagana.";
export const FUNDRAISER_END_DATE_HELP = "Data zakończenia zbiórki jest wymagana.";

export const useUpdateFundraiserForm = (defaultValues: UpdateFundraiserFormInputs) => {
    const requirements = yup.object({
        name: yup.string().required(FUNDRAISER_NAME_HELP).min(10, FUNDRAISER_NAME_HELP),
        description: yup.string().required(FUNDRAISER_DESCRIPTION_HELP).min(50, FUNDRAISER_DESCRIPTION_HELP),
        startDate: yup.date().required(FUNDRAISER_START_DATE_HELP),
        endDate: yup.date().required(FUNDRAISER_END_DATE_HELP),
    });

    return useForm<UpdateFundraiserFormInputs>({
        resolver: yupResolver<UpdateFundraiserFormInputs>(requirements),
        defaultValues: {
            ...defaultValues,
            startDate: formatISODate(defaultValues.startDate),
            endDate: formatISODate(defaultValues.endDate),
        },
    });
};
