export interface TableFooterProps {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    pageSize: number;
    onPageSizeChange: (size: number) => void;
    pageSizeOptions?: number[];
    totalCount: number;
    className?: string;
}
declare function TableFooter({ page, pageCount, onPageChange, pageSize, onPageSizeChange, pageSizeOptions, totalCount, className, }: TableFooterProps): import("react/jsx-runtime").JSX.Element;
declare namespace TableFooter {
    var displayName: string;
}
export { TableFooter };
