import { Page } from "@/components/Page/Page";
import { onlyAsAdmin } from "@/features/auth/hoc/withAuthorization";
import { UsersTable } from "@/features/users/components/UsersTable/UsersTable.tsx";
import { useUsers } from "@/features/users/hooks/useUsers.ts";

const BaseUsersPage = () => {
    const { data } = useUsers();

    return (
        <Page.Root>
            <Page.Header items={[{ label: "Użytkownicy" }]} />

            <Page.Content>
                <UsersTable users={data ?? []} />
            </Page.Content>
        </Page.Root>
    );
};

export const UsersPage = onlyAsAdmin(BaseUsersPage);
