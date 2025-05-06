import { Box, Button } from "@radix-ui/themes";
import { BaseChild } from "@/features/children/types/Child";
import classes from "./OwnChildrenTableActions.module.scss";
import { RemoveChildDialog } from "@/features/children/components/RemoveChildDialog/RemoveChildDialog";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";
import { WithdrawChildDialog } from "@/features/children/components/WithdrawChildDialog/WithdrawChildDialog.tsx";

export const OwnChildrenTableActions = (child: BaseChild) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.actions}>
                <RemoveChildDialog
                    child={child}
                    trigger={
                        <Button size="1" color="crimson" variant="soft">
                            Usuń
                        </Button>
                    }
                />

                <AddChildDialog
                    child={child}
                    trigger={
                        <Button size="1" color="jade" variant="soft">
                            Edytuj
                        </Button>
                    }
                />

                {child.isAccepted && child.groupId && (
                    <WithdrawChildDialog
                        child={child}
                        trigger={
                            <Button size="1" color="orange" variant="soft">
                                Wypisz z klasy
                            </Button>
                        }
                    />
                )}
            </Box>
        </Box>
    );
};
