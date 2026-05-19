import * as React from "react";
type StatusChipType = "base" | "positive" | "negative" | "interim" | "try-again" | "submitted";
type StatusChipSize = "large" | "medium" | "small";
interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
    type?: StatusChipType;
    size?: StatusChipSize;
    icon?: boolean;
    onPrimary?: boolean;
}
declare const StatusChip: React.ForwardRefExoticComponent<StatusChipProps & React.RefAttributes<HTMLSpanElement>>;
export { StatusChip };
export type { StatusChipProps, StatusChipType, StatusChipSize };
