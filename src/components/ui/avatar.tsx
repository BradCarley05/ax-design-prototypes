import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps {
  mode?: "image" | "initials" | "icon"
  shape?: "square" | "circle"
  theme?: "flat" | "shadow"
  src?: string
  alt?: string
  initials?: string
  icon?: React.ReactNode
  className?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      mode = "icon",
      shape = "square",
      theme = "flat",
      src,
      alt = "",
      initials,
      icon,
      className,
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "ax-avatar",
        shape === "circle" ? "ax-avatar--circle" : "ax-avatar--square",
        theme === "shadow" ? "ax-avatar--shadow" : "ax-avatar--flat",
        className
      )}
    >
      {mode === "image" && src && (
        <img className="ax-avatar-image" src={src} alt={alt} />
      )}
      {mode === "initials" && (
        <span className="ax-avatar-initials">{initials}</span>
      )}
      {mode === "icon" && (
        <span className="ax-avatar-icon">{icon}</span>
      )}
    </div>
  )
)
Avatar.displayName = "Avatar"

export { Avatar }
export type { AvatarProps }
