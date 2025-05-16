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
import { FundraisersService } from "@/features/fundraisers/api/fundraisersService.ts";
import { HourglassIcon, InfoIcon, MailIcon, XIcon } from "lucide-react";

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

    const downloadReport = async () => {
        await FundraisersService.downloadReport(fundraiser.id);
    };

    if (isAdmin) {
        return (
            <Box className={styles.container}>
                <Button size="1" variant="soft" onClick={downloadReport}>
                    Wygeneruj raport <InfoIcon size="16" />
                </Button>

                <Button size="1" variant="soft">
                    Skontaktuj się ze skarbnikiem <MailIcon size="16" />
                </Button>

                {!fundraiser.isBlocked && (
                    <SuspendFundraiserDialog
                        trigger={
                            <Button size="1" color="orange" variant="soft">
                                Zawieś zbiórkę <HourglassIcon size="16" />
                            </Button>
                        }
                        fundraiserId={fundraiser.id}
                    />
                )}

                {fundraiser.isBlocked && (
                    <UnlockFundraiserDialog
                        trigger={
                            <Button size="1" color="jade" variant="soft">
                                Odwieś zbiórkę <HourglassIcon size="16" />
                            </Button>
                        }
                        fundraiserId={fundraiser.id}
                    />
                )}

                <CloseFundraiserDialog
                    trigger={
                        <Button size="1" color="crimson" variant="soft">
                            Zamknij zbiórkę <XIcon size="16" />
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
            <Button size="1" variant="soft" onClick={downloadReport}>
                Wygeneruj raport <InfoIcon size="16" />
            </Button>

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
                            Doładuj konto zbiórki
                        </Button>
                    }
                    title="Doładuj konto zbiórki"
                    restrictions={{
                        maxAmount: moneyToFloatingPoint(data.balance),
                    }}
                    transferData={{
                        sourceAccountNumber: data.accountNumber,
                        targetAccountNumber: fundraiser.account.accountNumber,
                        name: `Doładowanie konta zbiórki ${fundraiser.id}`,
                    }}
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
                        name: `Wypłata pieniędzy ze zbiórki ${fundraiser.id}`,
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
