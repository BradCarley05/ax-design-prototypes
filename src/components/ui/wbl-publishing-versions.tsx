import { useState } from 'react'
import { TopBar } from 'ax-arc-prototyping'
import { useToast } from 'ax-arc-prototyping'
import { Button } from '@/components/ui/button'
import { StatusChip } from '@/components/ui/status-chip'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectSeparator } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type PublishState = 'draft' | 'published'

type DetailRow =
  | { label: string; from: string; to: string; quote?: never }
  | { label: string; quote: string; from?: never; to?: never }

interface HistoryEntry {
  initials: string
  name: string
  action: string
  time: string
  details: DetailRow[]
}

const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    initials: 'BC',
    name: 'Brad Carley',
    action: 'created a new version',
    time: 'Just now',
    details: [
      { label: 'Version updated', from: 'v1.0', to: 'v1.1' },
      { label: 'Changes made', quote: '"Additional requirements added to milestone 2"' },
    ],
  },
  {
    initials: 'BC',
    name: 'Brad Carley',
    action: 'published a version',
    time: '17 Apr 2026 1:07 PM',
    details: [
      { label: 'Version status updated', from: 'Draft', to: 'Published' },
    ],
  },
  {
    initials: 'BC',
    name: 'Brad Carley',
    action: 'created this qualification',
    time: '6 Apr 2026 12:34 PM',
    details: [
      { label: 'Version updated', from: 'None', to: 'v1.0' },
      { label: 'Version status updated', from: 'None', to: 'Draft' },
    ],
  },
]

function VersionValue({ value }: { value: string }) {
  if (value.startsWith('v')) {
    return <span className="wbl-vh-version-badge">{value}</span>
  }
  return <span className="wbl-vh-plain">{value}</span>
}

