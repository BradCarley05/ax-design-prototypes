import { useState, useMemo } from 'react'
import { TopBar } from 'ax-arc-prototyping'
import { Button, IconButton } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar } from '@/components/ui/avatar'
import { Tooltip } from '@/components/ui/tooltip'
import { StatusChip } from '@/components/ui/status-chip'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Activity {
  id: string
  title: string
  metric: string
  type: 'time' | 'activity'
}

interface UnitCard {
  id: string
  name: string
  criteriaCount: number
  requiredHours: number
  activities: Activity[]
}

interface Milestone {
  id: string
  name: string
  activeUnitId: string | null
  units: UnitCard[]
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const SEED_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    name: 'Your team',
    activeUnitId: 'u1',
    units: [
      {
        id: 'u1',
        name: 'SITHC1016 - Japanese cooking',
        criteriaCount: 3,
        requiredHours: 40,
        activities: [
          { id: 'a1', title: 'Prepare pizza',  metric: '15 reps', type: 'activity' },
          { id: 'a2', title: 'Prepare pasta',  metric: '20 hrs',  type: 'time'     },
        ],
      },
      {
        id: 'u2',
        name: 'SITHCCC0011 - Italian cooking',
        criteriaCount: 2,
        requiredHours: 30,
        activities: [],
      },
    ],
  },
  {
    id: 'm2',
    name: 'Advanced skills',
    activeUnitId: 'u3',
    units: [
      {
        id: 'u3',
        name: 'SITHC1016 - Japanese cooking',
        criteriaCount: 3,
        requiredHours: 40,
        activities: [
          { id: 'a3', title: 'Prepare sushi', metric: '10 reps', type: 'activity' },
        ],
      },
    ],
  },
]

interface QualUnit {
  id: string
  name: string
  subline: string
}

const SEED_QUAL_UNITS: QualUnit[] = [
  { id: 'qu1',  name: 'General Activities',                    subline: 'Non-Unit Related Activities'               },
  { id: 'qu2',  name: 'SITHCCC023',                            subline: 'Use food preparation equipment'            },
  { id: 'qu3',  name: 'SITHCCC028',                            subline: 'Prepare dishes using basic methods of cookery' },
  { id: 'qu4',  name: 'SITHCCC029',                            subline: 'Prepare stocks, sauces and soups'          },
  { id: 'qu5',  name: 'SITHCCC030',                            subline: 'Prepare vegetable, fruit, egg and farinaceous dishes' },
  { id: 'qu6',  name: 'SITHCCC031',                            subline: 'Prepare poultry dishes'                    },
  { id: 'qu7',  name: 'SITHCCC035',                            subline: 'Prepare meat dishes'                       },
  { id: 'qu8',  name: 'SITHCCC036',                            subline: 'Prepare seafood dishes'                    },
  { id: 'qu9',  name: 'SITHCCC040',                            subline: 'Prepare and serve cheese'                  },
  { id: 'qu10', name: 'SITHPAT016',                            subline: 'Produce desserts'                          },
  { id: 'qu11', name: 'SITXFSA005',                            subline: 'Use hygienic practices for food safety'    },
  { id: 'qu12', name: 'SITXFSA006',                            subline: 'Participate in safe food handling practices' },
]

