import React from 'react'
import { Card } from '@/components/ui/card'
import { ThumbnailItem } from '@/components/ui/thumbnail-item'
import { Avatar } from '@/components/ui/avatar'
import { IconButton } from '@/components/ui/button'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Activity {
  id: string
  title: string
  thumbnailSrc?: string
  metric: string
  logEntries: number
  completed?: boolean
}

export interface UnitActivityCardProps {
  unitName: string
  unitCode: string
  activityCount: number
  totalHours: number
  activities: Activity[]
  onOpen?: () => void
  className?: string
}

// ─── Activity avatar with optional completion badge ───────────────────────────

function ActivityAvatar({ src, alt, completed }: { src?: string; alt?: string; completed?: boolean }) {
  return (
    <div className="relative shrink-0">
      {src ? (
        <Avatar mode="image" src={src} alt={alt ?? ''} shape="square" theme="flat" />
      ) : (
        <Avatar mode="icon" shape="square" theme="flat" icon={<i className="icon-shapes-types-categories" />} />
      )}
      {completed && (
        <span className="ax-activity-badge">
          <i className="icon-tick" />
        </span>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function UnitActivityCard({
  unitName,
  unitCode,
  activityCount,
  totalHours,
  activities,
  onOpen,
  className,
}: UnitActivityCardProps) {
  return (
    <Card gap="200" className={className}>

      {/* Header: unit name + code + activity summary + open button */}
      <ThumbnailItem
        avatar={
          <Avatar
            mode="icon"
            shape="square"
            theme="flat"
            icon={<i className="icon-shapes-types-categories" />}
          />
        }
        title={unitName}
        subline={unitCode}
        extraString={`${activityCount} activities (${totalHours} hours)`}
        rightSlot={
          <IconButton
            icon="icon-external-link"
            tooltip="Open unit"
            size={20}
            onClick={onOpen}
          />
        }
      />

      {/* Activities section */}
      <div className="ax-unit-activities">
        <p className="ax-unit-activities-heading">Activities</p>
        <div className="ax-unit-activities-list">
          {activities.map((activity) => (
            <ThumbnailItem
              key={activity.id}
              avatar={
                <ActivityAvatar
                  src={activity.thumbnailSrc}
                  alt={activity.title}
                  completed={activity.completed}
                />
              }
              title={activity.title}
              subline={activity.metric}
              extraString={
                activity.logEntries === 1
                  ? '1 log entry'
                  : `${activity.logEntries} log entries`
              }
            />
          ))}
        </div>
      </div>

    </Card>
  )
}
