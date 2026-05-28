import * as React from 'react';
export interface CommandBarProps {
    query?: string;
    onQueryChange?: (value: string) => void;
    placeholder?: string;
    children?: React.ReactNode;
    /** Label for the AI suggestion shown in the default (empty query) state */
    aiLabel?: string;
    onAiClick?: () => void;
    /** 'ai' switches input icon, placeholder, and hides section nav */
    mode?: 'search' | 'ai';
    /** Called when Backspace is pressed with an empty input */
    onEmptyBackspace?: () => void;
    /** Called when Enter is pressed in ai mode with no selectable items (i.e. to submit the query) */
    onAiSubmit?: (query: string) => void;
    /** Called when Cmd/Ctrl+Enter is pressed in search mode */
    onSearchSubmit?: (query: string) => void;
    /** Hint shown on the right of the search input (e.g. keyboard shortcut) */
    searchHint?: React.ReactNode;
    /** Shows a left-aligned loading spinner in place of content */
    loading?: boolean;
    className?: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}
export declare function CommandBar({ query, onQueryChange, placeholder, children, aiLabel, onAiClick, mode, onEmptyBackspace, onAiSubmit, onSearchSubmit, searchHint, loading, className, inputRef, }: CommandBarProps): import("react/jsx-runtime").JSX.Element;
export interface CommandBarSectionProps {
    heading: string;
    children?: React.ReactNode;
    /** When children count exceeds this, truncate with a "See all" button. Default 4. */
    maxVisible?: number;
}
export declare function CommandBarSection({ heading, children, maxVisible }: CommandBarSectionProps): import("react/jsx-runtime").JSX.Element;
interface CommandBarNavItemProps {
    type?: 'nav';
    icon: string;
    label: string;
    category?: string;
    parentLabel?: string;
    shortcut?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}
interface CommandBarContactItemProps {
    type: 'contact';
    name: string;
    org?: string;
    email?: string;
    avatarSrc?: string;
    avatarInitials?: string;
    shortcut?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}
interface CommandBarActionItemProps {
    type: 'action';
    icon?: string;
    label: string;
    onClick?: () => void;
    className?: string;
}
interface CommandBarSeeAllItemProps {
    type: 'see-all';
    label: string;
    onClick?: () => void;
    className?: string;
}
export type CommandBarItemProps = CommandBarNavItemProps | CommandBarContactItemProps | CommandBarActionItemProps | CommandBarSeeAllItemProps;
export declare function CommandBarItem(props: CommandBarItemProps): import("react/jsx-runtime").JSX.Element;
export interface CommandBarNoResultsProps {
    onAskAi?: () => void;
}
export declare function CommandBarNoResults({ onAskAi }: CommandBarNoResultsProps): import("react/jsx-runtime").JSX.Element;
export interface CommandBarAiInfoBlockProps {
    children: React.ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
}
export declare function CommandBarAiInfoBlock({ children, onDismiss, dismissLabel }: CommandBarAiInfoBlockProps): import("react/jsx-runtime").JSX.Element;
export declare function CommandBarAiInfo(): import("react/jsx-runtime").JSX.Element;
export {};
