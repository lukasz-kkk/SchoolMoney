import { Box, Button, Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./CloseFundraiserDialog.module.scss";
import { toast } from "sonner";
import { useCloseFundraiser } from "@/features/fundraisers/hooks/useCloseFundraiser.ts";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody.tsx";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter.tsx";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type CloseFundraiserDialogProps = {
    trigger: ReactNode;
    fundraiserId: number;
};

export const CloseFundraiserDialog = ({ trigger, fundraiserId }: CloseFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useCloseFundraiser();
    const navigate = useNavigate();

    const closeFundraiser = async () => {
        try {
            await mutateAsync(fundraiserId);
            toast.success("Zbiórka została zamknięta.");
            navigate(-1);
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się zamknąć zbiórki.");
        }
    };

    const close = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Zamknij zbiórkę</DialogHeader>

                <DialogBody>
                    <p>
                        Po zamknięciu zbiórki nie będzie można jej ponownie otworzyć. Wszystkie pieniądze wpłacone na
                        zbiórkę zostaną zwrócone.
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

                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (error: Error) => {
    if ((error as AxiosError<string>).response?.data.includes("The source account has not enough funds.")) {
        return "Na koncie zbiórki nie ma wystarczających środków na zwrot wpłaty.";
    }

    return "Nieznany błąd. Spróbuj ponownie później.";
};
