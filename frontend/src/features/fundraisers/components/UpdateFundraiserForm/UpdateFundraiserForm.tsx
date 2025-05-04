import { Box, Button } from "@radix-ui/themes";
import classes from "./UpdateFundraiserForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    FUNDRAISER_DESCRIPTION_HELP,
    FUNDRAISER_END_DATE_HELP,
    FUNDRAISER_NAME_HELP,
    FUNDRAISER_START_DATE_HELP,
    UpdateFundraiserFormInputs,
    useUpdateFundraiserForm,
} from "@/features/fundraisers/components/UpdateFundraiserForm/hooks/useUpdateFundraiserForm.ts";

type UpdateFundraiserFormProps = {
    onSubmit: (inputs: UpdateFundraiserFormInputs) => void;
    defaultValues: UpdateFundraiserFormInputs;
    onCancel: () => void;
    isLoading?: boolean;
};

export const UpdateFundraiserForm = ({ onSubmit, isLoading, onCancel, defaultValues }: UpdateFundraiserFormProps) => {
    const { register, handleSubmit, formState } = useUpdateFundraiserForm(defaultValues);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input
                {...register("name")}
                label="Nazwa zbiórki"
                error={formState.errors?.name?.message}
                help={FUNDRAISER_NAME_HELP}
            />

            <Box className={classes.row}>
                <Input
                    {...register("startDate")}
                    type="date"
                    label="Data rozpoczęcia"
                    error={formState.errors?.startDate?.message}
                    help={FUNDRAISER_START_DATE_HELP}
                />

                <Input
                    {...register("endDate")}
                    type="date"
                    label="Data zakończenia"
                    error={formState.errors?.endDate?.message}
                    help={FUNDRAISER_END_DATE_HELP}
                />
            </Box>

            <Input
                {...register("description")}
                type="textarea"
                label="Opis zbiórki"
                error={formState.errors?.description?.message}
                help={FUNDRAISER_DESCRIPTION_HELP}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit" variant="soft">
                    Zapisz
                </Button>
            </Box>
        </form>
    );
};
