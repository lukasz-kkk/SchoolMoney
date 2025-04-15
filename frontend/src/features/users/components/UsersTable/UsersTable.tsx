import { User } from "@/types/User";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AccountStatusTag } from "@/features/users/components/AccountStatusTag/AccountStatusTag";

const columnHelper = createColumnHelper<User>();

const columns = [
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
        cell: (info) => info.getValue().toLocaleDateString(),
        header: () => <span>Data urodzenia</span>,
    }),
    columnHelper.accessor((row) => row.role, {
        id: "role",
        cell: (info) => info.getValue(),
        header: () => <span>Rola</span>,
    }),
    columnHelper.accessor((row) => row.isActive, {
        id: "isActive",
        cell: (info) => <AccountStatusTag isActive={info.getValue()} />,
        header: () => <span>Status</span>,
    }),
    columnHelper.display({
        id: "actions",
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
            withPagination
            withFilters
            isLoading={isLoading}
        />
    );
};
