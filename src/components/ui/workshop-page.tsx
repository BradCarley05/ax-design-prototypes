import React, { useState } from 'react'
import { Button, IconButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'

// ─── Types ────────────────────────────────────────────────────────────────────

type CompStatus = 'C' | 'NYS' | 'IP' | 'CNA' | 'W' | 'RPL-G' | 'CT' | null
type TabId = 'learners' | 'trainers' | 'sessions' | 'attendance' | 'announcements' | 'finance' | 'notes'
type SubTabId = 'units' | 'assessments' | 'learning-plan' | 'learning' | 'portfolio'

interface UnitColumn {
  code: string
  name: string
}

interface Learner {
  id: string
  name: string
  avatarImg: string
  enrolStatus: 'A'
  unitProgress: number
  hasPortfolio?: boolean
  units: CompStatus[]
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const UNIT_COLUMNS: UnitColumn[] = [
  { code: 'BSBSUS211', name: 'Participate in sustain...' },
  { code: 'HLTAID011', name: 'Provide First Aid...' },
  { code: 'SIRXOSM002', name: 'Maintain...' },
  { code: 'SIRXOSM003', name: 'Use soci...' },
  { code: 'SITHASC020', name: 'Prepare d...' },
  { code: 'SITHASC021', name: 'Prepare A...' },
  { code: 'SITHASC023', name: 'Prepare A...' },
  { code: 'SITHASC025', name: 'Prepare B...' },
]

const LEARNERS: Learner[] = [
  { id: '1',  name: 'Brenda Press',    avatarImg: 'https://i.pravatar.cc/40?img=5',  enrolStatus: 'A', unitProgress: 90,  units: ['C','C','CNA','C','C','C','C','C'] },
  { id: '2',  name: 'Albert Flores',   avatarImg: 'https://i.pravatar.cc/40?img=12', enrolStatus: 'A', unitProgress: 50,  units: ['C','C','C','IP','NYS','NYS','NYS','NYS'] },
  { id: '3',  name: 'Antoine Blake',   avatarImg: 'https://i.pravatar.cc/40?img=15', enrolStatus: 'A', unitProgress: 100, units: ['C','C','C','C','C','CT','C','C'] },
  { id: '4',  name: 'Arlene McCoy',    avatarImg: 'https://i.pravatar.cc/40?img=47', enrolStatus: 'A', unitProgress: 0,   units: ['NYS','NYS','NYS','NYS','NYS','NYS','NYS','NYS'] },
  { id: '5',  name: 'Bianca Cooper',   avatarImg: 'https://i.pravatar.cc/40?img=9',  enrolStatus: 'A', unitProgress: 100, hasPortfolio: true, units: ['C','C','C','C','C','C','C','C'] },
  { id: '6',  name: 'Brody Simpson',   avatarImg: 'https://i.pravatar.cc/40?img=11', enrolStatus: 'A', unitProgress: 0,   units: ['NYS','NYS','NYS','NYS','NYS','NYS','NYS','NYS'] },
  { id: '7',  name: 'Cameron Wright',  avatarImg: 'https://i.pravatar.cc/40?img=51', enrolStatus: 'A', unitProgress: 0,   units: ['NYS','NYS','NYS','NYS','NYS','NYS','NYS','NYS'] },
  { id: '8',  name: 'Cody Fisher',     avatarImg: 'https://i.pravatar.cc/40?img=56', enrolStatus: 'A', unitProgress: 100, hasPortfolio: true, units: ['C','C','C','RPL-G','C','C','C','C'] },
  { id: '9',  name: 'Courtney Henry',  avatarImg: 'https://i.pravatar.cc/40?img=44', enrolStatus: 'A', unitProgress: 50,  units: ['C','C','C','IP','NYS','NYS','NYS','NYS'] },
  { id: '10', name: 'Darlene Robertson', avatarImg: 'https://i.pravatar.cc/40?img=32', enrolStatus: 'A', unitProgress: 90, units: ['C','C','C','C','C','C','C','C'] },
  { id: '11', name: 'Darrell Steward', avatarImg: 'https://i.pravatar.cc/40?img=57', enrolStatus: 'A', unitProgress: 0,   units: ['NYS','NYS','NYS','NYS','NYS','NYS','NYS','NYS'] },
  { id: '12', name: 'Dixie Lane',      avatarImg: 'https://i.pravatar.cc/40?img=21', enrolStatus: 'A', unitProgress: 100, hasPortfolio: true, units: ['C','C','C','C','C','C','C','C'] },
  { id: '13', name: 'Dianne Russell',  avatarImg: 'https://i.pravatar.cc/40?img=27', enrolStatus: 'A', unitProgress: 80,  units: ['C','C','C','C','C','C','IP','NYS'] },
  { id: '14', name: 'Eleanor Pena',    avatarImg: 'https://i.pravatar.cc/40?img=49', enrolStatus: 'A', unitProgress: 90,  units: ['C','C','C','C','W','C','C','C'] },
  { id: '15', name: 'Ethan Howard',    avatarImg: 'https://i.pravatar.cc/40?img=60', enrolStatus: 'A', unitProgress: 70,  units: ['C','C','C','C','C','IP','C','NYS'] },
]

const PRIMARY_TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'learners',      label: 'Learners',      icon: 'icon-contact-add-outline' },
  { id: 'trainers',      label: 'Trainers',       icon: 'icon-contact-user-search-people' },
  { id: 'sessions',      label: 'Sessions',       icon: 'icon-calendar-outline' },
  { id: 'attendance',    label: 'Attendance',     icon: 'icon-checkbox-checked' },
  { id: 'announcements', label: 'Announcements',  icon: 'icon-note-outline' },
  { id: 'finance',       label: 'Finance',        icon: 'icon-tag' },
  { id: 'notes',         label: 'Notes',          icon: 'icon-text' },
]

