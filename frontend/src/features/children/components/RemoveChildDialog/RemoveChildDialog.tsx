import { Dialog, Button, Strong } from "@radix-ui/themes";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./RemoveChildDialog.module.scss";
import { toast } from "sonner";
import { BaseChild } from "@/features/children/types/Child";
import { useRemoveChild } from "@/features/children/hooks/useRemoveChild";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader";

type RemoveChildDialogProps = {
    child: BaseChild;
    trigger: ReactNode;
};

export const RemoveChildDialog = ({ child, trigger }: RemoveChildDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: removeChild, isPending, error } = useRemoveChild();

    const handleDelete = async () => {
        await removeChild(child.id);
        toast.success("Dziecko zostało usunięte.");
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Usuń dziecko</DialogHeader>
                <DialogBody>
                    Czy na pewno chcesz usunąć dziecko{" "}
                    {
                        <Strong>
                            {child.firstName} {child.lastName}
                        </Strong>
                    }
                    ?
                </DialogBody>
                <DialogFooter>
                    <Dialog.Close>
                        <Button variant="soft">Anuluj</Button>
                    </Dialog.Close>
                    <Button color="crimson" loading={isPending} onClick={handleDelete}>
                        Usuń
                    </Button>
                </DialogFooter>
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
