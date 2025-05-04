import { Box, Button } from "@radix-ui/themes";
import { BaseChild } from "@/features/children/types/Child";
import classes from "./OwnChildrenTableActions.module.scss";
import { RemoveChildDialog } from "@/features/children/components/RemoveChildDialog/RemoveChildDialog";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";

export const OwnChildrenTableActions = (child: BaseChild) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.actions}>
                <RemoveChildDialog
                    child={child}
                    trigger={
                        <Button color="crimson" variant="soft">
                            Usuń
                        </Button>
                    }
                />
                <AddChildDialog
                    child={child}
                    trigger={
                        <Button color="jade" variant="soft">
                            Edytuj
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};
