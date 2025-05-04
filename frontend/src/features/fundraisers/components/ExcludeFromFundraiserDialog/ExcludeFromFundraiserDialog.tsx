import { Box, Button, Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./ExcludeFromFundraiserDialog.module.scss";
import { toast } from "sonner";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody.tsx";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter.tsx";
import { useExcludeParticipantFromFundraiser } from "@/features/fundraisers/hooks/useExcludeParticipantFromFundraiser.ts";
import { AxiosError } from "axios";

type ExcludeFromFundraiserDialogProps = {
    trigger: ReactNode;
    fundraiserId: number;
    childId: number;
};

export const ExcludeFromFundraiserDialog = ({ trigger, fundraiserId, childId }: ExcludeFromFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useExcludeParticipantFromFundraiser();

    const closeFundraiser = async () => {
        try {
            await mutateAsync({ childId, fundraiserId });
            toast.success("Wypisano dziecko ze zbiórki.");
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
                <DialogHeader>Wypisz dziecko ze zbiórki</DialogHeader>

                <DialogBody>
                    <p>Po wypisaniu dziecka ze zbiórki, nie będzie można za nie opłacić składki.</p>
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

                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (error: Error) => {
    if ((error as AxiosError<string>).response?.data.includes("The source account has not enough funds.")) {
        return (
            "Na koncie zbiórki nie ma wystarczających środków na zwrot wpłaty. Skontaktuj się ze skarbnikiem lub z" +
            " administratorem."
        );
    }

    return "Nieznany błąd. Spróbuj ponownie później.";
};
