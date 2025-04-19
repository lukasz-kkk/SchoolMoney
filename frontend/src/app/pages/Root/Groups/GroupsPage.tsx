import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";

import { CreateGroupDialog } from "@/features/groups/components/CreateGroupDialog/CreateGroupDialog.tsx";
import { Button } from "@radix-ui/themes";
import { useGroups } from "@/features/groups/hooks/useGroups";
import { GroupsList } from "@/features/groups/components/GroupsList/GroupsList";

const BaseGroupsPage = () => {
    const { data: groups } = useGroups();

    return (
        <Page.Root>
            <Page.Header items={[{ label: "Klasy" }]}>
                <CreateGroupDialog trigger={<Button color="jade">Dodaj klasę</Button>} />
            </Page.Header>

            <Page.Content>
                <GroupsList groups={groups ?? []} />
            </Page.Content>
        </Page.Root>
    );
};

export const GroupsPage = onlyAsAuthenticated(BaseGroupsPage);
