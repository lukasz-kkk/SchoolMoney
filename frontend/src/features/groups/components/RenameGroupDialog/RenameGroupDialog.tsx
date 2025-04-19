import { Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";
import { CreateGroupFormInputs } from "@/features/groups/components/CreateGroupForm/hooks/useCreateGroupForm.ts";
import { toast } from "sonner";
import { CreateGroupForm } from "@/features/groups/components/CreateGroupForm/CreateGroupForm.tsx";

import classes from "./RenameGroupDialog.module.scss";
import { useRenameGroup } from "@/features/groups/hooks/useRenameGroup";

type RenameGroupDialogProps = {
    trigger: ReactNode;
    groupId: number;
};

export const RenameGroupDialog = ({ trigger, groupId }: RenameGroupDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useRenameGroup();

    const createGroup = async ({ name }: CreateGroupFormInputs) => {
        try {
            await mutateAsync({ newName: name, groupId });
            toast.success("Klasa została zaktualizowana");
            close();
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się zaktualizować klasy.");
        }
    };

    const close = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Edytuj klasę</DialogHeader>
                <CreateGroupForm onSubmit={createGroup} isLoading={isPending} onCancel={close} />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
