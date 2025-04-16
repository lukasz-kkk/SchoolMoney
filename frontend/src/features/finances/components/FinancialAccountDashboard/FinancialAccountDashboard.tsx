import { Card, Text, Box, Button } from "@radix-ui/themes";
import styles from "./FinancialAccountDashboard.module.scss";
import { FinancialAccount, Transaction } from "@/features/finances/types/Finances";
import classNames from "classnames";
import { toast } from "sonner";
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton/CopyToClipboardButton.tsx";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { formatMoney, moneyToFloatingPoint } from "@/features/finances/utils/moneyUtils.ts";
import { TransactionsHistoryTable } from "@/features/finances/components/TransactionsHistoryTable/TransactionsHistoryTable.tsx";

type FinancialAccountDashboardProps = {
    primaryAccount: FinancialAccount;
    transactions: Transaction[];
};

export const FinancialAccountDashboard = ({ primaryAccount, transactions }: FinancialAccountDashboardProps) => {
    const formattedBalance = formatMoney(primaryAccount.balance);

    const onAccountNumberCopied = () => {
        toast.success("Skopiowano numer rachunku.");
    };

    return (
        <Box className={styles.container}>
            <Card className={styles.account}>
                <Box className={styles.row}>
                    <Box className={classNames(styles.name, styles.group)}>
                        <Text className={styles.label}>Nazwa rachunku</Text>
                        <Text className={styles.value}>Rachunek podstawowy</Text>
                    </Box>

                    <Box className={classNames(styles.balance, styles.group)}>
                        <Text className={styles.label}>Saldo</Text>
                        <Text className={styles.value}>{formattedBalance}</Text>
                    </Box>
                </Box>

                <Box className={classNames(styles.number, styles.group)}>
                    <Text className={styles.label}>Numer rachunku</Text>
                    <Box className={styles.valueWrapper}>
                        <Text className={styles.value}>{primaryAccount.accountNumber}</Text>
                        <CopyToClipboardButton value={primaryAccount.accountNumber} onSuccess={onAccountNumberCopied} />
                    </Box>
                </Box>

                <Box className={styles.footer}>
                    <TransformMoneyDialog
                        trigger={<Button color="jade">Wpłać</Button>}
                        title="Wpłać środki"
                        transferData={{
                            targetAccountNumber: primaryAccount.accountNumber,
                            sourceAccountNumber: "External",
                            name: "Zasilenie rachunku środkami",
                        }}
                    />

                    <TransformMoneyDialog
                        trigger={<Button color="crimson">Wypłać</Button>}
                        title="Wypłać środki"
                        restrictions={{
                            maxAmount: moneyToFloatingPoint(primaryAccount.balance),
                        }}
                        transferData={{
                            sourceAccountNumber: primaryAccount.accountNumber,
                            targetAccountNumber: "External",
                            name: "Wypłata pieniędzy z rachunku",
                        }}
                    />
                </Box>
            </Card>

            <TransactionsHistoryTable transactions={transactions} />
        </Box>
    );
};
