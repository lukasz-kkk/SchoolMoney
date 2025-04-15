import { Box, Button } from "@radix-ui/themes";
import classes from "./UsersTableActions.module.scss";
import { DisableUserDialog } from "@/features/users/components/DisableUserDialog/DisableUserDialog";
import { User } from "@/types/User";
import { EnableUserButton } from "@/features/users/components/EnableUserButton/EnableUserButton";

export const UsersTableActions = (user: User) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.actions}>
                {user.isActive ? (
                    <DisableUserDialog
                        user={user}
                        trigger={
                            <Button variant="soft" color="crimson" size="1">
                                Zablokuj dostęp
                            </Button>
                        }
                    />
                ) : (
                    <EnableUserButton userId={user.id} />
                )}
            </Box>
        </Box>
    );
};
