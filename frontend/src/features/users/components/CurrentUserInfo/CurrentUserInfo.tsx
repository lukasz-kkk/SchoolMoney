import { useUser } from "@/features/auth/hooks/useUser";
import { Avatar, Box, Text } from "@radix-ui/themes";

import classes from "./CurrentUserInfo.module.scss";
import { getInitials } from "@/utils/avatarUtils";

export const CurrentUserInfo = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <Box className={classes.container}>
            <Avatar color="orange" fallback={getInitials(`${user.firstName} ${user.lastName}`)} />
            <Box className={classes.details}>
                <Text className={classes.name}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text className={classes.role}>{user.role === "Admin" ? "Admin" : "Rodzic"}</Text>
            </Box>
        </Box>
    );
};
