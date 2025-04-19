import { Avatar, Card, Heading, Text } from "@radix-ui/themes";
import { Group } from "@/features/groups/types/Group";

import styles from "./GroupCard.module.scss";
import { useNavigate } from "react-router-dom";
import { getInitials, stringToColor } from "@/utils/avatarUtils";
import { AppRoute } from "@/app/router";

type GroupCardProps = {
    group: Group;
};

export const GroupCard = ({ group }: GroupCardProps) => {
    const fallbackInitials = getInitials(group.name, 3);
    const avatarColor = stringToColor(group.name);
    const navigate = useNavigate();

    const openGroupPage = () => {
        navigate(AppRoute.GROUP.replace(":id", group.id.toString()));
    };

    return (
        <Card className={styles.container} onClick={openGroupPage}>
            <Avatar size="4" color={avatarColor} fallback={fallbackInitials} />

            <Heading as="h3" className={styles.name}>
                {group.name}
            </Heading>

            <Text className={styles.treasurer}>
                Skarbnik: {group.treasurer.firstName} {group.treasurer.lastName}
            </Text>

            <Text className={styles.createdAtDate}>Utworzono {group.createdAt.toLocaleDateString()}</Text>
        </Card>
    );
};
