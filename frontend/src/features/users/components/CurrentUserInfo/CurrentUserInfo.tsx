import { useUser } from "@/features/auth/hooks/useUser";
import { Box, Text } from "@radix-ui/themes";

import classes from "./CurrentUserInfo.module.scss";
import { UserAvatar } from "@/features/users/components/UserAvatar/UserAvatar.tsx";

export const CurrentUserInfo = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <Box className={classes.container}>
            <UserAvatar user={user} />
            <Box className={classes.details}>
                <Text className={classes.name}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text className={classes.role}>{user.role === "Admin" ? "Admin" : "Rodzic"}</Text>
            </Box>
        </Box>
    );
};
