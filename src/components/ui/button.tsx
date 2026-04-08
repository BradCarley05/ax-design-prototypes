import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronDown, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

type ButtonVariant =
  | "default" | "destructive" | "positive" | "secondary"
  | "outline" | "outline-destructive" | "outline-positive"
  | "link" | "tertiary"

type ButtonSize = "default" | "icon"

const FILLED_VARIANTS: ButtonVariant[] = ["default", "destructive", "positive", "secondary"]

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  split?: boolean
  onSplitClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      split = false,
      onSplitClick,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    const baseClass = cn("ax-btn", `ax-btn--${variant}`, `ax-btn-size--${size}`, className)

    if (split) {
      return (
        <div className={cn("ax-btn-split", isDisabled && "ax-btn-split--disabled")}>
          <Comp
            className={cn("ax-btn", `ax-btn--${variant}`, `ax-btn-size--${size}`)}
            ref={ref}
            disabled={isDisabled}
            {...props}
          >
            {loading ? <Loader2 className="ax-spin" /> : leftIcon}
            {children}
          </Comp>
          <div
            aria-hidden="true"
            className={cn(
              "ax-btn-split-divider",
              FILLED_VARIANTS.includes(variant) ? "ax-btn-split-divider--light" : "ax-btn-split-divider--dark"
            )}
          />
          <button
            type="button"
            onClick={onSplitClick}
            disabled={isDisabled}
            className={cn("ax-btn", `ax-btn--${variant}`, `ax-btn-size--${size}`)}
          >
            <ChevronDown />
          </button>
        </div>
      )
    }

    return (
      <Comp className={baseClass} ref={ref} disabled={isDisabled} {...props}>
        {loading ? <Loader2 className="ax-spin" /> : leftIcon}
        {children}
        {rightIcon}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
