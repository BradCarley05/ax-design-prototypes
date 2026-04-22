import { useState, useRef, useEffect, type RefObject } from 'react'
import { StatusChip } from '@/components/ui/status-chip'
import type { StatusChipType } from '@/components/ui/status-chip'

function InitialsAvatar({ initials, size = 36, border }: { initials: string; size?: number; border?: string }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      backgroundColor: 'var(--primary-200)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      fontSize: Math.max(9, Math.round(size * 0.36)),
      fontWeight: 600,
      color: 'var(--primary-900)',
      border: border ?? 'none',
      lineHeight: 1,
    }}>
      {initials}
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

type AssignedSupervisor = { id: string; name: string; initials: string }

interface Requirement {
  id: string
  studentName: string
  studentInitials: string
  studentRole: string
  tasksRequired: number
  tasksCompleted: number
  status: 'not-started' | 'interim' | 'submitted' | 'positive'
  supervisors: AssignedSupervisor[]
}

interface SupervisorOption {
  id: string
  name: string
  initials: string
  role: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUPERVISOR_OPTIONS: SupervisorOption[] = [
  { id: 's1', name: 'Francesca Bertolucci', initials: 'FB', role: 'Training Manager' },
  { id: 's2', name: 'Philippa Jones',       initials: 'PJ', role: 'Workplace Supervisor' },
  { id: 's3', name: 'Tim Mason',            initials: 'TM', role: 'Workplace Supervisor' },
  { id: 's4', name: 'Julian Bradford',      initials: 'JB', role: 'Training Manager' },
  { id: 's5', name: 'Rachel Nguyen',        initials: 'RN', role: 'Workplace Supervisor' },
  { id: 's6', name: 'Carlos Mendez',        initials: 'CM', role: 'Workplace Supervisor' },
  { id: 's7', name: 'Amira Hassan',         initials: 'AH', role: 'Training Manager' },
  { id: 's8', name: 'Derek Walcott',        initials: 'DW', role: 'Workplace Supervisor' },
  { id: 's9', name: 'Sofia Petrov',         initials: 'SP', role: 'Training Manager' },
  { id: 's10', name: 'Ben Cartwright',      initials: 'BC', role: 'Workplace Supervisor' },
]

const INITIAL_REQUIREMENTS: Requirement[] = [
  {
    id: 'r1',
    studentName: 'Paige Jones',
    studentInitials: 'PJ',
    studentRole: 'Learner',
    tasksRequired: 8,
    tasksCompleted: 0,
    status: 'not-started',
    supervisors: [{ id: 's1', name: 'Francesca Bertolucci', initials: 'FB' }],
  },
  {
    id: 'r2',
    studentName: 'Fredo Corta',
    studentInitials: 'FC',
    studentRole: 'Learner',
    tasksRequired: 8,
    tasksCompleted: 3,
    status: 'interim',
    supervisors: [{ id: 's2', name: 'Philippa Jones', initials: 'PJ' }, { id: 's3', name: 'Tim Mason', initials: 'TM' }],
  },
  {
    id: 'r3',
    studentName: 'Yuki Tanaka',
    studentInitials: 'YT',
    studentRole: 'Learner',
    tasksRequired: 8,
    tasksCompleted: 8,
    status: 'submitted',
    supervisors: [{ id: 's4', name: 'Julian Bradford', initials: 'JB' }],
  },
  {
    id: 'r4',
    studentName: 'Amara Okafor',
    studentInitials: 'AO',
    studentRole: 'Learner',
    tasksRequired: 8,
    tasksCompleted: 8,
    status: 'positive',
    supervisors: [],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CHIP_MAP: Record<Requirement['status'], StatusChipType> = {
  'not-started': 'base',
  interim:       'interim',
  submitted:     'submitted',
  positive:      'positive',
}

const STATUS_LABEL: Record<Requirement['status'], string> = {
  'not-started': 'Not started',
  interim:       'In progress',
  submitted:     'Submitted',
  positive:      'Achieved',
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function GlobalNav() {
  const navItems = [
    { icon: 'icon-home-outline',                  label: 'Dashboard' },
    { icon: 'icon-contact-user-search-people',    label: 'My Groups',     active: false },
    { icon: 'icon-activities-tasks-list',         label: 'Activities',    active: true },
    { icon: 'icon-checkbox-checked',              label: 'Assessments' },
    { icon: 'icon-note-outline',                  label: 'Workbooks' },
    { icon: 'icon-calendar-outline',              label: 'Calendar' },
    { icon: 'icon-tag',                           label: 'Records' },
    { icon: 'icon-navigation',                    label: 'Configuration' },
  ]

  return (
    <div style={{
      width: 220,
      minWidth: 220,
      backgroundColor: 'var(--bg-element)',
      borderRight: '1px solid var(--border-medium)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderBottom: '1px solid var(--border-medium)',
        flexShrink: 0,
      }}>
        <div style={{
          width: 22, height: 22,
          backgroundColor: 'var(--primary-700)',
          borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>A</span>
        </div>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>aXcelerate</span>
        <i className="icon-chevron-down" style={{ color: 'var(--text-light)', fontSize: 14, marginLeft: 'auto' }} />
      </div>

      {/* Search */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-medium)', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          backgroundColor: 'var(--bg)',
          borderRadius: 'var(--radius-input)',
          border: '1px solid var(--border-medium)',
          padding: '5px 8px',
        }}>
          <i className="icon-search" style={{ color: 'var(--text-light)', fontSize: 14 }} />
          <span style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-placeholder)' }}>Search…</span>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, overflow: 'auto', padding: '8px 8px' }}>
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px',
              borderRadius: 'var(--radius-element)',
              marginBottom: 2,
              backgroundColor: item.active ? 'var(--primary-200)' : 'transparent',
              cursor: 'pointer',
            }}
          >
            <i className={item.icon} style={{
              fontSize: 16,
              color: item.active ? 'var(--primary-700)' : 'var(--text-light)',
            }} />
            <span style={{
              fontSize: 'var(--font-size-small)',
              fontWeight: item.active ? 600 : 400,
              color: item.active ? 'var(--primary-700)' : 'var(--text)',
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid var(--border-medium)',
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <InitialsAvatar initials="JB" size={28} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--font-size-small)', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Jacob Jones
          </div>
          <div style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)' }}>Training Manager</div>
        </div>
      </div>
    </div>
  )
}

// ─── Supervisor dropdown ───────────────────────────────────────────────────────

function SupervisorDropdown({
  assigned,
  onAdd,
  onRemove,
  onClose,
  anchorRef,
}: {
  assigned: AssignedSupervisor[]
  onAdd: (sup: SupervisorOption) => void
  onRemove: (id: string) => void
  onClose: () => void
  anchorRef: RefObject<HTMLElement>
}) {
  const [query, setQuery] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const assignedIds = new Set(assigned.map((a) => a.id))

  const filtered = SUPERVISOR_OPTIONS.filter(
    (s) =>
      !assignedIds.has(s.id) &&
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.role.toLowerCase().includes(query.toLowerCase()))
  )

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose, anchorRef])

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: 50,
        width: 280,
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-el4)',
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '10px 12px',
        borderBottom: '1px solid var(--border-medium)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 'var(--font-size-small)', fontWeight: 600, color: 'var(--text)' }}>
          Add supervisors
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 2, borderRadius: 4,
            color: 'var(--text-light)', display: 'flex', alignItems: 'center',
          }}
        >
          <i className="icon-x-thick" style={{ fontSize: 14 }} />
        </button>
      </div>

      {/* Assigned supervisors */}
      {assigned.length > 0 && (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-light)', flexShrink: 0 }}>
          <div style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)', marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Assigned
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {assigned.map((sup) => (
              <div key={sup.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '4px 6px',
                borderRadius: 'var(--radius-element)',
                backgroundColor: 'var(--primary-100)',
              }}>
                <InitialsAvatar initials={sup.initials} size={24} />
                <span style={{ flex: 1, fontSize: 'var(--font-size-small)', color: 'var(--text)', fontWeight: 500 }}>
                  {sup.name}
                </span>
                <button
                  onClick={() => onRemove(sup.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: 2, color: 'var(--text-light)', display: 'flex', alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <i className="icon-x-thick" style={{ fontSize: 12 }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{ padding: '8px 12px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          backgroundColor: 'var(--bg)',
          borderRadius: 'var(--radius-input)',
          border: '1px solid var(--border-medium)',
          padding: '5px 8px',
        }}>
          <i className="icon-search" style={{ color: 'var(--text-light)', fontSize: 13 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search supervisors…"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'none',
              fontSize: 'var(--font-size-small)', color: 'var(--text)',
              fontFamily: 'var(--font-family)',
            }}
            autoFocus
          />
        </div>
      </div>

      {/* Scrollable supervisor list */}
      <div style={{
        overflowY: 'auto',
        maxHeight: 220,
        padding: '0 8px 8px',
      }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: '16px 0', textAlign: 'center',
            fontSize: 'var(--font-size-small)', color: 'var(--text-light)',
          }}>
            No supervisors found
          </div>
        ) : (
          filtered.map((sup) => (
            <button
              key={sup.id}
              onClick={() => { onAdd(sup); setQuery('') }}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 8px',
                borderRadius: 'var(--radius-element)',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <InitialsAvatar initials={sup.initials} size={28} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'var(--font-size-small)', fontWeight: 500, color: 'var(--text)' }}>
                  {sup.name}
                </div>
                <div style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)' }}>
                  {sup.role}
                </div>
              </div>
              <i className="icon-plus" style={{ fontSize: 14, color: 'var(--text-light)', flexShrink: 0 }} />
            </button>
          ))
        )}
      </div>
    </div>
  )
}

