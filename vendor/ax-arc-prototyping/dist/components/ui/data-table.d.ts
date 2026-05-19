import { RowData } from '@tanstack/react-table';
import { ColumnDef } from './table';
import { ActiveFilter, ToggleOption, FieldDefinition, AdvancedFilterRecord, AdvancedFilterValue } from './filter-bar';
import { BreadcrumbItem } from './breadcrumb';
import * as React from 'react';
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
declare function DataTable<TData extends RowData>({ breadcrumbs, leftContent, headingTitle, avatar, title, subline, extraString, rightContent, maxWidth, search, toolbar, filters, fieldValueOptions, onAddFilter, onRemoveFilter, onChangeFilter, fieldDefinitions, advancedFilters, onAddAdvancedFilter, onRemoveAdvancedFilter, onChangeAdvancedFilter, sort, onToggleSort, toggleOptions, toggleValue, onToggleChange, onMoreActions, data, columns, pageSize, pageSizeOptions, selectable, onSelectionChange, className, }: DataTableProps<TData>): import("react/jsx-runtime").JSX.Element;
declare namespace DataTable {
    var displayName: string;
}
export { DataTable, DataTableSearch };
export type { DataTableProps, DataTableSearchProps };
