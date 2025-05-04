import { Box, Button, Card, Heading, Text } from "@radix-ui/themes";

import styles from "./FundraiserCard.module.scss";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/app/router";
import { formatMoney } from "@/features/finances/utils/moneyUtils.ts";
import { EyeIcon } from "lucide-react";

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
                        Kwota na osobę: <strong>{formatMoney(fundraiser.amountPerPerson)}</strong>
                    </Text>

                    <Text className={styles.endDate}>
                        Zbiórka trwa od <strong>{fundraiser.startDate.toLocaleDateString()}</strong> do{" "}
                        <strong>{fundraiser.endDate.toLocaleDateString()}</strong>
                    </Text>
                </Box>
            </Box>

            <Box className={styles.actions}>
                <Button onClick={seeDetails} variant="soft">
                    Szczegóły <EyeIcon />
                </Button>
            </Box>
        </Card>
    );
};
