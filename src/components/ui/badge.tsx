import * as React from "react"

import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "destructive" | "positive" | "warning" | "info" | "pill" | "outline"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn("ax-badge", `ax-badge--${variant}`, className)} {...props} />
  )
}

export { Badge }
