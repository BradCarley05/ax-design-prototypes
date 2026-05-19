export interface ProgressBarProps {
    /** Label shown above the bar (medium size only) */
    label?: string;
    /** Progress value 0–100 */
    value?: number;
    /** Green positive variant */
    positive?: boolean;
    size?: 'medium' | 'small';
    /** Show label + value row above the track (medium size only) */
    topLabel?: boolean;
    /** Show value text to the right of the track */
    sideValue?: boolean;
    /** Show a threshold notch on the track */
    notch?: boolean;
    /** 0–100 position of the notch — defaults to same as value */
    notchValue?: number;
    /** Override the displayed value text, e.g. "3/10" instead of "35%" */
    valueLabel?: string;
    className?: string;
}
export declare function ProgressBar({ label, value, positive, size, topLabel, sideValue, notch, notchValue, valueLabel, className, }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
