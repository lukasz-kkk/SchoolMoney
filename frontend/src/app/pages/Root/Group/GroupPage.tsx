import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useParams } from "react-router-dom";
import { Button } from "@radix-ui/themes";

import { useGroup } from "@/features/groups/hooks/useGroup";
import { useUser } from "@/features/auth/hooks/useUser";
import { AppRoute } from "@/app/router";
import { RenameGroupDialog } from "@/features/groups/components/RenameGroupDialog/RenameGroupDialog";

const BaseGroupPage = () => {
    const params = useParams<{ id: string }>();
    const { data: group } = useGroup(parseInt(params.id ?? "0"));

    const { user } = useUser();

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
                {!!group && user?.id === group?.treasurer?.id && (
                    <RenameGroupDialog groupId={group.id} trigger={<Button color="jade">Edytuj</Button>} />
                )}
            </Page.Header>

            <Page.Content></Page.Content>
        </Page.Root>
    );
};

export const GroupPage = onlyAsAuthenticated(BaseGroupPage);
