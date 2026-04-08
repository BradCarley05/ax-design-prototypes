import * as React from "react"

import { cn } from "@/lib/utils"

/** Space tokens available for gap / pad props. */
type SpaceToken = "025" | "050" | "075" | "100" | "125" | "150" | "200" | "250" | "300" | "400"

/**
 * Card — flex-column surface with 20px padding by default.
 * variant="default" — white bg, el3 shadow, 8px radius.
 * variant="inline"  — light bg, no shadow. For nested content sections.
 * direction         — overrides flex-direction (default is column).
 * gap               — gap between direct children using a space token.
 * pad               — overrides the default 20px padding using a space token.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "inline"
    direction?: "row" | "col"
    gap?: SpaceToken
    pad?: SpaceToken
  }
>(({ className, variant = "default", direction, gap, pad, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "ax-card",
      variant === "inline" && "ax-card--inline",
      direction === "row" && "ax-card--row",
      gap && `ax-card--gap-${gap}`,
      pad && `ax-card--pad-${pad}`,
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader — stacks title and description vertically with a small gap.
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ax-card-header", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

/**
 * CardTitle — H4-level heading inside a card.
 * 15px / 20px line-height / weight 500.
 */
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ax-card-title", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

/**
 * CardDescription — secondary/supporting text.
 * Smaller font, text-light colour.
 */
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ax-card-description", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

/**
 * CardFooter — flex row for action buttons, 8px gap.
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ax-card-footer", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

/**
 * CardThumbnailHeader — places an avatar/icon alongside an H4 title in a horizontal row.
 */
interface CardThumbnailHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** An Avatar (or any node) rendered to the left of the title. */
  avatar?: React.ReactNode
  /** The heading text rendered as an H4. */
  title: string
}

const CardThumbnailHeader = React.forwardRef<HTMLDivElement, CardThumbnailHeaderProps>(
  ({ className, avatar, title, ...props }, ref) => (
    <div ref={ref} className={cn("ax-card-thumbnail-header", className)} {...props}>
      {avatar}
      <h4 className="ax-card-title">{title}</h4>
    </div>
  )
)
CardThumbnailHeader.displayName = "CardThumbnailHeader"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardThumbnailHeader }
