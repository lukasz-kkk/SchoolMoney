import { Dialog, Text } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";
import { CreateGroupFormInputs } from "@/features/groups/components/CreateGroupForm/hooks/useCreateGroupForm.ts";
import { toast } from "sonner";
import { useCreateGroup } from "@/features/groups/hooks/useCreateGroup.ts";
import { CreateGroupForm } from "@/features/groups/components/CreateGroupForm/CreateGroupForm.tsx";

import classes from "./CreateGroupDialog.module.scss";
import { AxiosError } from "axios";

type CreateGroupDialogProps = {
    trigger: ReactNode;
};

export const CreateGroupDialog = ({ trigger }: CreateGroupDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useCreateGroup();

    const createGroup = async ({ name }: CreateGroupFormInputs) => {
        try {
            await mutateAsync({ name });
            toast.success("Klasa została utworzona.");
            close();
        } catch (e) {
            console.log(e);
        }
    };

    const close = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Dodaj klasę</DialogHeader>
                <Text as="p">Po utworzeniu klasy staniesz się jej skarbnikiem.</Text>

                <CreateGroupForm onSubmit={createGroup} isLoading={isPending} onCancel={close} />
                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (error: Error) => {
    if ((error as AxiosError).status === 400) {
        return "Nazwy klasy jest już zajęta.";
    }

    return "Nieznany błąd. Spróbuj ponownie później.";
};
