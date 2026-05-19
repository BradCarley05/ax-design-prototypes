export interface PaginationProps {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    className?: string;
}
declare function Pagination({ page, pageCount, onPageChange, className }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
declare namespace Pagination {
    var displayName: string;
}
export { Pagination };
