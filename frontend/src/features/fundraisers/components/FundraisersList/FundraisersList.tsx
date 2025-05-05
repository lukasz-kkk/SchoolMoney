import { Children, PropsWithChildren } from "react";
import { Box } from "@radix-ui/themes";

import classes from "./FundraisersList.module.scss";
import { Alert } from "@/components/Alert/Alert.tsx";

type FundraiserListProps = PropsWithChildren;

export const FundraisersList = ({ children }: FundraiserListProps) => {
    return (
        <Box className={classes.container}>
            {Children.count(children) ? children : <Alert color="blue">Nie znaleziono żadnej zbiórki.</Alert>}
        </Box>
    );
};
