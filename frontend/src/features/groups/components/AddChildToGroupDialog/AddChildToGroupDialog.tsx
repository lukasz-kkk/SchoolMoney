import { Dialog, Text } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";
import { toast } from "sonner";

import classes from "./AddChildToGroupDialog.module.scss";
import { AddChildToGroupForm } from "@/features/groups/components/AddChildToGroupForm/AddChildToGroupForm";
import { AddChildToGroupFormInputs } from "@/features/groups/components/AddChildToGroupForm/hooks/useAddChildToGroupForm";
import { useAddChildToGroup } from "@/features/groups/hooks/useAddChildToGroup";

type AddChildToGroupDialogProps = {
    trigger: ReactNode;
    childId: number;
};

export const AddChildToGroupDialog = ({ trigger, childId }: AddChildToGroupDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useAddChildToGroup();

    const addChildToGroup = async ({ code }: AddChildToGroupFormInputs) => {
        try {
            await mutateAsync({ joinCode: code, childId });
            toast.success("Oczekuj na zatwierdzenie prośby przez skarbnika.");
            close();
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się dodać dziecka do klasy.");
        }
    };

    const close = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Dodaj dziecko do klasy</DialogHeader>
                <Text as="p">Wpisz kod dostępu otrzymany od skarbnika klasy.</Text>

                <AddChildToGroupForm onSubmit={addChildToGroup} isLoading={isPending} onCancel={close} />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
