import { PropsWithChildren } from "react";
import { Box, Heading } from "@radix-ui/themes";
import styles from "./Section.module.scss";

type SectionsProps = PropsWithChildren<{
    title: string;
}>;

export const Section = ({ children, title }: SectionsProps) => {
    return (
        <Box className={styles.section}>
            <Heading as="h3" className={styles.title}>
                {title}
            </Heading>
            <Box className={styles.content}>{children}</Box>
        </Box>
    );
};
