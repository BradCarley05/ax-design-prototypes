export interface EmptyStateProps {
    /** Headline text */
    mainLine?: string;
    /** Supporting text below the headline */
    subtitle?: string;
    /** Show the illustration (default: true) */
    illustration?: boolean;
    /** Show a plain icon instead of the illustration (default: false) */
    icon?: boolean;
    /** Name of the icon to use when icon=true (default: "search") */
    iconName?: string;
    /** Show the primary CTA button (default: true) */
    primary?: boolean;
    /** Primary button label (default: "Create New") */
    primaryLabel?: string;
    /** Called when the primary button is clicked */
    onPrimary?: () => void;
    /** Show the secondary button (default: true) */
    secondary?: boolean;
    /** Secondary button label (default: "Help") */
    secondaryLabel?: string;
    /** Called when the secondary button is clicked */
    onSecondary?: () => void;
    /** Wraps in a bordered card (default: false) */
    wrap?: boolean;
    className?: string;
}
export declare function EmptyState({ mainLine, subtitle, illustration, icon, iconName, primary, primaryLabel, onPrimary, secondary, secondaryLabel, onSecondary, wrap, className, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
