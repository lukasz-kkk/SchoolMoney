import { useEffect, useRef, useState } from "react";
import { IconButton } from "@radix-ui/themes";
import styles from "@/features/finances/components/FinancialAccountDashboard/FinancialAccountDashboard.module.scss";
import { CheckIcon, ClipboardCopyIcon } from "lucide-react";

type CopyToClipboardButtonProps = {
    value: string | number;
    onSuccess?: () => void;
};

export const CopyToClipboardButton = ({ value, onSuccess }: CopyToClipboardButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCopyValue = async () => {
        if (!navigator.clipboard) {
            return;
        }

        try {
            await navigator.clipboard.writeText(value.toString());
            setIsCopied(true);
            onSuccess?.();

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setIsCopied(false);
                timeoutRef.current = null;
            }, 1500);
        } catch (err) {
            setIsCopied(false);
        }
    };

    return (
        <IconButton
            size="1"
            variant="ghost"
            color={isCopied ? "green" : "gray"}
            onClick={handleCopyValue}
            className={styles.copyButton}
        >
            {isCopied ? <CheckIcon /> : <ClipboardCopyIcon />}
        </IconButton>
    );
};
