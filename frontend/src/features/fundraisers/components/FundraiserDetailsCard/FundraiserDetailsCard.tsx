import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { Box, Card, Text } from "@radix-ui/themes";
import styles from "./FundraiserDetailsCard.module.scss";
import classNames from "classnames";
import { formatMoney } from "@/features/finances/utils/moneyUtils.ts";
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton/CopyToClipboardButton.tsx";
import { toast } from "sonner";

type FundraiserDetailsCardProps = {
    fundraiser: Fundraiser;
    expectedPayments: number;
    payments: number;
};

export const FundraiserDetailsCard = ({ fundraiser, expectedPayments, payments }: FundraiserDetailsCardProps) => {
    const onAccountNumberCopied = () => {
        toast.success("Skopiowano numer rachunku.");
    };

    return (
        <Card className={styles.container}>
            <Box className={styles.row}>
                <Box className={classNames(styles.id, styles.group)}>
                    <Text className={styles.label}>ID</Text>
                    <Text className={styles.value}>#{fundraiser.id}</Text>
                </Box>

                <Box className={classNames(styles.name, styles.group)}>
                    <Text className={styles.label}>Tytuł zbiórki</Text>
                    <Text className={styles.value}>{fundraiser.name}</Text>
                </Box>
            </Box>

            <Box className={styles.row}>
                <Box className={classNames(styles.amountPerPerson, styles.group)}>
                    <Text className={styles.label}>Kwota na osobę</Text>
                    <Text className={styles.value}>{formatMoney(fundraiser.amountPerPerson)}</Text>
                </Box>

                <Box className={classNames(styles.amountPerPerson, styles.group)}>
                    <Text className={styles.label}>Liczba wpłat</Text>
                    <Text className={styles.value}>
                        {payments}/{expectedPayments}
                    </Text>
                </Box>

                <Box className={classNames(styles.balance, styles.group)}>
                    <Text className={styles.label}>Saldo</Text>
                    <Text className={styles.value}>{formatMoney(fundraiser.account.balance)}</Text>
                </Box>

                <Box className={classNames(styles.date, styles.group)}>
                    <Text className={styles.label}>Aktywna od</Text>
                    <Text className={styles.value}>{fundraiser.startDate.toLocaleDateString()}</Text>
                </Box>

                <Box className={classNames(styles.date, styles.group)}>
                    <Text className={styles.label}>Aktywna do</Text>
                    <Text className={styles.value}>{fundraiser.endDate.toLocaleDateString()}</Text>
                </Box>
            </Box>

            <Box className={styles.row}>
                <Box className={classNames(styles.number, styles.group)}>
                    <Text className={styles.label}>Numer rachunku</Text>
                    <Box className={styles.valueWrapper}>
                        <Text className={styles.value}>{fundraiser.account.accountNumber}</Text>
                        <CopyToClipboardButton
                            value={fundraiser.account.accountNumber}
                            onSuccess={onAccountNumberCopied}
                        />
                    </Box>
                </Box>
            </Box>

            <Box className={styles.row}>
                <Box className={classNames(styles.description, styles.group)}>
                    <Text className={styles.label}>Opis</Text>
                    <Text className={styles.value}>{fundraiser.description}</Text>
                </Box>
            </Box>
        </Card>
    );
};
