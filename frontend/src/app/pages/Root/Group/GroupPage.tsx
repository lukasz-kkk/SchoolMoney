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
import { useGetChildrenByGroup } from "@/features/children/hooks/useGetChildrenByGroup";
import { GroupChildrenTable } from "@/features/children/components/GroupChildrenTable/GroupChildrenTable";
import { useRefreshGroupJoinCode } from "@/features/groups/hooks/useRefreshGroupJoinCode.ts";
import { toast } from "sonner";

const BaseGroupPage = () => {
    const params = useParams<{ id: string }>();
    const groupId = params?.id ? parseInt(params.id) : undefined;

    const { user } = useUser();
    const { data: group } = useGroup(groupId);
    const { data: children } = useGetChildrenByGroup(groupId);

    const isTreasurer = !!user && user?.id == group?.treasurer?.id;
    const { data: joinCode } = useGroupJoinCode(group?.id);

    const { mutateAsync: refreshCode, isPending: isRefreshingCode } = useRefreshGroupJoinCode();

    const onRefreshGroupJoinCode = async () => {
        if (!groupId) {
            toast.error("Nie udało się wygenerować nowego kodu.");
            return;
        }

        try {
            await refreshCode(groupId);
            toast.success("Wygenerowano nowy kod.");
        } catch (e) {
            toast.error("Nie udało się wygenerować nowego kodu.");
        }
    };

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
                    <RenameGroupDialog
                        groupId={group.id}
                        trigger={
                            <Button color="jade" variant="soft">
                                Edytuj
                            </Button>
                        }
                    />
                )}
            </Page.Header>

            <Page.Content>
                {isTreasurer && joinCode && (
                    <GroupJoinCode
                        value={joinCode}
                        onRefresh={onRefreshGroupJoinCode}
                        isRefreshing={isRefreshingCode}
                    />
                )}
                <GroupChildrenTable childrenList={children ?? []} />
            </Page.Content>
        </Page.Root>
    );
};

export const GroupPage = onlyAsAuthenticated(BaseGroupPage);
