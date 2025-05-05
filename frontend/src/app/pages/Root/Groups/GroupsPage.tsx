import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";

import { CreateGroupDialog } from "@/features/groups/components/CreateGroupDialog/CreateGroupDialog.tsx";
import { Button } from "@radix-ui/themes";
import { useGroups } from "@/features/groups/hooks/useGroups";
import { GroupsList } from "@/features/groups/components/GroupsList/GroupsList";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";

const BaseGroupsPage = () => {
    const { data: groups } = useGroups();

    return (
        <Page.Root>
            <Page.Header items={[{ label: "Klasy" }]}>
                <AccessGuard requiredAccess="User">
                    <CreateGroupDialog
                        trigger={
                            <Button color="jade" variant="soft">
                                Dodaj klasę
                            </Button>
                        }
                    />
                </AccessGuard>
            </Page.Header>

            <Page.Content>
                <GroupsList groups={groups ?? []} />
            </Page.Content>
        </Page.Root>
    );
};

export const GroupsPage = onlyAsAuthenticated(BaseGroupsPage);
