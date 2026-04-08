import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardThumbnailHeader,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { VerticalNavMenu, NavItem } from '@/components/ui/nav'
import { Avatar } from '@/components/ui/avatar'
import { ThumbnailItem } from '@/components/ui/thumbnail-item'
import { StatusChip } from '@/components/ui/status-chip'
import { SingleSelect } from '@/components/ui/single-select'
import { Autocomplete } from '@/components/ui/autocomplete'
import { Spinner } from '@/components/ui/spinner'
import { Box } from '@/components/ui/box'
import { Option, OptionStack } from '@/components/ui/option'
import { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 style={{ fontSize: 'var(--font-size)', fontWeight: 600, color: 'var(--text)', margin: '0 0 var(--space-050) 0' }}>
        {title}
      </h2>
      <Separator style={{ marginBottom: 24 }} />
      {children}
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, margin: '0 0 var(--space-075) 0' }}>
          {label}
        </p>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        {children}
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  ['buttons',     'Buttons',     'icon-rocket-launch-publish'],
  ['inputs',      'Inputs',      'icon-text'],
  ['selects',     'Select',      'icon-chevron-down'],
  ['checkboxes',  'Checkboxes',  'icon-checkbox-checked'],
  ['radio',       'Radio',       'icon-radio-button-checked'],
  ['switches',    'Switch',      'icon-binary'],
  ['badges',      'Badges',      'icon-tag'],
  ['spinner',     'Spinner',     'icon-refresh'],
  ['alerts',      'Alerts',      'icon-note-outline'],
  ['cards',       'Cards',       'icon-portrait-card-view'],
  ['tabs',        'Tabs',        'icon-tab'],
  ['nav',         'Navigation',  'icon-navigation'],
  ['avatar',      'Avatar',      'icon-contact-add-outline'],
  ['thumbnail',   'Thumbnail Item', 'icon-image'],
  ['status-chip',    'Status Chip',    'icon-tag'],
  ['single-select',  'Single Select',  'icon-radio-button-checked'],
  ['autocomplete',   'Autocomplete',   'icon-contact-user-search-people'],
  ['tooltip',        'Tooltip',        'icon-info-outline'],
  ['date-picker',    'Date Picker',    'icon-calendar'],
  ['demo-cards',     'Demo Cards',     'icon-portrait-card-view'],
] as const

function useAsyncAutocomplete(fetcher: (q: string) => Promise<{ value: string; label: string }[]>) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])
  const [loading, setLoading] = useState(false)
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const onQueryChange = (q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!q.trim()) { setOptions([]); setLoading(false); return }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await fetcher(q)
        setOptions(results)
      } catch {
        setOptions([])
      } finally {
        setLoading(false)
      }
    }, 350)
  }

  return { options, loading, onQueryChange }
}

