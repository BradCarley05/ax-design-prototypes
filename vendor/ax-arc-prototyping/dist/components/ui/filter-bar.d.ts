import { FieldDefinition, AdvancedFilterRecord, AdvancedFilterValue } from './advanced-filter';
import * as React from 'react';
export interface ActiveFilter {
    id: string;
    field: string;
    operator: string;
    value: string;
}
export interface ToggleOption {
    value: string;
    label: string;
}
interface FilterChipProps {
    field: string;
    operator: string;
    value: string;
    /** Possible values shown in the combobox dropdown */
    valueOptions?: string[];
    onChangeValue?: (newValue: string) => void;
    onRemove?: () => void;
    className?: string;
}
declare function FilterChip({ field, operator, value, valueOptions, onChangeValue, onRemove, className }: FilterChipProps): import("react/jsx-runtime").JSX.Element;
interface SortChipProps {
    field: string;
    direction?: 'asc' | 'desc';
    onToggle?: () => void;
    className?: string;
}
declare function SortChip({ field, direction, onToggle, className }: SortChipProps): import("react/jsx-runtime").JSX.Element;
interface ToggleChipProps {
    options: ToggleOption[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}
declare function ToggleChip({ options, value, onChange, className }: ToggleChipProps): import("react/jsx-runtime").JSX.Element;
interface FilterButtonProps {
    primary?: boolean;
    leftIcon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare function FilterButton({ primary, leftIcon, onClick, disabled, className, children }: FilterButtonProps): import("react/jsx-runtime").JSX.Element;
declare function FilterBarDivider(): import("react/jsx-runtime").JSX.Element;
interface FilterBarProps {
    /** Simple filters currently applied */
    filters?: ActiveFilter[];
    onRemoveFilter?: (id: string) => void;
    onChangeFilter?: (id: string, newValue: string) => void;
    /**
     * Per-field value options for the combobox. Keys are field names.
     * E.g. { Role: ['Trainer', 'Student', 'Admin'], Location: ['Sydney', 'Melbourne'] }
     */
    fieldValueOptions?: Record<string, string[]>;
    /** Advanced filter field definitions (operators, slot types, select options) */
    fieldDefinitions?: Record<string, FieldDefinition>;
    /** Advanced filters currently applied */
    advancedFilters?: AdvancedFilterRecord[];
    onAddAdvancedFilter?: (field: string) => void;
    onRemoveAdvancedFilter?: (id: string) => void;
    onChangeAdvancedFilter?: (id: string, filterValue: AdvancedFilterValue) => void;
    /** Sort state */
    sort?: {
        field: string;
        direction?: 'asc' | 'desc';
    };
    onToggleSort?: () => void;
    /** Segmented status toggle */
    toggleOptions?: ToggleOption[];
    toggleValue?: string;
    onToggleChange?: (value: string) => void;
    /** Action buttons */
    onAddFilter?: (field: string) => void;
    onMoreActions?: () => void;
    /** Extra slot for left-side buttons (e.g. Views, Columns) */
    extraButtons?: React.ReactNode;
    className?: string;
}
declare function FilterBar({ filters, onRemoveFilter, onChangeFilter, fieldValueOptions, fieldDefinitions, advancedFilters, onAddAdvancedFilter, onRemoveAdvancedFilter, onChangeAdvancedFilter, sort, onToggleSort, toggleOptions, toggleValue, onToggleChange, onAddFilter, onMoreActions, extraButtons, className, }: FilterBarProps): import("react/jsx-runtime").JSX.Element;
declare namespace FilterBar {
    var displayName: string;
}
export { FilterBar, FilterChip, SortChip, ToggleChip, FilterButton, FilterBarDivider };
export type { FilterBarProps, FilterChipProps, SortChipProps, ToggleChipProps, FilterButtonProps };
export type { FieldDefinition, AdvancedFilterRecord, AdvancedFilterValue } from './advanced-filter';
