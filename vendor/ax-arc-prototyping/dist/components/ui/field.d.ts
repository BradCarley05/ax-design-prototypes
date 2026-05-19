import * as React from "react";
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: 'full' | 'auto' | number;
}
export declare function Field({ className, width, style, ...props }: FieldProps): import("react/jsx-runtime").JSX.Element;
interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    tooltip?: React.ReactNode;
}
export declare function FieldLabel({ className, required, tooltip, children, ...props }: FieldLabelProps): import("react/jsx-runtime").JSX.Element;
export declare function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>): import("react/jsx-runtime").JSX.Element;
export {};
