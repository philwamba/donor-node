import * as React from 'react'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table'

export type Column<T> = {
    header: string
    accessor: keyof T | ((row: T) => React.ReactNode)
    headerClassName?: string
    cellClassName?: string
}

type DataTableProps<T extends object> = {
    columns: Column<T>[]
    data: T[]
    emptyMessage?: string
    getRowKey?: (row: T, index: number) => React.Key
}

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    emptyMessage = 'No records',
    getRowKey,
}: DataTableProps<T>) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((c, idx) => (
                        <TableHead key={idx} className={c.headerClassName}>
                            {c.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="text-center">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((row, rIdx) => (
                        <TableRow key={getRowKey ? getRowKey(row, rIdx) : rIdx}>
                            {columns.map((c, cIdx) => (
                                <TableCell
                                    key={cIdx}
                                    className={c.cellClassName}>
                                    {typeof c.accessor === 'function'
                                        ? c.accessor(row)
                                        : String(row[c.accessor])}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
