import { PropsWithChildren } from "react";
import { Box } from "@radix-ui/themes";

import classes from "./FundraisersList.module.scss";

type FundraiserListProps = PropsWithChildren;

export const FundraisersList = ({ children }: FundraiserListProps) => {
    return <Box className={classes.container}>{children}</Box>;
};
