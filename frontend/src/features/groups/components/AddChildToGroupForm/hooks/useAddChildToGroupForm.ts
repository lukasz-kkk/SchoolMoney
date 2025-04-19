import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddChildToGroupFormInputs = {
    code: string;
};

export const CODE_HELP = "Kod dostępu zawiera 7 znaków.";

export const useAddChildToGroupForm = () => {
    const requirements = yup.object({
        code: yup.string().required(CODE_HELP).length(7, CODE_HELP),
    });

    return useForm<AddChildToGroupFormInputs>({
        resolver: yupResolver<AddChildToGroupFormInputs>(requirements),
    });
};
