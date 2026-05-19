import * as React from "react";
interface ActivityCardPortraitProps {
    title?: string;
    description?: string;
    codeLabel?: string;
    codeValue?: string;
    activityType?: string;
    thumbnailSrc?: string;
    disabled?: boolean;
    selected?: boolean;
    skeleton?: boolean;
    onClick?: () => void;
    className?: string;
}
declare const ActivityCardPortrait: React.ForwardRefExoticComponent<ActivityCardPortraitProps & React.RefAttributes<HTMLButtonElement>>;
export { ActivityCardPortrait };
export type { ActivityCardPortraitProps };