export function WBLPublishingVersions() {
  const { toast } = useToast()

  const [publishState, setPublishState] = useState<PublishState>('draft')
  const [currentVersion, setCurrentVersion] = useState('1.0')
  const [newVersionMinor, setNewVersionMinor] = useState(1)
  const [publishedVersions, setPublishedVersions] = useState<string[]>([])
  const [viewingVersion, setViewingVersion] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [changesNote, setChangesNote] = useState('')

  const [newVersionModalOpen, setNewVersionModalOpen] = useState(false)
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false)

  const versionLabel = `v${currentVersion}`
  const nextVersionLabel = `v1.${newVersionMinor}`
  const displayedVersion = viewingVersion ? `v${viewingVersion}` : versionLabel
  const isViewingOlder = viewingVersion !== null

  const handlePublish = () => {
    setPublishedVersions(prev => [...prev, currentVersion])
    setPublishState('published')
    setModalOpen(false)
    setChangesNote('')
    toast({ type: 'success', message: `Version ${currentVersion} published` })
  }

  const closePublishModal = () => {
    setModalOpen(false)
    setChangesNote('')
  }

  const handleCreateVersion = () => {
    const newVer = `1.${newVersionMinor}`
    setCurrentVersion(newVer)
    setNewVersionMinor(prev => prev + 1)
    setPublishState('draft')
    setNewVersionModalOpen(false)
    toast({ type: 'success', message: `Version ${newVer} created` })
  }

  const historyVersions = publishedVersions.filter(v => v !== currentVersion)

  const avatar = (
    <div className="wbl-topbar-avatar">
      <i className="icon-assignment" aria-hidden="true" />
    </div>
  )

  const versionSelect = (
    <Select
      value={displayedVersion}
      onValueChange={(val) => {
        if (val === '__version_history__') {
          setVersionHistoryOpen(true)
        } else if (val === versionLabel) {
          setViewingVersion(null)
        } else {
          setViewingVersion(val.slice(1))
        }
      }}
    >
      <SelectTrigger leftIcon={<i className="icon-linking-type" aria-hidden="true" />}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__version_history__" icon={<i className="icon-history" aria-hidden="true" />}>
          Version History
        </SelectItem>
        <SelectSeparator />
        <SelectItem value={versionLabel}>{versionLabel}</SelectItem>
        {[...historyVersions].reverse().map(v => (
          <SelectItem key={v} value={`v${v}`}>v{v}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  const rightContent = isViewingOlder ? (
    <div className="wbl-topbar-right">
      <StatusChip type="interim" icon iconClass="icon-warning-outline">You are viewing an older version</StatusChip>
      {versionSelect}
      <Button
        variant="outline"
        leftIcon={<i className="icon-reset-retry" aria-hidden="true" />}
        onClick={() => setViewingVersion(null)}
      >
        View Current Version
      </Button>
    </div>
  ) : (
    <div className="wbl-topbar-right">
      {publishState === 'draft' ? (
        <StatusChip type="base" icon>Draft</StatusChip>
      ) : (
        <StatusChip type="submitted" icon className="wbl-chip--published">Published</StatusChip>
      )}
      {versionSelect}
      {publishState === 'draft' ? (
        <Button
          variant="outline"
          leftIcon={<i className="icon-rocket-launch-publish" aria-hidden="true" />}
          onClick={() => setModalOpen(true)}
        >
          Publish {versionLabel}
        </Button>
      ) : (
        <Button
          variant="outline"
          leftIcon={<i className="icon-add" aria-hidden="true" />}
          onClick={() => setNewVersionModalOpen(true)}
        >
          New Criteria Version
        </Button>
      )}
    </div>
  )

  return (
    <div className="wbl-page">
      <div className="wbl-topbar-wrap">
        <TopBar
          leftContent={
            <button className="icon-btn icon-btn--base" aria-label="Back">
              <i className="icon-arrow-left" aria-hidden="true" />
            </button>
          }
          avatar={avatar}
          title="Certificate III in Commercial Cookery"
          subline="SIT30816"
          extraString={publishState === 'published' ? 'Manage criteria for this Qualification' : undefined}
          rightContent={rightContent}
        />
        <div className="wbl-tabs-row">
          <Tabs defaultValue="milestones">
            <TabsList>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="units">Units</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="wbl-content-placeholder">
        <i className="icon-briefcase" aria-hidden="true" />
        <span>Prototype content area</span>
      </div>

      {/* Publish modal */}
      {modalOpen && (
        <div className="wbl-modal-overlay" onClick={closePublishModal}>
          <div className="wbl-modal" onClick={e => e.stopPropagation()}>
            <div className="wbl-modal-header">
              <h2 className="wbl-modal-title">Publish Version {currentVersion}</h2>
              <button className="icon-btn icon-btn--base" onClick={closePublishModal} aria-label="Close">
                <i className="icon-x-thick" aria-hidden="true" />
              </button>
            </div>
            <div className="wbl-modal-body">
              <div className="wbl-info-block">
                <i className="icon-info-outline wbl-info-block-icon" aria-hidden="true" />
                <div className="wbl-info-block-content">
                  <p className="wbl-info-block-title">
                    Publishing a new qualification configuration version
                  </p>
                  <ul className="wbl-info-block-list">
                    <li>Future placements will automatically use the latest version</li>
                    <li>
                      Any placements in an{' '}
                      <strong>In Progress, Completed</strong> or <strong>Cancelled</strong>{' '}
                      state on this qualification will remain on the version they started on
                    </li>
                    <li>
                      Any placements in a <strong>Not Started</strong> state will start on
                      the latest version with their 1st attempt
                    </li>
                  </ul>
                </div>
              </div>
              <div className="wbl-modal-field">
                <label className="wbl-modal-field-label">Changes made</label>
                <textarea
                  className="wbl-modal-textarea"
                  placeholder="Summarise changes made in this version"
                  value={changesNote}
                  onChange={e => setChangesNote(e.target.value)}
                />
              </div>
            </div>
            <div className="wbl-modal-footer">
              <Button variant="outline" onClick={closePublishModal}>Cancel</Button>
              <Button variant="default" onClick={handlePublish} disabled={!changesNote.trim()}>
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Criteria Version modal */}
      {newVersionModalOpen && (
        <div className="wbl-modal-overlay" onClick={() => setNewVersionModalOpen(false)}>
          <div className="wbl-modal wbl-modal--sm" onClick={e => e.stopPropagation()}>
            <div className="wbl-modal-header">
              <h2 className="wbl-modal-title">New Criteria Version</h2>
              <button className="icon-btn icon-btn--base" onClick={() => setNewVersionModalOpen(false)} aria-label="Close">
                <i className="icon-x-thick" aria-hidden="true" />
              </button>
            </div>
            <div className="wbl-modal-body">
              <div className="wbl-info-block">
                <i className="icon-info-outline wbl-info-block-icon" aria-hidden="true" />
                <div className="wbl-info-block-content">
                  <p className="wbl-info-block-title">
                    Learners who have already commenced their placement will not be transitioned to the latest version
                  </p>
                  <p className="wbl-info-block-body">
                    To update a learner to the latest version of this milestone configuration, a new placement must be created for them.
                  </p>
                </div>
              </div>
              <div className="wbl-modal-field">
                <label className="wbl-modal-field-label">New Version Number</label>
                <div className="wbl-version-stepper">
                  <button
                    className="wbl-version-stepper-btn"
                    onClick={() => setNewVersionMinor(prev => Math.max(1, prev - 1))}
                    aria-label="Decrease version"
                  >
                    <i className="icon-minus" aria-hidden="true" />
                  </button>
                  <span className="wbl-version-stepper-value">{nextVersionLabel}</span>
                  <button
                    className="wbl-version-stepper-btn"
                    onClick={() => setNewVersionMinor(prev => prev + 1)}
                    aria-label="Increase version"
                  >
                    <i className="icon-add" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="wbl-modal-footer">
              <Button variant="outline" onClick={() => setNewVersionModalOpen(false)}>Cancel</Button>
              <Button variant="default" onClick={handleCreateVersion}>Create</Button>
            </div>
          </div>
        </div>
      )}

      {/* Version History modal */}
      {versionHistoryOpen && (
        <div className="wbl-modal-overlay" onClick={() => setVersionHistoryOpen(false)}>
          <div className="wbl-modal" onClick={e => e.stopPropagation()}>
            <div className="wbl-modal-header">
              <h2 className="wbl-modal-title">Version History</h2>
              <button className="icon-btn icon-btn--base" onClick={() => setVersionHistoryOpen(false)} aria-label="Close">
                <i className="icon-x-thick" aria-hidden="true" />
              </button>
            </div>
            <div className="wbl-modal-body">
              <div className="wbl-vh-list">
                {HISTORY_ENTRIES.map((entry, i) => (
                  <div key={i} className="wbl-vh-entry">
                    <div className="wbl-vh-avatar">{entry.initials}</div>
                    <div className="wbl-vh-content">
                      <p className="wbl-vh-heading">
                        <span className="wbl-vh-heading-name">{entry.name}</span>
                        {' '}{entry.action}
                        <span className="wbl-vh-heading-time">{entry.time}</span>
                      </p>
                      <div className="wbl-vh-details">
                        {entry.details.map((detail, j) => (
                          <div key={j} className="wbl-vh-detail-row">
                            <span className="wbl-vh-detail-label">{detail.label}</span>
                            {detail.quote ? (
                              <span className="wbl-vh-quote">{detail.quote}</span>
                            ) : (
                              <span className="wbl-vh-detail-values">
                                <VersionValue value={detail.from!} />
                                <span className="wbl-vh-arrow">→</span>
                                <VersionValue value={detail.to!} />
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="wbl-modal-footer">
              <Button variant="outline" onClick={() => setVersionHistoryOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
