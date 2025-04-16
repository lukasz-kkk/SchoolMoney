import { Card, Text, Box, Button } from "@radix-ui/themes";
import styles from "./FinancialAccountDashboard.module.scss";
import { FinancialAccount } from "@/features/finances/types/Finances";
import classNames from "classnames";
import { toast } from "sonner";
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton/CopyToClipboardButton.tsx";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { formatMoney, moneyToFloatingPoint } from "@/features/finances/utils/moneyUtils.ts";

type FinancialAccountDashboardProps = {
    account: FinancialAccount;
    accountName: string;
};

export const FinancialAccountDashboard = ({ account, accountName }: FinancialAccountDashboardProps) => {
    const formattedBalance = formatMoney(account.balance);

    const onAccountNumberCopied = () => {
        toast.success("Skopiowano numer rachunku.");
    };

    return (
        <Card className={styles.container}>
            <Box className={styles.row}>
                <Box className={classNames(styles.name, styles.group)}>
                    <Text className={styles.label}>Nazwa rachunku</Text>
                    <Text className={styles.value}>{accountName}</Text>
                </Box>

                <Box className={classNames(styles.balance, styles.group)}>
                    <Text className={styles.label}>Saldo</Text>
                    <Text className={styles.value}>{formattedBalance}</Text>
                </Box>
            </Box>

            <Box className={classNames(styles.number, styles.group)}>
                <Text className={styles.label}>Numer rachunku</Text>
                <Box className={styles.valueWrapper}>
                    <Text className={styles.value}>{account.accountNumber}</Text>
                    <CopyToClipboardButton value={account.accountNumber} onSuccess={onAccountNumberCopied} />
                </Box>
            </Box>

            <Box className={styles.footer}>
                <TransformMoneyDialog
                    trigger={<Button color="jade">Wpłać</Button>}
                    title="Wpłać środki"
                    transferData={{
                        targetAccountNumber: account.accountNumber,
                        sourceAccountNumber: "Rachunek zewnętrzny",
                        name: "Zasilenie rachunku środkami",
                    }}
                />

                <TransformMoneyDialog
                    trigger={<Button color="crimson">Wypłać</Button>}
                    title="Wypłać środki"
                    restrictions={{
                        maxAmount: moneyToFloatingPoint(account.balance),
                    }}
                    transferData={{
                        sourceAccountNumber: account.accountNumber,
                        targetAccountNumber: "Rachunek zewnętrzny",
                        name: "Wypłata pieniędzy z rachunku",
                    }}
                />
            </Box>
        </Card>
    );
};
