import { PropsWithChildren } from "react";
import { Callout } from "@radix-ui/themes";
import { CircleAlert } from "lucide-react";
import classNames from "classnames";

import styles from "./Alert.module.scss";

type AlertProps = PropsWithChildren<{ className?: string; color?: "red" | "amber" | "blue" | "jade" }>;

export const Alert = ({ children, className, color = "red" }: AlertProps) => {
    return (
        <Callout.Root color={color} role="alert" className={classNames(className, styles.alert)} size="1">
            <Callout.Icon>
                <CircleAlert />
            </Callout.Icon>
            <Callout.Text>{children}</Callout.Text>
        </Callout.Root>
    );
};
