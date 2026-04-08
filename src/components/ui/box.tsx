import * as React from "react"
import { cn } from "@/lib/utils"

type SpaceToken = "025" | "050" | "075" | "100" | "125" | "150" | "200" | "250" | "300" | "400"

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col"
  gap?: SpaceToken
  /** Adds justify-content: space-between */
  justify?: boolean
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, direction, gap, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        direction === "row" && "ax-box--row",
        direction === "col" && "ax-box--col",
        gap && `ax-box--gap-${gap}`,
        justify && "ax-box--justify",
        className
      )}
      {...props}
    />
  )
)
Box.displayName = "Box"

export { Box }
