import * as React from "react";
export interface ComboboxItemDef {
    value: string;
    label: string;
    keywords?: string[];
}
interface ComboboxProps {
    items: ComboboxItemDef[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    contentStyle?: React.CSSProperties;
    className?: string;
}
declare function Combobox({ items, value, onValueChange, placeholder, searchPlaceholder, emptyText, open: controlledOpen, onOpenChange, contentStyle, className, }: ComboboxProps): import("react/jsx-runtime").JSX.Element;
declare namespace Combobox {
    var displayName: string;
}
export { Combobox };
