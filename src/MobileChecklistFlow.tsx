import { useState, type ReactNode } from 'react'

type MainScreen = 'overview' | 'checklist' | 'item'

const ITEMS = [
  { id: 1, text: 'Confirm food production requirements from standard recipes', section: 0 },
  { id: 2, text: 'Calculate ingredient amounts according to requirements', section: 0 },
  { id: 3, text: 'Select type and size of equipment suitable to requirements', section: 1 },
  { id: 4, text: 'Use equipment safely and hygienically according to manufacturer instructions', section: 1 },
  { id: 5, text: 'Safely assemble and ensure cleanliness of equipment before use', section: 1 },
  { id: 6, text: 'Season and prepare ingredients using appropriate flavourings', section: 2 },
  { id: 7, text: 'Weigh and measure ingredients and create portions according to recipe', section: 2 },
  { id: 8, text: 'Prepare, cut and portion ingredients according to recipe and cooking style', section: 2 },
]

const SECTIONS = [
  'Select ingredients',
  'Select, prepare and use equipment',
  'Portion and prepare ingredients',
]

const ITEM_NOTES: Record<number, { author: string; time: string; text: string }> = {
  1: {
    author: 'Julian Bradford',
    time: '19 Mar 26, 10:56 AM',
    text: 'The student got this question technically correct but their answer was not one of our alternatives in the gap text question setup',
  },
}

function Dot() {
  return <span className="ax-mobile-dot" />
}

function MobileHeader({
  plain,
  title,
  subtitle,
  onBack,
}: {
  plain?: boolean
  title: string
  subtitle?: ReactNode
  onBack?: () => void
}) {
  return (
    <div className={`ax-mobile-header${plain ? ' ax-mobile-header--plain' : ''}`}>
      {onBack && (
        <button className="ax-mobile-back-btn" aria-label="Go back" onClick={onBack}>
          <i className="icon-arrow-right-short ax-mobile-back-icon" />
        </button>
      )}
      <div className="ax-mobile-header-text">
        <span className="ax-mobile-header-title">{title}</span>
        {subtitle && <div className="ax-mobile-header-subtitle">{subtitle}</div>}
      </div>
    </div>
  )
}

function ItemStrip({
  achievedItems,
  currentItem,
  onSelect,
}: {
  achievedItems: Set<number>
  currentItem: number
  onSelect: (id: number) => void
}) {
  return (
    <div className="ax-mobile-item-strip">
      {ITEMS.map(item => {
        const achieved = achievedItems.has(item.id)
        const isCurrent = item.id === currentItem
        return (
          <button
            key={item.id}
            className={`ax-mobile-strip-cell${isCurrent ? ' ax-mobile-strip-cell--current' : ''}`}
            onClick={() => onSelect(item.id)}
            aria-label={`Item ${item.id}`}
          >
            <span className={`ax-mobile-strip-num${achieved ? ' ax-mobile-strip-num--achieved' : ''}`}>
              {item.id}
            </span>
            {achieved && <i className="icon-checkbox-checked ax-mobile-strip-tick" />}
          </button>
        )
      })}
    </div>
  )
}

function ItemActionBar({
  achieved,
  onMarkAchieved,
  onMarkNYA,
}: {
  achieved: boolean
  onMarkAchieved: () => void
  onMarkNYA: () => void
}) {
  return (
    <div className="ax-mobile-action-bar">
      <div className="ax-mobile-action-icons">
        <button className="ax-mobile-action-icon-btn" aria-label="Add attachment">
          <i className="icon-note-outline" />
        </button>
        <button className="ax-mobile-action-icon-btn" aria-label="Add photo">
          <i className="icon-image" />
        </button>
        <button className="ax-mobile-action-icon-btn" aria-label="Add comment">
          <i className="icon-text" />
        </button>
      </div>
      <div className="ax-mobile-assess-btns">
        <button
          className={`ax-mobile-assess-btn${!achieved ? ' ax-mobile-assess-btn--nya' : ''}`}
          onClick={onMarkNYA}
        >
          <i className="icon-radio-button-checked" />
          Not yet achieved
        </button>
        <button
          className={`ax-mobile-assess-btn${achieved ? ' ax-mobile-assess-btn--achieved' : ''}`}
          onClick={onMarkAchieved}
        >
          <i className="icon-checkbox-checked" />
          Achieved
        </button>
      </div>
    </div>
  )
}

