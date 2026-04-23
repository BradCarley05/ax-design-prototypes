import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { IconButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NavItem, VerticalNavMenu } from '@/components/ui/nav'
import { ThumbnailItem } from '@/components/ui/thumbnail-item'
import { SingleSelect } from '@/components/ui/single-select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

// ─── Types ────────────────────────────────────────────────────────────────────

type Metric = 'hours' | 'repetitions'
type Tab = 'criteria' | 'mapping'

interface Activity {
  id: string
  title: string
  subline: string
  imageSrc: string
  count: number
  metric: Metric
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const METRIC_OPTIONS = [
  { value: 'hours', label: 'Hours' },
  { value: 'repetitions', label: 'Repetitions' },
]

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Prepare sushi',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=80&h=80&fit=crop',
    count: 888,
    metric: 'hours',
  },
  {
    id: 'a2',
    title: 'Prepare ramen',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop',
    count: 1,
    metric: 'hours',
  },
  {
    id: 'a3',
    title: 'Knife skills',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1566454825481-9c31bd88e27e?w=80&h=80&fit=crop',
    count: 1,
    metric: 'hours',
  },
]

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

function GlobalNav() {
  return (
    <div style={{
      width: 168,
      minWidth: 168,
      backgroundColor: 'var(--bg-element)',
      borderRight: '1px solid var(--border-medium)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {/* Logo */}
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
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', flex: 1 }}>aXcelerate</span>
        <i className="icon-chevron-down" style={{ color: 'var(--text-light)', fontSize: 12 }} />
      </div>

      {/* New + Search */}
      <div style={{ padding: '4px 6px', borderBottom: '1px solid var(--border-light)', flexShrink: 0 }}>
        <NavItem flat icon={<i className="icon-plus" />}>New</NavItem>
        <NavItem flat icon={<i className="icon-contact-user-search-people" />}>Search</NavItem>
      </div>

      {/* Main nav items */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 6px' }}>
        <VerticalNavMenu style={{ width: 'auto' }}>
          <NavItem flat icon={<i className="icon-home" />}>Dashboard</NavItem>
          <NavItem flat icon={<i className="icon-contact-user-search-people" />}>Contacts</NavItem>
          <NavItem flat icon={<i className="icon-mdi_help_outline-question-mark" />}>Help Requests</NavItem>
          <NavItem flat icon={<i className="icon-calendar-outline" />}>Workshops</NavItem>
          <NavItem flat icon={<i className="icon-portrait-card-view" />}>Classes</NavItem>
          <NavItem flat icon={<i className="icon-image" />}>Resources</NavItem>
          <NavItem flat icon={<i className="icon-activities-tasks-list" />}>Learning</NavItem>
          <NavItem flat icon={<i className="icon-checkbox-checked" />}>Assessments</NavItem>
          <NavItem flat icon={<i className="icon-note-outline" />}>Marking</NavItem>
          <NavItem flat icon={<i className="icon-navigation" />}>Work-based Learning</NavItem>
          {/* Expanded sub-items */}
          <div style={{ paddingLeft: 16 }}>
            <NavItem flat icon={<i className="icon-contact-add-outline" />}>Placements</NavItem>
            <NavItem flat icon={<i className="icon-contact-add-outline" />}>Host Employers</NavItem>
            <NavItem flat active icon={<i className="icon-settings1" />}>Configuration</NavItem>
          </div>
          <NavItem flat icon={<i className="icon-tag" />}>Skills</NavItem>
          <NavItem flat icon={<i className="icon-rocket-launch-publish" />}>Marketing</NavItem>
          <NavItem flat icon={<i className="icon-binary" />}>Finance</NavItem>
          <NavItem flat icon={<i className="icon-checkbox-checked" />}>Tasks</NavItem>
          <NavItem flat icon={<i className="icon-note-outline" />}>Surveys</NavItem>
          <NavItem flat icon={<i className="icon-activities-tasks-list" />}>Reports</NavItem>
        </VerticalNavMenu>
      </nav>

      {/* Bottom links */}
      <div style={{ padding: '4px 6px', borderTop: '1px solid var(--border-light)', flexShrink: 0 }}>
        <NavItem flat icon={<i className="icon-calendar-outline" />}>Calendar</NavItem>
        <NavItem flat icon={<i className="icon-navigation" />}>Quick navigation guide</NavItem>
        <NavItem flat icon={<i className="icon-note-outline" />}>Give feedback</NavItem>
        <NavItem flat icon={<i className="icon-mdi_help_outline-question-mark" />}>Help</NavItem>
      </div>

      {/* User */}
      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid var(--border-medium)',
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <Avatar mode="initials" shape="circle" initials="JJ" />
        <span style={{
          fontSize: 'var(--font-size-small)', fontWeight: 500, color: 'var(--text)',
          flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          Jacob Jones
        </span>
        <i className="icon-notification" style={{ color: 'var(--text-light)', fontSize: 16 }} />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function UnitActivityView() {
  const [tab, setTab] = useState<Tab>('criteria')
  const [hourRequirement, setHourRequirement] = useState(0)
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES)
  const [search, setSearch] = useState('')

  function removeActivity(id: string) {
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  function updateCount(id: string, count: number) {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, count } : a))
  }

  function updateMetric(id: string, metric: string) {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, metric: metric as Metric } : a))
  }

  const filtered = activities.filter(a =>
    !search ||
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.subline.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-secondary)',
      fontFamily: 'var(--font-family)',
    }}>
      <GlobalNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Page header */}
        <div style={{
          backgroundColor: 'var(--bg-element)',
          borderBottom: '1px solid var(--border-medium)',
          padding: '0 var(--space-300)',
          flexShrink: 0,
        }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '10px 0 0',
            fontSize: 'var(--font-size-xsmall)',
          }}>
            <span style={{ color: 'var(--primary-700)', cursor: 'pointer' }}>
              Certificate III in Commercial Cookery
            </span>
            <i className="icon-chevron-right" style={{ fontSize: 12, color: 'var(--text-light)' }} />
          </div>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0 0' }}>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              display: 'flex', alignItems: 'center', color: 'var(--text-light)', borderRadius: 4,
            }}>
              <i className="icon-arrow-right-short" style={{ fontSize: 18, transform: 'rotate(180deg)' }} />
            </button>
            <Avatar mode="icon" shape="square" theme="flat" icon={<i className="icon-note-outline" />} />
            <div>
              <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--text)' }}>
                Use food preparation equipment
              </div>
              <div style={{ fontSize: 'var(--font-size-xsmall)', color: 'var(--text-light)' }}>
                SITHCCC023
              </div>
            </div>
          </div>

          {/* Tabs — visual only, content rendered conditionally below */}
          <Tabs value={tab} onValueChange={v => setTab(v as Tab)} style={{ marginTop: 8 }}>
            <TabsList>
              <TabsTrigger value="criteria">Unit criteria</TabsTrigger>
              <TabsTrigger value="mapping">Activity mapping</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Scrollable content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-300)' }}>

          {tab === 'criteria' && (
            <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>

              {/* Unit hour requirement */}
              <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-150)' }}>
                <ThumbnailItem
                  avatar={<Avatar mode="icon" shape="square" theme="flat" icon={<i className="icon-calendar-outline" />} />}
                  title="Unit hour requirement"
                />
                <Card direction="row" style={{ alignItems: 'center', gap: 'var(--space-200)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>
                      Required hours for unit completion
                    </div>
                    <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-light)' }}>
                      Completed by logging hours against any activity mapped to this unit. Leave as 0 if not required.
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, width: 72 }}>
                    <Input
                      type="number"
                      value={hourRequirement}
                      onChange={e => setHourRequirement(Number(e.target.value))}
                    />
                  </div>
                </Card>
              </section>

              {/* Activity requirements */}
              <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-150)' }}>
                <ThumbnailItem
                  avatar={<Avatar mode="icon" shape="square" theme="flat" icon={<i className="icon-activities-tasks-list" />} />}
                  title="Activity requirements"
                />
                <Input
                  placeholder="Search activities to add"
                  leftIcon={<i className="icon-contact-user-search-people" />}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-100)' }}>
                  {filtered.map(activity => (
                    <ThumbnailItem
                      key={activity.id}
                      variant="card"
                      avatar={
                        <Avatar
                          mode="image"
                          shape="square"
                          theme="flat"
                          src={activity.imageSrc}
                          alt={activity.title}
                        />
                      }
                      title={activity.title}
                      subline={activity.subline}
                      rightSlot={
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 64 }}>
                            <Input
                              type="number"
                              value={activity.count}
                              onChange={e => updateCount(activity.id, Number(e.target.value))}
                            />
                          </div>
                          <SingleSelect
                            value={activity.metric}
                            onChange={v => updateMetric(activity.id, v)}
                            options={METRIC_OPTIONS}
                          />
                          <IconButton
                            icon="icon-x-thick"
                            size={20}
                            buttonStyle={false}
                            tooltip="Remove activity"
                            onClick={() => removeActivity(activity.id)}
                          />
                        </div>
                      }
                    />
                  ))}
                  {filtered.length === 0 && (
                    <div style={{
                      padding: 'var(--space-200)',
                      textAlign: 'center',
                      fontSize: 'var(--font-size-small)',
                      color: 'var(--text-light)',
                    }}>
                      No activities match your search.
                    </div>
                  )}
                </div>
              </section>

            </div>
          )}

          {tab === 'mapping' && (
            <div style={{
              maxWidth: 700,
              padding: 'var(--space-200)',
              fontSize: 'var(--font-size-small)',
              color: 'var(--text-light)',
            }}>
              Activity mapping content goes here.
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
