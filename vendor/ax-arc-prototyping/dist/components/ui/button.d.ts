import * as React from "react";
type ButtonVariant = "primary" | "destructive" | "positive" | "secondary" | "secondary-destructive" | "secondary-positive" | "link" | "tertiary";
type ButtonSize = "default" | "icon";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    split?: boolean;
    onSplitClick?: React.MouseEventHandler<HTMLButtonElement>;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    buttonStyle?: boolean;
    rounded?: boolean;
    size?: 18 | 20 | 24;
    selected?: boolean;
    tooltip?: string;
}
declare function IconButton({ icon, buttonStyle, rounded, size, selected, tooltip, className, disabled, ...props }: IconButtonProps): import("react/jsx-runtime").JSX.Element;
declare namespace IconButton {
    var displayName: string;
}
export { Button, IconButton };
