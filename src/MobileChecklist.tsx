import React from 'react'

interface ActivityItem {
  title: string
  meta: string
  status?: string
  hasImage?: boolean
}

interface UnitSectionProps {
  unitCode: string
  hours: string
  activities: ActivityItem[]
}

function Dot() {
  return <span className="ax-mobile-dot" />
}

function ActivityCard({ title, meta, status, hasImage }: ActivityItem) {
  return (
    <div className="ax-mobile-list-item">
      <div className={`ax-mobile-thumbnail${hasImage ? ' ax-mobile-thumbnail--image' : ''}`}>
        {!hasImage && <i className="icon-activities-tasks-list ax-mobile-thumbnail-icon" />}
      </div>
      <div className="ax-mobile-list-item-text">
        <p className="ax-mobile-list-item-title">{title}</p>
        <div className="ax-mobile-list-item-meta">
          <span>{meta}</span>
          {status && (
            <>
              <Dot />
              <span>{status}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function UnitSection({ unitCode, hours, activities }: UnitSectionProps) {
  return (
    <div className="ax-mobile-section">
      <p className="ax-mobile-section-title">{unitCode}</p>
      <div className="ax-mobile-status-block">
        <i className="icon-checkbox-checked ax-mobile-status-icon" />
        <span className="ax-mobile-status-text">{hours}</span>
      </div>
      {activities.map((activity, i) => (
        <ActivityCard key={i} {...activity} />
      ))}
    </div>
  )
}

export default function MobileChecklist() {
  return (
    <div className="ax-mobile-preview">
      <div className="ax-mobile-screen">

        <div className="ax-mobile-header">
          <button className="ax-mobile-back-btn" aria-label="Go back">
            <i className="icon-arrow-right-short ax-mobile-back-icon" />
          </button>
          <div className="ax-mobile-header-text">
            <span className="ax-mobile-header-title">Milestone 3 - Japanese Cuisine</span>
            <div className="ax-mobile-header-subtitle">
              <span>In progress</span>
              <Dot />
              <span>2 units</span>
            </div>
          </div>
        </div>

        <div className="ax-mobile-content">

          <div className="ax-mobile-section">
            <p className="ax-mobile-section-title">Milestone checklist</p>
            <div className="ax-mobile-list-item">
              <div className="ax-mobile-list-item-text">
                <p className="ax-mobile-list-item-title">Practical Japanese Cooking Techniques</p>
                <div className="ax-mobile-list-item-meta">
                  <span>5 sections</span>
                  <Dot />
                  <span>Not started</span>
                </div>
              </div>
            </div>
          </div>

          <UnitSection
            unitCode="SITHC1016 - Japanese culinary skills"
            hours="4/4 required hours"
            activities={[
              { title: 'Prepare dashi stock from scratch', meta: '0/10 reps', hasImage: true },
              { title: 'Practical Japanese Cooking Techniques', meta: 'Unit checklist', status: 'Not started' },
            ]}
          />

          <UnitSection
            unitCode="SITHCCC0011 - Italian Cooking Techniques"
            hours="4/4 required hours"
            activities={[
              { title: 'Identify key ingredients in a virtual pantry', meta: '0/10 reps', hasImage: true },
              { title: 'Plate sashimi using traditional styles', meta: 'Unit checklist', status: 'Not started', hasImage: true },
            ]}
          />

        </div>
      </div>
    </div>
  )
}
