import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { FundraiserChild } from "@/features/children/types/Child";
import { useMemo } from "react";
import { FundraiserChildrenActions } from "@/features/children/components/FundraiserChildrenTable/components/FundraiserChildrenTableActions/FundraiserChildrenActions.tsx";
import { Fundraiser } from "@/features/fundraisers/types/Fundraiser";

const columnHelper = createColumnHelper<FundraiserChild>();

type FundraiserChildrenTableProps = {
    childrenList: FundraiserChild[];
    fundraiser: Fundraiser;
    isLoading?: boolean;
};

export const FundraiserChildrenTable = ({ childrenList, isLoading, fundraiser }: FundraiserChildrenTableProps) => {
    const columns = useMemo(
        () => [
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
            columnHelper.accessor((row) => row.parent, {
                id: "User",
                cell: (info) => (info.getValue() ? `${info.getValue()!.firstName} ${info.getValue()!.lastName}` : "-"),
                header: () => <span>Rodzic</span>,
            }),
            columnHelper.accessor((row) => row.hasPaid, {
                id: "hasPaid",
                cell: (info) => (info.getValue() ? "Tak" : "Nie"),
                header: () => <span>Czy opłacono</span>,
            }),
            columnHelper.accessor((row) => row, {
                id: "actions",
                cell: (info) => <FundraiserChildrenActions child={info.getValue()} fundraiser={fundraiser} />,
                header: () => <span>Akcje</span>,
            }),
        ],
        [fundraiser]
    );

    return (
        <Table
            sortOptions={[{ id: "lastName", desc: false }]}
            data={childrenList}
            columns={columns}
            isLoading={isLoading}
        />
    );
};
