import { ColumnDef, RowData } from '@tanstack/react-table';
interface TableProps<TData extends RowData> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    pageSize?: number;
    pageSizeOptions?: number[];
    className?: string;
    selectable?: boolean;
    onSelectionChange?: (rows: TData[]) => void;
    stickyHeader?: boolean;
    stickyOffset?: number;
}
declare function Table<TData extends RowData>({ data, columns, pageSize, pageSizeOptions, className, selectable, onSelectionChange, stickyHeader, stickyOffset }: TableProps<TData>): import("react/jsx-runtime").JSX.Element;
export { Table };
export type { TableProps, ColumnDef };
