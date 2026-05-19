import { BreadcrumbItem } from './breadcrumb';
import * as React from "react";
interface TopBarProps {
    breadcrumbs?: BreadcrumbItem[];
    leftContent?: React.ReactNode;
    headingTitle?: boolean;
    avatar?: React.ReactNode;
    title?: string;
    subline?: string;
    extraString?: string;
    rightContent?: React.ReactNode;
    maxWidth?: number;
    className?: string;
}
declare const TopBar: React.ForwardRefExoticComponent<TopBarProps & React.RefAttributes<HTMLDivElement>>;
export { TopBar };
export type { TopBarProps, BreadcrumbItem };
