export type SlotType = 'text' | 'number' | 'number-range' | 'select' | 'date';
export interface OperatorDef {
    key: string;
    label: string;
    type: SlotType;
}
export interface FieldDefinition {
    label?: string;
    operators: OperatorDef[];
    selectOptions?: {
        value: string;
        label: string;
    }[];
}
export interface AdvancedFilterValue {
    operator: string;
    value: unknown;
}
export interface AdvancedFilterRecord {
    id: string;
    field: string;
    operator: string;
    value: unknown;
}
export interface NumberRange {
    from?: string;
    to?: string;
}
interface AdvancedFilterProps {
    field: string;
    fieldLabel?: string;
    operators: OperatorDef[];
    operator: string;
    value: unknown;
    selectOptions?: {
        value: string;
        label: string;
    }[];
    onChange: (filterValue: AdvancedFilterValue) => void;
    onRemove?: () => void;
    defaultOpen?: boolean;
    className?: string;
}
declare function AdvancedFilter({ field, fieldLabel, operators, operator, value, selectOptions, onChange, onRemove, defaultOpen, className, }: AdvancedFilterProps): import("react/jsx-runtime").JSX.Element;
declare namespace AdvancedFilter {
    var displayName: string;
}
export { AdvancedFilter };
export type { AdvancedFilterProps };
