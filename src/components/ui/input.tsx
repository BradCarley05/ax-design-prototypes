import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    if (leftIcon) {
      return (
        <div className="ax-input-wrapper">
          <span className="ax-field-icon-left">{leftIcon}</span>
          <input
            type={type}
            className={cn("ax-input", "ax-input--has-icon-left", className)}
            ref={ref}
            {...props}
          />
        </div>
      )
    }
    return (
      <input
        type={type}
        className={cn("ax-input", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
