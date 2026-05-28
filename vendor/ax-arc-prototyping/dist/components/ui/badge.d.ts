import * as React from "react";
export type BadgeStatus = "none" | "positive" | "negative" | "interim" | "base" | "neutral";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    status?: BadgeStatus;
    active?: boolean;
    indicator?: boolean;
    iconOnly?: boolean;
    children?: React.ReactNode;
}
declare function Badge({ className, status, active, indicator, iconOnly, children, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge };
