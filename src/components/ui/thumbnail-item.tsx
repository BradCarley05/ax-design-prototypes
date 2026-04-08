import * as React from "react"
import { cn } from "@/lib/utils"

interface ThumbnailItemProps {
  avatar?: React.ReactNode
  title: string
  subline?: string
  extraString?: string
  rightSlot?: React.ReactNode
  variant?: "default" | "card"
  className?: string
}

const ThumbnailItem = React.forwardRef<HTMLDivElement, ThumbnailItemProps>(
  ({ avatar, title, subline, extraString, rightSlot, variant = "default", className }, ref) => (
    <div ref={ref} className={cn("ax-thumbnail-item", variant === "card" && "ax-thumbnail-item--card", className)}>

      {avatar}

      <div className="ax-thumbnail-item-text">
        <span className="ax-thumbnail-item-title">{title}</span>
        {subline && (
          <div className="ax-thumbnail-item-subline">
            <span className="ax-thumbnail-item-subline-text">{subline}</span>
            {extraString && (
              <>
                <span className="ax-thumbnail-item-sep" aria-hidden="true" />
                <span className="ax-thumbnail-item-subline-text">{extraString}</span>
              </>
            )}
          </div>
        )}
      </div>

      {rightSlot && (
        <div className="ax-thumbnail-item-right">{rightSlot}</div>
      )}

    </div>
  )
)
ThumbnailItem.displayName = "ThumbnailItem"

export { ThumbnailItem }
export type { ThumbnailItemProps }
