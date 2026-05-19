import * as React from "react";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
    as?: `h${HeadingLevel}`;
    color?: string;
}
export declare function Heading({ level, as, color, className, style, ...props }: HeadingProps): import("react/jsx-runtime").JSX.Element;
export {};