const SUB_TABS: { id: SubTabId; label: string }[] = [
  { id: 'units',         label: 'Units' },
  { id: 'assessments',   label: 'Assessments' },
  { id: 'learning-plan', label: 'Learning Plan' },
  { id: 'learning',      label: 'Learning' },
  { id: 'portfolio',     label: 'Portfolio' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function CompChip({ status }: { status: CompStatus }) {
  if (!status) return null
  const mod =
    status === 'C'     ? 'c' :
    status === 'NYS'   ? 'nys' :
    status === 'IP'    ? 'ip' :
    status === 'CNA'   ? 'cna' :
    status === 'W'     ? 'w' :
    status === 'RPL-G' ? 'rpl' :
    status === 'CT'    ? 'ct' : 'nys'
  return <span className={`wsp-comp-chip wsp-comp-chip--${mod}`}>{status}</span>
}

function ProgressPct({ pct }: { pct: number }) {
  const mod =
    pct === 100 ? 'full' :
    pct >= 70   ? 'high' :
    pct >= 40   ? 'mid'  :
    pct > 0     ? 'low'  : 'zero'
  return <span className={`wsp-progress-pct wsp-progress-pct--${mod}`}>{pct}%</span>
}

function FieldRow({ label, children, link }: { label: string; children: React.ReactNode; link?: boolean }) {
  return (
    <div className="wsp-field-row">
      <span className="wsp-field-label">{label}</span>
      <span className={link ? 'wsp-field-value wsp-field-value--link' : 'wsp-field-value'}>{children}</span>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function WorkshopPage() {
  const [activeTab, setActiveTab] = useState<TabId>('learners')
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('units')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')

  const allSelected = LEARNERS.length > 0 && LEARNERS.every(l => selectedIds.has(l.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(LEARNERS.map(l => l.id)))
    }
  }

  function toggleRow(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="wsp-layout">

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div className="wsp-top-bar">
        <div className="wsp-top-bar-left">
          <IconButton icon="icon-arrow-right-short" size={24} buttonStyle={false} className="wsp-back-btn" tooltip="Back" />
          <div className="wsp-course-thumbnail">
            <Avatar mode="icon" shape="square" theme="flat" icon={<i className="icon-activities-tasks-list" />} />
          </div>
          <div className="wsp-course-info">
            <span className="wsp-course-title">Certificate III in Commercial Cookery</span>
            <span className="wsp-course-sub">
              1885861
              <span className="wsp-course-sub-dot" />
              17 - 22 Jan 2026
            </span>
          </div>
        </div>
        <div className="wsp-top-bar-right">
          <span className="wsp-active-chip">
            <i className="icon-radio-button-checked" />
            Active
          </span>
          <div className="wsp-top-bar-actions">
            <IconButton icon="icon-note-outline"         size={20} tooltip="Export" />
            <IconButton icon="icon-message-text-outline" size={20} tooltip="Email" />
            <IconButton icon="icon-edit-outline"         size={20} tooltip="Edit" />
          </div>
          <Button leftIcon={<i className="icon-unit-add" />}>Enrol</Button>
          <button type="button" className="wsp-more-btn">⋮</button>
        </div>
      </div>

      {/* ── Primary tab row ───────────────────────────────────────────────────── */}
      <div className="wsp-tab-row">
        {PRIMARY_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`wsp-primary-tab${activeTab === tab.id ? ' wsp-primary-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="wsp-primary-tab-inner">
              <i className={tab.icon} />
              {tab.label}
            </span>
            {activeTab === tab.id && <span className="wsp-primary-tab-bar" />}
          </button>
        ))}
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <div className="wsp-body">

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="wsp-main">

          {/* Sub-tabs */}
          <div className="wsp-sub-tab-row">
            {SUB_TABS.map(st => (
              <button
                key={st.id}
                type="button"
                className={`wsp-sub-tab${activeSubTab === st.id ? ' wsp-sub-tab--active' : ''}`}
                onClick={() => setActiveSubTab(st.id)}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="wsp-toolbar">
            <Input
              placeholder="Search"
              leftIcon={<i className="icon-contact-user-search-people" />}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="wsp-search"
            />
            <Button variant="outline" rightIcon={<i className="icon-chevron-down" />}>More unit options</Button>
            <Button variant="outline" leftIcon={<i className="icon-tag" />} rightIcon={<i className="icon-chevron-down" />}>Certificates</Button>
            <Button variant="outline" leftIcon={<i className="icon-note-outline" />} rightIcon={<i className="icon-chevron-down" />}>Export</Button>
            <button type="button" className="wsp-more-btn">⋮</button>
          </div>

          {/* Filter row */}
          <div className="wsp-filter-row">
            <Button variant="outline" className="wsp-filter-btn">Views</Button>
            <Button variant="outline" className="wsp-filter-btn">Columns</Button>
            <Button variant="tertiary" leftIcon={<i className="icon-plus" />}>Add filter</Button>
            <button type="button" className="wsp-filter-more">···</button>
          </div>

          {/* Learner table */}
          <div className="wsp-table-wrap">
            <table className="wsp-table">
              <thead>
                <tr className="wsp-thead-row">
                  <th className="wsp-th wsp-th--check">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleAll}
                    />
                  </th>
                  <th className="wsp-th wsp-th--learner">Learners</th>
                  <th className="wsp-th wsp-th--enrol">Enrolment<br />status</th>
                  <th className="wsp-th wsp-th--progress">Unit<br />progress</th>
                  {UNIT_COLUMNS.map(col => (
                    <th key={col.code} className="wsp-th wsp-th--unit">
                      <span className="wsp-unit-name">{col.name}</span>
                      <span className="wsp-unit-code">{col.code}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEARNERS.filter(l =>
                  !search || l.name.toLowerCase().includes(search.toLowerCase())
                ).map(learner => (
                  <tr
                    key={learner.id}
                    className={`wsp-row${selectedIds.has(learner.id) ? ' wsp-row--selected' : ''}`}
                  >
                    <td className="wsp-td wsp-td--check">
                      <Checkbox
                        checked={selectedIds.has(learner.id)}
                        onCheckedChange={() => toggleRow(learner.id)}
                      />
                    </td>
                    <td className="wsp-td wsp-td--learner">
                      <div className="wsp-learner-cell">
                        <Avatar
                          mode="image"
                          shape="circle"
                          theme="flat"
                          src={learner.avatarImg}
                          alt={learner.name}
                        />
                        <span className="wsp-learner-name">{learner.name}</span>
                        {learner.hasPortfolio && (
                          <span className="wsp-portfolio-badge">
                            <i className="icon-portrait-card-view" />
                          </span>
                        )}
                        {learner.hasPortfolio && (
                          <button type="button" className="wsp-row-more">⋮</button>
                        )}
                      </div>
                    </td>
                    <td className="wsp-td wsp-td--enrol">
                      <span className="wsp-enrol-chip">{learner.enrolStatus}</span>
                    </td>
                    <td className="wsp-td wsp-td--progress">
                      <ProgressPct pct={learner.unitProgress} />
                    </td>
                    {learner.units.map((status, i) => (
                      <td key={i} className="wsp-td wsp-td--unit">
                        <CompChip status={status} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Side panel ─────────────────────────────────────────────────────── */}
        <aside className="wsp-side-panel">
          <div className="wsp-panel-header">
            <span className="wsp-panel-title">Workshop details</span>
            <IconButton icon="icon-portrait-card-view" size={18} buttonStyle={false} tooltip="Expand" />
          </div>

          <div className="wsp-panel-body">
            {/* Public chip */}
            <span className="wsp-public-chip">
              <i className="icon-contact-add-outline" />
              Public
            </span>

            {/* Fields */}
            <FieldRow label="Dates">17 - 22 Jan 2026</FieldRow>
            <FieldRow label="Linked class">HLTAID003 Apply First Aid (linked Workshop ID 1885851)</FieldRow>
            <FieldRow label="Physical location">33 Logan Road, Nathan, QLD, 4114</FieldRow>
            <FieldRow label="Online location" link>www.classesonline.com.au</FieldRow>

            {/* Profit section */}
            <div className="wsp-panel-section">
              <div className="wsp-panel-section-header">
                <span className="wsp-panel-section-title">Profit</span>
                <span className="wsp-profit-values">
                  <span className="wsp-profit-main">$540.00</span>
                  <span className="wsp-profit-total"> / $12540.00</span>
                </span>
              </div>
              <div className="wsp-progress-bar-wrap">
                <div className="wsp-progress-bar">
                  <div className="wsp-progress-bar-fill wsp-progress-bar-fill--positive" style={{ width: '20%' }} />
                </div>
                <span className="wsp-progress-pct-label">20%</span>
              </div>
              <div className="wsp-profit-chips">
                <span className="wsp-stat-chip wsp-stat-chip--positive">Margin (18%)</span>
                <span className="wsp-stat-chip">4/5</span>
                <span className="wsp-stat-chip">25 Jul 2025</span>
              </div>
            </div>

            {/* Invoices section */}
            <div className="wsp-panel-section">
              <div className="wsp-panel-section-header">
                <span className="wsp-panel-section-title">Invoices</span>
                <button type="button" className="wsp-more-btn">⋮</button>
              </div>
              <div className="wsp-invoice-bar">
                <div className="wsp-invoice-bar-paid" style={{ width: '20%' }} />
                <div className="wsp-invoice-bar-unpaid" style={{ width: '80%' }} />
              </div>
              <div className="wsp-invoice-key">
                <span className="wsp-key-item">
                  <span className="wsp-key-dot wsp-key-dot--positive" />
                  Paid (20%)
                </span>
                <span className="wsp-key-item">
                  <span className="wsp-key-dot wsp-key-dot--warning" />
                  Unpaid (80%)
                </span>
              </div>
            </div>

            <div className="wsp-panel-divider" />

            {/* Client */}
            <div className="wsp-panel-section">
              <div className="wsp-field-label">Client</div>
              <div className="wsp-contact-row">
                <Avatar mode="image" shape="circle" theme="flat" src="https://i.pravatar.cc/40?img=33" alt="Robson O'Keefe" />
                <span className="wsp-contact-name">Robson O'Keefe</span>
                <button type="button" className="wsp-more-btn">⋮</button>
              </div>
            </div>

            {/* Trainers */}
            <div className="wsp-panel-section">
              <div className="wsp-field-label">Trainers (4)</div>
              <div className="wsp-trainer-list">
                <div className="wsp-contact-row">
                  <Avatar mode="image" shape="circle" theme="flat" src="https://i.pravatar.cc/40?img=36" alt="Sally Jones" />
                  <span className="wsp-contact-name">Sally Jones</span>
                  <button type="button" className="wsp-more-btn">⋮</button>
                </div>
                <div className="wsp-contact-row">
                  <Avatar mode="image" shape="circle" theme="flat" src="https://i.pravatar.cc/40?img=59" alt="Wade Warren" />
                  <span className="wsp-contact-name">Wade Warren</span>
                  <button type="button" className="wsp-more-btn">⋮</button>
                </div>
              </div>
              <button type="button" className="wsp-see-all">See all</button>
            </div>

            <div className="wsp-panel-divider" />

            {/* Sessions */}
            <div className="wsp-panel-section">
              <div className="wsp-field-label">Sessions</div>
              <div className="wsp-session-list">
                {[
                  { date: '17 Jan 2026', time: '8:00AM – 1:00PM' },
                  { date: '18 January 2026', time: '8:00AM – 1:00PM' },
                  { date: '19 January 2026', time: '8:00AM – 1:00PM' },
                ].map((s, i) => (
                  <div key={i} className="wsp-session-item">
                    <span className="wsp-session-date">{s.date}</span>
                    <span className="wsp-session-time">{s.time}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="wsp-see-all">See all</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
