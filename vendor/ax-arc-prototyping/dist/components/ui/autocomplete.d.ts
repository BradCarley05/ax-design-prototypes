import * as React from "react";
interface AutocompleteOption {
    value: string;
    label: string;
}
interface AutocompleteProps {
    options: AutocompleteOption[];
    value?: string;
    onChange?: (value: string) => void;
    onQueryChange?: (query: string) => void;
    placeholder?: string;
    leftIcon?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLDivElement>>;
export { Autocomplete };
export type { AutocompleteOption, AutocompleteProps };
