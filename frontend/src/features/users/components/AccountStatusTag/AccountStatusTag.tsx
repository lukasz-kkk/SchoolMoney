import { Badge } from "@radix-ui/themes";

type AccountStatusTagProps = {
    isActive: boolean;
};

export const AccountStatusTag = ({ isActive }: AccountStatusTagProps) => {
    if (isActive) {
        return (
            <Badge size="1" color="jade" variant="surface">
                Aktywne
            </Badge>
        );
    } else {
        return (
            <Badge size="1" color="crimson" variant="surface">
                Nieaktywne
            </Badge>
        );
    }
};
