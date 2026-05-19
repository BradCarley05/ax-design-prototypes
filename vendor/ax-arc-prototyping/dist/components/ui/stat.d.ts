import { ReactNode } from 'react';
export interface StatProps {
    label?: string;
    value?: string | number;
    /** Trend string — prefix with '+' for positive (green), '-' for negative (red) e.g. "+32%" */
    trend?: string;
    /** Filter label e.g. "Last Month" */
    filter?: string;
    /** Icon content rendered inside the top avatar circle */
    icon?: ReactNode;
    /** Shows a right-arrow icon next to the label */
    clickable?: boolean;
    /** Card style with border + shadow (default true) */
    card?: boolean;
    /** Flat style with primary-100 background */
    flat?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare function Stat({ label, value, trend, filter, icon, clickable, card, flat, onClick, className, }: StatProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Stat {
    var displayName: string;
}