function UnitsTab({ units }: { units: QualUnit[] }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return units
    return units.filter(u =>
      u.name.toLowerCase().includes(q) || u.subline.toLowerCase().includes(q)
    )
  }, [units, search])

  return (
    <div className="ms-units-tab">
      <div className="ms-units-controls">
        <div className="ms-units-search">
          <i className="icon-contact-user-search-people ms-units-search-icon" aria-hidden="true" />
          <input
            className="ms-units-search-input"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="ms-units-table-wrap">
        <div className="ms-units-table-header">
          <span className="ms-units-col-label">Unit</span>
        </div>

        {filtered.length === 0 ? (
          <div className="ms-units-empty">
            <i className="icon-contact-user-search-people ms-units-empty-icon" aria-hidden="true" />
            <p className="ms-units-empty-title">We couldn't find any results</p>
            <p className="ms-units-empty-sub">Try removing or adjusting filters or search criteria</p>
          </div>
        ) : (
          filtered.map(unit => (
            <div key={unit.id} className="ms-units-row">
              <div className="ms-units-cell">
                <span className="ms-units-name">{unit.name}</span>
                <span className="ms-units-subline">{unit.subline}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <div className="ms-units-footer">
          <span className="ms-units-count">1–{filtered.length} of {filtered.length}</span>
        </div>
      )}
    </div>
  )
}

const ILLUS_BG = 'https://www.figma.com/api/mcp/asset/9f8df2a7-3791-4061-a185-0200a7bea328'
const ILLUS_FG = 'https://www.figma.com/api/mcp/asset/77a3cb7b-1446-4b56-af53-21aec6c01bf1'

let _nextId = 3

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StepCardProps {
  index: number
  milestone: Milestone
  isSelected: boolean
  activeUnitId: string | null
  onSelect: () => void
  onUnitSelect: (unitId: string) => void
}

function StepCard({ index, milestone, isSelected, activeUnitId, onSelect, onUnitSelect }: StepCardProps) {
  const collapsed = !isSelected
  return (
    <div
      className={`ms-step-card ${collapsed ? 'ms-step-card--collapsed' : ''}`}
      onClick={collapsed ? onSelect : undefined}
    >
      <div className="ms-step-card-header">
        <div className="ms-step-num">{index}</div>
        <div className="ms-step-info">
          <span className="ms-step-name">{milestone.name}</span>
          <span className="ms-step-units-count">{milestone.units.length} unit{milestone.units.length !== 1 ? 's' : ''}</span>
        </div>
        <IconButton
          icon="icon-chevron-down"
          buttonStyle={false}
          size={20}
          onClick={(e) => { e.stopPropagation(); onSelect() }}
        />
      </div>
      {!collapsed && milestone.units.length > 0 && (
        <div className="ms-step-nav">
          {milestone.units.map(unit => (
            <button
              key={unit.id}
              className={`ms-step-nav-item ${activeUnitId === unit.id ? 'ms-step-nav-item--active' : ''}`}
              onClick={(e) => { e.stopPropagation(); onUnitSelect(unit.id) }}
            >
              {unit.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface UnitCardItemProps {
  unit: UnitCard
  expanded: boolean
  onToggle: () => void
}

function UnitCardItem({ unit, expanded }: UnitCardItemProps) {
  const [open, setOpen] = useState(expanded)
  return (
    <div className={`ms-unit-card ${open ? 'ms-unit-card--expanded' : ''}`}>
      <div className="ms-unit-card-header" onClick={() => setOpen(v => !v)}>
        <div className="ms-unit-card-header-text">
          <span className="ms-unit-name">{unit.name}</span>
          <span className="ms-unit-criteria">{unit.criteriaCount} criteria</span>
        </div>
        <i className={`ms-unit-chevron icon-chevron-down`} />
      </div>
      {open && (
        <div className="ms-unit-card-body">
          {/* Required hours */}
          <div className="ms-unit-section">
            <span className="ms-unit-section-label">Required hours</span>
            <div className="ms-unit-items-box">
              <div className="ms-unit-item">
                <div className="ms-unit-item-avatar">
                  <i className="icon-calendar-outline" />
                </div>
                <div className="ms-unit-item-text">
                  <span className="ms-unit-item-title">Total unit hours</span>
                  <span className="ms-unit-item-meta">{unit.requiredHours} hrs</span>
                </div>
              </div>
            </div>
          </div>
          {/* Activities */}
          {unit.activities.length > 0 && (
            <div className="ms-unit-section">
              <span className="ms-unit-section-label">Activities</span>
              <div className="ms-unit-items-box">
                {unit.activities.map(activity => (
                  <div key={activity.id} className="ms-unit-item">
                    <div className="ms-unit-item-avatar">
                      <i className={activity.type === 'time' ? 'icon-calendar-outline' : 'icon-shapes-types-categories'} />
                    </div>
                    <div className="ms-unit-item-text">
                      <span className="ms-unit-item-title">{activity.title}</span>
                      <span className="ms-unit-item-meta">{activity.metric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


// ─── Publish Modal ────────────────────────────────────────────────────────────

interface PublishModalProps {
  version: string
  onCancel: () => void
  onPublish: (note: string) => void
}

function PublishModal({ version, onCancel, onPublish }: PublishModalProps) {
  const [note, setNote] = useState('')
  return (
    <div className="ms-modal-overlay">
      <div className="ms-modal">
        <div className="ms-modal-header">
          <span className="ms-modal-title">Publish Version {version}</span>
          <IconButton icon="icon-x-thick" buttonStyle={false} size={20} onClick={onCancel} />
        </div>
        <div className="ms-modal-body">
          <div className="ms-modal-info">
            <i className="icon-info-outline ms-modal-info-icon" />
            <div className="ms-modal-info-content">
              <span className="ms-modal-info-title">Publishing this version will:</span>
              <ul className="ms-modal-info-bullets">
                <li>Lock this configuration from further edits</li>
                <li>Make this version available in Learning Plans</li>
                <li>Allow 3rd-party reports to be generated</li>
              </ul>
            </div>
          </div>
          <div className="ms-modal-field">
            <label className="ms-modal-label">Changes made</label>
            <textarea
              className="ms-modal-textarea"
              placeholder="Summarise changes made in this version"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="ms-modal-footer">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="default" disabled={!note.trim()} onClick={() => onPublish(note)}>Publish</Button>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MilestonesConfigPage() {
  const [milestones, setMilestones]       = useState<Milestone[]>([])
  const [selectedId, setSelectedId]       = useState<string | null>(null)
  const [activeUnitIds, setActiveUnitIds] = useState<Record<string, string | null>>({})
  const [activeTab, setActiveTab]         = useState<'milestones' | 'units'>('milestones')
  const [versionStatus, setVersionStatus] = useState<'draft' | 'published'>('draft')
  const [currentVersion] = useState('1.0')
  const [showPublishModal, setShowPublishModal] = useState(false)

  const isEmpty   = milestones.length === 0
  const selected  = milestones.find(m => m.id === selectedId) ?? milestones[0] ?? null
  const selectedIdx = selected ? milestones.findIndex(m => m.id === selected.id) : 0

  function selectMilestone(id: string) {
    setSelectedId(id)
  }

  function selectUnit(milestoneId: string, unitId: string) {
    setActiveUnitIds(prev => ({ ...prev, [milestoneId]: unitId }))
  }

  function removeMilestone(id: string) {
    const remaining = milestones.filter(m => m.id !== id)
    setMilestones(remaining)
    if (selectedId === id) setSelectedId(remaining.length > 0 ? remaining[0].id : null)
  }

  function addMilestone() {
    if (milestones.length === 0) {
      setMilestones(SEED_MILESTONES)
      setSelectedId(SEED_MILESTONES[0].id)
      const ids: Record<string, string | null> = {}
      SEED_MILESTONES.forEach(m => { ids[m.id] = m.activeUnitId })
      setActiveUnitIds(ids)
    } else {
      const newId  = `m${++_nextId}`
      const newMs: Milestone = { id: newId, name: `Milestone ${_nextId}`, activeUnitId: null, units: [] }
      setMilestones(prev => [...prev, newMs])
      setSelectedId(newId)
      setActiveUnitIds(prev => ({ ...prev, [newId]: null }))
    }
  }

  const activeUnitId = selected ? (activeUnitIds[selected.id] ?? selected.activeUnitId) : null

  const versionSelect = (
    <Select value={`v${currentVersion}`}>
      <SelectTrigger leftIcon={<i className="icon-linking-type" aria-hidden="true" />}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={`v${currentVersion}`}>v{currentVersion}</SelectItem>
      </SelectContent>
    </Select>
  )

  const rightContent = (
    <div className="wbl-topbar-right">
      {versionStatus === 'draft' ? (
        <StatusChip type="base" icon>Draft</StatusChip>
      ) : (
        <StatusChip type="submitted" icon className="wbl-chip--published">Published</StatusChip>
      )}
      {versionSelect}
      {versionStatus === 'draft' ? (
        <Button
          variant="outline"
          leftIcon={<i className="icon-rocket-launch-publish" aria-hidden="true" />}
          onClick={() => setShowPublishModal(true)}
        >
          Publish v{currentVersion}
        </Button>
      ) : (
        <Button
          variant="outline"
          leftIcon={<i className="icon-add" aria-hidden="true" />}
          onClick={() => setVersionStatus('draft')}
        >
          New Criteria Version
        </Button>
      )}
    </div>
  )

  return (
    <div className="ms-page">

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div className="wbl-topbar-wrap">
        <TopBar
          leftContent={
            <button className="icon-btn icon-btn--base" aria-label="Back">
              <i className="icon-arrow-left" aria-hidden="true" />
            </button>
          }
          avatar={
            <div className="wbl-topbar-avatar">
              <i className="icon-book-outline" aria-hidden="true" />
            </div>
          }
          title="Certificate III in Commercial Cookery"
          subline="SIT30816"
          rightContent={rightContent}
        />
        <div className="wbl-tabs-row">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'milestones' | 'units')}>
            <TabsList>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="units">Units</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      {activeTab === 'units' ? (
        <UnitsTab units={SEED_QUAL_UNITS} />
      ) : isEmpty ? (

        /* Empty state */
        <div className="ms-empty">
          <div className="ms-illustration">
            <img src={ILLUS_BG} alt="" className="ms-illus-bg" />
            <img src={ILLUS_FG} alt="" className="ms-illus-fg" />
          </div>
          <div className="ms-empty-body">
            <p className="ms-empty-title">{`Configure milestones\nto track your learners progress`}</p>
            <div className="ms-empty-bullets">
              {[
                'Effortlessly track and monitor placement progress',
                'Create 3rd-party reports for your clients and supervisors',
                'Add milestones to Learning Plans to integrate with the Student Management System',
              ].map(text => (
                <div key={text} className="ms-empty-bullet">
                  <i className="icon-tick ms-bullet-tick" />
                  <span className="ms-bullet-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="default"
            leftIcon={<i className="ax-icon icon-add" />}
            onClick={addMilestone}
          >
            Add milestone
          </Button>
        </div>

      ) : (

        /* Filled state */
        <div className="ms-content">

          {/* Left panel */}
          <div className="ms-panel">
            <div className="ms-panel-body">
              {milestones.map((ms, idx) => (
                <StepCard
                  key={ms.id}
                  index={idx + 1}
                  milestone={ms}
                  isSelected={selected?.id === ms.id}
                  activeUnitId={activeUnitIds[ms.id] ?? ms.activeUnitId}
                  onSelect={() => selectMilestone(ms.id)}
                  onUnitSelect={(uid) => selectUnit(ms.id, uid)}
                />
              ))}
              {versionStatus === 'published' ? (
                <Tooltip content="Create a new version to edit" side="top">
                  <span className="ms-tooltip-wrap">
                    <Button variant="outline" disabled leftIcon={<i className="ax-icon icon-add" />}>
                      New milestone
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Button variant="outline" leftIcon={<i className="ax-icon icon-add" />} onClick={addMilestone}>
                  New milestone
                </Button>
              )}
            </div>
          </div>

          {/* Right content */}
          <div className="ms-main">
            {selected && (
              <div className="ms-right-scroll">
                <div className="ms-right-content">

                  {/* Context header */}
                  <div className="ms-context-header">
                    <Avatar mode="initials" initials={String(selectedIdx + 1)} shape="circle" theme="shadow" className="ms-context-num" />
                    <div className="ms-context-info">
                      <span className="ms-context-title">{selected.name}</span>
                      <span className="ms-context-sub">{selected.units.length} unit{selected.units.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="ms-context-actions">
                      <IconButton icon="icon-settings1" size={20} />
                      <IconButton icon="icon-bin" size={20} onClick={() => removeMilestone(selected.id)} />
                    </div>
                  </div>

                  {/* Milestone card */}
                  <div className="ms-milestone-card">
                    {selected.units.length > 0 ? (
                      <>
                        {selected.units.map((unit, i) => (
                          <UnitCardItem
                            key={unit.id}
                            unit={unit}
                            expanded={i === 0 || activeUnitId === unit.id}
                            onToggle={() => selectUnit(selected.id, unit.id)}
                          />
                        ))}
                        <div className="ms-add-unit-row">
                          <Button variant="outline" leftIcon={<i className="ax-icon icon-add" />}>
                            Add unit
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button variant="outline" leftIcon={<i className="ax-icon icon-add" />}>
                        Add unit
                      </Button>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {showPublishModal && (
        <PublishModal
          version={currentVersion}
          onCancel={() => setShowPublishModal(false)}
          onPublish={() => {
            setVersionStatus('published')
            setShowPublishModal(false)
          }}
        />
      )}

    </div>
  )
}
