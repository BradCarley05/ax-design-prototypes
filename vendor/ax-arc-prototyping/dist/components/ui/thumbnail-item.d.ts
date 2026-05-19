import * as React from "react";
interface ThumbnailItemProps {
    avatar?: React.ReactNode;
    title: string;
    subline?: string;
    extraString?: string;
    rightSlot?: React.ReactNode;
    variant?: "default" | "card";
    className?: string;
}
declare const ThumbnailItem: React.ForwardRefExoticComponent<ThumbnailItemProps & React.RefAttributes<HTMLDivElement>>;
export { ThumbnailItem };
export type { ThumbnailItemProps };
