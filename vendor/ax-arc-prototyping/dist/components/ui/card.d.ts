import * as React from "react";
/** Space tokens available for gap / pad props. */
type SpaceToken = "025" | "050" | "075" | "100" | "125" | "150" | "200" | "250" | "300" | "400";
/**
 * Card — flex-column surface with 20px padding by default.
 * variant="default" — white bg, el3 shadow, 8px radius.
 * variant="inline"  — light bg, no shadow. For nested content sections.
 * direction         — overrides flex-direction (default is column).
 * gap               — gap between direct children using a space token.
 * pad               — overrides the default 20px padding using a space token.
 */
declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "inline";
    direction?: "row" | "col";
    gap?: SpaceToken;
    pad?: SpaceToken;
} & React.RefAttributes<HTMLDivElement>>;
/**
 * CardHeader — stacks title and description vertically with a small gap.
 */
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * CardTitle — H4-level heading inside a card.
 * 15px / 20px line-height / weight 500.
 */
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * CardDescription — secondary/supporting text.
 * Smaller font, text-light colour.
 */
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * CardFooter — flex row for action buttons, 8px gap.
 */
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * CardThumbnailHeader — places an avatar/icon alongside an H4 title in a horizontal row.
 */
interface CardThumbnailHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** An Avatar (or any node) rendered to the left of the title. */
    avatar?: React.ReactNode;
    /** The heading text rendered as an H4. */
    title: string;
}
declare const CardThumbnailHeader: React.ForwardRefExoticComponent<CardThumbnailHeaderProps & React.RefAttributes<HTMLDivElement>>;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardThumbnailHeader };
