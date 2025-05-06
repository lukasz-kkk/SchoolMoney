import { Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./AddChildDialog.module.scss";
import { toast } from "sonner";
import { BaseChild } from "@/features/children/types/Child";
import { AddChildForm } from "@/features/children/components/AddChildForm/AddChildForm";
import { AddChildFormInputs } from "@/features/children/components/AddChildForm/hooks/useAddChildForm";
import { useSaveChild } from "@/features/children/hooks/useSaveChild";
import { formatISODate } from "@/utils/dateFormat";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader";

type AddChildDialogProps = {
    trigger: ReactNode;
    child?: BaseChild;
    groupId?: string;
    parentId?: string;
    lastName?: string;
};

export const AddChildDialog = ({ trigger, child, lastName }: AddChildDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: saveChild, isPending, error } = useSaveChild();

    const handleFormSubmit = async (inputs: AddChildFormInputs) => {
        await saveChild({ ...inputs, dateOfBirth: formatISODate(inputs.dateOfBirth) });
        toast.success("Zapisano.");
        setOpen(false);
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>{child ? "Edytuj dziecko" : "Dodaj dziecko"}</DialogHeader>
                <AddChildForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isLoading={isPending}
                    initialValue={{
                        ...child,
                        lastName: child?.lastName ?? lastName,
                    }}
                />
                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (_error: Error) => {
    return "Nieznany błąd. Spróbuj ponownie później.";
};
