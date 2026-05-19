import { useState, useEffect } from 'react'
import MobileChecklistFlow from './MobileChecklistFlow'
import { SupervisorChecklistPage } from './components/ui/supervisor-checklist'
import { UnitActivityView } from './pages/UnitActivityView'
import { WorkshopPage } from './components/ui/workshop-page'
import { WorkshopRefreshPage } from './components/ui/workshop-refresh-page'
import { MilestonesConfigPage } from './components/ui/milestones-config'
import { WBLPublishingVersions } from './components/ui/wbl-publishing-versions'
import App from './App'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToastProvider } from 'ax-arc-prototyping'

import welcomeIllustration from './assets/welcome-illustration.svg'
import axLogo from './assets/ax-logo.svg'

type NavItem  = { type: 'item';  id: string | null; label: string; icon: string }
type NavGroup = { type: 'group'; label: string; icon: string; children: { id: string; label: string }[] }
type NavEntry = NavItem | NavGroup

const NAV_ENTRIES: NavEntry[] = [
  { type: 'item',  id: null,                label: 'Dashboard',           icon: 'icon-home'                  },
  { type: 'item',  id: 'component-library', label: 'Component Library',   icon: 'icon-rocket-launch-publish' },
  { type: 'group', label: 'Contacts',       icon: 'icon-account-multiple-people-contacts-enrolments-users', children: [] },
  {
    type: 'group', label: 'Workshops', icon: 'icon-workshop-blackboard',
    children: [
      { id: 'workshop-page',    label: 'Workshop Page'    },
      { id: 'workshop-refresh', label: 'Workshop Refresh' },
    ],
  },
  { type: 'group', label: 'Learning',       icon: 'icon-book-outline',        children: [] },
  { type: 'group', label: 'Assessments',    icon: 'icon-assignment',           children: [] },
  { type: 'group', label: 'Marking',        icon: 'icon-clipboard-check',      children: [] },
  {
    type: 'group', label: 'Work-based Learning', icon: 'icon-briefcase',
    children: [
      { id: 'mobile-checklist-flow', label: 'Mobile Checklist Marking'           },
      { id: 'supervisor-checklist',  label: 'Checklist Marking'                  },
      { id: 'unit-activity-view',    label: 'Unit Criteria Activity Requirements' },
      { id: 'milestones-config',     label: 'Milestones Configuration'           },
      { id: 'wbl-publishing-versions', label: 'Publishing Versions'              },
    ],
  },
  { type: 'group', label: 'Skills',         icon: 'icon-rule',                 children: [] },
  { type: 'group', label: 'Client Portal',  icon: 'icon-briefcase-placement',  children: [] },
  { type: 'group', label: 'Settings',       icon: 'icon-settings1',            children: [] },
]

const GROUP_IDS: Record<string, string> = {
  'mobile-checklist-flow': 'Work-based Learning',
  'supervisor-checklist':  'Work-based Learning',
  'unit-activity-view':    'Work-based Learning',
  'milestones-config':         'Work-based Learning',
  'wbl-publishing-versions':   'Work-based Learning',
  'workshop-page':         'Workshops',
  'workshop-refresh':      'Workshops',
}

function getProtoFromHash(): string | null {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash || null
}

