import { Box, Button } from "@radix-ui/themes";
import classes from "./TransferMoneyForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    MONEY_TRANSFER_AMOUNT_HELP,
    MONEY_TRANSFER_NAME_HELP,
    MONEY_TRANSFER_SOURCE_ACCOUNT_NUMBER_HELP,
    MONEY_TRANSFER_TARGET_ACCOUNT_NUMBER_HELP,
    TransferMoneyFormInputs,
    useTransferMoneyForm,
} from "@/features/finances/components/TransferMoneyForm/hooks/useTransferMoneyForm.ts";

type TransferMoneyFormProps = {
    data?: Partial<TransferMoneyFormInputs>;
    restrictions?: {
        maxAmount?: number;
    };
    onSubmit: (inputs: TransferMoneyFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const TransferMoneyForm = ({
    data = {},
    onSubmit,
    isLoading,
    onCancel,
    restrictions,
}: TransferMoneyFormProps) => {
    const { register, handleSubmit, formState } = useTransferMoneyForm({ ...data, maxAmount: restrictions?.maxAmount });

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input
                {...register("name")}
                label="Tytuł przelewu"
                error={formState.errors?.name?.message}
                help={MONEY_TRANSFER_NAME_HELP}
                disabled={!!data.name}
            />

            <Input
                {...register("amount")}
                label="Kwota przelewu"
                type="number"
                min={0}
                max={restrictions?.maxAmount}
                error={formState.errors?.amount?.message}
                help={MONEY_TRANSFER_AMOUNT_HELP}
                disabled={!!data.amount}
            />

            <Input
                {...register("sourceAccountNumber")}
                label="Rachunek źródłowy"
                error={formState.errors?.sourceAccountNumber?.message}
                help={MONEY_TRANSFER_SOURCE_ACCOUNT_NUMBER_HELP}
                disabled={!!data.sourceAccountNumber}
            />

            <Input
                {...register("targetAccountNumber")}
                label="Rachunek docelowy"
                error={formState.errors?.targetAccountNumber?.message}
                help={MONEY_TRANSFER_TARGET_ACCOUNT_NUMBER_HELP}
                disabled={!!data.targetAccountNumber}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit" variant="soft">
                    Potwierdź
                </Button>
            </Box>
        </form>
    );
};
