import * as React from "react";
interface SectionHeaderProps {
    title: string;
    badge?: number | string;
    icon?: React.ReactNode;
    tooltip?: React.ReactNode;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    card?: boolean;
    stack?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
}
export declare function SectionHeader({ title, badge, icon, tooltip, leftContent, rightContent, card, stack, onClick, className, }: SectionHeaderProps): import("react/jsx-runtime").JSX.Element;
export type { SectionHeaderProps };
