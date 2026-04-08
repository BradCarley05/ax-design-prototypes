import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

/* ─── Option ─────────────────────────────────────────────────────────────── */

interface OptionProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}

const Option = React.forwardRef<HTMLLabelElement, OptionProps>(
  ({ checked, onCheckedChange, disabled, children, className }, ref) => {
    const id = React.useId()
    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn("ax-option", checked && "ax-option--checked", disabled && "ax-option--disabled", className)}
      >
        <Checkbox
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(v) => onCheckedChange?.(!!v)}
        />
        <span className="ax-option-label">{children}</span>
      </label>
    )
  }
)
Option.displayName = "Option"

/* ─── OptionStack ────────────────────────────────────────────────────────── */

interface OptionStackProps {
  children: React.ReactNode
  className?: string
}

const OptionStack = React.forwardRef<HTMLDivElement, OptionStackProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("ax-option-stack", className)}>
      {children}
    </div>
  )
)
OptionStack.displayName = "OptionStack"

export { Option, OptionStack }
