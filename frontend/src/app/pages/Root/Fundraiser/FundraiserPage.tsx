import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFundraiser } from "@/features/fundraisers/hooks/useFundraiser.ts";
import { useParams } from "react-router-dom";
import { Box, Button } from "@radix-ui/themes";
import { ReceiptUploader } from "@/features/fundraisers/components/ReceiptUploader/ReceiptUploader.tsx";
import { ReceiptsList } from "@/features/fundraisers/components/ReceiptsList/ReceiptsList.tsx";
import { useState } from "react";

import styles from "./FundraiserPage.module.scss";
import { TransactionsHistoryTable } from "@/features/finances/components/TransactionsHistoryTable/TransactionsHistoryTable.tsx";

// TODO: Remove mocks
const BaseFundraiserPage = () => {
    const params = useParams<{ id: string }>();
    const { data: fundraiser } = useFundraiser(parseInt(params.id ?? "0"));
    const [files, setFiles] = useState<File[]>([]);

    const onUploadFile = (file: File) => {
        setFiles((prev) => [...prev, file]);
    };

    return (
        <Page.Root>
            <Page.Header title={fundraiser?.name ?? "Zbiórka"}>
                <Button color="jade">Edytuj</Button>
            </Page.Header>

            <Page.Content>
                <Box className={styles.contentWrapper}>
                    <Box className={styles.mainContent}></Box>

                    <Box className={styles.aside}>
                        <ReceiptUploader onUpload={onUploadFile} />
                        <ReceiptsList files={files} />
                    </Box>
                </Box>

                <TransactionsHistoryTable transactions={[]} />
            </Page.Content>
        </Page.Root>
    );
};

export const FundraiserPage = onlyAsAuthenticated(BaseFundraiserPage);
