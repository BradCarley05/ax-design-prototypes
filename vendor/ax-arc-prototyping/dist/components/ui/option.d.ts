import * as React from "react";
interface OptionProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare const Option: React.ForwardRefExoticComponent<OptionProps & React.RefAttributes<HTMLLabelElement>>;
interface OptionStackProps {
    children: React.ReactNode;
    className?: string;
}
declare const OptionStack: React.ForwardRefExoticComponent<OptionStackProps & React.RefAttributes<HTMLDivElement>>;
interface RadioOptionProps {
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare const RadioOption: React.ForwardRefExoticComponent<RadioOptionProps & React.RefAttributes<HTMLLabelElement>>;
export { Option, OptionStack, RadioOption };
