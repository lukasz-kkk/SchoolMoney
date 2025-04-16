import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type TransferMoneyFormInputs = {
    name: string;
    sourceAccountNumber: string;
    targetAccountNumber: string;
    amount: number;
};

type UseTransferMoneyFormOptions = {
    maxAmount?: number;
} & Partial<TransferMoneyFormInputs>;

export const MONEY_TRANSFER_NAME_HELP = "Tytuł przelewu jest wymagany.";
export const MONEY_TRANSFER_SOURCE_ACCOUNT_NUMBER_HELP = "Numer rachunku z którego zlecasz przelew.";
export const MONEY_TRANSFER_TARGET_ACCOUNT_NUMBER_HELP = "Numer rachunku na który zlecasz przelew.";
export const MONEY_TRANSFER_AMOUNT_HELP =
    "Numer rachunku na który zlecasz przelew. Minimalna kwota przelewu to 1zł, nie możesz przelać więcej pieniędzy niż jest dostępne na danym rachunku.";

export const useTransferMoneyForm = ({
    sourceAccountNumber,
    targetAccountNumber,
    amount,
    name,
    maxAmount = Infinity,
}: UseTransferMoneyFormOptions) => {
    const requirements = yup.object({
        name: yup.string().required(MONEY_TRANSFER_NAME_HELP),
        sourceAccountNumber: yup.string().required(MONEY_TRANSFER_SOURCE_ACCOUNT_NUMBER_HELP),
        targetAccountNumber: yup.string().required(MONEY_TRANSFER_TARGET_ACCOUNT_NUMBER_HELP),
        amount: yup
            .number()
            .required(MONEY_TRANSFER_AMOUNT_HELP)
            .min(1, MONEY_TRANSFER_AMOUNT_HELP)
            .max(maxAmount, MONEY_TRANSFER_AMOUNT_HELP),
    });

    return useForm<TransferMoneyFormInputs>({
        resolver: yupResolver<TransferMoneyFormInputs>(requirements),
        defaultValues: {
            sourceAccountNumber,
            targetAccountNumber,
            name,
            amount,
        },
    });
};
