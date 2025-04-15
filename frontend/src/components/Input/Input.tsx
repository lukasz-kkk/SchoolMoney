import { forwardRef, Ref, useState } from "react";

import classes from "./Input.module.scss";
import { Box, TextArea, Text, TextField } from "@radix-ui/themes";
import { RequirementsTooltip } from "@/components/RequirementsTooltip/RequirementsTooltip";
import classNames from "classnames";

interface InputProps {
    label: string;
    help?: string;
    type?: "password" | "email" | "textarea" | "text" | "date" | "number";
    error?: string;
    disabled?: boolean;
    max?: number | string;
    min?: number | string;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ label, error, help, type = "text", ...props }: InputProps, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        const onFocus = () => setIsFocused(true);
        const onBlur = () => setIsFocused(false);

        return (
            <label
                className={classNames(classes.input, { [classes.dateInput]: type === "date" })}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <Box className={classes.header}>
                    <Text className={classes.inputLabel}>{label}</Text>
                    {help && <RequirementsTooltip error={error} content={help} forceOpen={!!error && isFocused} />}
                </Box>

                {type === "textarea" ? (
                    <TextArea
                        resize="vertical"
                        rows={6}
                        aria-invalid={!!error}
                        ref={ref as Ref<HTMLTextAreaElement>}
                        {...props}
                    />
                ) : (
                    <TextField.Root type={type} aria-invalid={!!error} ref={ref as Ref<HTMLInputElement>} {...props} />
                )}
            </label>
        );
    }
);

Input.displayName = "Input";
