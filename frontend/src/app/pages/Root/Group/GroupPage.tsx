import { Page } from "@/components/Page/Page";
import { onlyAsAuthenticated } from "@/features/auth/hoc/withAuthorization";
import { useParams } from "react-router-dom";
import { Box, Button, Spinner } from "@radix-ui/themes";

import { useGroup } from "@/features/groups/hooks/useGroup";
import { AppRoute } from "@/app/router";
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
import { GroupDetailsCard } from "@/features/groups/components/GroupDetailsCard/GroupDetailsCard.tsx";

import styles from "./GroupPage.module.scss";
import { AccessGuard } from "@/features/auth/components/AccessGuard/AccessGuard.tsx";
import { RenameGroupDialog } from "@/features/groups/components/RenameGroupDialog/RenameGroupDialog.tsx";

const BaseGroupPage = () => {
    const params = useParams<{ id: string }>();
    const groupId = params?.id ? parseInt(params.id) : undefined;

    const { data: group } = useGroup(groupId);
    const { data: fundraisers } = useFundraisers();
    const { data: children } = useGetChildrenByGroup(groupId);
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
            <Page.Header items={breadcrumbItems}></Page.Header>

            <Page.Content>
                <Section
                    title="Informacje o klasie"
                    actions={
                        <AccessGuard userId={group.treasurer.id}>
                            <RenameGroupDialog
                                groupId={group.id}
                                trigger={
                                    <Button variant="soft" size="1">
                                        Edytuj nazwę klasy
                                    </Button>
                                }
                            />
                        </AccessGuard>
                    }
                >
                    <Box className={styles.row}>
                        <GroupDetailsCard group={group} />

                        <AccessGuard userId={group.treasurer.id}>
                            <GroupJoinCode
                                value={joinCode ?? ""}
                                onRefresh={onRefreshGroupJoinCode}
                                isRefreshing={isRefreshingCode}
                            />
                        </AccessGuard>
                    </Box>
                </Section>

                <Section
                    title="Zbiórki"
                    actions={
                        <AccessGuard requiredAccess="User">
                            <CreateFundraiserDialog
                                groupId={group.id}
                                trigger={
                                    <Button color="jade" variant="soft" size="1">
                                        Dodaj kolejną zbiórkę
                                    </Button>
                                }
                            />
                        </AccessGuard>
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
