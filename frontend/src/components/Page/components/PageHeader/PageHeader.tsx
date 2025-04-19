import classes from "./PageHeader.module.scss";
import { Box, Heading } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

type PageHeaderProps = PropsWithChildren<{ items: BreadcrumbItem[] }>;

export const PageHeader = ({ children, items }: PageHeaderProps) => {
    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Heading as="h1" className={classes.pageTitle}>
                    <Breadcrumbs items={items} />
                </Heading>
                {children}
            </Box>
        </Box>
    );
};
