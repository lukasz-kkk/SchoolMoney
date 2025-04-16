import { Box, Button, Card, Heading, Text } from "@radix-ui/themes";

import styles from "./FundraiserCard.module.scss";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";
import { CloseFundraiserDialog } from "@/features/fundraisers/components/CloseFundraiserDialog/CloseFundraiserDialog.tsx";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";

type FundraiserCardProps = {
    fundraiser: Fundraiser;
};

export const FundraiserCard = ({ fundraiser }: FundraiserCardProps) => {
    const navigate = useNavigate();

    const seeDetails = () => {
        navigate(AppRoute.FUNDRAISER.replace(":id", fundraiser.id.toString()));
    };

    return (
        <Card className={styles.container}>
            <Box className={styles.content}>
                <Heading className={styles.name} as="h3">
                    {fundraiser.name} (#{fundraiser.id})
                </Heading>
                <Text className={styles.description}>{fundraiser.description}</Text>
                <Box className={styles.footer}>
                    <Text className={styles.amountPerPerson}>
                        Kwota na osobę: <strong>{fundraiser.amountPerPerson}zł</strong>
                    </Text>

                    <Text className={styles.endDate}>
                        Zbiórka trwa od <strong>{fundraiser.startDate.toLocaleDateString()}</strong> do{" "}
                        <strong>{fundraiser.endDate.toLocaleDateString()}</strong>
                    </Text>
                </Box>
            </Box>
            <Box className={styles.actions}>
                <AccessGuard requiredAccess="User">
                    <TransformMoneyDialog
                        trigger={<Button color="jade">Wpłać</Button>}
                        title="Wpłata na zbiórkę"
                        transferData={{
                            targetAccountNumber: "0000 1111 2222 3333 4444 5555",
                            sourceAccountNumber: "5555 4444 3333 2222 1111 0000",
                            name: `Wpłata na zbiórkę #${fundraiser.id}`,
                            amount: fundraiser.amountPerPerson,
                        }}
                    />
                </AccessGuard>

                <AccessGuard requiredAccess="Admin">
                    <CloseFundraiserDialog
                        trigger={<Button color="crimson">Zamknij</Button>}
                        fundraiserId={fundraiser.id}
                    />
                </AccessGuard>

                <Button onClick={seeDetails}>Szczegóły</Button>
            </Box>
        </Card>
    );
};
