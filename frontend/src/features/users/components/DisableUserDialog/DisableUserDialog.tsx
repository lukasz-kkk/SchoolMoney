import { Dialog, Button, Strong } from "@radix-ui/themes";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./DisableUserDialog.module.scss";
import { toast } from "sonner";
import { useDisableUser } from "@/features/users/hooks/useDisableUser";
import { User } from "@/types/User";

type DisableUserDialogProps = {
    user: User;
    trigger: ReactNode;
};

export const DisableUserDialog = ({ user, trigger }: DisableUserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: disableUser, isPending, error } = useDisableUser();

    const handleDelete = async () => {
        await disableUser(user.id);
        toast.success("Dostęp użytkownika zablokowany.");
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Zablokuj dostęp użytkownika</DialogHeader>
                <DialogBody>
                    Czy na pewno chcesz wyłączyć dostęp użytkownika{" "}
                    {
                        <Strong>
                            {user.firstName} {user.lastName}
                        </Strong>
                    }
                    ?
                </DialogBody>
                <DialogFooter>
                    <Dialog.Close>
                        <Button variant="soft">Anuluj</Button>
                    </Dialog.Close>
                    <Button color="crimson" loading={isPending} onClick={handleDelete} variant="soft">
                        Wyłącz
                    </Button>
                </DialogFooter>
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
