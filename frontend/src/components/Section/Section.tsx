import { PropsWithChildren, ReactNode } from "react";
import { Box, Heading } from "@radix-ui/themes";
import styles from "./Section.module.scss";

type SectionsProps = PropsWithChildren<{
    title: string;
    actions?: ReactNode;
}>;

export const Section = ({ children, title, actions }: SectionsProps) => {
    return (
        <Box className={styles.section}>
            <Box className={styles.header}>
                <Heading as="h3" className={styles.title}>
                    {title}
                </Heading>
                {actions}
            </Box>
            <Box className={styles.content}>{children}</Box>
        </Box>
    );
};
