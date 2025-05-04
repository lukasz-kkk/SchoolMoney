import { Box } from "@radix-ui/themes";
import styles from "./FinancialAccountDashboard.module.scss";
import { FinancialAccount, Transaction } from "@/features/finances/types/Finances";
import { TransactionsHistoryTable } from "@/features/finances/components/TransactionsHistoryTable/TransactionsHistoryTable.tsx";
import { FinancialAccountCard } from "@/features/finances/components/FinancialAccountCard/FinancialAccountCard.tsx";

type FinancialAccountDashboardProps = {
    primaryAccount: FinancialAccount;
    transactions: Transaction[];
};

export const FinancialAccountDashboard = ({ primaryAccount, transactions }: FinancialAccountDashboardProps) => {
    return (
        <Box className={styles.container}>
            <FinancialAccountCard account={{ ...primaryAccount, name: "Rachunek podstawowy" }} withActions />
            <TransactionsHistoryTable transactions={transactions} />
        </Box>
    );
};
