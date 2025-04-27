import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@radix-ui/themes";

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
import { Section } from "@/components/Section/Section.tsx";
import { FundraiserCard } from "@/features/fundraisers/components/FundraiserCard/FundraiserCard.tsx";
import { FundraisersList } from "@/features/fundraisers/components/FundraisersList/FundraisersList.tsx";
import { useFundraisers } from "@/features/fundraisers/hooks/useFundraisers.ts";
import { CreateFundraiserDialog } from "@/features/fundraisers/components/CreateFundraiserDialog/CreateFundraiserDialog.tsx";

const BaseGroupPage = () => {
    const params = useParams<{ id: string }>();
    const groupId = params?.id ? parseInt(params.id) : undefined;
    const { data: fundraisers } = useFundraisers();

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

    if (!group) {
        return <Spinner />;
    }

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
                    <Section title="Dostęp do grupy">
                        <GroupJoinCode
                            value={joinCode}
                            onRefresh={onRefreshGroupJoinCode}
                            isRefreshing={isRefreshingCode}
                        />
                    </Section>
                )}

                <Section
                    title="Zbiórki"
                    actions={
                        <CreateFundraiserDialog
                            groupId={group.id}
                            trigger={
                                <Button color="jade" variant="soft">
                                    Dodaj zbiórkę
                                </Button>
                            }
                        />
                    }
                >
                    <FundraisersList>
                        {fundraisers?.map((fundraiser) => (
                            <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
                        ))}
                    </FundraisersList>
                </Section>

                <Section title="Dzieci">
                    <GroupChildrenTable childrenList={children ?? []} />
                </Section>
            </Page.Content>
        </Page.Root>
    );
};

export const GroupPage = onlyAsAuthenticated(BaseGroupPage);
