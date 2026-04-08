import * as React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className={cn("ax-spinner", className)}
      aria-label="Loading"
      role="status"
      {...props}
    >
      {/* Track */}
      <circle
        cx="10"
        cy="10"
        r="8"
        strokeWidth="2"
        stroke="var(--primary-300)"
      />
      {/* Arc */}
      <circle
        cx="10"
        cy="10"
        r="8"
        strokeWidth="2"
        stroke="var(--text-primary)"
        strokeLinecap="round"
        strokeDasharray="50.265"
        strokeDashoffset="37.699"
      />
    </svg>
  )
)
Spinner.displayName = "Spinner"

export { Spinner }
export type { SpinnerProps }
