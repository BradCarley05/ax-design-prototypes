export interface EditorProps {
    label?: string;
    showLabel?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (html: string) => void;
    disabled?: boolean;
    viewOnly?: boolean;
    error?: boolean;
    errorMessage?: string;
    className?: string;
    minHeight?: number;
}
export declare function Editor({ label, showLabel, placeholder, value, onChange, disabled, viewOnly, error, errorMessage, className, minHeight, }: EditorProps): import("react/jsx-runtime").JSX.Element;
