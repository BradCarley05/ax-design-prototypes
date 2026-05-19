import * as React from "react";
interface SingleSelectOption {
    value: string;
    label?: string;
    icon?: React.ReactNode;
    leftIcon?: React.ReactNode;
}
interface SingleSelectProps {
    options: SingleSelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    borderless?: boolean;
    error?: boolean;
    iconOnly?: boolean;
    inline?: boolean;
    className?: string;
    label?: string;
    required?: boolean;
    fieldWidth?: 'full' | 'auto' | number;
    fieldStyle?: React.CSSProperties;
}
declare const SingleSelect: React.ForwardRefExoticComponent<SingleSelectProps & React.RefAttributes<HTMLDivElement>>;
export { SingleSelect };
export type { SingleSelectOption, SingleSelectProps };
