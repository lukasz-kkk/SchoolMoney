import { Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./CreateFundraiserDialog.module.scss";
import { useCreateFundraiser } from "@/features/fundraisers/hooks/useCreateFundraiser.ts";
import { toast } from "sonner";
import { CreateFundraiserFormInputs } from "@/features/fundraisers/components/CreateFundraiserForm/hooks/useCreateFundraiserForm.ts";
import { CreateFundraiserForm } from "@/features/fundraisers/components/CreateFundraiserForm/CreateFundraiserForm.tsx";

type CreateFundraiserDialogProps = {
    trigger: ReactNode;
    groupId: number;
};

export const CreateFundraiserDialog = ({ trigger, groupId }: CreateFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useCreateFundraiser();

    const createFundraiser = async ({
        name,
        description,
        endDate,
        startDate,
        amountPerPerson,
    }: CreateFundraiserFormInputs) => {
        try {
            await mutateAsync({
                name,
                description,
                endDate: endDate.toISOString(),
                startDate: startDate.toISOString(),
                amountPerPerson,
                groupId,
            });
            toast.success("Zbiórka została utworzona.");
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się utworzyć zbiórki.");
        }
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Dodaj zbiórkę</DialogHeader>

                <CreateFundraiserForm onSubmit={createFundraiser} isLoading={isPending} onCancel={handleFormCancel} />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
