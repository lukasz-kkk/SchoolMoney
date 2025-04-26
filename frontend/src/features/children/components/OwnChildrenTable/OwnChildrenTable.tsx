import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Child } from "@/features/children/types/Child";
import { Button, IconButton } from "@radix-ui/themes";
import { ChevronDown, ChevronUp } from "lucide-react";

import { OwnChildrenTableActions } from "@/features/children/components/OwnChildrenTable/components/OwnChildrenTableActions/OwnChildrenTableActions";
import { AddChildToGroupDialog } from "@/features/groups/components/AddChildToGroupDialog/AddChildToGroupDialog";

const columnHelper = createColumnHelper<Child>();

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
    columnHelper.accessor((row) => row.dateOfBirth, {
        id: "dateOfBirth",
        cell: (info) => info.getValue().toLocaleDateString(),
        header: () => <span>Data urodzenia</span>,
    }),
    columnHelper.accessor((row) => row, {
        id: "group",
        cell: (info) => {
            const groupName = info.getValue().group?.name;
            const isAccepted = info.getValue().isAccepted;

            if (groupName && !isAccepted) {
                return `${groupName} (Oczekuje na zatwierdzenie)`;
            }

            if (groupName) {
                return groupName;
            }

            return (
                <AddChildToGroupDialog
                    childId={info.getValue().id}
                    trigger={<Button size="1">Dodaj do klasy</Button>}
                />
            );
        },
        header: () => <span>Klasa</span>,
    }),
    columnHelper.display({
        id: "actions",
        size: 30,
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

type OwnChildrenTableProps = {
    childrenList: Child[];
    isLoading?: boolean;
};

export const OwnChildrenTable = ({ childrenList, isLoading }: OwnChildrenTableProps) => {
    return (
        <Table data={childrenList} columns={columns} onRenderSubRow={OwnChildrenTableActions} isLoading={isLoading} />
    );
};
