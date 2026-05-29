import { useState, useMemo, useRef } from 'react'
import { TopBar, Table, Modal, ThumbnailItem, Card, Avatar, Input } from 'ax-arc-prototyping'
import { EmptyState } from '@/components/ui/empty-state'
import type { ColumnDef } from 'ax-arc-prototyping'
import { Button, IconButton } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const UNIT_COLUMNS: ColumnDef<QualUnit>[] = [
  {
    accessorKey: 'name',
    header: 'Unit',
    cell: ({ row }) => (
      <div className="ms-units-cell">
        <span className="ms-units-name">{row.original.name}</span>
        <span className="ms-units-subline">{row.original.subline}</span>
      </div>
    ),
  },
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
      <Table
        data={filtered}
        columns={UNIT_COLUMNS}
        selectable={false}
        pageSize={20}
        pageSizeOptions={[10, 20, 50]}
      />
    </div>
  )
}

const ILLUS_BG = 'https://www.figma.com/api/mcp/asset/9f8df2a7-3791-4061-a185-0200a7bea328'
const ILLUS_FG = 'https://www.figma.com/api/mcp/asset/77a3cb7b-1446-4b56-af53-21aec6c01bf1'

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
    <Card
      className={`ms-step-card ${collapsed ? 'ms-step-card--collapsed' : ''}`}
      onClick={collapsed ? onSelect : undefined}
    >
      <ThumbnailItem
        className={`ms-step-card-header ${isSelected ? 'ms-step-card-header--active' : ''}`}
        avatar={isSelected
          ? <Avatar mode="initials" initials={String(index)} shape="circle" theme="shadow" />
          : <div className="ms-step-num">{index}</div>
        }
        title={milestone.name}
        subline={`${milestone.units.length} unit${milestone.units.length !== 1 ? 's' : ''}`}
        rightSlot={milestone.units.length > 0 ? (
          <IconButton
            icon="icon-chevron-down"
            buttonStyle={false}
            size={20}
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onSelect() }}
          />
        ) : undefined}
      />
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
    </Card>
  )
}

interface UnitCardItemProps {
  unit: UnitCard
  expanded: boolean
  onToggle: () => void
  onRemove: () => void
  disabled?: boolean
}

