import { Child } from "@/features/children/types/Child";
import { Box, Button } from "@radix-ui/themes";

import styles from "./FundraiserChildrenActions.module.scss";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { moneyToFloatingPoint } from "@/features/finances/utils/moneyUtils.ts";
import { FinancialAccount } from "@/features/finances/types/Finances";
import { useFinancialAccount } from "@/features/finances/hooks/useFinancialAccount.ts";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";

type FundraiserChildrenActionsProps = {
    child: Child;
    fundraiserAccount: FinancialAccount;
    fundraiser: Fundraiser;
};

// TODO: Check if there is a payment for a child already
export const FundraiserChildrenActions = ({ child, fundraiserAccount, fundraiser }: FundraiserChildrenActionsProps) => {
    const { data: ownAccount } = useFinancialAccount();

    if (!ownAccount) {
        return "-";
    }

    return (
        <Box className={styles.actions}>
            <TransformMoneyDialog
                trigger={
                    <Button size="1" variant="soft">
                        Opłać składkę
                    </Button>
                }
                title={`Opłać składkę za ${child.firstName} ${child.lastName}`}
                transferData={{
                    sourceAccountNumber: fundraiserAccount.accountNumber,
                    targetAccountNumber: ownAccount.accountNumber,
                    amount: moneyToFloatingPoint(fundraiser.amountPerPerson),
                    name: `Opłacenie składki za ${child.firstName} ${child.lastName} #${child.id}`,
                }}
            />

            <Button size="1" color="crimson" variant="soft">
                Wypisz ze zbiórki
            </Button>
        </Box>
    );
};
