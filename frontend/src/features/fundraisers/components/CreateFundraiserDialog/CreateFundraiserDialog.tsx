import { Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./CreateFundraiserDialog.module.scss";
import { useCreateFundraiser } from "@/features/fundraisers/hooks/useCreateFundraiser.ts";
import { toast } from "sonner";
import { CreateFundraiserFormInputs } from "@/features/fundraisers/components/CreateFundraiserForm/hooks/useCreateFundraiserForm.ts";
import { CreateFundraiserForm } from "@/features/fundraisers/components/CreateFundraiserForm/CreateFundraiserForm.tsx";
import { formatISODate } from "@/utils/dateFormat.ts";
import { moneyToInteger } from "@/features/finances/utils/moneyUtils.ts";

type CreateFundraiserDialogProps = {
    trigger: ReactNode;
    groupId: number;
};

export const CreateFundraiserDialog = ({ trigger, groupId }: CreateFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useCreateFundraiser();

    const createFundraiser = async ({
        name,
        description,
        endDate,
        startDate,
        amountPerPerson,
    }: CreateFundraiserFormInputs) => {
        try {
            await mutateAsync({
                name,
                description,
                endDate: formatISODate(endDate),
                startDate: formatISODate(startDate),
                amountPerPerson: moneyToInteger(amountPerPerson),
                groupId,
            });
            toast.success("Zbiórka została utworzona.");
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
                <DialogHeader>Dodaj zbiórkę</DialogHeader>

                <CreateFundraiserForm onSubmit={createFundraiser} isLoading={isPending} onCancel={close} />
                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (_error: Error) => {
    return "Nieznany błąd. Spróbuj ponownie później.";
};
