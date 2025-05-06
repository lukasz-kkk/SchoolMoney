import { User } from "@/types/User";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AccountStatusTag } from "@/features/users/components/AccountStatusTag/AccountStatusTag";
import { UsersTableActions } from "@/features/users/components/UsersTable/components/UsersTableActions/UsersTableActions.tsx";
import { UserAvatar } from "@/features/users/components/UserAvatar/UserAvatar.tsx";

const columnHelper = createColumnHelper<User>();

const columns = [
    columnHelper.accessor((row) => row, {
        id: "avatar",
        cell: (info) => <UserAvatar size="2" user={info.getValue()} />,
        size: 20,
        header: () => <span>Avatar</span>,
    }),
    columnHelper.accessor((row) => row.firstName, {
        id: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>Imię</span>,
    }),
    columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Nazwisko</span>,
    }),
    columnHelper.accessor((row) => row.login, {
        id: "login",
        cell: (info) => info.getValue(),
        header: () => <span>Login</span>,
    }),
    columnHelper.accessor((row) => row.dateOfBirth, {
        id: "dateOfBirth",
        size: 60,
        cell: (info) => info.getValue().toLocaleDateString(),
        header: () => <span>Data urodzenia</span>,
    }),
    columnHelper.accessor((row) => row.role, {
        id: "role",
        size: 60,
        cell: (info) => info.getValue(),
        header: () => <span>Rola</span>,
    }),
    columnHelper.accessor((row) => row.isActive, {
        id: "isActive",
        size: 60,
        cell: (info) => <AccountStatusTag isActive={info.getValue()} />,
        header: () => <span>Status</span>,
    }),
    columnHelper.display({
        id: "actions",
        size: 40,
        cell: ({ row, table }) => (
            <IconButton
                onClick={() => table.setExpanded({ [row.id]: !row.getIsExpanded() })}
                variant="soft"
                size="1"
                color="blue"
            >
                {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
        ),
    }),
];

type UsersTableProps = {
    users: User[];
    isLoading?: boolean;
};

export const UsersTable = ({ users, isLoading }: UsersTableProps) => {
    return (
        <Table
            sortOptions={[{ id: "lastName", desc: false }]}
            data={users}
            columns={columns}
            onRenderSubRow={UsersTableActions}
            withPagination
            isLoading={isLoading}
        />
    );
};
