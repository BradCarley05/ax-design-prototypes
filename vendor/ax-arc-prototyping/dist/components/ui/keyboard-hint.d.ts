import { ReactNode } from 'react';
export declare function usePlatform(): {
    isMac: boolean;
    isMobile: boolean;
};
export interface KeyboardHintProps {
    /** Text label, e.g. "C", "Ctrl", "⌘", "Esc" */
    children?: ReactNode;
    /** Icon content — when provided, renders a fixed 16×16 icon badge */
    icon?: ReactNode;
    /** Swap to white-on-primary-dark palette */
    onPrimary?: boolean;
    /** Elevated shadow variant — use when the parent element is hovered */
    raised?: boolean;
    className?: string;
}
export interface PlatformHintProps {
    /** Shown on macOS. Typically uses ⌘-style shortcuts. */
    mac: ReactNode;
    /** Shown on Windows / Linux / unrecognised platforms. Hidden on mobile. */
    win: ReactNode;
}
export declare function PlatformHint({ mac, win }: PlatformHintProps): import("react/jsx-runtime").JSX.Element | null;
export declare function KeyboardHint({ children, icon, onPrimary, raised, className }: KeyboardHintProps): import("react/jsx-runtime").JSX.Element;
