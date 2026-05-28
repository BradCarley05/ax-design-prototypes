import * as React from "react";
export interface ChipProps {
    children: React.ReactNode;
    /** URL for thumbnail image (avatar) */
    thumbnail?: string;
    /** Pill shape — full border-radius */
    rounded?: boolean;
    /** Round the thumbnail independently of the chip shape */
    roundedThumb?: boolean;
    /** Themed variant — primary-200 bg, text-primary color, no shadow */
    themed?: boolean;
    /** Show drag handle */
    draggable?: boolean;
    /** Active state — darkened background, used when the chip is being interacted with */
    active?: boolean;
    /** Disabled state — reduced opacity, non-interactive */
    disabled?: boolean;
    /** Icon class for the secondary action button */
    actionIcon?: string;
    onAction?: React.MouseEventHandler<HTMLButtonElement>;
    /** Show remove (×) button */
    onRemove?: React.MouseEventHandler<HTMLButtonElement>;
    /** Render the remove button in a disabled state (visible but non-interactive) */
    removeDisabled?: boolean;
    /** Override tabIndex on the remove button — use 0 to make it reachable when chip has focus in a composite widget */
    removeTabIndex?: number;
    /** Makes the chip interactive (hover + active states) */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    tabIndex?: number;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
    className?: string;
}
export declare function Chip({ children, thumbnail, rounded, roundedThumb, draggable, active, disabled, themed, actionIcon, onAction, onRemove, removeDisabled, removeTabIndex, onClick, tabIndex: tabIndexProp, onFocus, onBlur, onKeyDown, onKeyUp, className, }: ChipProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Chip {
    var displayName: string;
}
