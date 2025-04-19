import { Box, Button } from "@radix-ui/themes";
import classes from "./CreateGroupForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    CLASS_NAME_HELP,
    CreateGroupFormInputs,
    useCreateGroupForm,
} from "@/features/groups/components/CreateGroupForm/hooks/useCreateGroupForm.ts";

type CreateGroupFormProps = {
    onSubmit: (inputs: CreateGroupFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const CreateGroupForm = ({ onSubmit, isLoading, onCancel }: CreateGroupFormProps) => {
    const { register, handleSubmit, formState } = useCreateGroupForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input
                {...register("name")}
                label="Nazwa klasy"
                error={formState.errors?.name?.message}
                help={CLASS_NAME_HELP}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Potwierdź
                </Button>
            </Box>
        </form>
    );
};