// ─── Screen: Milestone Overview ───────────────────────────────────────────────

function ScreenOverview({ onViewChecklist }: { onViewChecklist: () => void }) {
  return (
    <>
      <MobileHeader
        title="Milestone 3 - Japanese Cuisine"
        subtitle={<><span>In progress</span><Dot /><span>2 units</span></>}
      />
      <div className="ax-mobile-content">
        <div className="ax-mobile-section">
          <p className="ax-mobile-section-title">Milestone checklist</p>
          <button
            className="ax-mobile-list-item ax-mobile-list-item--btn"
            onClick={onViewChecklist}
          >
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Practical Japanese Cooking Techniques</p>
              <div className="ax-mobile-list-item-meta">
                <span>5 sections</span>
                <Dot />
                <span>Not started</span>
              </div>
            </div>
            <i className="icon-arrow-right-short ax-mobile-list-arrow" />
          </button>
        </div>

        <div className="ax-mobile-section">
          <p className="ax-mobile-section-title">SITHC1016 - Japanese culinary skills</p>
          <div className="ax-mobile-status-block">
            <i className="icon-checkbox-checked ax-mobile-status-icon" />
            <span className="ax-mobile-status-text">4/4 required hours</span>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail ax-mobile-thumbnail--image" />
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Prepare dashi stock from scratch</p>
              <div className="ax-mobile-list-item-meta"><span>0/10 reps</span></div>
            </div>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail">
              <i className="icon-activities-tasks-list ax-mobile-thumbnail-icon" />
            </div>
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Practical Japanese Cooking Techniques</p>
              <div className="ax-mobile-list-item-meta">
                <span>Unit checklist</span><Dot /><span>Not started</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ax-mobile-section">
          <p className="ax-mobile-section-title">SITHCCC0011 - Italian Cooking Techniques</p>
          <div className="ax-mobile-status-block">
            <i className="icon-checkbox-checked ax-mobile-status-icon" />
            <span className="ax-mobile-status-text">4/4 required hours</span>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail ax-mobile-thumbnail--image" />
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Identify key ingredients in a virtual pantry</p>
              <div className="ax-mobile-list-item-meta"><span>0/10 reps</span></div>
            </div>
          </div>
          <div className="ax-mobile-list-item">
            <div className="ax-mobile-thumbnail ax-mobile-thumbnail--image" />
            <div className="ax-mobile-list-item-text">
              <p className="ax-mobile-list-item-title">Plate sashimi using traditional styles</p>
              <div className="ax-mobile-list-item-meta">
                <span>Unit checklist</span><Dot /><span>Not started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Screen: Checklist ────────────────────────────────────────────────────────

function ScreenChecklist({
  achievedItems,
  onToggleAchieved,
  onMarkAllAchieved,
  onViewItem,
  onBack,
}: {
  achievedItems: Set<number>
  onToggleAchieved: (id: number) => void
  onMarkAllAchieved: () => void
  onViewItem: (id: number) => void
  onBack: () => void
}) {
  const count = achievedItems.size
  const status =
    count === 0 ? 'Not started' :
    count === ITEMS.length ? 'Complete' :
    'In progress'

  return (
    <>
      <MobileHeader
        plain
        title="Practical Japanese Cooking Techniques"
        subtitle={<><span>{status}</span><Dot /><span>Milestone checklist</span></>}
        onBack={onBack}
      />
      <div className="ax-mobile-body">
        <div className="ax-mobile-cl-list">
          {SECTIONS.map((section, sectionIdx) => (
            <div key={section}>
              <div className="ax-mobile-cl-section-header">{section}</div>
              {ITEMS.filter(item => item.section === sectionIdx).map(item => {
                const isAchieved = achievedItems.has(item.id)
                return (
                  <div key={item.id} className="ax-mobile-cl-item">
                    <span className="ax-mobile-cl-item-text">{item.id}. {item.text}</span>
                    <div className="ax-mobile-cl-item-btns">
                      <button
                        className="ax-mobile-cl-icon-btn"
                        aria-label="Edit"
                        onClick={() => onViewItem(item.id)}
                      >
                        <i className="icon-edit-outline" />
                      </button>
                      <button
                        className={`ax-mobile-cl-icon-btn${isAchieved ? ' ax-mobile-cl-icon-btn--achieved' : ''}`}
                        aria-label={isAchieved ? 'Unmark achieved' : 'Mark as achieved'}
                        onClick={() => onToggleAchieved(item.id)}
                      >
                        <i className="icon-checkbox-checked" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="ax-mobile-cl-footer">
          <button className="ax-mobile-cl-mark-btn" onClick={onMarkAllAchieved}>
            <i className="icon-checkbox-checked" />
            Mark all as Achieved
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Screen: Item Detail ──────────────────────────────────────────────────────

function ScreenItemDetail({
  itemId,
  achievedItems,
  onSelectItem,
  onMarkAchieved,
  onMarkNYA,
  onBack,
}: {
  itemId: number
  achievedItems: Set<number>
  onSelectItem: (id: number) => void
  onMarkAchieved: (id: number) => void
  onMarkNYA: (id: number) => void
  onBack: () => void
}) {
  const item = ITEMS.find(i => i.id === itemId)!
  const isAchieved = achievedItems.has(itemId)
  const note = ITEM_NOTES[itemId]

  return (
    <>
      <MobileHeader plain title="View checklist item" onBack={onBack} />
      <div className="ax-mobile-body">
        <ItemStrip achievedItems={achievedItems} currentItem={itemId} onSelect={onSelectItem} />
        <div className="ax-mobile-item-row">
          <span className="ax-mobile-item-badge">{itemId}</span>
          <span className="ax-mobile-item-label">{item.text}</span>
        </div>
        <div className="ax-mobile-item-scroll">
          {note ? (
            <div className="ax-mobile-notes-wrap">
              <p className="ax-mobile-notes-label">Notes</p>
              <div className="ax-mobile-note">
                <div className="ax-mobile-note-avatar">
                  <i className="icon-portrait-card-view" />
                </div>
                <div className="ax-mobile-note-content">
                  <div className="ax-mobile-note-header">
                    <div className="ax-mobile-note-meta">
                      <span className="ax-mobile-note-name">{note.author}</span>
                      <span className="ax-mobile-note-time">{note.time}</span>
                    </div>
                    <button className="ax-mobile-action-icon-btn" aria-label="More options">
                      <i className="icon-chevron-down" />
                    </button>
                  </div>
                  <p className="ax-mobile-note-body">{note.text}</p>
                  <div className="ax-mobile-note-photos">
                    <div className="ax-mobile-note-photo" />
                    <div className="ax-mobile-note-photo" />
                    <div className="ax-mobile-note-photo" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="ax-mobile-empty-state">
              <div className="ax-mobile-empty-icon">
                <i className="icon-info-outline" />
              </div>
              <p className="ax-mobile-empty-title">Add a note or attach evidence</p>
              <p className="ax-mobile-empty-desc">
                You can include photos and videos, or add a comment as text
              </p>
            </div>
          )}
        </div>
        <ItemActionBar
          achieved={isAchieved}
          onMarkAchieved={() => onMarkAchieved(itemId)}
          onMarkNYA={() => onMarkNYA(itemId)}
        />
      </div>
    </>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function MobileChecklistFlow() {
  const [screen, setScreen] = useState<MainScreen>('overview')
  const [currentItemId, setCurrentItemId] = useState(1)
  const [achievedItems, setAchievedItems] = useState<Set<number>>(new Set())

  function toggleAchieved(id: number) {
    setAchievedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function markAchieved(id: number) {
    setAchievedItems(prev => new Set([...prev, id]))
  }

  function unmarkAchieved(id: number) {
    setAchievedItems(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function viewItem(id: number) {
    setCurrentItemId(id)
    setScreen('item')
  }

  return (
    <div className="ax-mobile-preview">
      <div className="ax-mobile-screen">
        {screen === 'overview' && (
          <ScreenOverview onViewChecklist={() => setScreen('checklist')} />
        )}
        {screen === 'checklist' && (
          <ScreenChecklist
            achievedItems={achievedItems}
            onToggleAchieved={toggleAchieved}
            onMarkAllAchieved={() => setAchievedItems(new Set(ITEMS.map(i => i.id)))}
            onViewItem={viewItem}
            onBack={() => setScreen('overview')}
          />
        )}
        {screen === 'item' && (
          <ScreenItemDetail
            itemId={currentItemId}
            achievedItems={achievedItems}
            onSelectItem={setCurrentItemId}
            onMarkAchieved={markAchieved}
            onMarkNYA={unmarkAchieved}
            onBack={() => setScreen('checklist')}
          />
        )}
      </div>
    </div>
  )
}
