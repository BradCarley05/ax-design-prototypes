import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn("ax-checkbox", className)}
    checked={checked}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="ax-checkbox-indicator">
      {checked === "indeterminate" ? (
        <svg width="8" height="2" viewBox="0 0 8 2" fill="currentColor" aria-hidden>
          <rect width="8" height="2" rx="1" />
        </svg>
      ) : (
        <i className="ax-icon icon-tick" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
