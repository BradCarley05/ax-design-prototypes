import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface PopoverCardProps {
    heading?: string;
    body?: string;
    dismissable?: boolean;
    action?: boolean;
    actionLabel?: string;
    content?: boolean;
    onDismiss?: () => void;
    onAction?: () => void;
    children?: React.ReactNode;
    className?: string;
}
export declare function PopoverCard({ heading, body, dismissable, action, actionLabel, content, onDismiss, onAction, children, className, }: PopoverCardProps): import("react/jsx-runtime").JSX.Element;
export declare namespace PopoverCard {
    var displayName: string;
}
export type InfoPopoverPosition = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
export interface InfoPopoverProps {
    heading?: string;
    body?: string;
    action?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    position?: InfoPopoverPosition;
    field?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    content?: boolean;
    children?: React.ReactNode;
}
export declare function InfoPopover({ heading, body, action, actionLabel, onAction, position, field, open, onOpenChange, content, children, }: InfoPopoverProps): import("react/jsx-runtime").JSX.Element;
export declare namespace InfoPopover {
    var displayName: string;
}
export { Popover, PopoverTrigger, PopoverContent };
