import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const TooltipRoot: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
/** Convenience wrapper — wraps trigger + content in a single component. */
interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    delayDuration?: number;
}
declare function Tooltip({ content, children, side, delayDuration }: TooltipProps): import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent };
