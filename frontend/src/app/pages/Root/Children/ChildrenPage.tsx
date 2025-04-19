import { Page } from "@/components/Page/Page";

import { OwnChildrenTable } from "@/features/children/components/OwnChildrenTable/OwnChildrenTable";
import { useGetOwnChildren } from "@/features/children/hooks/useGetOwnChildren";
import { onlyAsParent } from "@/features/auth/hoc/withAuthorization";
import { AddChildDialog } from "@/features/children/components/AddChildDialog/AddChildDialog";
import { Button } from "@radix-ui/themes";
import { useUser } from "@/features/auth/hooks/useUser";

const BaseChildrenPage = () => {
    const { data: children, isLoading } = useGetOwnChildren();
    const { user } = useUser();

    return (
        <Page.Root>
            <Page.Header items={[{ label: "Moje dzieci" }]}>
                <AddChildDialog lastName={user?.lastName} trigger={<Button color="jade">Dodaj</Button>} />
            </Page.Header>

            <Page.Content>
                <OwnChildrenTable childrenList={children ?? []} isLoading={isLoading} />
            </Page.Content>
        </Page.Root>
    );
};

export const ChildrenPage = onlyAsParent(BaseChildrenPage);
