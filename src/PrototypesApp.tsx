import { useState, useEffect } from 'react'
import MobileChecklistFlow from './MobileChecklistFlow'
import { SupervisorChecklistPage } from './components/ui/supervisor-checklist'
import { UnitActivityView } from './pages/UnitActivityView'
import { WorkshopPage } from './components/ui/workshop-page'
import { WorkshopRefreshPage } from './components/ui/workshop-refresh-page'
import App from './App'
import { TooltipProvider } from '@/components/ui/tooltip'

// Figma asset URLs — expire ~7 days after last design fetch
const F_LOGO_BOTTOM_LEFT  = 'https://www.figma.com/api/mcp/asset/146f6863-0d33-4d3f-b016-e8b4d22c799e'
const F_LOGO_TICK_FOOT    = 'https://www.figma.com/api/mcp/asset/1d3e6d8d-4e72-469d-a4e0-51935e9ce47c'
const F_LOGO_BOTTOM_RIGHT = 'https://www.figma.com/api/mcp/asset/54da2866-b4cb-4f6a-b2c0-2adea28a5f11'
const F_LOGO_TICK_TAIL    = 'https://www.figma.com/api/mcp/asset/65dda176-8cb0-45c2-a5e9-b2469a103ea4'
const F_PROFILE_PHOTO     = 'https://www.figma.com/api/mcp/asset/e3b33113-eaa4-4e68-bf1a-2d6902995a25'
const F_NOTIF_DOT         = 'https://www.figma.com/api/mcp/asset/cbc1b5d8-1bf0-4c39-aa4d-a116d6d2c7ef'
const F_EMPTY_BG          = 'https://www.figma.com/api/mcp/asset/e9eb0159-4953-4f63-8f14-173f22a045a2'
const F_EMPTY_ILLUS       = 'https://www.figma.com/api/mcp/asset/c7b66254-3e10-4b79-bd35-c32b78981169'

const PROTOTYPE_ITEMS = [
  { id: null,                     label: 'Dashboard',           icon: 'icon-home'                  },
  { id: 'component-library',      label: 'Component Library',   icon: 'icon-rocket-launch-publish'  },
  { id: 'mobile-checklist-flow',  label: 'WBL Checklist Flow',  icon: 'icon-activities-tasks-list' },
  { id: 'supervisor-checklist',   label: 'Supervisor Checklist', icon: 'icon-checkbox-checked'     },
  { id: 'unit-activity-view',     label: 'Unit Activity View',   icon: 'icon-portrait-card-view'   },
  { id: 'workshop-page',          label: 'Workshop Page',        icon: 'icon-activities-tasks-list' },
  { id: 'workshop-refresh',       label: 'Workshop Refresh',     icon: 'icon-activities-tasks-list' },
] as const

function getProtoFromHash(): string | null {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash || null
}

export default function PrototypesApp() {
  const [activeProto, setActiveProto] = useState<string | null>(getProtoFromHash)

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
      default:                      return null
    }
  }

  return (
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
              <div style={{ width: 20, height: 18.286, position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '66.85%', right: '69.7%', bottom: 0, left: 0 }}>
                  <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={F_LOGO_BOTTOM_LEFT} />
                </div>
                <div style={{ position: 'absolute', top: '33.2%', right: '55.34%', bottom: '29.47%', left: '9.3%' }}>
                  <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={F_LOGO_TICK_FOOT} />
                </div>
                <div style={{ position: 'absolute', top: '66.85%', right: '29.65%', bottom: 0, left: '40.05%' }}>
                  <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={F_LOGO_BOTTOM_RIGHT} />
                </div>
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: '28.67%', left: '25.69%' }}>
                  <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={F_LOGO_TICK_TAIL} />
                </div>
              </div>
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
            {PROTOTYPE_ITEMS.map(({ id, label, icon }) => {
              const active = activeProto === id
              return (
                <button
                  key={id ?? 'dashboard'}
                  onClick={() => setActiveProto(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '7px 8px', width: '100%', borderRadius: 6,
                    background: active ? '#f0ecfd' : 'none',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    color: active ? '#5B3FD4' : '#5a6d80',
                    fontFamily: 'Roboto Flex, sans-serif',
                    fontSize: 14, fontWeight: active ? 500 : 400,
                    lineHeight: '16px',
                  }}
                >
                  <i className={icon} style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
                  {label}
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div style={{ padding: '4px 8px', flexShrink: 0 }}>
            <div style={{ height: 1, backgroundColor: '#e4e5e8' }} />
          </div>

          {/* Profile — exact from Figma */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingRight: 8, flexShrink: 0, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, padding: 8, borderRadius: 6 }}>
              {/* 24px circle avatar with photo */}
              <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: '#f4f1fd', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <img
                  alt=""
                  src={F_PROFILE_PHOTO}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                />
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#20374b', lineHeight: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Roboto Flex, sans-serif' }}>
                Brad Carley
              </span>
            </div>
            {/* Notification icon + dot */}
            <div style={{ position: 'relative', flexShrink: 0, width: 20, height: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: 5, cursor: 'pointer' }}>
                <img alt="" src={F_NOTIF_DOT} style={{ position: 'absolute', top: -8, left: -8, width: 8, height: 8 }} />
                <i className="icon-settings1" style={{ fontSize: 18, color: '#5a6d80' }} />
              </div>
            </div>
          </div>

          {/* Bottom fade overlay — from Figma */}
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 231, height: 50, pointerEvents: 'none',
            background: 'linear-gradient(to top, white 32%, rgba(255,255,255,0) 68%)',
          }} />
        </div>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, height: '100vh', overflow: 'auto', position: 'relative' }}>
          {!activeProto ? (
            /* Empty state — exact from Figma */
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 24, width: 248 }}>
                {/* 96×96 illustration */}
                <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: '17.07%', right: '0.32%', bottom: '0.11%', left: '16.86%' }}>
                    <img alt="" src={F_EMPTY_BG} style={{ display: 'block', width: '100%', height: '100%' }} />
                  </div>
                  <div style={{ position: 'absolute', top: '7.81%', right: '10.4%', bottom: '6.86%', left: '12.5%' }}>
                    <img alt="" src={F_EMPTY_ILLUS} style={{ display: 'block', width: '100%', height: '100%' }} />
                  </div>
                </div>
                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'center', width: 224 }}>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: '#20374b', lineHeight: '20px', fontFamily: 'Roboto Flex, sans-serif', whiteSpace: 'pre-wrap' }}>
                    {'Welcome to \nBrad\'s Prototyping Library'}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: '#5a6d80', lineHeight: '18px', fontFamily: 'Roboto Flex, sans-serif' }}>
                    Explore my designs as integrated, functioning web prototypes
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
  )
}
