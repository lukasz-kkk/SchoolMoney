import { Box, Button } from "@radix-ui/themes";
import classes from "./AddChildForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    AddChildFormInputs,
    CHILD_BIRTHDATE_HELP,
    CHILD_FIRST_NAME_HELP,
    CHILD_LAST_NAME_HELP,
    useAddChildForm,
} from "@/features/children/components/AddChildForm/hooks/useAddChildForm";

type AddChildFormProps = {
    onSubmit: (inputs: AddChildFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialValue?: Partial<AddChildFormInputs>;
};

export const AddChildForm = ({ onSubmit, isLoading, onCancel, initialValue }: AddChildFormProps) => {
    const { register, handleSubmit, formState } = useAddChildForm(initialValue);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Box className={classes.row}>
                <Input
                    {...register("firstName")}
                    label="Imię"
                    error={formState.errors?.firstName?.message}
                    help={CHILD_FIRST_NAME_HELP}
                />

                <Input
                    {...register("lastName")}
                    label="Nazwisko"
                    error={formState.errors?.lastName?.message}
                    help={CHILD_LAST_NAME_HELP}
                />
            </Box>

            <Input
                {...register("dateOfBirth")}
                label="Data urodzenia"
                type="date"
                error={formState.errors?.dateOfBirth?.message}
                help={CHILD_BIRTHDATE_HELP}
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
