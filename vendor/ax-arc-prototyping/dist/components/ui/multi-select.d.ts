export interface MultiSelectOption {
    value: string;
    label: string;
}
export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    onChange?: (values: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    /** Read-only — chips shown without remove buttons, no border/background */
    display?: boolean;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    fieldWidth?: 'full' | 'auto' | number;
    className?: string;
}
declare function MultiSelect({ options, value: controlledValue, onChange, placeholder, searchPlaceholder, emptyText, display, disabled, label, required, fieldWidth, className, }: MultiSelectProps): import("react/jsx-runtime").JSX.Element;
declare namespace MultiSelect {
    var displayName: string;
}
export { MultiSelect };
