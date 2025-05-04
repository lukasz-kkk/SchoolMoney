import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { useFinancialAccount } from "@/features/finances/hooks/useFinancialAccount.ts";
import { Box, Button, Spinner } from "@radix-ui/themes";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { moneyToFloatingPoint } from "@/features/finances/utils/moneyUtils.ts";
import { CloseFundraiserDialog } from "@/features/fundraisers/components/CloseFundraiserDialog/CloseFundraiserDialog.tsx";

import styles from "./FundraiserManagementPanel.module.scss";
import { SuspendFundraiserDialog } from "@/features/fundraisers/components/SuspendFundraiserDialog/SuspendFundraiserDialog.tsx";
import { useAccessValidation } from "@/features/auth/hooks/useAccessLevel.tsx";
import { UpdateFundraiserDialog } from "@/features/fundraisers/components/UpdateFundraiserDialog/UpdateFundraiserDialog.tsx";
import { UnlockFundraiserDialog } from "@/features/fundraisers/components/UnlockFundraiserDialog/UnlockFundraiserDialog.tsx";

type FundraiserManagementActionsProps = {
    fundraiser: Fundraiser;
};

export const FundraiserActions = ({ fundraiser }: FundraiserManagementActionsProps) => {
    const { data } = useFinancialAccount();
    const { validateAccessLevel, validateUserIdentifier } = useAccessValidation();
    const isAdmin = validateAccessLevel("Admin");
    const isAuthor = validateUserIdentifier(fundraiser.ownerId);
    const isTreasurer = fundraiser.treasurerId && validateUserIdentifier(fundraiser.treasurerId);

    if (!data) {
        return <Spinner />;
    }

    if (isAdmin) {
        return (
            <Box className={styles.container}>
                <Button size="1" variant="soft">
                    Skontaktuj się ze skarbnikiem
                </Button>

                {!fundraiser.isBlocked && (
                    <SuspendFundraiserDialog
                        trigger={
                            <Button size="1" color="orange" variant="soft">
                                Zawieś zbiórkę
                            </Button>
                        }
                        fundraiserId={fundraiser.id}
                    />
                )}

                {fundraiser.isBlocked && (
                    <UnlockFundraiserDialog
                        trigger={
                            <Button size="1" color="jade" variant="soft">
                                Odwieś zbiórkę
                            </Button>
                        }
                        fundraiserId={fundraiser.id}
                    />
                )}

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

    if (fundraiser.isBlocked) {
        return null;
    }

    return (
        <Box className={styles.container}>
            {(isAuthor || isTreasurer) && (
                <UpdateFundraiserDialog
                    fundraiser={fundraiser}
                    trigger={
                        <Button size="1" color="jade" variant="soft">
                            Edytuj informacje o zbiórce
                        </Button>
                    }
                />
            )}

            {isTreasurer && (
                <TransformMoneyDialog
                    trigger={
                        <Button size="1" variant="soft">
                            Przelej środki na własne konto
                        </Button>
                    }
                    title="Przelej środki na własne konto"
                    restrictions={{
                        maxAmount: moneyToFloatingPoint(fundraiser.account.balance),
                    }}
                    transferData={{
                        sourceAccountNumber: fundraiser.account.accountNumber,
                        targetAccountNumber: data.accountNumber,
                        name: `Wypłata pieniędzy ze zbiórki #${fundraiser.id}`,
                    }}
                />
            )}

            {(isAuthor || isTreasurer) && (
                <CloseFundraiserDialog
                    trigger={
                        <Button size="1" color="crimson" variant="soft">
                            Zamknij zbiórkę
                        </Button>
                    }
                    fundraiserId={fundraiser.id}
                />
            )}
        </Box>
    );
};
