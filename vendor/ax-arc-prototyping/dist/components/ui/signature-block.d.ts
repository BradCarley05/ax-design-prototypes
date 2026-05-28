type SignatureMode = 'draw' | 'type';
export interface SignatureBlockProps {
    label?: string;
    /** When true, renders a locked read-only signed view */
    signed?: boolean;
    /** Name shown in "Signed by {signedBy} - {signedAt}" */
    signedBy?: string;
    /** Pre-formatted timestamp string — defaults to current date/time */
    signedAt?: string;
    defaultMode?: SignatureMode;
    /** Pre-populate the typed name (type mode only) */
    defaultTypedName?: string;
    /** Called with canvas data URL (draw) or typed name (type) after any change */
    onSign?: (data: string) => void;
    onClear?: () => void;
    className?: string;
}
export declare function SignatureBlock({ label, signed, signedBy, signedAt, defaultMode, defaultTypedName, onSign, onClear, className, }: SignatureBlockProps): import("react/jsx-runtime").JSX.Element;
export {};
