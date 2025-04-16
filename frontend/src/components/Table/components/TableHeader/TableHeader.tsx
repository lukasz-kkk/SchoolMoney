import { flexRender, Table } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import classNames from "classnames";
import classes from "./TableHeader.module.scss";
import { Box } from "@radix-ui/themes";
import { TableFilter } from "@/components/Table/components/TableFilter/TableFilter";

type HeaderProps<T> = {
    table: Table<T>;
    withFilters?: boolean;
};

export function TableHeader<T>({ table, withFilters }: HeaderProps<T>) {
    return (
        <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                className={classes.cell}
                                style={{ width: `${header.getSize()}px` }}
                            >
                                <Box
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={classNames(classes.title, {
                                        [classes.sortable]: header.column.getCanSort(),
                                    })}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" && <ChevronUp size={16} />}
                                    {header.column.getIsSorted() === "desc" && <ChevronDown size={16} />}
                                </Box>
                                {header.column.getCanFilter() && withFilters && (
                                    <TableFilter column={header.column} table={table} />
                                )}
                            </th>
                        );
                    })}
                </tr>
            ))}
        </thead>
    );
}
