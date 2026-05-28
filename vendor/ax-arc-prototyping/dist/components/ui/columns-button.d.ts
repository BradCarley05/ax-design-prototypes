import { ColumnDef } from './table';
export declare function getColKey(col: ColumnDef<any, any>): string | null;
interface ColumnsButtonProps {
    columns: ColumnDef<any, any>[];
    columnOrder: string[];
    columnVisibility: Record<string, boolean>;
    onOrderChange: (order: string[]) => void;
    onVisibilityChange: (visibility: Record<string, boolean>) => void;
    onReset: () => void;
}
declare function ColumnsButton({ columns, columnOrder, columnVisibility, onOrderChange, onVisibilityChange, onReset, }: ColumnsButtonProps): import("react/jsx-runtime").JSX.Element;
declare namespace ColumnsButton {
    var displayName: string;
}
export { ColumnsButton };
export type { ColumnsButtonProps };
