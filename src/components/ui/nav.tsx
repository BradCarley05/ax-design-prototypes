import * as React from "react"
import { cn } from "@/lib/utils"

/* ─── Vertical Navigation Menu ─────────────────────────────────────────── */

interface VerticalNavMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  header?: string
  headerAction?: React.ReactNode
}

const VerticalNavMenu = React.forwardRef<HTMLDivElement, VerticalNavMenuProps>(
  ({ children, header, headerAction, className, ...props }, ref) => (
    <div ref={ref} className={cn("ax-nav-menu", className)} {...props}>
      {header && (
        <div className="ax-nav-menu-header">
          <span className="ax-nav-menu-header-title">{header}</span>
          {headerAction}
        </div>
      )}
      {children}
    </div>
  )
)
VerticalNavMenu.displayName = "VerticalNavMenu"

/* ─── Navigation Item ───────────────────────────────────────────────────── */

interface NavItemBaseProps {
  icon?: React.ReactNode
  active?: boolean
  flat?: boolean
  className?: string
  children: React.ReactNode
}

type NavItemProps =
  | (NavItemBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (NavItemBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

const NavItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, NavItemProps>(
  ({ icon, active, flat = true, className, children, ...props }, ref) => {
    const classes = cn(
      "ax-nav-item",
      !flat && "ax-nav-item--raised",
      active && "ax-nav-item--active",
      className
    )
    const content = (
      <>
        {icon && <span className="ax-nav-item-icon">{icon}</span>}
        <span className="ax-nav-item-label">{children}</span>
      </>
    )

    if ("href" in props && props.href !== undefined) {
      const { href, ...rest } = props as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...rest}>
          {content}
        </a>
      )
    }

    const { disabled, ...rest } = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} disabled={disabled} className={classes} {...rest}>
        {content}
      </button>
    )
  }
)
NavItem.displayName = "NavItem"

export { VerticalNavMenu, NavItem }