// ─── Requirement row ──────────────────────────────────────────────────────────

function RequirementRow({
  req,
  onUpdateSupervisors,
}: {
  req: Requirement
  onUpdateSupervisors: (id: string, supervisors: AssignedSupervisor[]) => void
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function handleAdd(sup: SupervisorOption) {
    onUpdateSupervisors(req.id, [...req.supervisors, { id: sup.id, name: sup.name, initials: sup.initials }])
  }

  function handleRemove(supId: string) {
    onUpdateSupervisors(req.id, req.supervisors.filter((s) => s.id !== supId))
  }

  const progressPct = req.tasksRequired > 0
    ? Math.round((req.tasksCompleted / req.tasksRequired) * 100)
    : 0

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-150)',
      padding: '10px var(--space-200)',
      borderBottom: '1px solid var(--border-light)',
      position: 'relative',
    }}>
      {/* Avatar + name */}
      <InitialsAvatar initials={req.studentInitials} size={32} />
      <div style={{ flex: '0 0 160px', minWidth: 0 }}>
        <div style={{ fontSize: 'var(--font-size-small)', fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {req.studentName}
        </div>
        <div style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)' }}>
          {req.tasksCompleted}/{req.tasksRequired} tasks
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ flex: '0 0 80px' }}>
        <div style={{
          height: 4, borderRadius: 2,
          backgroundColor: 'var(--neutral-200)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progressPct}%`,
            borderRadius: 2,
            backgroundColor: req.status === 'positive' ? 'var(--positive-700)'
              : req.status === 'submitted' ? 'var(--primary-700)'
              : req.status === 'interim' ? 'var(--warning-700)'
              : 'var(--neutral-300)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Status chip */}
      <div style={{ flex: '0 0 100px' }}>
        <StatusChip type={STATUS_CHIP_MAP[req.status]} size="small" icon>
          {STATUS_LABEL[req.status]}
        </StatusChip>
      </div>

      {/* Supervisors + add button */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', position: 'relative' }}>
        {/* Stacked supervisor avatars */}
        {req.supervisors.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {req.supervisors.slice(0, 3).map((sup, i) => (
              <div key={sup.id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i }}>
                <InitialsAvatar initials={sup.initials} size={24} border="2px solid var(--bg-element)" />
              </div>
            ))}
            {req.supervisors.length > 3 && (
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                backgroundColor: 'var(--neutral-200)',
                border: '2px solid var(--bg-element)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: -8, zIndex: 0,
                fontSize: 10, fontWeight: 600, color: 'var(--text-light)',
              }}>
                +{req.supervisors.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Add/manage supervisors button */}
        <button
          ref={triggerRef}
          onClick={() => setDropdownOpen((v) => !v)}
          style={{
            background: 'none',
            border: '1px dashed var(--border-dark)',
            borderRadius: 'var(--radius-round)',
            padding: '3px 8px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            color: 'var(--text-light)',
            fontSize: 'var(--font-size-xsmall)',
            fontFamily: 'var(--font-family)',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="icon-plus" style={{ fontSize: 12 }} />
          {req.supervisors.length === 0 ? 'Add supervisor' : 'Manage'}
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <SupervisorDropdown
            assigned={req.supervisors}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onClose={() => setDropdownOpen(false)}
            anchorRef={triggerRef as RefObject<HTMLElement>}
          />
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function UnitActivityView() {
  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS)
  const [activeTab, setActiveTab] = useState<'activities' | 'requests'>('activities')

  function updateSupervisors(reqId: string, supervisors: AssignedSupervisor[]) {
    setRequirements((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, supervisors } : r))
    )
  }

  const completedCount = requirements.filter((r) => r.status === 'positive' || r.status === 'submitted').length

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-secondary)',
      minWidth: 900,
      fontFamily: 'var(--font-family)',
    }}>
      <GlobalNav />

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{
          padding: '0 var(--space-300)',
          backgroundColor: 'var(--bg-element)',
          borderBottom: '1px solid var(--border-medium)',
          flexShrink: 0,
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 0 0',
            fontSize: 'var(--font-size-xsmall)',
            color: 'var(--text-light)',
          }}>
            <span>Students</span>
            <i className="icon-chevron-right" style={{ fontSize: 12 }} />
            <span>Fredo Corta</span>
            <i className="icon-chevron-right" style={{ fontSize: 12 }} />
            <span>Units</span>
            <i className="icon-chevron-right" style={{ fontSize: 12 }} />
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>Certificate III in Commercial Cookery</span>
          </div>

          {/* Title row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 0 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, borderRadius: 4, color: 'var(--text-light)',
                display: 'flex', alignItems: 'center',
              }}>
                <i className="icon-arrow-right-short" style={{ fontSize: 20, transform: 'rotate(180deg)' }} />
              </button>
              <div>
                <h1 style={{ margin: 0, fontSize: 'var(--font-size-large)', fontWeight: 600, color: 'var(--text)' }}>
                  Prepare food to meet special dietary requirements
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)' }}>SITHCCC026</span>
                  <span style={{ color: 'var(--border-dark)' }}>·</span>
                  <span style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)' }}>Workplace activity</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px',
                backgroundColor: 'var(--bg-element)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-button)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-small)',
                fontFamily: 'var(--font-family)',
                color: 'var(--text)',
                fontWeight: 500,
              }}>
                <i className="icon-edit-outline" style={{ fontSize: 16 }} />
                Edit activity
              </button>
              <button style={{
                padding: '6px 12px',
                backgroundColor: 'var(--bg-button)',
                border: 'none',
                borderRadius: 'var(--radius-button)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-small)',
                fontFamily: 'var(--font-family)',
                color: '#fff',
                fontWeight: 500,
                boxShadow: 'var(--shadow-button)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <i className="icon-plus" style={{ fontSize: 16 }} />
                Add student
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, marginTop: 12 }}>
            {(['activities', 'requests'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '8px 16px',
                  fontSize: 'var(--font-size-small)',
                  fontFamily: 'var(--font-family)',
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? 'var(--primary-700)' : 'var(--text-light)',
                  borderBottom: activeTab === tab ? '2px solid var(--primary-700)' : '2px solid transparent',
                  transition: 'var(--transition-standard)',
                }}
              >
                {tab === 'activities' ? 'My Activities' : 'Activity Requests'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-300)' }}>

          {/* Summary card */}
          <div style={{
            backgroundColor: 'var(--bg-element)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border-medium)',
            padding: 'var(--space-200)',
            marginBottom: 'var(--space-200)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-300)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 'var(--radius-element)',
              backgroundColor: 'var(--primary-100)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <i className="icon-activities-tasks-list" style={{ fontSize: 22, color: 'var(--primary-700)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                Required task for unit completion
              </div>
              <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-light)' }}>
                Completed by students against any strong explicit criterion? Leave as it is for now. Learner to complete all 8 tasks.
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 'var(--font-size-huge)', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                {completedCount}/{requirements.length}
              </div>
              <div style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)', marginTop: 2 }}>
                students completed
              </div>
            </div>
          </div>

          {/* Activity requirements table */}
          <div style={{
            backgroundColor: 'var(--bg-element)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border-medium)',
            overflow: 'hidden',
          }}>
            {/* Table header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px var(--space-200)',
              borderBottom: '1px solid var(--border-medium)',
            }}>
              <div>
                <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--text)' }}>
                  Activity requirements
                </span>
                <span style={{
                  marginLeft: 8,
                  backgroundColor: 'var(--neutral-200)',
                  borderRadius: 'var(--radius-round)',
                  padding: '1px 7px',
                  fontSize: 'var(--font-size-xsmall)',
                  fontWeight: 600,
                  color: 'var(--text-light)',
                }}>
                  {requirements.length}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '5px 10px',
                  background: 'none',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-button)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-xsmall)',
                  fontFamily: 'var(--font-family)',
                  color: 'var(--text-light)',
                }}>
                  <i className="icon-filter-outline" style={{ fontSize: 13 }} />
                  Filter
                </button>
              </div>
            </div>

            {/* Column labels */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-150)',
              padding: '6px var(--space-200)',
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-light)',
            }}>
              <div style={{ width: 32, flexShrink: 0 }} />
              <div style={{ flex: '0 0 160px', fontSize: 'var(--font-size-xsmall)', fontWeight: 500, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Student
              </div>
              <div style={{ flex: '0 0 80px', fontSize: 'var(--font-size-xsmall)', fontWeight: 500, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Progress
              </div>
              <div style={{ flex: '0 0 100px', fontSize: 'var(--font-size-xsmall)', fontWeight: 500, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Status
              </div>
              <div style={{ flex: 1, fontSize: 'var(--font-size-xsmall)', fontWeight: 500, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>
                Supervisors
              </div>
            </div>

            {/* Rows */}
            {requirements.map((req) => (
              <RequirementRow
                key={req.id}
                req={req}
                onUpdateSupervisors={updateSupervisors}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
