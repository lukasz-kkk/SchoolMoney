import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useFinancialAccount } from "@/features/finances/hooks/useFinancialAccount.ts";
import { FinancialAccountDashboard } from "@/features/finances/components/FinancialAccountDashboard/FinancialAccountDashboard.tsx";

const BaseFinancesPage = () => {
    const { data } = useFinancialAccount();

    return (
        <Page.Root>
            <Page.Header title="Finanse" />

            <Page.Content>
                {data && <FinancialAccountDashboard account={data} accountName="Podstawowy rachunek" />}
            </Page.Content>
        </Page.Root>
    );
};

export const FinancesPage = onlyAsAuthenticated(BaseFinancesPage);
