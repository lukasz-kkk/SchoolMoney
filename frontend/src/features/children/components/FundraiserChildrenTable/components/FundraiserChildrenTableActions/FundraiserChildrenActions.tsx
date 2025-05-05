import { FundraiserChild } from "@/features/children/types/Child";
import { Box, Button } from "@radix-ui/themes";

import styles from "./FundraiserChildrenActions.module.scss";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { moneyToFloatingPoint } from "@/features/finances/utils/moneyUtils.ts";
import { useFinancialAccount } from "@/features/finances/hooks/useFinancialAccount.ts";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { ExcludeFromFundraiserDialog } from "@/features/fundraisers/components/ExcludeFromFundraiserDialog/ExcludeFromFundraiserDialog.tsx";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";
import { useUser } from "@/features/auth/hooks/useUser.ts";

type FundraiserChildrenActionsProps = {
    child: FundraiserChild;
    fundraiser: Fundraiser;
};

export const FundraiserChildrenActions = ({ child, fundraiser }: FundraiserChildrenActionsProps) => {
    const { data: ownAccount } = useFinancialAccount();
    const { user } = useUser();

    if (fundraiser.isBlocked || fundraiser.hasFinished || !fundraiser.hasStarted) {
        return "Zablokowane";
    }

    if (!ownAccount || user?.role === "Admin") {
        return "-";
    }

    if (child.hasPaid) {
        return (
            <Box className={styles.actions}>
                <AccessGuard userId={[child.parentId, fundraiser.ownerId]}>
                    <ExcludeFromFundraiserDialog
                        fundraiserId={fundraiser.id}
                        childId={child.id}
                        trigger={
                            <Button size="1" color="crimson" variant="soft">
                                Wypisz ze zbiórki
                            </Button>
                        }
                    />
                </AccessGuard>
            </Box>
        );
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
                    sourceAccountNumber: ownAccount.accountNumber,
                    targetAccountNumber: fundraiser.account.accountNumber,
                    amount: moneyToFloatingPoint(fundraiser.amountPerPerson),
                    name: `Opłacenie składki za ${child.firstName} ${child.lastName} #${child.id}`,
                }}
            />

            <AccessGuard userId={[child.parentId, fundraiser.ownerId]}>
                <ExcludeFromFundraiserDialog
                    fundraiserId={fundraiser.id}
                    childId={child.id}
                    trigger={
                        <Button size="1" color="crimson" variant="soft">
                            Wypisz ze zbiórki
                        </Button>
                    }
                />
            </AccessGuard>
        </Box>
    );
};
