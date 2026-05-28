import { RowData, SortingState } from '@tanstack/react-table';
import { ColumnDef } from './table';
import { ActiveFilter, ToggleOption, FieldDefinition, AdvancedFilterRecord, AdvancedFilterValue } from './filter-bar';
import { BreadcrumbItem } from './breadcrumb';
import * as React from 'react';
interface DataTableConfig {
    filters: ActiveFilter[];
    advancedFilters: AdvancedFilterRecord[];
    sort: {
        field: string;
        direction?: 'asc' | 'desc';
    } | undefined;
    toggleValue: string | undefined;
    search: string;
    pageSize: number;
    columnSorting: SortingState;
    columnOrder: string[];
    columnVisibility: Record<string, boolean>;
}
declare function useTableConfig(storageKey: string): {
    defaultConfig: DataTableConfig | undefined;
    onConfigChange: (config: DataTableConfig) => void;
};
interface DataTableProps<TData extends RowData> {
    breadcrumbs?: BreadcrumbItem[];
    leftContent?: React.ReactNode;
    headingTitle?: boolean;
    avatar?: React.ReactNode;
    title?: string;
    subline?: string;
    extraString?: string;
    rightContent?: React.ReactNode;
    maxWidth?: number;
    search?: boolean;
    toolbar?: React.ReactNode;
    filters?: ActiveFilter[];
    fieldValueOptions?: Record<string, string[]>;
    onAddFilter?: (field: string) => void;
    onRemoveFilter?: (id: string) => void;
    onChangeFilter?: (id: string, newValue: string) => void;
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
    data: TData[];
    columns: ColumnDef<TData, any>[];
    pageSize?: number;
    pageSizeOptions?: number[];
    selectable?: boolean;
    onSelectionChange?: (rows: TData[]) => void;
    /** Seed config for the first render — use with `useTableConfig` or supply your own. Parent is responsible for restoring filter/sort/toggle state from this. DataTable uses it to restore the internal search value. Updating this after mount (e.g. when loading a saved view) resets internal search and column sorting. */
    defaultConfig?: DataTableConfig;
    /** Called whenever the assembled table config changes. Persist it (e.g. via `useTableConfig`) or handle it yourself. */
    onConfigChange?: (config: DataTableConfig) => void;
    /** Extra buttons rendered in the filter bar's left slot — use for ViewsButton, column pickers, etc. */
    extraButtons?: React.ReactNode;
    /** Extra buttons rendered in the filter bar's actions area alongside "Add filter" */
    actionsExtra?: React.ReactNode;
    className?: string;
}
interface DataTableSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
declare function DataTableSearch({ value, onChange, placeholder }: DataTableSearchProps): import("react/jsx-runtime").JSX.Element;
declare namespace DataTableSearch {
    var displayName: string;
}
declare function DataTable<TData extends RowData>({ breadcrumbs, leftContent, headingTitle, avatar, title, subline, extraString, rightContent, maxWidth, search, toolbar, filters, fieldValueOptions, onAddFilter, onRemoveFilter, onChangeFilter, fieldDefinitions, advancedFilters, onAddAdvancedFilter, onRemoveAdvancedFilter, onChangeAdvancedFilter, sort, onToggleSort, toggleOptions, toggleValue, onToggleChange, onMoreActions, data, columns, pageSize, pageSizeOptions, selectable, onSelectionChange, defaultConfig, onConfigChange, extraButtons, actionsExtra, className, }: DataTableProps<TData>): import("react/jsx-runtime").JSX.Element;
declare namespace DataTable {
    var displayName: string;
}
export { DataTable, DataTableSearch, useTableConfig };
export type { DataTableProps, DataTableSearchProps, DataTableConfig };
