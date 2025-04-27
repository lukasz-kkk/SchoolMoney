import { Card, Heading, Text } from "@radix-ui/themes";
import styles from "./ReceipsList.module.scss";
import { useEffect, useState } from "react";
import { FileIcon } from "lucide-react";

type ReceiptsListProps = {
    files: File[];
};

interface FileWithPreview extends File {
    preview: string;
}

export const ReceiptsList = ({ files }: ReceiptsListProps) => {
    const [filesWithPreview, setFilesWithPreview] = useState<FileWithPreview[]>([]);

    useEffect(() => {
        const newFilesWithPreview = files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFilesWithPreview(newFilesWithPreview);

        return () => {
            newFilesWithPreview.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handleLocalDownload = (file: File) => {
        if (!file) {
            return;
        }

        const objectUrl = URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = file.name;
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
    };

    return (
        <Card className={styles.container}>
            <Heading as="h3">Pliki</Heading>
            <Text as="p" className={styles.caption}>
                {files && files.length > 0
                    ? "Wszystkie pliki dodane przez skarbnika zbiórki:"
                    : "Na ten moment skarbnik nie dodał jeszcze żadnego pliku. Gdy tylko się tak stanie, pliki pojawią się w tym miejscu."}
            </Text>

            {filesWithPreview.length > 0 && (
                <ul className={styles.list}>
                    {filesWithPreview.map((file, index) => (
                        <li key={`${file.name}-${index}`} className={styles.listItem}>
                            <Card className={styles.fileCard}>
                                <FileIcon className={styles.icon} />

                                <a className={styles.fileName} onClick={() => handleLocalDownload(file)}>
                                    {file.name}
                                </a>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
};
