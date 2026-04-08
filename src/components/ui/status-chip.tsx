import * as React from "react"
import { cn } from "@/lib/utils"

type StatusChipType = "base" | "positive" | "negative" | "interim" | "try-again" | "submitted"
type StatusChipSize = "large" | "medium" | "small"

interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: StatusChipType
  size?: StatusChipSize
  icon?: boolean
  onPrimary?: boolean
}

const TYPE_ICONS: Record<StatusChipType, string> = {
  base:       "icon-radio-button-unchecked",
  positive:   "icon-tick-thick",
  negative:   "icon-x-thick",
  interim:    "icon-in-progress",
  "try-again":"icon-refresh",
  submitted:  "icon-radio-button-checked",
}

const TYPE_LABELS: Record<StatusChipType, string> = {
  base:       "Base",
  positive:   "Positive",
  negative:   "Negative",
  interim:    "Interim",
  "try-again":"Retry",
  submitted:  "Submitted",
}

const StatusChip = React.forwardRef<HTMLSpanElement, StatusChipProps>(
  (
    {
      type = "base",
      size = "large",
      icon = false,
      onPrimary = false,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(
        "ax-status-chip",
        `ax-status-chip--${type}`,
        `ax-status-chip--${size}`,
        onPrimary && "ax-status-chip--on-primary",
        className
      )}
      {...props}
    >
      {icon && (
        <i className={`ax-icon ${TYPE_ICONS[type]} ax-status-chip-icon`} aria-hidden="true" />
      )}
      <span>{children ?? TYPE_LABELS[type]}</span>
    </span>
  )
)
StatusChip.displayName = "StatusChip"

export { StatusChip }
export type { StatusChipProps, StatusChipType, StatusChipSize }
