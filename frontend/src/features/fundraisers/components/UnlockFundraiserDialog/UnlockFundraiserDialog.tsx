import { Box, Button, Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./UnlockFundraiserDialog.module.scss";
import { toast } from "sonner";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody.tsx";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter.tsx";
import { useUnlockFundraiser } from "@/features/fundraisers/hooks/useUnlockFundraiser.ts";

type UnlockFundraiserDialogProps = {
    trigger: ReactNode;
    fundraiserId: number;
};

export const UnlockFundraiserDialog = ({ trigger, fundraiserId }: UnlockFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useUnlockFundraiser();

    const closeFundraiser = async () => {
        try {
            await mutateAsync(fundraiserId);
            toast.success("Zbiórka została odwieszona.");
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
                <DialogHeader>Odwieś zbiórkę</DialogHeader>

                <DialogBody>
                    <p>Po odwieszeniu zbiórki będzie można ją edytować oraz zarządzać jej rachunkiem bankowym.</p>
                </DialogBody>

                <DialogFooter>
                    <Box className={classes.actions}>
                        <Button variant="soft" onClick={close}>
                            Anuluj
                        </Button>
                        <Button color="jade" loading={isPending} onClick={closeFundraiser} variant="soft">
                            Potwierdź
                        </Button>
                    </Box>
                </DialogFooter>

                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (_error: Error) => {
    return "Nieznany błąd. Spróbuj ponownie później.";
};
