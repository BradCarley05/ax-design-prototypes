export type InfoBlockType = 'info' | 'positive' | 'warning' | 'negative';
export interface InfoBlockProps {
    type?: InfoBlockType;
    title?: string;
    body?: string;
    oneLine?: boolean;
    showTitle?: boolean;
    action?: boolean;
    actionLabel?: string;
    dismissIcon?: boolean;
    onAction?: () => void;
    onDismiss?: () => void;
    className?: string;
}
export declare function InfoBlock({ type, title, body, oneLine, showTitle, action, actionLabel, dismissIcon, onAction, onDismiss, className, }: InfoBlockProps): import("react/jsx-runtime").JSX.Element;
export declare namespace InfoBlock {
    var displayName: string;
}
