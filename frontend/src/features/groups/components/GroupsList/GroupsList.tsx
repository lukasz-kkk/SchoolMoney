import { Group } from "@/features/groups/types/Group";
import { Box } from "@radix-ui/themes";
import { GroupCard } from "@/features/groups/components/GroupCard/GroupCard";

import styles from "./GroupsList.module.scss";

type GroupsListProps = {
    groups: Group[];
};

export const GroupsList = ({ groups }: GroupsListProps) => {
    return (
        <Box className={styles.container}>
            {groups.map((group) => (
                <GroupCard group={group} key={group.id} />
            ))}
        </Box>
    );
};
