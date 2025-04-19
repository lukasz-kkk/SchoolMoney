import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Child } from "@/features/children/types/Child";
import { toast } from "sonner";
import { useAcceptChild } from "@/features/children/hooks/useAcceptChild";
import { AnswerAddChildRequestActions } from "@/features/children/components/GroupChildrenTable/components/AnswerAddChildRequestActions/AnswerAddChildRequestActions";

const columnHelper = createColumnHelper<Child>();

type GroupChildrenTableProps = {
    childrenList: Child[];
    isLoading?: boolean;
};

export const GroupChildrenTable = ({ childrenList, isLoading }: GroupChildrenTableProps) => {
    const { mutateAsync } = useAcceptChild();

    const acceptChild = async (childId: number) => {
        try {
            await mutateAsync({ childId, accept: true });
            toast.success("Zaakceptowano prośbę o dodanie do klasy.");
        } catch (e) {
            toast.error("Nie udało się zaakceptować prośby o dodanie do klasy.");
        }
    };

    const rejectChild = async (childId: number) => {
        try {
            await mutateAsync({ childId, accept: false });
            toast.success("Odrzucono prośbę o dodanie do klasy.");
        } catch (e) {
            toast.error("Nie udało się odrzucić prośby o dodanie do klasy.");
        }
    };

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
        columnHelper.accessor((row) => row.parent, {
            id: "User",
            cell: (info) => (info.getValue() ? `${info.getValue()!.firstName} ${info.getValue()!.lastName}` : "-"),
            header: () => <span>Rodzic</span>,
        }),
        columnHelper.accessor((row) => row.dateOfBirth, {
            id: "birthDate",
            cell: (info) => info.getValue().toLocaleDateString(),
            header: () => <span>Data urodzenia</span>,
        }),
        columnHelper.accessor((row) => row, {
            id: "actions",
            cell: (info) => (
                <AnswerAddChildRequestActions child={info.getValue()} onAccept={acceptChild} onReject={rejectChild} />
            ),
            header: () => <span>Akcje</span>,
        }),
    ];

    return (
        <Table
            sortOptions={[{ id: "lastName", desc: false }]}
            data={childrenList}
            columns={columns}
            withFilters
            isLoading={isLoading}
        />
    );
};
