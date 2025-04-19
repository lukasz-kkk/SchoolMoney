import { Box, Button } from "@radix-ui/themes";
import classes from "./AddChildToGroupForm.module.scss";

import { Input } from "@/components/Input/Input";
import { CLASS_NAME_HELP } from "@/features/groups/components/CreateGroupForm/hooks/useCreateGroupForm.ts";
import {
    AddChildToGroupFormInputs,
    useAddChildToGroupForm,
} from "@/features/groups/components/AddChildToGroupForm/hooks/useAddChildToGroupForm";

type AddChildToGroupFormProps = {
    onSubmit: (inputs: AddChildToGroupFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const AddChildToGroupForm = ({ onSubmit, isLoading, onCancel }: AddChildToGroupFormProps) => {
    const { register, handleSubmit, formState } = useAddChildToGroupForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input
                {...register("code")}
                label="Kod dostępu"
                error={formState.errors?.code?.message}
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
