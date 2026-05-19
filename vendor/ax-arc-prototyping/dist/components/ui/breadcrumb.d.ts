export type BreadcrumbItem = {
    label: string;
    href?: string;
    onClick?: () => void;
    collapsed?: boolean;
    items?: BreadcrumbItem[];
};
interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}
export declare function Breadcrumb({ items, className }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
export {};