function UnitCardItem({ unit, expanded, onRemove, disabled }: UnitCardItemProps) {
  const [open, setOpen] = useState(expanded)
  return (
    <Card className={`ms-unit-card ${open ? 'ms-unit-card--expanded' : ''}`}>
      <div className="ms-unit-card-header" onClick={() => setOpen(v => !v)}>
        <div className="ms-unit-card-header-text">
          <span className="ms-unit-name">{unit.name}</span>
          <span className="ms-unit-criteria">{unit.criteriaCount} criteria</span>
        </div>
        {!disabled && (
          <IconButton
            icon="icon-bin"
            size={20}
            className="ms-unit-remove-btn"
            onClick={e => { e.stopPropagation(); onRemove() }}
          />
        )}
        <i className="ms-unit-chevron icon-chevron-down" />
      </div>
      {open && (
        <div className="ms-unit-card-body">
          <div className="ms-unit-section">
            <span className="ms-unit-section-label">Required hours</span>
            <div className="ms-unit-items-box">
              <ThumbnailItem
                className="ms-unit-item"
                avatar={<Avatar mode="icon" icon={<i className="icon-calendar-outline" />} shape="square" theme="flat" />}
                title="Total unit hours"
                subline={`${unit.requiredHours} hrs`}
              />
            </div>
          </div>
          {unit.activities.length > 0 && (
            <div className="ms-unit-section">
              <span className="ms-unit-section-label">Activities</span>
              <div className="ms-unit-items-box">
                {unit.activities.map(activity => (
                  <ThumbnailItem
                    key={activity.id}
                    className="ms-unit-item"
                    avatar={<Avatar mode="icon" icon={<i className={activity.type === 'time' ? 'icon-calendar-outline' : 'icon-shapes-types-categories'} />} shape="square" theme="flat" />}
                    title={activity.title}
                    subline={activity.metric}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}


// ─── Unit Search Input ────────────────────────────────────────────────────────

interface UnitSearchInputProps {
  milestoneUnitIds: Set<string>
  onAddUnit: (unit: QualUnit) => void
}

function UnitSearchInput({ milestoneUnitIds, onAddUnit }: UnitSearchInputProps) {
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return []
    return SEED_QUAL_UNITS.filter(u =>
      !milestoneUnitIds.has(u.id) &&
      (u.name.toLowerCase().includes(q) || u.subline.toLowerCase().includes(q))
    )
  }, [search, milestoneUnitIds])

  const showResults = focused && results.length > 0

  return (
    <div className="ms-unit-search">
      <Input
        ref={inputRef}
        leftIcon={<i className="icon-contact-user-search-people" />}
        placeholder="Search units to add"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
      />
      {showResults && (
        <div className="ms-unit-search-results">
          {results.map(unit => (
            <button
              key={unit.id}
              type="button"
              className="ms-unit-search-result"
              onMouseDown={e => { e.preventDefault(); onAddUnit(unit); setSearch(''); inputRef.current?.blur() }}
            >
              <span className="ms-unit-search-result-name">{unit.name}</span>
              <span className="ms-unit-search-result-sub">{unit.subline}</span>
            </button>
          ))}
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
    <Modal
      open={true}
      onClose={onCancel}
      title={`Publish Version ${version}`}
      primaryLabel="Publish"
      onPrimary={() => { if (note.trim()) onPublish(note) }}
      secondaryLabel="Cancel"
      onSecondary={onCancel}
      width={600}
    >
      <div className="ax-info-block ax-info-block--info ax-info-block--multi">
        <i className="ax-info-block-icon icon-info-outline" aria-hidden="true" />
        <div className="ax-info-block-content">
          <p className="ax-info-block-title">Publishing a new qualification configuration version</p>
          <ul className="ms-publish-info-list">
            <li>Future placements will automatically use the latest version</li>
            <li>Any placements in an <strong>In Progress, Completed</strong> or <strong>Cancelled</strong> state on this qualification will remain on the version they started on</li>
            <li>Any placements in a <strong>Not Started</strong> state will start on the latest version with their 1st attempt</li>
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
    </Modal>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MilestonesConfigPage() {
  const _nextId = useRef(0)
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
    setSelectedId(prev => prev === id ? null : id)
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
    const newId = `m${++_nextId.current}`
    const newMs: Milestone = { id: newId, name: 'Untitled milestone', activeUnitId: null, units: [] }
    setMilestones(prev => [...prev, newMs])
    setSelectedId(newId)
    setActiveUnitIds(prev => ({ ...prev, [newId]: null }))
  }

  function addUnitToMilestone(milestoneId: string, qualUnit: QualUnit) {
    const newUnit: UnitCard = { id: qualUnit.id, name: qualUnit.name, criteriaCount: 0, requiredHours: 0, activities: [] }
    setMilestones(prev => prev.map(m =>
      m.id === milestoneId ? { ...m, units: [...m.units, newUnit] } : m
    ))
  }

  function removeUnitFromMilestone(milestoneId: string, unitId: string) {
    setMilestones(prev => prev.map(m =>
      m.id === milestoneId ? { ...m, units: m.units.filter(u => u.id !== unitId) } : m
    ))
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
                  <ThumbnailItem
                    className="ms-context-header"
                    avatar={<Avatar mode="initials" initials={String(selectedIdx + 1)} shape="circle" theme="shadow" />}
                    title={selected.name}
                    subline={`${selected.units.length} unit${selected.units.length !== 1 ? 's' : ''}`}
                    rightSlot={
                      <div className="ms-context-actions">
                        <IconButton icon="icon-settings1" size={20} disabled={versionStatus === 'published'} />
                        <IconButton icon="icon-bin" size={20} disabled={versionStatus === 'published'} onClick={() => removeMilestone(selected.id)} />
                      </div>
                    }
                  />

                  {/* Milestone card */}
                  <Card className="ms-milestone-card" gap="250">
                    {selected.units.length > 0 ? (
                      <>
                        {selected.units.map((unit, i) => (
                          <UnitCardItem
                            key={unit.id}
                            unit={unit}
                            expanded={i === 0 || activeUnitId === unit.id}
                            onToggle={() => selectUnit(selected.id, unit.id)}
                            onRemove={() => removeUnitFromMilestone(selected.id, unit.id)}
                            disabled={versionStatus === 'published'}
                          />
                        ))}
                        {versionStatus === 'published' ? (
                          <Tooltip content="Create a new version to edit" side="top">
                            <span className="ms-tooltip-wrap">
                              <Button variant="outline" disabled leftIcon={<i className="ax-icon icon-add" />}>
                                Add unit
                              </Button>
                            </span>
                          </Tooltip>
                        ) : (
                          <UnitSearchInput
                            milestoneUnitIds={new Set(selected.units.map(u => u.id))}
                            onAddUnit={u => addUnitToMilestone(selected.id, u)}
                          />
                        )}
                      </>
                    ) : (
                      <div className="ms-milestone-no-units">
                        <EmptyState
                          illustration={false}
                          icon
                          iconName="add"
                          mainLine="Begin by adding a unit to your milestone"
                          subtitle="Milestones are groups of units and their criteria for your learner to complete as part of their placement"
                          primary={false}
                          secondary={false}
                        />
                        <UnitSearchInput
                          milestoneUnitIds={new Set(selected.units.map(u => u.id))}
                          onAddUnit={u => addUnitToMilestone(selected.id, u)}
                        />
                      </div>
                    )}
                  </Card>

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
