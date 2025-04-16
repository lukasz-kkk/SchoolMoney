import { Box, Button, Card, Heading, Text } from "@radix-ui/themes";

import styles from "./FundraiserCard.module.scss";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { TransformMoneyDialog } from "@/features/finances/components/TransferMoneyDialog/TransferMoneyDialog.tsx";

type FundraiserCardProps = {
    fundraiser: Fundraiser;
};

export const FundraiserCard = ({ fundraiser }: FundraiserCardProps) => {
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
                <TransformMoneyDialog
                    trigger={<Button color="jade">Wpłać</Button>}
                    title="Wpłata na zbiórkę"
                    transferData={{
                        targetAccountNumber: "0000 1111 2222 3333 4444 5555",
                        sourceAccountNumber: "Rachunek zewnętrzny",
                        name: `Wpłata na zbiórkę #${fundraiser.id}`,
                        amount: fundraiser.amountPerPerson,
                    }}
                />
                <Button>Szczegóły</Button>
            </Box>
        </Card>
    );
};
