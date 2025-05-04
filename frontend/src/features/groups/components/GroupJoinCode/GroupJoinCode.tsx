import { toast } from "sonner";
import { Box, Card, Code, Heading, IconButton, Text } from "@radix-ui/themes";
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton/CopyToClipboardButton";

import styles from "./GroupJoinCode.module.scss";
import { RefreshCwIcon } from "lucide-react";

type GroupJoinCodeProps = {
    value: string;
    onRefresh: () => void;
    isRefreshing?: boolean;
};

export const GroupJoinCode = ({ value, onRefresh, isRefreshing }: GroupJoinCodeProps) => {
    const onCopied = () => {
        toast.success("Skopiowano kod do schowka.");
    };

    return (
        <Card className={styles.container}>
            <Heading as="h3">Kod dołączenia do klasy</Heading>
            <Text className={styles.caption}>
                Rodzice mogą użyć tego kodu aby zapisać dzieci do utworzonej przez Ciebie klasy. Skopiuj kod i wyślij go
                wszystkim zainteresowanym.
            </Text>

            <Box className={styles.codeContainer}>
                <Code className={styles.code}>{value}</Code>
                <CopyToClipboardButton value={value} onSuccess={onCopied} />

                <IconButton
                    className={styles.refreshButton}
                    size="1"
                    variant="ghost"
                    color="gray"
                    onClick={onRefresh}
                    loading={isRefreshing}
                >
                    <RefreshCwIcon />
                </IconButton>
            </Box>
        </Card>
    );
};
