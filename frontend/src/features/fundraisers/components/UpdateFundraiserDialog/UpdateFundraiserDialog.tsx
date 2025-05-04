import { Dialog } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./UpdateFundraiserDialog.module.scss";
import { toast } from "sonner";
import { formatISODate } from "@/utils/dateFormat.ts";
import { useUpdateFundraiser } from "@/features/fundraisers/hooks/useUpdateFundraiser.ts";
import { UpdateFundraiserFormInputs } from "@/features/fundraisers/components/UpdateFundraiserForm/hooks/useUpdateFundraiserForm.ts";
import { UpdateFundraiserForm } from "@/features/fundraisers/components/UpdateFundraiserForm/UpdateFundraiserForm.tsx";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";

type UpdateFundraiserDialogProps = {
    trigger: ReactNode;
    fundraiser: Fundraiser;
};

export const UpdateFundraiserDialog = ({ trigger, fundraiser }: UpdateFundraiserDialogProps) => {
    const [open, setOpen] = useState(false);
    const { mutateAsync, isPending, error } = useUpdateFundraiser();

    const updateFundraiser = async ({ name, description, endDate, startDate }: UpdateFundraiserFormInputs) => {
        try {
            await mutateAsync({
                name,
                description,
                endDate: formatISODate(endDate),
                startDate: formatISODate(startDate),
                id: fundraiser.id,
            });
            toast.success("Zbiórka została zaktualizowana.");
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

                <UpdateFundraiserForm
                    defaultValues={fundraiser}
                    onSubmit={updateFundraiser}
                    isLoading={isPending}
                    onCancel={close}
                />
                {error && <Alert className={classes.alert}>{mapError(error)}</Alert>}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const mapError = (_error: Error) => {
    return "Nieznany błąd. Spróbuj ponownie później.";
};
