import { Box, Card, Text } from "@radix-ui/themes";
import styles from "./GroupDetailsCard.module.scss";
import classNames from "classnames";
import { Group } from "@/features/groups/types/Group";

type GroupDetailsCardProps = {
    group: Group;
};

export const GroupDetailsCard = ({ group }: GroupDetailsCardProps) => {
    return (
        <Card className={styles.container}>
            <Box className={styles.row}>
                <Box className={classNames(styles.id, styles.group)}>
                    <Text className={styles.label}>ID</Text>
                    <Text className={styles.value}>#{group.id}</Text>
                </Box>

                <Box className={classNames(styles.name, styles.group)}>
                    <Text className={styles.label}>Nazwa klasy</Text>
                    <Text className={styles.value}>{group.name}</Text>
                </Box>
            </Box>

            <Box className={styles.row}>
                <Box className={classNames(styles.amountPerPerson, styles.group)}>
                    <Text className={styles.label}>Skarbnik</Text>
                    <Text className={styles.value}>
                        {group.treasurer.firstName} {group.treasurer.lastName}
                    </Text>
                </Box>
            </Box>
        </Card>
    );
};
