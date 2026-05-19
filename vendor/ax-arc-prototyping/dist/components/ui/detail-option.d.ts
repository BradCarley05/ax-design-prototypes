import * as React from "react";
interface DetailOptionProps {
    title: string;
    description?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    card?: boolean;
    className?: string;
}
declare const DetailOption: React.ForwardRefExoticComponent<DetailOptionProps & React.RefAttributes<HTMLLabelElement>>;
export { DetailOption };
export type { DetailOptionProps };
