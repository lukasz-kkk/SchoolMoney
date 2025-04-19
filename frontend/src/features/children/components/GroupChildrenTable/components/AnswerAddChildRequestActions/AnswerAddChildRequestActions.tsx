import { Child } from "@/features/children/types/Child";
import { Box, Button } from "@radix-ui/themes";

import styles from "./AnswerAddChildRequestActions.module.scss";

type AnswerAddChildRequestActionsProps = {
    child: Child;
    onAccept: (childId: number) => void;
    onReject: (childId: number) => void;
};

export const AnswerAddChildRequestActions = ({ child, onAccept, onReject }: AnswerAddChildRequestActionsProps) => {
    if (child.isAccepted) {
        return "-";
    }

    return (
        <Box className={styles.actions}>
            <Button color="crimson" onClick={() => onReject(child.id)}>
                Odrzuć
            </Button>

            <Button color="jade" onClick={() => onAccept(child.id)}>
                Akceptuj
            </Button>
        </Box>
    );
};
