import { Dialog, Button, Strong } from "@radix-ui/themes";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody";
import { ReactNode, useState } from "react";
import { Alert } from "@/components/Alert/Alert";
import classes from "./WithdrawChildDialog.module.scss";
import { toast } from "sonner";
import { BaseChild } from "@/features/children/types/Child";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader";
import { AxiosError } from "axios";
import { useWithdrawChild } from "@/features/children/hooks/useWithdrawChild.ts";

type WithdrawChildDialogProps = {
    child: BaseChild;
    trigger: ReactNode;
};

export const WithdrawChildDialog = ({ child, trigger }: WithdrawChildDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync: removeChild, isPending, error } = useWithdrawChild();

    const handleWithdraw = async () => {
        await removeChild({ childId: child.id, groupId: child.groupId });
        toast.success("Dziecko zostało wypisane z klasy.");
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>Wypisz dziecko</DialogHeader>
                <DialogBody>
                    Czy na pewno chcesz wypisać dziecko{" "}
                    {
                        <Strong>
                            {child.firstName} {child.lastName}
                        </Strong>
                    }{" "}
                    z klasy? Wszystkie wpłaty na dotychczasowe zbiórki zostaną automatycznie zwrócone w miarę
                    możliwości.
                </DialogBody>
                <DialogFooter>
                    <Dialog.Close>
                        <Button variant="soft">Anuluj</Button>
                    </Dialog.Close>
                    <Button color="crimson" loading={isPending} onClick={handleWithdraw} variant="soft">
                        Wypisz
                    </Button>
                </DialogFooter>
                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (error: Error) => {
    if ((error as AxiosError<string>).response?.data.includes("The source account has not enough funds.")) {
        return (
            "Dziecko jest członkiem zbiórki i na jej koncie widnieje wpłata, której nie można rozliczyć. Skontaktuj" +
            " się z administratorem lub skarbnikiem."
        );
    }

    return "Nieznany błąd. Spróbuj ponownie później.";
};
