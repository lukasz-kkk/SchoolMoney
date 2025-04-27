import { Box, Button } from "@radix-ui/themes";
import classes from "./CreateFundraiserForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    CreateFundraiserFormInputs,
    FUNDRAISER_AMOUNT_PER_PERSON_HELP,
    FUNDRAISER_CLASS_HELP,
    FUNDRAISER_DESCRIPTION_HELP,
    FUNDRAISER_END_DATE_HELP,
    FUNDRAISER_NAME_HELP,
    FUNDRAISER_START_DATE_HELP,
    useCreateFundraiserForm,
} from "@/features/fundraisers/components/CreateFundraiserForm/hooks/useCreateFundraiserForm.ts";
import { Select } from "@/components/Select/Select.tsx";

type CreateFundraiserFormProps = {
    onSubmit: (inputs: CreateFundraiserFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const CreateFundraiserForm = ({ onSubmit, isLoading, onCancel }: CreateFundraiserFormProps) => {
    const { register, handleSubmit, formState } = useCreateFundraiserForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Box className={classes.row}>
                <Input
                    {...register("name")}
                    label="Nazwa zbiórki"
                    error={formState.errors?.name?.message}
                    help={FUNDRAISER_NAME_HELP}
                />

                <Input
                    {...register("amountPerPerson")}
                    type="number"
                    label="Kwota na osobę (zł)"
                    error={formState.errors?.amountPerPerson?.message}
                    help={FUNDRAISER_AMOUNT_PER_PERSON_HELP}
                />
            </Box>

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

            <Select
                {...register("classId")}
                label="Klasa przypisana do zbiórki"
                options={[
                    {
                        value: 1,
                        label: "Mock class",
                    },
                    {
                        value: 2,
                        label: "TODO class",
                    },
                ]}
                error={formState.errors?.classId?.message}
                help={FUNDRAISER_CLASS_HELP}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit" variant="soft">
                    Utwórz
                </Button>
            </Box>
        </form>
    );
};