export default function PrototypesApp() {
  const [activeProto, setActiveProto] = useState<string | null>(getProtoFromHash)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const initial = getProtoFromHash()
    const groups = new Set<string>()
    if (initial && GROUP_IDS[initial]) groups.add(GROUP_IDS[initial])
    return groups
  })
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  function toggleGroup(label: string) {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  useEffect(() => {
    const newHash = activeProto ? `#${activeProto}` : '#'
    if (window.location.hash !== newHash) window.location.hash = newHash
  }, [activeProto])

  useEffect(() => {
    function onHashChange() { setActiveProto(getProtoFromHash()) }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function renderPrototype() {
    switch (activeProto) {
      case 'component-library':     return <App standalone={false} />
      case 'mobile-checklist-flow': return <MobileChecklistFlow />
      case 'supervisor-checklist':  return <SupervisorChecklistPage />
      case 'unit-activity-view':    return <UnitActivityView />
      case 'workshop-page':         return <WorkshopPage />
      case 'workshop-refresh':      return <WorkshopRefreshPage />
      case 'milestones-config':         return <MilestonesConfigPage />
      case 'wbl-publishing-versions':   return <WBLPublishingVersions />
      default:                      return null
    }
  }

  return (
    <ToastProvider>
    <TooltipProvider>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'white', overflow: 'hidden' }}>

        {/* ── Sidebar ────────────────────────────────────────────────────── */}
        <div style={{
          width: 240, flexShrink: 0, height: '100vh',
          backgroundColor: 'white',
          borderRight: '1px solid #e4e5e8',
          display: 'flex', flexDirection: 'column',
          padding: 16, gap: 8, boxSizing: 'border-box',
          position: 'relative', zIndex: 10,
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px', flexShrink: 0 }}>
            {/* Logo thumbnail box — exact from Figma */}
            <div style={{
              width: 32, height: 32, borderRadius: 6,
              border: '1px solid #e4e5e8', backgroundColor: 'white',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 2, flexShrink: 0, boxSizing: 'border-box',
            }}>
              <img alt="aXcelerate" src={axLogo} style={{ width: 20, height: 19, display: 'block' }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#20374b', lineHeight: '20px', fontFamily: 'Roboto Flex, sans-serif' }}>
              aXcelerate
            </span>
          </div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 8px', flexShrink: 0 }}>
            <i className="icon-contact-user-search-people" style={{ fontSize: 18, color: '#8697a7', flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: '#8697a7', lineHeight: '20px', fontFamily: 'Roboto Flex, sans-serif' }}>Search</span>
          </div>

          {/* Divider */}
          <div style={{ padding: '4px 8px', flexShrink: 0 }}>
            <div style={{ height: 1, backgroundColor: '#e4e5e8' }} />
          </div>

          {/* Nav items */}
          <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            {NAV_ENTRIES.map((entry) => {
              if (entry.type === 'item') {
                const active = activeProto === entry.id
                const itemKey = entry.id ?? 'dashboard'
                const hovered = hoveredNav === itemKey
                return (
                  <button
                    key={itemKey}
                    onClick={() => setActiveProto(entry.id)}
                    onMouseEnter={() => setHoveredNav(itemKey)}
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 8px', width: '100%', borderRadius: 6,
                      background: active ? '#f0ecfd' : hovered ? '#f4f5f7' : 'none',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      color: active ? '#5B3FD4' : '#5a6d80',
                      fontFamily: 'Roboto Flex, sans-serif',
                      fontSize: 14, fontWeight: active ? 500 : 400,
                      lineHeight: '16px',
                    }}
                  >
                    <i className={entry.icon} style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
                    {entry.label}
                  </button>
                )
              }

              // Group
              const expanded = expandedGroups.has(entry.label)
              const hovered = hoveredGroup === entry.label
              const showChevron = expanded || hovered
              return (
                <div key={entry.label}>
                  <button
                    onClick={() => toggleGroup(entry.label)}
                    onMouseEnter={() => setHoveredGroup(entry.label)}
                    onMouseLeave={() => setHoveredGroup(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 8px', width: '100%', borderRadius: 6,
                      background: hovered ? '#f4f5f7' : 'none',
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      color: '#5a6d80', fontFamily: 'Roboto Flex, sans-serif',
                      fontSize: 14, fontWeight: 400, lineHeight: '16px',
                    }}
                  >
                    <i className={entry.icon} style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
                    <span style={{ flex: 1 }}>{entry.label}</span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{
                        flexShrink: 0,
                        transition: 'transform 150ms, opacity 150ms',
                        transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                        opacity: showChevron ? 1 : 0,
                      }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {expanded && entry.children.map(({ id, label }) => {
                    const active = activeProto === id
                    const childHovered = hoveredNav === id
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveProto(id)}
                        onMouseEnter={() => setHoveredNav(id)}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{
                          display: 'flex', alignItems: 'center',
                          padding: '7px 8px 7px 34px', width: '100%', borderRadius: 6,
                          background: active ? '#f0ecfd' : childHovered ? '#f4f5f7' : 'none',
                          border: 'none', cursor: 'pointer', textAlign: 'left',
                          color: active ? '#5B3FD4' : '#5a6d80',
                          fontFamily: 'Roboto Flex, sans-serif',
                          fontSize: 14, fontWeight: active ? 500 : 400,
                          lineHeight: '16px',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>

        </div>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, height: '100vh', overflow: 'auto', position: 'relative' }}>
          {!activeProto ? (
            /* Empty state — exact from Figma */
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 24, width: 248 }}>
                <img alt="" src={welcomeIllustration} style={{ width: 96, height: 96, flexShrink: 0 }} />
                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center', width: 224 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: '#20374b', lineHeight: '20px', fontFamily: 'Roboto Flex, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {'Welcome to the aXcelerate\nDesign Prototyping Library'}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: '#5a6d80', lineHeight: '18px', fontFamily: 'Roboto Flex, sans-serif' }}>
                    Explore our designs as integrated, functioning web prototypes
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%' }}>{renderPrototype()}</div>
          )}
        </div>

      </div>
    </TooltipProvider>
    </ToastProvider>
  )
}
