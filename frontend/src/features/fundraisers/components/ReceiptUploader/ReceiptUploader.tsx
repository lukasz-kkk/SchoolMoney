import { Card, Heading, Text } from "@radix-ui/themes";
import { FileUploader } from "react-drag-drop-files";

import styles from "./ReceiptUploader.module.scss";

const SUPPORTED_FILES = ["JPG", "PNG", "GIF"];

const MAX_FILE_SIZE_IN_MB = 2;

type ReceiptUploaderProps = {
    onUpload: (file: File) => void;
};

export const ReceiptUploader = ({ onUpload }: ReceiptUploaderProps) => {
    return (
        <Card className={styles.container}>
            <Heading as="h3">Dodaj plik</Heading>
            <Text as="p" className={styles.caption}>
                Możesz dodać zdjęcie paragonu, faktury, czegokolwiek co przyda się jako dowód zbiórki.
            </Text>

            <FileUploader
                name="file"
                classes={styles.dropZone}
                handleChange={onUpload}
                types={SUPPORTED_FILES}
                label="Max. rozmiar pliku to 2MB."
                uploadedLabel="Plik został dodany, możesz dodać kolejny."
                maxSize={MAX_FILE_SIZE_IN_MB}
            />
        </Card>
    );
};
