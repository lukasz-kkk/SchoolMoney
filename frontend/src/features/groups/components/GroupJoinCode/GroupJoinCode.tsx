import { toast } from "sonner";
import { Box, Card, Code, Heading, Text } from "@radix-ui/themes";
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton/CopyToClipboardButton";

import styles from "./GroupJoinCode.module.scss";

type GroupJoinCodeProps = {
    value: string;
};

export const GroupJoinCode = ({ value }: GroupJoinCodeProps) => {
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
            </Box>
        </Card>
    );
};
