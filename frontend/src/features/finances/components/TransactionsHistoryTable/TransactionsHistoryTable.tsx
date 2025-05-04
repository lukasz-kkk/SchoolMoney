import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components/Table/components/Table";
import { Transaction } from "@/features/finances/types/Finances";
import { formatMoney } from "@/features/finances/utils/moneyUtils.ts";

const columnHelper = createColumnHelper<Transaction>();

const columns = [
    columnHelper.accessor((row) => row.name, {
        id: "name",
        size: 500,
        cell: (info) => info.getValue(),
        header: () => <span>Tytuł transakcji</span>,
    }),
    columnHelper.accessor((row) => row.sourceAccountNumber, {
        id: "sourceAccountNumber",
        cell: (info) => info.getValue(),
        header: () => <span>Rachunek źródłowy</span>,
    }),
    columnHelper.accessor((row) => row.targetAccountNumber, {
        id: "targetAccountNumber",
        cell: (info) => info.getValue(),
        header: () => <span>Rachunek docelowy</span>,
    }),
    columnHelper.accessor((row) => row, {
        id: "source",
        cell: (info) => (
            <span>
                {info.getValue().senderFirstName} {info.getValue().senderLastName}
            </span>
        ),
        header: () => <span>Zleceniodawca</span>,
    }),
    columnHelper.accessor((row) => row.amount, {
        id: "amount",
        cell: (info) => formatMoney(info.getValue()),
        header: () => <span>Kwota transakcji</span>,
    }),
    columnHelper.accessor((row) => row.date, {
        id: "createdAt",
        cell: (info) => info.getValue().toLocaleString(),
        header: () => <span>Data zlecenia</span>,
    }),
];

type TransactionsHistoryTableProps = {
    transactions: Transaction[];
    isLoading?: boolean;
};

export const TransactionsHistoryTable = ({ transactions, isLoading }: TransactionsHistoryTableProps) => {
    return (
        <Table
            data={transactions}
            columns={columns}
            withPagination
            isLoading={isLoading}
            sortOptions={[
                {
                    id: "createdAt",
                    desc: true,
                },
            ]}
        />
    );
};
