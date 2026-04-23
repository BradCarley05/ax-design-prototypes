import { useState, useRef, useEffect } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { IconButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThumbnailItem } from '@/components/ui/thumbnail-item'
import { SingleSelect } from '@/components/ui/single-select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

// ─── Types ────────────────────────────────────────────────────────────────────

type Metric = 'hours' | 'repetitions'
type Tab = 'criteria' | 'mapping'

interface ActivityRecord {
  id: string
  title: string
  subline: string
  imageSrc: string
}

interface MappedActivity {
  activityId: string
  count: number
  metric: Metric
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const METRIC_OPTIONS = [
  { value: 'hours', label: 'Hours' },
  { value: 'repetitions', label: 'Repetitions' },
]

const ALL_ACTIVITIES: ActivityRecord[] = [
  {
    id: 'a1',
    title: 'Prepare sushi',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=80&h=80&fit=crop',
  },
  {
    id: 'a2',
    title: 'Prepare ramen',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop',
  },
  {
    id: 'a3',
    title: 'Knife skills',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=80&h=80&fit=crop',
  },
  {
    id: 'a4',
    title: 'Stock preparation',
    subline: 'Kitchen Fundamentals',
    imageSrc: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=80&h=80&fit=crop',
  },
  {
    id: 'a5',
    title: 'Plating techniques',
    subline: 'Advanced Cookery',
    imageSrc: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop',
  },
  {
    id: 'a6',
    title: 'Sauce making',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop',
  },
  {
    id: 'a7',
    title: 'Pastry fundamentals',
    subline: 'Baking & Pastry',
    imageSrc: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=80&h=80&fit=crop',
  },
  {
    id: 'a8',
    title: 'Food safety compliance',
    subline: 'Food Hygiene',
    imageSrc: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop',
  },
  {
    id: 'a9',
    title: 'Bread making',
    subline: 'Baking & Pastry',
    imageSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop',
  },
  {
    id: 'a10',
    title: 'Seafood preparation',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=80&h=80&fit=crop',
  },
  {
    id: 'a11',
    title: 'Temperature control',
    subline: 'Food Safety',
    imageSrc: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=80&h=80&fit=crop',
  },
  {
    id: 'a12',
    title: 'Menu planning',
    subline: 'Kitchen Management',
    imageSrc: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=80&h=80&fit=crop',
  },
  {
    id: 'a13',
    title: 'Butchery basics',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=80&h=80&fit=crop',
  },
  {
    id: 'a14',
    title: 'Dairy & cheese handling',
    subline: 'Kitchen Fundamentals',
    imageSrc: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=80&h=80&fit=crop',
  },
  {
    id: 'a15',
    title: 'Vegetable cookery',
    subline: 'Cooking Operations',
    imageSrc: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=80&h=80&fit=crop',
  },
  {
    id: 'a16',
    title: 'Deep frying techniques',
    subline: 'Advanced Cookery',
    imageSrc: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=80&h=80&fit=crop',
  },
  {
    id: 'a17',
    title: 'Dessert preparation',
    subline: 'Baking & Pastry',
    imageSrc: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=80&h=80&fit=crop',
  },
  {
    id: 'a18',
    title: 'Allergen awareness',
    subline: 'Food Safety',
    imageSrc: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?w=80&h=80&fit=crop',
  },
  {
    id: 'a19',
    title: 'Coffee & beverage service',
    subline: 'Front of House',
    imageSrc: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop',
  },
  {
    id: 'a20',
    title: 'Kitchen equipment maintenance',
    subline: 'Kitchen Management',
    imageSrc: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=80&h=80&fit=crop',
  },
]

// Activities linked to this unit via the activity mapping tab
const UNIT_MAPPED_IDS = new Set(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'])

// Activities already added to the criteria requirements on load
const INITIAL_CRITERIA: MappedActivity[] = [
  { activityId: 'a1', count: 888, metric: 'hours' },
  { activityId: 'a2', count: 1, metric: 'hours' },
  { activityId: 'a3', count: 1, metric: 'hours' },
  { activityId: 'a4', count: 4, metric: 'repetitions' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function UnitActivityView() {
  const [tab, setTab] = useState<Tab>('criteria')
  const [hourRequirement, setHourRequirement] = useState(0)
  const [mapped, setMapped] = useState<MappedActivity[]>(INITIAL_CRITERIA)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const criteriaIds = new Set(mapped.map(m => m.activityId))

  const matchingActivities = search
    ? ALL_ACTIVITIES.filter(a =>
        !criteriaIds.has(a.id) && (
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.subline.toLowerCase().includes(search.toLowerCase())
        )
      )
    : []

  const mappedResults = matchingActivities.filter(a => UNIT_MAPPED_IDS.has(a.id))
  const unmappedResults = matchingActivities.filter(a => !UNIT_MAPPED_IDS.has(a.id))

  function addActivity(record: ActivityRecord) {
    setMapped(prev => [...prev, { activityId: record.id, count: 1, metric: 'hours' }])
    setSearch('')
    setSearchOpen(false)
  }

  function removeActivity(activityId: string) {
    setMapped(prev => prev.filter(m => m.activityId !== activityId))
  }

  function updateCount(activityId: string, count: number) {
    setMapped(prev => prev.map(m => m.activityId === activityId ? { ...m, count } : m))
  }

  function updateMetric(activityId: string, metric: string) {
    setMapped(prev => prev.map(m => m.activityId === activityId ? { ...m, metric: metric as Metric } : m))
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-element)',
      fontFamily: 'var(--font-family)',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Page header */}
        <div style={{
          backgroundColor: 'var(--bg-element)',
          borderBottom: '1px solid var(--border-medium)',
          padding: '0 var(--space-300)',
          flexShrink: 0,
        }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0 0' }}>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              display: 'flex', alignItems: 'center', color: 'var(--text-light)', borderRadius: 4,
              flexShrink: 0,
            }}>
              <i className="icon-arrow-right-short" style={{ fontSize: 18, transform: 'rotate(180deg)' }} />
            </button>
            <ThumbnailItem
              avatar={<Avatar mode="icon" shape="square" theme="flat" icon={<i className="icon-note-outline" />} />}
              title="Use food preparation equipment"
              subline="SITHCCC023"
            />
          </div>

          {/* Tabs */}
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
            <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-300)' }}>

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

                {/* Search with results dropdown */}
                <div ref={searchRef} style={{ position: 'relative' }}>
                  <Input
                    placeholder="Search activities to add"
                    leftIcon={<i className="icon-contact-user-search-people" />}
                    value={search}
                    onChange={e => { setSearch(e.target.value); setSearchOpen(true) }}
                    onFocus={() => setSearchOpen(true)}
                  />
                  {searchOpen && search && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0, right: 0,
                      maxHeight: 400,
                      overflowY: 'auto',
                      scrollBehavior: 'smooth',
                      WebkitOverflowScrolling: 'touch',
                      zIndex: 20,
                      backgroundColor: 'var(--bg-element)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-card)',
                      boxShadow: 'var(--shadow-el4)',
                      padding: '0 var(--space-100) var(--space-100)',
                    }}>
                      {matchingActivities.length === 0 && (
                        <div style={{ padding: 'var(--space-200)', textAlign: 'center', fontSize: 'var(--font-size-small)', color: 'var(--text-light)' }}>
                          No activities found.
                        </div>
                      )}
                      {mappedResults.length > 0 && (
                        <>
                          <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--bg-element)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-125)', padding: '12px var(--space-100) var(--space-050)', fontSize: 'var(--font-size-xsmall)', fontWeight: 500, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em', width: '100%' }}>
                            Mapped activities
                          </div>
                          {mappedResults.map(record => (
                            <div
                              key={record.id}
                              onClick={() => addActivity(record)}
                              style={{ cursor: 'pointer', borderRadius: 'var(--radius-element)', padding: 'var(--space-100)' }}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <ThumbnailItem
                                avatar={<Avatar mode="image" shape="square" theme="flat" src={record.imageSrc} alt={record.title} />}
                                title={record.title}
                                subline={record.subline}
                                rightSlot={<i className="icon-plus" style={{ fontSize: 14, color: 'var(--text-light)' }} />}
                              />
                            </div>
                          ))}
                        </>
                      )}
                      {unmappedResults.length > 0 && (
                        <>
                          <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--bg-element)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-125)', padding: '12px var(--space-100) var(--space-050)', fontSize: 'var(--font-size-xsmall)', fontWeight: 500, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em', width: '100%' }}>
                            Unmapped activities
                          </div>
                          {unmappedResults.map(record => (
                            <div
                              key={record.id}
                              onClick={() => addActivity(record)}
                              style={{ cursor: 'pointer', borderRadius: 'var(--radius-element)', padding: 'var(--space-100)' }}
                              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              <ThumbnailItem
                                avatar={<Avatar mode="image" shape="square" theme="flat" src={record.imageSrc} alt={record.title} />}
                                title={record.title}
                                subline={record.subline}
                                rightSlot={<i className="icon-plus" style={{ fontSize: 14, color: 'var(--text-light)' }} />}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Mapped activity list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-100)' }}>
                  {mapped.map(m => {
                    const record = ALL_ACTIVITIES.find(a => a.id === m.activityId)!
                    return (
                      <ThumbnailItem
                        key={m.activityId}
                        variant="card"
                        avatar={
                          <Avatar mode="image" shape="square" theme="flat" src={record.imageSrc} alt={record.title} />
                        }
                        title={record.title}
                        subline={record.subline}
                        rightSlot={
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 64 }}>
                              <Input
                                type="number"
                                value={m.count}
                                onChange={e => updateCount(m.activityId, Number(e.target.value))}
                              />
                            </div>
                            <SingleSelect
                              value={m.metric}
                              onChange={v => updateMetric(m.activityId, v)}
                              options={METRIC_OPTIONS}
                            />
                            <IconButton
                              icon="icon-x-thick"
                              size={20}
                              buttonStyle={false}
                              tooltip="Remove activity"
                              onClick={() => removeActivity(m.activityId)}
                            />
                          </div>
                        }
                      />
                    )
                  })}
                </div>
              </section>

            </div>
          )}

          {tab === 'mapping' && (
            <div style={{
              maxWidth: 700,
              margin: '0 auto',
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
