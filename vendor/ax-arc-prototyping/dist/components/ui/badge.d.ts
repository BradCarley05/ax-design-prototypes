import * as React from "react";
type BadgeVariant = "default" | "secondary" | "destructive" | "positive" | "warning" | "info" | "pill" | "outline";
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: BadgeVariant;
}
declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { Badge };
