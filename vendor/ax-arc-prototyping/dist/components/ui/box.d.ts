import * as React from "react";
type SpaceToken = "025" | "050" | "075" | "100" | "125" | "150" | "200" | "250" | "300" | "400";
interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "col";
    gap?: SpaceToken;
    /** Shorthand: 1–4 space tokens e.g. "100" or "075 125" */
    padding?: string;
    /** Individual sides */
    pt?: SpaceToken;
    pr?: SpaceToken;
    pb?: SpaceToken;
    pl?: SpaceToken;
    px?: SpaceToken;
    py?: SpaceToken;
    /** Adds justify-content: space-between */
    justify?: boolean;
    /** Cross-axis alignment (row: vertical, col: horizontal) */
    align?: "top" | "middle" | "bottom" | "stretch";
}
declare const Box: React.ForwardRefExoticComponent<BoxProps & React.RefAttributes<HTMLDivElement>>;
export { Box };
export type { BoxProps, SpaceToken };
