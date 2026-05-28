import * as React from 'react';
export interface OutlinePanelProps {
    title?: string;
    /** Activity code or subtitle displayed on the thumbnail subline */
    subtitle?: string;
    /** Status chip label displayed on the thumbnail (e.g. "Active", "Draft") */
    statusLabel?: string;
    /** Description text shown below the thumbnail */
    description?: string;
    /** true = image card thumbnail (default), false = text-only title row */
    thumbnail?: boolean;
    /** Image URL for the thumbnail variant */
    thumbnailSrc?: string;
    /** Called when the back arrow is clicked */
    onBack?: () => void;
    /** Called when "View full outline" is clicked */
    onViewFullOutline?: () => void;
    /** Optional slot content rendered below the description */
    children?: React.ReactNode;
    className?: string;
}
export declare function OutlinePanel({ title, subtitle, statusLabel, description, thumbnail, thumbnailSrc, onBack, onViewFullOutline, children, className, }: OutlinePanelProps): import("react/jsx-runtime").JSX.Element;
