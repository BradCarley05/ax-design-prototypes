import * as React from "react";
export interface ChipProps {
    children: React.ReactNode;
    /** URL for thumbnail image (avatar) */
    thumbnail?: string;
    /** Pill shape — full border-radius */
    rounded?: boolean;
    /** Themed variant — primary-200 bg, text-primary color, no shadow */
    themed?: boolean;
    /** Show drag handle */
    draggable?: boolean;
    /** Icon class for the secondary action button */
    actionIcon?: string;
    onAction?: React.MouseEventHandler<HTMLButtonElement>;
    /** Show remove (×) button */
    onRemove?: React.MouseEventHandler<HTMLButtonElement>;
    /** Makes the chip interactive (hover + active states) */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
}
export declare function Chip({ children, thumbnail, rounded, draggable, themed, actionIcon, onAction, onRemove, onClick, className, }: ChipProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Chip {
    var displayName: string;
}
