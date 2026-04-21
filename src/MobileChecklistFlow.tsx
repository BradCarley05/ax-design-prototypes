import { useState, type ReactNode } from 'react'
import { ThumbnailItem } from '@/components/ui/thumbnail-item'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Note {
  id: number
  author: string
  time: string
  text: string
}

type MainScreen = 'overview' | 'checklist' | 'item'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date: Date): string {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const h = date.getHours()
  const m = String(date.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${date.getDate()} ${months[date.getMonth()]} ${String(date.getFullYear()).slice(2)}, ${h % 12 || 12}:${m} ${ampm}`
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const INITIAL_NOTES: Record<number, Note[]> = {
  1: [{
    id: 1,
    author: 'Julian Bradford',
    time: '19 Mar 26, 10:56 AM',
    text: 'The student got this question technically correct but their answer was not one of our alternatives in the gap text question setup',
  }],
}

// ─── Icon components ──────────────────────────────────────────────────────────

function TickIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.1453 4.58477C17.635 5.12313 17.6152 5.97522 17.101 6.48795L8.10098 15.4623C7.59563 15.9662 6.79861 15.956 6.30515 15.4394L2.87658 11.8496C2.37447 11.3239 2.37447 10.4716 2.87658 9.94589C3.37868 9.42018 4.19275 9.42018 4.69485 9.94589L7.23619 12.6067L15.3276 4.53835C15.8418 4.02562 16.6556 4.0464 17.1453 4.58477Z" fill="currentColor"/>
    </svg>
  )
}

function OverflowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="9" r="1.5" fill="currentColor"/>
    </svg>
  )
}

// ─── Shared components ────────────────────────────────────────────────────────

function Dot() {
  return <span className="ax-mobile-dot" />
}

function MobileHeader({
  plain, title, subtitle, onBack,
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
  achievedItems, currentItem, onSelect,
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
            {achieved && <span className="ax-mobile-strip-tick"><TickIcon size={12} /></span>}
          </button>
        )
      })}
    </div>
  )
}

function ItemActionBar({
  achieved, onMarkAchieved, onMarkNYA, onOpenNote,
}: {
  achieved: boolean
  onMarkAchieved: () => void
  onMarkNYA: () => void
  onOpenNote: () => void
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
        <button className="ax-mobile-action-icon-btn" aria-label="Add comment" onClick={onOpenNote}>
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
          <TickIcon size={18} />
          Achieved
        </button>
      </div>
    </div>
  )
}

// ─── Note Modal ───────────────────────────────────────────────────────────────

function NoteModal({
  initialText, isEdit, onSave, onClose,
}: {
  initialText?: string
  isEdit?: boolean
  onSave: (text: string) => void
  onClose: () => void
}) {
  const [text, setText] = useState(initialText ?? '')

  return (
    <div className="ax-mobile-note-modal" onClick={onClose}>
      <div className="ax-mobile-note-modal-sheet" onClick={e => e.stopPropagation()}>
        <p className="ax-mobile-note-modal-title">{isEdit ? 'Edit Note' : 'New Note'}</p>
        <textarea
          className="ax-mobile-note-modal-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a note..."
          autoFocus
        />
        <div className="ax-mobile-note-modal-photos">
          <div className="ax-mobile-note-modal-photo">
            <button className="ax-mobile-note-modal-remove" aria-label="Remove">×</button>
          </div>
          <div className="ax-mobile-note-modal-photo">
            <button className="ax-mobile-note-modal-remove" aria-label="Remove">×</button>
          </div>
          <div className="ax-mobile-note-modal-photo">
            <button className="ax-mobile-note-modal-remove" aria-label="Remove">×</button>
          </div>
        </div>
        <div className="ax-mobile-note-modal-toolbar">
          <div className="ax-mobile-action-icons">
            <button className="ax-mobile-action-icon-btn" aria-label="Take photo">
              <i className="icon-image" />
            </button>
            <button className="ax-mobile-action-icon-btn" aria-label="Gallery">
              <i className="icon-portrait-card-view" />
            </button>
            <button className="ax-mobile-action-icon-btn" aria-label="Attach file">
              <i className="icon-note-outline" />
            </button>
          </div>
          <button
            className="ax-mobile-note-modal-save"
            onClick={() => { if (text.trim()) onSave(text.trim()) }}
          >
            Save Note
          </button>
        </div>
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
            <span className="ax-mobile-status-icon"><TickIcon /></span>
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
            <span className="ax-mobile-status-icon"><TickIcon /></span>
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
  achievedItems, onToggleAchieved, onMarkAllAchieved, onViewItem, onBack,
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
                        <TickIcon />
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
            <TickIcon />
            Mark all as Achieved
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Screen: Item Detail ──────────────────────────────────────────────────────

function ScreenItemDetail({
  itemId, achievedItems, notes,
  onSelectItem, onMarkAchieved, onMarkNYA,
  onAddNote, onEditNote, onDeleteNote, onBack,
}: {
  itemId: number
  achievedItems: Set<number>
  notes: Note[]
  onSelectItem: (id: number) => void
  onMarkAchieved: (id: number) => void
  onMarkNYA: (id: number) => void
  onAddNote: (itemId: number, text: string) => void
  onEditNote: (itemId: number, noteId: number, text: string) => void
  onDeleteNote: (itemId: number, noteId: number) => void
  onBack: () => void
}) {
  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const item = ITEMS.find(i => i.id === itemId)!
  const isAchieved = achievedItems.has(itemId)

  function handleSaveNote(text: string) {
    if (editingNote) {
      onEditNote(itemId, editingNote.id, text)
    } else {
      onAddNote(itemId, text)
    }
    setShowModal(false)
    setEditingNote(null)
  }

  function openEdit(note: Note) {
    setEditingNote(note)
    setOpenMenuId(null)
    setShowModal(true)
  }

  return (
    <>
      <MobileHeader plain title="View checklist item" onBack={onBack} />
      <div className="ax-mobile-body" onClick={() => setOpenMenuId(null)}>
        <ItemStrip achievedItems={achievedItems} currentItem={itemId} onSelect={onSelectItem} />
        <div className="ax-mobile-item-row">
          <span className="ax-mobile-item-badge">{itemId}</span>
          <span className="ax-mobile-item-label">{item.text}</span>
        </div>
        <div className="ax-mobile-item-scroll">
          {notes.length > 0 ? (
            <div className="ax-mobile-notes-wrap">
              <p className="ax-mobile-notes-label">Notes</p>
              {notes.map(note => (
                <div key={note.id} className="ax-mobile-note">
                  <div className="ax-mobile-note-content">
                    <ThumbnailItem
                      avatar={
                        <div className="ax-mobile-note-avatar">
                          <i className="icon-portrait-card-view" />
                        </div>
                      }
                      title={note.author}
                      subline={note.time}
                      rightSlot={
                        <div className="ax-mobile-note-ctx-wrap">
                          <button
                            className="ax-mobile-action-icon-btn"
                            aria-label="More options"
                            onClick={e => {
                              e.stopPropagation()
                              setOpenMenuId(openMenuId === note.id ? null : note.id)
                            }}
                          >
                            <OverflowIcon />
                          </button>
                          {openMenuId === note.id && (
                            <div className="ax-mobile-note-ctx-menu">
                              <button
                                className="ax-mobile-note-ctx-item"
                                onClick={e => { e.stopPropagation(); openEdit(note) }}
                              >
                                Edit note
                              </button>
                              <button
                                className="ax-mobile-note-ctx-item ax-mobile-note-ctx-item--danger"
                                onClick={e => {
                                  e.stopPropagation()
                                  onDeleteNote(itemId, note.id)
                                  setOpenMenuId(null)
                                }}
                              >
                                Delete note
                              </button>
                            </div>
                          )}
                        </div>
                      }
                    />
                    <p className="ax-mobile-note-body">{note.text}</p>
                    <div className="ax-mobile-note-photos">
                      <div className="ax-mobile-note-photo" />
                      <div className="ax-mobile-note-photo" />
                      <div className="ax-mobile-note-photo" />
                    </div>
                  </div>
                </div>
              ))}
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
          onOpenNote={() => { setEditingNote(null); setShowModal(true) }}
        />
      </div>
      {showModal && (
        <NoteModal
          initialText={editingNote?.text}
          isEdit={!!editingNote}
          onSave={handleSaveNote}
          onClose={() => { setShowModal(false); setEditingNote(null) }}
        />
      )}
    </>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function MobileChecklistFlow() {
  const [screen, setScreen] = useState<MainScreen>('overview')
  const [currentItemId, setCurrentItemId] = useState(1)
  const [achievedItems, setAchievedItems] = useState<Set<number>>(new Set())
  const [notes, setNotes] = useState<Record<number, Note[]>>(INITIAL_NOTES)

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

  function addNote(itemId: number, text: string) {
    setNotes(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] ?? []), {
        id: Date.now(),
        author: 'You',
        time: formatTime(new Date()),
        text,
      }],
    }))
  }

  function editNote(itemId: number, noteId: number, text: string) {
    setNotes(prev => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).map(n => n.id === noteId ? { ...n, text } : n),
    }))
  }

  function deleteNote(itemId: number, noteId: number) {
    setNotes(prev => ({
      ...prev,
      [itemId]: (prev[itemId] ?? []).filter(n => n.id !== noteId),
    }))
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
            notes={notes[currentItemId] ?? []}
            onSelectItem={setCurrentItemId}
            onMarkAchieved={markAchieved}
            onMarkNYA={unmarkAchieved}
            onAddNote={addNote}
            onEditNote={editNote}
            onDeleteNote={deleteNote}
            onBack={() => setScreen('checklist')}
          />
        )}
      </div>
    </div>
  )
}
