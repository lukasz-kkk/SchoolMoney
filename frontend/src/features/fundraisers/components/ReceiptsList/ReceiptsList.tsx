import { Card, Heading, IconButton, Text } from "@radix-ui/themes";
import styles from "./ReceipsList.module.scss";
import { DownloadIcon, FileIcon, TrashIcon } from "lucide-react";
import { FileMetadata } from "@/features/fundraisers/types/File";
import { FilesService } from "@/features/fundraisers/api/filesService.ts";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";
import { useDeleteFile } from "@/features/fundraisers/hooks/useDeleteFile.ts";
import { toast } from "sonner";

type ReceiptsListProps = {
    filesMetadata: FileMetadata[];
    ownerId: number;
};

export const ReceiptsList = ({ filesMetadata, ownerId }: ReceiptsListProps) => {
    const { mutateAsync: deleteFile } = useDeleteFile();

    const handleDownload = async (filename: string) => {
        await FilesService.downloadFile(filename);
    };

    const handleDelete = async (filename: string) => {
        await deleteFile(filename);
        toast.success("Usunięto plik.");
    };

    return (
        <Card className={styles.container}>
            <Heading as="h3">Pliki</Heading>
            <Text as="p" className={styles.caption}>
                {filesMetadata && filesMetadata.length > 0
                    ? "Wszystkie pliki dodane przez skarbnika zbiórki:"
                    : "Na ten moment skarbnik nie dodał jeszcze żadnego pliku. Gdy tylko się tak stanie, pliki pojawią się w tym miejscu."}
            </Text>

            {filesMetadata.length > 0 && (
                <ul className={styles.list}>
                    {filesMetadata.map((file, index) => (
                        <li key={`${file.filename}-${index}`} className={styles.listItem}>
                            <Card className={styles.fileCard}>
                                <FileIcon className={styles.icon} />

                                <div className={styles.fileMetadata}>
                                    <a className={styles.fileName} onClick={() => handleDownload(file.filename)}>
                                        {file.filename}
                                    </a>
                                    <p className={styles.fileDescription}>{file.description}</p>
                                </div>

                                <div className={styles.actions}>
                                    <IconButton variant="soft" onClick={() => handleDownload(file.filename)} size="3">
                                        <DownloadIcon />
                                    </IconButton>

                                    <AccessGuard userId={ownerId}>
                                        <IconButton
                                            variant="soft"
                                            color="crimson"
                                            size="3"
                                            onClick={() => handleDelete(file.filename)}
                                        >
                                            <TrashIcon />
                                        </IconButton>
                                    </AccessGuard>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    );
};
