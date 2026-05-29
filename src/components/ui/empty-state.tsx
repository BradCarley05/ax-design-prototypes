import { cn, Box } from 'ax-arc-prototyping'
import { Button } from '@/components/ui/button'

function EmptyIllustration() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ax-empty-state__illustration-svg"
      aria-hidden="true"
    >
      <circle cx="59" cy="59" r="29" fill="var(--primary-100)" />
      <circle cx="40" cy="40" r="22" fill="var(--bg)" stroke="var(--primary-600)" strokeWidth="2.5" />
      <path d="M29 32 Q30 21 41.5 21" stroke="var(--primary-400)" strokeWidth="2" strokeLinecap="round" />
      <path d="M57.5 57.5 L73 73" stroke="var(--primary-600)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export interface EmptyStateProps {
  mainLine?: string
  subtitle?: string
  illustration?: boolean
  icon?: boolean
  iconName?: string
  primary?: boolean
  primaryLabel?: string
  onPrimary?: () => void
  secondary?: boolean
  secondaryLabel?: string
  onSecondary?: () => void
  wrap?: boolean
  className?: string
}

export function EmptyState({
  mainLine = "We couldn't find any results",
  subtitle = 'Try modifying any applied filters or search terms used',
  illustration = true,
  icon = false,
  iconName = 'search',
  primary = true,
  primaryLabel = 'Create New',
  onPrimary,
  secondary = true,
  secondaryLabel = 'Help',
  onSecondary,
  wrap = false,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('ax-empty-state', wrap && 'ax-empty-state--wrap', className)}>
      {illustration && !icon && (
        <div className="ax-empty-state__illustration">
          <EmptyIllustration />
        </div>
      )}
      {icon && !illustration && (
        <div className="ax-empty-state__icon">
          <i className={`icon-${iconName} ax-empty-state__icon-glyph`} aria-hidden="true" />
        </div>
      )}
      <Box direction="col" gap="200" align="middle" className="ax-empty-state__content">
        <Box direction="col" gap="075" className="ax-empty-state__text">
          <p className="ax-empty-state__headline">{mainLine}</p>
          <p className="ax-empty-state__subtitle">{subtitle}</p>
        </Box>
        {(primary || secondary) && (
          <Box direction="col" gap="150" align="middle" className="ax-empty-state__actions">
            {primary && (
              <Button
                variant="default"
                leftIcon={<i className="icon-grid-plus" aria-hidden="true" />}
                onClick={onPrimary}
              >
                {primaryLabel}
              </Button>
            )}
            {secondary && (
              <Button
                variant="outline"
                leftIcon={<i className="icon-help-outline" aria-hidden="true" />}
                onClick={onSecondary}
              >
                {secondaryLabel}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </div>
  )
}
