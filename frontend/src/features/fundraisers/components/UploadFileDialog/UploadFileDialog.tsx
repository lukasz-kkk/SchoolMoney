import { Box, Button, Dialog } from "@radix-ui/themes";
import { ChangeEventHandler, useState } from "react";
import { DialogHeader } from "@/components/Dialog/components/DialogHeader/DialogHeader.tsx";
import { Alert } from "@/components/Alert/Alert.tsx";

import classes from "./UploadFileDialog.module.scss";
import { toast } from "sonner";
import { DialogBody } from "@/components/Dialog/components/DialogBody/DialogBody.tsx";
import { DialogFooter } from "@/components/Dialog/components/DialogFooter/DialogFooter.tsx";
import { useUploadFile } from "@/features/fundraisers/hooks/useUploadFile.ts";
import { Input } from "@/components/Input/Input.tsx";

type UploadFileDialogProps = {
    file: File | null;
    isOpen: boolean;
    onClose: () => void;
    fundraiserId: number;
};

export const UploadFileDialog = ({ file, fundraiserId, onClose, isOpen }: UploadFileDialogProps) => {
    const [description, setDescription] = useState<string>("");
    const { mutateAsync, isPending, error } = useUploadFile();

    const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDescription(e.target.value);
    };

    const uploadFile = async () => {
        if (!file) {
            return;
        }

        try {
            const bytes = await file.arrayBuffer();
            await mutateAsync({ fundraiserId, description, bytes, filename: file.name });
            close();
            toast.success("Plik został opublikowany.");
        } catch (e) {
            console.log(e);
        }
    };

    const close = () => {
        onClose();
    };

    const onOpenChange = () => {
        if (isOpen) {
            close();
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Content maxWidth="450px">
                <DialogHeader>Dodaj plik</DialogHeader>

                <DialogBody>
                    <p>
                        Zamierzasz dodać plik o nazwie &#39;{file?.name}&#39;. Jeśli chcesz, możesz dodać do niego opis.
                        W przeciwnym razie możesz od razu zatwierdzić dodanie pliku.
                    </p>

                    <Input label="Opis pliku" type="textarea" onChange={onDescriptionChange} />
                </DialogBody>

                <DialogFooter>
                    <Box className={classes.actions}>
                        <Button variant="soft" onClick={close}>
                            Anuluj
                        </Button>
                        <Button color="jade" loading={isPending} onClick={uploadFile} variant="soft">
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
