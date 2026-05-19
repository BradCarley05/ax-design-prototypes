import { DateRange } from 'react-day-picker';
export type { DateRange };
interface DatePickerSingleProps {
    mode?: "single";
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}
interface DatePickerRangeProps {
    mode: "range";
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}
type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;
declare function DatePicker(props: DatePickerProps): import("react/jsx-runtime").JSX.Element;
declare namespace DatePicker {
    var displayName: string;
}
export { DatePicker };
export type { DatePickerProps };
