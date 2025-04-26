import { Child } from "@/features/children/types/Child";
import { Box, Button } from "@radix-ui/themes";

import styles from "./AnswerAddChildRequestActions.module.scss";
import { useState } from "react";

type AnswerAddChildRequestActionsProps = {
    child: Child;
    onAccept: (childId: number) => void;
    onReject: (childId: number) => void;
};

export const AnswerAddChildRequestActions = ({ child, onAccept, onReject }: AnswerAddChildRequestActionsProps) => {
    const [isRejected, setIsRejected] = useState(false);

    const onRejectInternal = () => {
        onReject(child.id);
        setIsRejected(true);
    };

    if (child.isAccepted) {
        return "-";
    }

    if (isRejected) {
        return "Odrzucono";
    }

    return (
        <Box className={styles.actions}>
            <Button color="crimson" onClick={onRejectInternal} size="1">
                Odrzuć
            </Button>

            <Button color="jade" onClick={() => onAccept(child.id)} size="1">
                Akceptuj
            </Button>
        </Box>
    );
};
