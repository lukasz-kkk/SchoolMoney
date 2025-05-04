import { Box, Button, Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./SuspendFundraiserDialog.module.scss";
import { toast } from "sonner";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody.tsx";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter.tsx";
import { useSuspendFundraiser } from "@/features/fundraisers/hooks/useSuspendFundraiser.ts";

type SuspendFundraiserDialogProps = {
    trigger: ReactNode;
    fundraiserId: number;
};

export const SuspendFundraiserDialog = ({ trigger, fundraiserId }: SuspendFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useSuspendFundraiser();

    const closeFundraiser = async () => {
        try {
            await mutateAsync(fundraiserId);
            toast.success("Zbiórka została zawieszona.");
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się zawiesić zbiórki.");
        }
    };

    const close = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Zawieś zbiórkę</DialogHeader>

                <DialogBody>
                    <p>
                        Po zawieszeniu zbiórki nie będzie można jej modyfikować, nie będzie można też wpłacać i wypłacać
                        pieniędzy z konta zbiórki. Tylko administrator może wznowić zbiórkę.
                    </p>
                </DialogBody>

                <DialogFooter>
                    <Box className={classes.actions}>
                        <Button variant="soft" onClick={close}>
                            Anuluj
                        </Button>
                        <Button color="crimson" loading={isPending} onClick={closeFundraiser} variant="soft">
                            Potwierdź
                        </Button>
                    </Box>
                </DialogFooter>

                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
