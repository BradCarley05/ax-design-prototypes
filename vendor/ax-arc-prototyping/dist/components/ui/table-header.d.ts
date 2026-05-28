import { TopBarProps } from './top-bar';
import { ActiveFilter, ToggleOption, FieldDefinition, AdvancedFilterRecord, AdvancedFilterValue } from './filter-bar';
import * as React from 'react';
export interface TableHeaderProps extends Omit<TopBarProps, 'className'> {
    /** Full-width row between the title bar and filter bar — use for search inputs and action buttons */
    children?: React.ReactNode;
    /** Simple filters currently applied */
    filters?: ActiveFilter[];
    fieldValueOptions?: Record<string, string[]>;
    onAddFilter?: (field: string) => void;
    onRemoveFilter?: (id: string) => void;
    onChangeFilter?: (id: string, newValue: string) => void;
    /** Advanced filter field definitions */
    fieldDefinitions?: Record<string, FieldDefinition>;
    advancedFilters?: AdvancedFilterRecord[];
    onAddAdvancedFilter?: (field: string) => void;
    onRemoveAdvancedFilter?: (id: string) => void;
    onChangeAdvancedFilter?: (id: string, filterValue: AdvancedFilterValue) => void;
    sort?: {
        field: string;
        direction?: 'asc' | 'desc';
    };
    onToggleSort?: () => void;
    toggleOptions?: ToggleOption[];
    toggleValue?: string;
    onToggleChange?: (value: string) => void;
    onMoreActions?: () => void;
    extraButtons?: React.ReactNode;
    actionsExtra?: React.ReactNode;
    className?: string;
}
declare function TableHeader({ children, filters, fieldValueOptions, onAddFilter, onRemoveFilter, onChangeFilter, fieldDefinitions, advancedFilters, onAddAdvancedFilter, onRemoveAdvancedFilter, onChangeAdvancedFilter, sort, onToggleSort, toggleOptions, toggleValue, onToggleChange, onMoreActions, extraButtons, actionsExtra, className, ...topBarProps }: TableHeaderProps): import("react/jsx-runtime").JSX.Element;
declare namespace TableHeader {
    var displayName: string;
}
export { TableHeader };
