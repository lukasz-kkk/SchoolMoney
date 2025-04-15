import { Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";
import { toast } from "sonner";

import classes from "./TransferMoneyDialog.module.scss";
import { useTransferMoney } from "@/features/finances/hooks/useTransferMoney.ts";
import { TransferMoneyForm } from "@/features/finances/components/TransferMoneyForm/TransferMoneyForm.tsx";
import { TransferMoneyFormInputs } from "@/features/finances/components/TransferMoneyForm/hooks/useTransferMoneyForm.ts";

type TransformMoneyDialogProps = {
    title: string;
    trigger: ReactNode;
    transferData?: Partial<TransferMoneyFormInputs>;
    restrictions?: {
        maxAmount?: number;
    };
};

export const TransformMoneyDialog = ({ trigger, title, transferData, restrictions }: TransformMoneyDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useTransferMoney();

    const transferMoney = async ({
        amount,
        name,
        targetAccountNumber,
        sourceAccountNumber,
    }: TransferMoneyFormInputs) => {
        try {
            await mutateAsync({ amount, name, targetAccountNumber, sourceAccountNumber });
            toast.success("Przelew środków został zlecony.");
        } catch (e) {
            console.log(e);
            toast.error("Nie udało się zlecić przelewu środków.");
        }
    };

    const handleFormCancel = () => {
        setOpen(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>{trigger}</Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <DialogHeader>{title}</DialogHeader>
                <TransferMoneyForm
                    onSubmit={transferMoney}
                    isLoading={isPending}
                    onCancel={handleFormCancel}
                    restrictions={restrictions}
                    data={transferData}
                />
                {error && <Alert className={classes.alert}>{error.message}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};
