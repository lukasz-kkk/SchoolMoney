import { useEnableUser } from "@/features/users/hooks/useEnableUser";
import { useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@radix-ui/themes";

type EnableUserButtonProps = {
    userId: number;
};

export const EnableUserButton = ({ userId }: EnableUserButtonProps) => {
    const { mutateAsync: enableUser, isPending } = useEnableUser();

    const handleEnableUser = useCallback(async () => {
        try {
            await enableUser(userId);
            toast.success("Dostęp użytkownika został przywrócony.");
        } catch (e) {
            toast.error("Nie udało się przywrócić dostępu użytkownika.");
        }
    }, [enableUser, userId]);

    return (
        <Button variant="soft" color="jade" size="1" onClick={handleEnableUser} loading={isPending}>
            Odblokuj dostęp
        </Button>
    );
};
