import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { FinancialAccount } from "@/features/finances/types/Finances";
import { useFinancialAccount } from "@/features/finances/hooks/useFinancialAccount.ts";
import { Box, Button, Spinner } from "@radix-ui/themes";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { moneyToFloatingPoint } from "@/features/finances/utils/moneyUtils.ts";
import { CloseFundraiserDialog } from "@/features/fundraisers/components/CloseFundraiserDialog/CloseFundraiserDialog.tsx";

import styles from "./FundraiserManagementPanel.module.scss";
import { SuspendFundraiserDialog } from "@/features/fundraisers/components/SuspendFundraiserDialog/SuspendFundraiserDialog.tsx";
import { useAccessValidation } from "@/features/auth/hooks/useAccessLevel.tsx";

type FundraiserManagementActionsProps = {
    fundraiser: Fundraiser;
    fundraiserAccount: FinancialAccount;
};

export const FundraiserActions = ({ fundraiser, fundraiserAccount }: FundraiserManagementActionsProps) => {
    const { data } = useFinancialAccount();
    const { validateAccessLevel, validateUserIdentifier } = useAccessValidation();
    const isAdmin = validateAccessLevel("Admin");
    const isTreasurer = validateUserIdentifier(fundraiser.ownerId);

    if (!data) {
        return <Spinner />;
    }

    if (isAdmin) {
        return (
            <Box className={styles.container}>
                <Button size="1" variant="soft">
                    Skontaktuj się ze skarbnikiem
                </Button>

                <SuspendFundraiserDialog
                    trigger={
                        <Button size="1" color="orange" variant="soft">
                            Zawieś zbiórkę
                        </Button>
                    }
                    fundraiserId={fundraiser.id}
                />

                <CloseFundraiserDialog
                    trigger={
                        <Button size="1" color="crimson" variant="soft">
                            Zamknij zbiórkę
                        </Button>
                    }
                    fundraiserId={fundraiser.id}
                />
            </Box>
        );
    }

    if (isTreasurer) {
        return (
            <Box className={styles.container}>
                <Button size="1" color="jade" variant="soft">
                    Edytuj informacje o zbiórce
                </Button>

                <TransformMoneyDialog
                    trigger={
                        <Button size="1" variant="soft">
                            Przelej środki na własne konto
                        </Button>
                    }
                    title="Przelej środki na własne konto"
                    restrictions={{
                        maxAmount: moneyToFloatingPoint(fundraiserAccount.balance),
                    }}
                    transferData={{
                        sourceAccountNumber: fundraiserAccount.accountNumber,
                        targetAccountNumber: data.accountNumber,
                        name: `Wypłata pieniędzy ze zbiórki #${fundraiser.id}`,
                    }}
                />

                <CloseFundraiserDialog
                    trigger={
                        <Button size="1" color="crimson" variant="soft">
                            Zamknij zbiórkę
                        </Button>
                    }
                    fundraiserId={fundraiser.id}
                />
            </Box>
        );
    }

    return null;
};
