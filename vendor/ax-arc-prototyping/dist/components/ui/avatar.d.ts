import * as React from "react";
interface AvatarProps {
    mode?: "image" | "initials" | "icon";
    shape?: "square" | "circle";
    theme?: "flat" | "shadow";
    src?: string;
    alt?: string;
    initials?: string;
    icon?: React.ReactNode;
    loading?: boolean;
    className?: string;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
export { Avatar };
export type { AvatarProps };
