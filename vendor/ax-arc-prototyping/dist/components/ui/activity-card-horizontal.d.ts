import * as React from "react";
interface ActivityCardHorizontalProps {
    title: string;
    overview?: string;
    startDate?: Date;
    endDate?: Date;
    thumbnailSrc?: string;
    codeLabel?: string;
    codeValue?: string;
    status?: React.ReactNode;
    meta?: string[];
    chips?: React.ReactNode[];
    disabled?: boolean;
    skeleton?: boolean;
    onClick?: () => void;
    className?: string;
}
declare const ActivityCardHorizontal: React.ForwardRefExoticComponent<ActivityCardHorizontalProps & React.RefAttributes<HTMLButtonElement>>;
export { ActivityCardHorizontal };
export type { ActivityCardHorizontalProps };
