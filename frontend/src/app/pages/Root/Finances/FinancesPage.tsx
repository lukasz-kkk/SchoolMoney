import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFinancialAccount } from "@/features/finances/hooks/useFinancialAccount.ts";
import { FinancialAccountDashboard } from "@/features/finances/components/FinancialAccountDashboard/FinancialAccountDashboard.tsx";
import { useTransactionsHistory } from "@/features/finances/hooks/useTransactionsHistory.ts";

const BaseFinancesPage = () => {
    const { data: account } = useFinancialAccount();
    const { data: transactions } = useTransactionsHistory();

    return (
        <Page.Root>
            <Page.Header title="Finanse" />

            <Page.Content>
                {account && <FinancialAccountDashboard primaryAccount={account} transactions={transactions} />}
            </Page.Content>
        </Page.Root>
    );
};

export const FinancesPage = onlyAsAuthenticated(BaseFinancesPage);
