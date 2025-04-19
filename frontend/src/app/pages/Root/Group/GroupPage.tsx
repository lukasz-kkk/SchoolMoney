import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useParams } from "react-router-dom";
import { Button } from "@radix-ui/themes";

import { useGroup } from "@/features/groups/hooks/useGroup";
import { useUser } from "@/features/auth/hooks/useUser";
import { AppRoute } from "@/app/router";
import { RenameGroupDialog } from "@/features/groups/components/RenameGroupDialog/RenameGroupDialog";
import { useGroupJoinCode } from "@/features/groups/hooks/useGroupJoinCode";
import { GroupJoinCode } from "@/features/groups/components/GroupJoinCode/GroupJoinCode";

const BaseGroupPage = () => {
    const params = useParams<{ id: string }>();
    const { user } = useUser();
    const { data: group } = useGroup(parseInt(params.id ?? "0"));

    const isTreasurer = !!user && user?.id == group?.treasurer?.id;
    const { data: joinCode } = useGroupJoinCode(group?.id);

    const breadcrumbItems = [
        {
            label: "Klasy",
            href: AppRoute.GROUPS,
        },
        {
            label: group?.name ?? "",
        },
    ];

    return (
        <Page.Root>
            <Page.Header items={breadcrumbItems}>
                {!!group && isTreasurer && (
                    <RenameGroupDialog groupId={group.id} trigger={<Button color="jade">Edytuj</Button>} />
                )}
            </Page.Header>

            <Page.Content>{isTreasurer && joinCode && <GroupJoinCode value={joinCode} />}</Page.Content>
        </Page.Root>
    );
};

export const GroupPage = onlyAsAuthenticated(BaseGroupPage);