export default function App() {
  const [switchOn, setSwitchOn] = useState(false)
  const [checked, setChecked] = useState(false)
  const [opt1, setOpt1] = useState(false)
  const [opt2, setOpt2] = useState(true)
  const [opt3, setOpt3] = useState(false)
  const [activeNav, setActiveNav] = useState<string>('buttons')
  const [pickerDate, setPickerDate] = useState<Date | undefined>()
  const [pickerDateRange, setPickerDateRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({ from: undefined })
  const [pickerMultiple, setPickerMultiple] = useState<Date[] | undefined>()

  const countrySearch = useAsyncAutocomplete(async (q) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(q)}?fields=name,cca2`)
    if (!res.ok) return []
    const data = await res.json()
    return data.slice(0, 10).map((c: { cca2: string; name: { common: string } }) => ({
      value: c.cca2,
      label: c.name.common,
    }))
  })

  const githubSearch = useAsyncAutocomplete(async (q) => {
    const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(q)}&per_page=10`)
    if (!res.ok) return []
    const data = await res.json()
    return data.items.map((u: { id: number; login: string }) => ({
      value: String(u.id),
      label: u.login,
    }))
  })

  return (
    <TooltipProvider>
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>

      {/* Header */}
      <header style={{
        backgroundColor: 'var(--bg-content)',
        borderBottom: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-el1)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 var(--space-400)', height: 56, display: 'flex', alignItems: 'center', gap: 'var(--space-100)' }}>
          <div style={{
            width: 28, height: 28,
            borderRadius: 'var(--radius-element)',
            backgroundColor: 'var(--bg-button)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'var(--text-button)', fontSize: 'var(--font-size-sm)', fontWeight: 700 }}>A</span>
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 'var(--font-size)' }}>Component Library</span>
          <Badge variant="secondary" style={{ marginLeft: 'var(--space-025)' }}>v4.1</Badge>
        </div>
      </header>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'var(--space-400)', display: 'flex', gap: 'var(--space-400)' }}>

        {/* Sidebar nav */}
        <aside style={{ flexShrink: 0 }} className="ax-sidebar">
          <VerticalNavMenu style={{ position: 'sticky', top: 80, width: 'auto' }}>
            {NAV_ITEMS.map(([id, label, iconClass]) => (
              <NavItem
                key={id}
                flat={false}
                active={activeNav === id}
                icon={<i className={iconClass} />}
                onClick={() => setActiveNav(id)}
              >
                {label}
              </NavItem>
            ))}
          </VerticalNavMenu>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {activeNav === 'buttons' && (
            <Section title="Buttons">
              <Row label="Primary (filled)">
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="positive">Positive</Button>
                <Button variant="secondary">Unselected</Button>
              </Row>
              <Row label="Secondary (outlined)">
                <Button variant="outline">Default</Button>
                <Button variant="outline-destructive">Destructive</Button>
                <Button variant="outline-positive">Positive</Button>
              </Row>
              <Row label="Tertiary (inline)">
                <Button variant="tertiary">Action</Button>
                <Button variant="tertiary" leftIcon={<i className="icon-edit-outline" />}>Edit</Button>
              </Row>
              <Row label="With icons">
                <Button leftIcon={<i className="icon-unit-add" />}>Left icon</Button>
                <Button variant="outline" leftIcon={<i className="icon-edit-outline" />}>Left icon</Button>
                <Button variant="tertiary" rightIcon={<i className="icon-arrow-right-short" />}>Right icon</Button>
              </Row>
              <Row label="Loading">
                <Button loading>Saving...</Button>
                <Button variant="outline" loading>Loading</Button>
                <Button variant="destructive" loading>Deleting</Button>
              </Row>
              <Row label="Split">
                <Button split onSplitClick={() => {}}>Default</Button>
                <Button variant="outline" split onSplitClick={() => {}}>Outline</Button>
                <Button variant="destructive" split onSplitClick={() => {}}>Destructive</Button>
              </Row>
              <Row label="Disabled">
                <Button disabled>Primary</Button>
                <Button variant="outline" disabled>Outline</Button>
                <Button variant="destructive" disabled>Destructive</Button>
                <Button variant="tertiary" disabled>Tertiary</Button>
              </Row>
            </Section>
          )}

          {activeNav === 'inputs' && (
            <Section title="Inputs">
              <Row label="Default">
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-default" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Text</Label>
                  <Input id="input-default" placeholder="Placeholder text" />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-value" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>With value</Label>
                  <Input id="input-value" defaultValue="Current value" />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-number" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Number</Label>
                  <Input id="input-number" type="number" placeholder="0" />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-password" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Password</Label>
                  <Input id="input-password" type="password" placeholder="Enter password" />
                </div>
              </Row>
              <Row label="With icon">
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-search" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Search</Label>
                  <Input id="input-search" placeholder="Search..." leftIcon={<i className="icon-contact-user-search-people" />} />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-email" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Email</Label>
                  <Input id="input-email" type="email" placeholder="name@example.com" leftIcon={<i className="icon-message-text-outline" />} />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-tag" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Tag</Label>
                  <Input id="input-tag" placeholder="Add a tag" leftIcon={<i className="icon-tag" />} />
                </div>
              </Row>
              <Row label="States">
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-disabled" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Disabled</Label>
                  <Input id="input-disabled" placeholder="Disabled input" disabled />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-disabled-icon" style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Disabled with icon</Label>
                  <Input id="input-disabled-icon" placeholder="Disabled" disabled leftIcon={<i className="icon-contact-user-search-people" />} />
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-error" style={{ display: 'block', marginBottom: 'var(--space-050)', color: 'var(--text-negative)' }}>Error</Label>
                  <Input id="input-error" defaultValue="Invalid value" style={{ borderColor: 'var(--negative-600)' }} />
                  <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-negative)', marginTop: 'var(--space-050)', margin: 'var(--space-050) 0 0' }}>This field has an error</p>
                </div>
                <div style={{ width: 260 }}>
                  <Label htmlFor="input-error-icon" style={{ display: 'block', marginBottom: 'var(--space-050)', color: 'var(--text-negative)' }}>Error with icon</Label>
                  <Input id="input-error-icon" defaultValue="Invalid" style={{ borderColor: 'var(--negative-600)' }} leftIcon={<i className="icon-note-outline" />} />
                  <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-negative)', margin: 'var(--space-050) 0 0' }}>This field has an error</p>
                </div>
              </Row>
            </Section>
          )}

          {activeNav === 'selects' && (
            <Section title="Select">
              <Row label="Default">
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Framework</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Row>
              <Row label="With icon">
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Category</Label>
                  <Select>
                    <SelectTrigger leftIcon={<i className="icon-tag" />}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Sort by</Label>
                  <Select>
                    <SelectTrigger leftIcon={<i className="icon-sort" />}>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                      <SelectItem value="date-asc">Date (oldest)</SelectItem>
                      <SelectItem value="date-desc">Date (newest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Row>
              <Row label="Items with icons">
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>View</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list" icon={<i className="ax-icon icon-list-view" />}>List</SelectItem>
                      <SelectItem value="grid" icon={<i className="ax-icon icon-portrait-card-view" />}>Grid</SelectItem>
                      <SelectItem value="table" icon={<i className="ax-icon icon-activities-tasks-list" />}>Table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Row>
              <Row label="Menu inspect (always open)">
                {/* Static mock — uses raw CSS classes for always-visible inspection */}
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>No icons</Label>
                  <div className="ax-select-content" style={{ position: 'static', boxShadow: 'var(--shadow-el4)' }}>
                    <ul className="ax-select-viewport" style={{ height: 'auto' }}>
                      <li className="ax-select-item"><span>React</span></li>
                      <li className="ax-select-item">
                        <span>Vue</span>
                        <span className="ax-select-item-indicator"><i className="ax-icon icon-tick" /></span>
                      </li>
                      <li className="ax-select-item" style={{ backgroundColor: 'var(--bg-secondary-hover)' }}><span>Angular</span></li>
                      <li className="ax-select-item"><span>Svelte</span></li>
                    </ul>
                  </div>
                </div>
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>With icons</Label>
                  <div className="ax-select-content" style={{ position: 'static', boxShadow: 'var(--shadow-el4)' }}>
                    <ul className="ax-select-viewport" style={{ height: 'auto' }}>
                      <li className="ax-select-item">
                        <span className="ax-select-item-icon"><i className="ax-icon icon-list-view" /></span>
                        <span>List</span>
                      </li>
                      <li className="ax-select-item">
                        <span className="ax-select-item-icon"><i className="ax-icon icon-portrait-card-view" /></span>
                        <span>Grid</span>
                        <span className="ax-select-item-indicator"><i className="ax-icon icon-tick" /></span>
                      </li>
                      <li className="ax-select-item" style={{ backgroundColor: 'var(--bg-secondary-hover)' }}>
                        <span className="ax-select-item-icon"><i className="ax-icon icon-activities-tasks-list" /></span>
                        <span>Table</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Row>
              <Row label="States">
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>Disabled</Label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Not available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">Option A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div style={{ width: 260 }}>
                  <Label style={{ display: 'block', marginBottom: 'var(--space-050)' }}>With groups</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Admin</SelectLabel>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Staff</SelectLabel>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Row>
            </Section>
          )}

          {activeNav === 'checkboxes' && (
            <Section title="Checkboxes">
              <Row label="States">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Checkbox id="cb-unchecked" />
                  <Label htmlFor="cb-unchecked">Unchecked</Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Checkbox id="cb-checked" checked={checked} onCheckedChange={(v) => setChecked(!!v)} />
                  <Label htmlFor="cb-checked">Checked (click me)</Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Checkbox id="cb-disabled" disabled />
                  <Label htmlFor="cb-disabled">Disabled</Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Checkbox id="cb-disabled-checked" disabled checked />
                  <Label htmlFor="cb-disabled-checked">Disabled checked</Label>
                </div>
              </Row>
              <Row label="Option">
                <div style={{ width: 320 }}>
                  <Option checked={opt1} onCheckedChange={setOpt1}>Someone has to do this manually</Option>
                </div>
                <div style={{ width: 320 }}>
                  <Option checked={opt2} onCheckedChange={setOpt2}>Someone has to do this manually</Option>
                </div>
              </Row>
              <Row label="Option Stack">
                <div style={{ width: 320 }}>
                  <OptionStack>
                    <Option checked={opt1} onCheckedChange={setOpt1}>Someone has to do this manually</Option>
                    <Option checked={opt2} onCheckedChange={setOpt2}>Someone has to do this manually</Option>
                    <Option checked={opt3} onCheckedChange={setOpt3}>Someone has to do this manually</Option>
                  </OptionStack>
                </div>
              </Row>
            </Section>
          )}

          {activeNav === 'radio' && (
            <Section title="Radio">
              <Row label="Group">
                <RadioGroup defaultValue="option-one" style={{ display: 'flex', gap: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RadioGroupItem value="option-one" id="r1" />
                    <Label htmlFor="r1">Option one</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RadioGroupItem value="option-two" id="r2" />
                    <Label htmlFor="r2">Option two</Label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RadioGroupItem value="option-three" id="r3" disabled />
                    <Label htmlFor="r3">Disabled</Label>
                  </div>
                </RadioGroup>
              </Row>
            </Section>
          )}

          {activeNav === 'switches' && (
            <Section title="Switch">
              <Row label="States">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Switch id="sw-off" />
                  <Label htmlFor="sw-off">Off</Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Switch id="sw-on" checked={switchOn} onCheckedChange={setSwitchOn} />
                  <Label htmlFor="sw-on">{switchOn ? 'On' : 'Off'} (click me)</Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Switch id="sw-disabled" disabled />
                  <Label htmlFor="sw-disabled">Disabled</Label>
                </div>
              </Row>
            </Section>
          )}

          {activeNav === 'spinner' && (
            <Section title="Spinner">
              <Row label="Default">
                <Spinner />
              </Row>
            </Section>
          )}

          {activeNav === 'badges' && (
            <Section title="Badges">
              <Row label="Variants">
                <Badge>Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="positive">Positive</Badge>
                <Badge variant="destructive">Negative</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="pill">Pill</Badge>
                <Badge variant="outline">Outline</Badge>
              </Row>
            </Section>
          )}

          {activeNav === 'alerts' && (
            <Section title="Alerts">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-150)' }}>
                <Alert>
                  <AlertTitle>Default</AlertTitle>
                  <AlertDescription>This is a default informational alert message.</AlertDescription>
                </Alert>
                <Alert variant="positive">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>This action cannot be undone. Proceed with caution.</AlertDescription>
                </Alert>
                <Alert variant="info">
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>Here is some helpful information for you to know.</AlertDescription>
                </Alert>
              </div>
            </Section>
          )}

          {activeNav === 'cards' && (
            <Section title="Cards">
              <div className="ax-card-grid">
                <Card direction="col" gap="150">
                  <CardHeader>
                    <CardTitle>Default card</CardTitle>
                    <CardDescription>EL3 shadow + 1px border-medium. This card uses the EL3 shadow and a 1px medium border.</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button>Save</Button>
                    <Button variant="tertiary">Cancel</Button>
                  </CardFooter>
                </Card>
                <Card variant="inline" direction="col" gap="150">
                  <CardHeader>
                    <CardTitle>Light bg card</CardTitle>
                    <CardDescription>bg-light background, no shadow or border. Alternative card using the bg-light background colour.</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline">Action</Button>
                  </CardFooter>
                </Card>
                <Card variant="inline" direction="col" gap="150">
                  <CardTitle>Inline card</CardTitle>
                  <CardDescription>20px padding, bg-light, no shadow. Used for nested content sections.</CardDescription>
                  <Button variant="outline">Action</Button>
                </Card>
                <Card direction="col" gap="150">
                  <CardThumbnailHeader
                    avatar={
                      <Avatar
                        mode="icon"
                        shape="square"
                        theme="flat"
                        icon={<i className="ax-icon icon-contact-add-outline" />}
                      />
                    }
                    title="Project overview"
                  />
                  <CardDescription>This card uses the thumbnail header pattern — avatar + H4 title with 15/20/500 typography.</CardDescription>
                  <CardFooter>
                    <Button>View</Button>
                    <Button variant="tertiary">Dismiss</Button>
                  </CardFooter>
                </Card>
              </div>
            </Section>
          )}

          {activeNav === 'tabs' && (
            <Section title="Tabs">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                      <CardDescription>Summary of account activity. Switch between tabs to see the effect.</CardDescription>
                    </CardHeader>
                  </Card>
                </TabsContent>
                <TabsContent value="analytics">
                  <Card>
                    <CardDescription>Analytics content goes here.</CardDescription>
                  </Card>
                </TabsContent>
                <TabsContent value="settings">
                  <Card>
                    <CardDescription>Settings content goes here.</CardDescription>
                  </Card>
                </TabsContent>
              </Tabs>
            </Section>
          )}

          {activeNav === 'avatar' && (
            <Section title="Avatar">
              <Row label="Icon mode">
                <Avatar mode="icon" shape="square" theme="flat"   icon={<i className="icon-contact-add-outline" />} />
                <Avatar mode="icon" shape="square" theme="shadow" icon={<i className="icon-contact-add-outline" />} />
                <Avatar mode="icon" shape="circle" theme="flat"   icon={<i className="icon-contact-add-outline" />} />
                <Avatar mode="icon" shape="circle" theme="shadow" icon={<i className="icon-contact-add-outline" />} />
              </Row>
              <Row label="Initials mode">
                <Avatar mode="initials" shape="square" theme="flat"   initials="JD" />
                <Avatar mode="initials" shape="square" theme="shadow" initials="JD" />
                <Avatar mode="initials" shape="circle" theme="flat"   initials="JD" />
                <Avatar mode="initials" shape="circle" theme="shadow" initials="JD" />
              </Row>
              <Row label="Image mode">
                <Avatar mode="image" shape="square" theme="flat"   src="https://i.pravatar.cc/150?img=1" alt="User" />
                <Avatar mode="image" shape="square" theme="shadow" src="https://i.pravatar.cc/150?img=1" alt="User" />
                <Avatar mode="image" shape="circle" theme="flat"   src="https://i.pravatar.cc/150?img=1" alt="User" />
                <Avatar mode="image" shape="circle" theme="shadow" src="https://i.pravatar.cc/150?img=1" alt="User" />
              </Row>
            </Section>
          )}

          {activeNav === 'thumbnail' && (
            <Section title="Thumbnail Item">
              <Row label="Icon avatar">
                <div style={{ width: 480 }}>
                  <ThumbnailItem
                    avatar={<Avatar mode="icon" icon={<i className="icon-contact-add-outline" />} />}
                    title="Certificate III in Commercial Cookery"
                    subline="No interactive elements, just display"
                  />
                </div>
              </Row>
              <Row label="Image avatar">
                <div style={{ width: 480 }}>
                  <ThumbnailItem
                    avatar={<Avatar mode="image" src="https://i.pravatar.cc/150?img=3" alt="User" />}
                    title="John Davidson"
                    subline="Senior Developer"
                    extraString="12 Activities"
                  />
                </div>
              </Row>
              <Row label="Initials avatar + right slot">
                <div style={{ width: 480 }}>
                  <ThumbnailItem
                    avatar={<Avatar mode="initials" initials="JD" />}
                    title="Jane Doe"
                    subline="Product Manager"
                    rightSlot={<Button variant="outline">View</Button>}
                  />
                </div>
              </Row>
              <Row label="Shadow theme + circle">
                <div style={{ width: 480 }}>
                  <ThumbnailItem
                    avatar={<Avatar mode="icon" shape="circle" theme="shadow" icon={<i className="icon-contact-add-outline" />} />}
                    title="Certificate IV in Project Management"
                    subline="Vocational Education"
                    extraString="8 Units"
                  />
                </div>
              </Row>
              <Row label="Card variant">
                <ThumbnailItem
                  variant="card"
                  avatar={<Avatar mode="icon" shape="square" theme="flat" icon={<i className="ax-icon icon-contact-add-outline" />} />}
                  title="Certificate III in Commercial Cookery"
                  subline="CCSI"
                  extraString="Long course"
                />
                <ThumbnailItem
                  variant="card"
                  avatar={<Avatar mode="initials" initials="JD" />}
                  title="Jane Doe"
                  subline="Product Manager"
                  rightSlot={<Button variant="tertiary">View</Button>}
                />
              </Row>
            </Section>
          )}

          {activeNav === 'status-chip' && (
            <Section title="Status Chip">
              <Row label="Types (large, no icon)">
                <StatusChip type="base" />
                <StatusChip type="positive" />
                <StatusChip type="negative" />
                <StatusChip type="interim" />
                <StatusChip type="try-again" />
                <StatusChip type="submitted" />
              </Row>
              <Row label="Types (large, with icon)">
                <StatusChip type="base" icon />
                <StatusChip type="positive" icon />
                <StatusChip type="negative" icon />
                <StatusChip type="interim" icon />
                <StatusChip type="try-again" icon />
                <StatusChip type="submitted" icon />
              </Row>
              <Row label="Medium">
                <StatusChip type="base" size="medium" icon />
                <StatusChip type="positive" size="medium" icon />
                <StatusChip type="negative" size="medium" icon />
                <StatusChip type="interim" size="medium" icon />
                <StatusChip type="try-again" size="medium" icon />
                <StatusChip type="submitted" size="medium" icon />
              </Row>
              <Row label="Small">
                <StatusChip type="base" size="small" icon />
                <StatusChip type="positive" size="small" icon />
                <StatusChip type="negative" size="small" icon />
                <StatusChip type="interim" size="small" icon />
                <StatusChip type="try-again" size="small" icon />
                <StatusChip type="submitted" size="small" icon />
              </Row>
              <Row label="On Primary">
                <div style={{ display: 'flex', gap: 'var(--space-100)', padding: 'var(--space-150)', backgroundColor: 'var(--bg-content)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-el3)' }}>
                  <StatusChip type="base" icon onPrimary />
                  <StatusChip type="positive" icon onPrimary />
                  <StatusChip type="negative" icon onPrimary />
                  <StatusChip type="interim" icon onPrimary />
                  <StatusChip type="try-again" icon onPrimary />
                  <StatusChip type="submitted" icon onPrimary />
                </div>
              </Row>
            </Section>
          )}

          {activeNav === 'single-select' && (
            <Section title="Single Select">
              <Row label="Default">
                <SingleSelect
                  defaultValue="mr"
                  options={[
                    { value: 'mr',   label: 'Mr'   },
                    { value: 'mrs',  label: 'Mrs'  },
                    { value: 'miss', label: 'Miss' },
                    { value: 'ms',   label: 'Ms'   },
                    { value: 'dr',   label: 'Dr'   },
                  ]}
                />
              </Row>
              <Row label="Borderless">
                <SingleSelect
                  borderless
                  defaultValue="yes"
                  options={[
                    { value: 'yes',     label: 'Yes'     },
                    { value: 'no',      label: 'No'      },
                    { value: 'partial', label: 'Partial' },
                  ]}
                />
              </Row>
              <Row label="Error">
                <SingleSelect
                  error
                  defaultValue="mr"
                  options={[
                    { value: 'mr',   label: 'Mr'   },
                    { value: 'mrs',  label: 'Mrs'  },
                    { value: 'miss', label: 'Miss' },
                    { value: 'ms',   label: 'Ms'   },
                  ]}
                />
              </Row>
              <Row label="Inline">
                <SingleSelect
                  inline
                  defaultValue="week"
                  options={[
                    { value: 'day',   label: 'Day'   },
                    { value: 'week',  label: 'Week'  },
                    { value: 'month', label: 'Month' },
                    { value: 'year',  label: 'Year'  },
                  ]}
                />
              </Row>
              <Row label="Icon only">
                <SingleSelect
                  iconOnly
                  defaultValue="list"
                  options={[
                    { value: 'list', label: 'List', icon: <i className="ax-icon icon-list-view" /> },
                    { value: 'grid', label: 'Grid', icon: <i className="ax-icon icon-portrait-card-view" /> },
                    { value: 'table', label: 'Table', icon: <i className="ax-icon icon-activities-tasks-list" /> },
                  ]}
                />
              </Row>
              <Row label="With left icon">
                <SingleSelect
                  defaultValue="mr"
                  options={[
                    { value: 'mr',   label: 'Mr',   leftIcon: <i className="ax-icon icon-contact-add-outline" /> },
                    { value: 'mrs',  label: 'Mrs',  leftIcon: <i className="ax-icon icon-contact-add-outline" /> },
                    { value: 'miss', label: 'Miss', leftIcon: <i className="ax-icon icon-contact-add-outline" /> },
                    { value: 'ms',   label: 'Ms',   leftIcon: <i className="ax-icon icon-contact-add-outline" /> },
                  ]}
                />
              </Row>
            </Section>
          )}

          {activeNav === 'autocomplete' && (
            <Section title="Autocomplete">
              <Row label="Country (REST Countries API)">
                <div style={{ width: 280 }}>
                  <Autocomplete
                    placeholder="Type a country name…"
                    options={countrySearch.options}
                    loading={countrySearch.loading}
                    onQueryChange={countrySearch.onQueryChange}
                  />
                </div>
              </Row>
              <Row label="GitHub user search">
                <div style={{ width: 280 }}>
                  <Autocomplete
                    placeholder="Search GitHub users…"
                    leftIcon={<i className="ax-icon icon-contact-user-search-people" />}
                    options={githubSearch.options}
                    loading={githubSearch.loading}
                    onQueryChange={githubSearch.onQueryChange}
                  />
                </div>
              </Row>
            </Section>
          )}

          {activeNav === 'tooltip' && (
            <Section title="Tooltip">
              <Row label="Inspect (always visible)">
                <TooltipRoot open>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover target</Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">This tooltip is always open</TooltipContent>
                </TooltipRoot>
              </Row>
              <Row label="Sides">
                <Tooltip content="This is a top tooltip" side="top">
                  <Button variant="outline">Top</Button>
                </Tooltip>
                <Tooltip content="This is a bottom tooltip" side="bottom">
                  <Button variant="outline">Bottom</Button>
                </Tooltip>
                <Tooltip content="This is a left tooltip" side="left">
                  <Button variant="outline">Left</Button>
                </Tooltip>
                <Tooltip content="This is a right tooltip" side="right">
                  <Button variant="outline">Right</Button>
                </Tooltip>
              </Row>
              <Row label="On different elements">
                <Tooltip content="Edit this item">
                  <Button leftIcon={<i className="ax-icon icon-pencil-edit" />}>Edit</Button>
                </Tooltip>
                <Tooltip content="You don't have permission to delete this">
                  <span>
                    <Button variant="destructive" disabled leftIcon={<i className="ax-icon icon-bin-trash" />}>Delete</Button>
                  </span>
                </Tooltip>
                <Tooltip content="Badge tooltip">
                  <Badge>Hover me</Badge>
                </Tooltip>
              </Row>
            </Section>
          )}

          {activeNav === 'date-picker' && (
            <Section title="Date Picker">
              <Row label="Single date">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="ax-select-trigger" style={{ width: 240 }}>
                        <CalendarIcon style={{ width: 16, height: 16, color: 'var(--text-light)', flexShrink: 0 }} />
                        <span className="ax-select-value" style={!pickerDate ? { color: 'var(--text-placeholder)' } : {}}>
                          {pickerDate ? format(pickerDate, 'PPP') : 'Pick a date'}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar mode="single" selected={pickerDate} onSelect={setPickerDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  {pickerDate && (
                    <Button variant="tertiary" onClick={() => setPickerDate(undefined)}>Clear</Button>
                  )}
                </div>
              </Row>

              <Row label="Date range">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ax-select-trigger" style={{ width: 300 }}>
                      <CalendarIcon style={{ width: 16, height: 16, color: 'var(--text-light)', flexShrink: 0 }} />
                      <span className="ax-select-value" style={!pickerDateRange.from ? { color: 'var(--text-placeholder)' } : {}}>
                        {pickerDateRange.from
                          ? pickerDateRange.to
                            ? `${format(pickerDateRange.from, 'LLL dd, y')} – ${format(pickerDateRange.to, 'LLL dd, y')}`
                            : format(pickerDateRange.from, 'LLL dd, y')
                          : 'Pick a date range'}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="range"
                      selected={pickerDateRange}
                      onSelect={(range) => setPickerDateRange(range ?? { from: undefined })}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </Row>

              <Row label="Multiple dates">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ax-select-trigger" style={{ width: 240 }}>
                      <CalendarIcon style={{ width: 16, height: 16, color: 'var(--text-light)', flexShrink: 0 }} />
                      <span className="ax-select-value" style={!pickerMultiple?.length ? { color: 'var(--text-placeholder)' } : {}}>
                        {pickerMultiple && pickerMultiple.length > 0
                          ? `${pickerMultiple.length} date${pickerMultiple.length > 1 ? 's' : ''} selected`
                          : 'Pick dates'}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar mode="multiple" selected={pickerMultiple} onSelect={setPickerMultiple} initialFocus />
                  </PopoverContent>
                </Popover>
              </Row>

              <Row label="Inline calendar">
                <Calendar mode="single" selected={pickerDate} onSelect={setPickerDate} />
              </Row>
            </Section>
          )}

          {activeNav === 'demo-cards' && (
            <Section title="Demo Cards">
              <div style={{ maxWidth: 680 }}>
                <Card direction="col" gap="200">

                    {/* Header */}
                    <Box direction="row" justify>
                      <Box direction="row" gap="150">
                        <Avatar mode="icon" shape="square" theme="flat" icon={<i className="ax-icon icon-shapes-types-categories" />} />
                        <h4 className="ax-card-title">Workshop type</h4>
                      </Box>
                      <StatusChip type="base" icon />
                    </Box>

                    {/* Course thumbnail */}
                    <ThumbnailItem
                      variant="card"
                      avatar={<Avatar mode="image" shape="square" src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop" alt="Commercial Cookery" />}
                      title="Commercial Cookery - Supported Intake - QLD"
                      subline="CCSI"
                      extraString="Long course"
                      rightSlot={<StatusChip type="submitted" />}
                    />

                    {/* Learning plan + qualification */}
                    <Card variant="inline" direction="col" gap="150">
                      <Box direction="col" gap="050">
                        <Label>Learning plan</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Certificate III in Commercial Cookery (2026) (default)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cert3-2026">Certificate III in Commercial Cookery (2026) (default)</SelectItem>
                            <SelectItem value="cert3-2025">Certificate III in Commercial Cookery (2025)</SelectItem>
                          </SelectContent>
                        </Select>
                      </Box>
                      <Box direction="col" gap="050">
                        <Label>Qualification</Label>
                        <ThumbnailItem
                          variant="card"
                          avatar={<Avatar mode="icon" shape="square" theme="flat" icon={<i className="ax-icon icon-shapes-types-categories" />} />}
                          title="Certificate III in Commercial Cookery"
                          subline="RII20915"
                          extraString="20 - 25 Jun 2026"
                          rightSlot={<Button variant="tertiary" leftIcon={<i className="ax-icon icon-portrait-card-view" />}>See all units (5)</Button>}
                        />
                      </Box>
                    </Card>

                    {/* Title field */}
                    <Box direction="col" gap="050">
                      <Label required>Title</Label>
                      <Input defaultValue="Certificate III in Commercial Cookery - June 2026 - Supported Intake" />
                    </Box>

                    {/* Domain field */}
                    <Box direction="col" gap="050">
                      <Label required>Domain</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="aXcelerate training" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="axcelerate">aXcelerate training</SelectItem>
                          <SelectItem value="external">External</SelectItem>
                        </SelectContent>
                      </Select>
                    </Box>

                </Card>
              </div>
            </Section>
          )}

          {activeNav === 'nav' && (
            <Section title="Navigation">
              <Row label="Flat (default)">
                <VerticalNavMenu header="Main Menu">
                  <NavItem icon={<i className="icon-home" />} active>Home</NavItem>
                  <NavItem icon={<i className="icon-activities-tasks-list" />}>Analytics</NavItem>
                  <NavItem icon={<i className="icon-settings1" />}>Settings</NavItem>
                  <NavItem icon={<i className="icon-contact-add-outline" />}>Profile</NavItem>
                  <NavItem icon={<i className="icon-mdi_help_outline-question-mark" />} disabled>Help (disabled)</NavItem>
                </VerticalNavMenu>
              </Row>
              <Row label="Raised (flat=false)">
                <VerticalNavMenu header="Main Menu">
                  <NavItem flat={false} icon={<i className="icon-home" />} active>Home</NavItem>
                  <NavItem flat={false} icon={<i className="icon-activities-tasks-list" />}>Analytics</NavItem>
                  <NavItem flat={false} icon={<i className="icon-settings1" />}>Settings</NavItem>
                  <NavItem flat={false} icon={<i className="icon-contact-add-outline" />}>Profile</NavItem>
                  <NavItem flat={false} icon={<i className="icon-mdi_help_outline-question-mark" />} disabled>Help (disabled)</NavItem>
                </VerticalNavMenu>
              </Row>
            </Section>
          )}

        </main>
      </div>
    </div>
    </TooltipProvider>
  )
}
