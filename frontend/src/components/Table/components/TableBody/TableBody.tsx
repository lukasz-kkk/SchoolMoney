import { flexRender, Table } from "@tanstack/react-table";
import classes from "./TableBody.module.scss";
import { ReactNode } from "react";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";

type TableBodyProps<T> = {
    table: Table<T>;
    isLoading?: boolean;
    onRenderSubRow?: (data: T) => ReactNode;
};

export function TableBody<T>({ table, onRenderSubRow, isLoading }: TableBodyProps<T>) {
    return (
        <tbody className={classes.body}>
            {isLoading &&
                [...Array(5)].map((_, index) => (
                    <LoadingTableRow columnsCount={table.getAllColumns().length} key={index} />
                ))}

            {!isLoading && !table.getRowModel().rows.length && (
                <tr className={classes.row}>
                    <td className={classes.cell} colSpan={table.getAllColumns().length}>
                        Brak danych
                    </td>
                </tr>
            )}

            {!isLoading &&
                table.getRowModel().rows.map((row, index) => (
                    <>
                        <tr
                            key={index}
                            className={classNames(classes.row, { [classes.expanded]: row.getIsExpanded() })}
                        >
                            {row.getVisibleCells().map((cell, index) => {
                                return (
                                    <td
                                        className={classNames(classes.cell, {
                                            [classes.textCell]: typeof cell.getValue() === "string",
                                        })}
                                        key={index}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                );
                            })}
                        </tr>

                        {row.getIsExpanded() && onRenderSubRow && (
                            <tr className={classes.subRow} key={index}>
                                <td colSpan={row.getVisibleCells().length} className={classes.cell}>
                                    {onRenderSubRow(row.original)}
                                </td>
                            </tr>
                        )}
                    </>
                ))}
        </tbody>
    );
}

type LoadingTableRowProps = {
    columnsCount: number;
};

const LoadingTableRow = ({ columnsCount }: LoadingTableRowProps) => {
    return (
        <tr className={classes.row}>
            {[...Array(columnsCount)].map((_, index) => (
                <td key={index} className={classes.cell}>
                    <Skeleton baseColor="#222" highlightColor="#444" />
                </td>
            ))}
        </tr>
    );
};
