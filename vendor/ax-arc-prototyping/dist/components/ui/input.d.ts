import * as React from "react";
interface InputProps extends React.ComponentProps<"input"> {
    leftIcon?: React.ReactNode;
    hint?: React.ReactNode;
    label?: string;
    required?: boolean;
    fieldStyle?: React.CSSProperties;
}
declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { Input };
