import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NavItem, VerticalNavMenu } from "@/components/ui/nav"
import { Avatar } from "@/components/ui/avatar"

/* ─── SVG icons ──────────────────────────────────────────────────────────── */

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </svg>
  )
}

function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ChevronDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function MoreVertical() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </svg>
  )
}

function CircleOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function CheckmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.47" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Achievement = "not-achieved" | "achieved" | null

interface ChecklistItem {
  id: string
  number: number
  text: string
  attachments?: number
}

interface ChecklistSection {
  id: string
  title: string
  expanded: boolean
  items: ChecklistItem[]
}

interface MarkingItem {
  id: string
  number: number
  question: string
  bullets?: string[]
  achievement: Achievement
}

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const TOTAL_ITEMS = 12

const INITIAL_SECTIONS: ChecklistSection[] = [
  {
    id: "cpr",
    title: "CPR Techniques",
    expanded: true,
    items: [
      { id: "1", number: 1, text: "Confirm food production requirements..." },
      { id: "2", number: 2, text: "Calculate ingredient amounts according..." },
      { id: "3", number: 3, text: "Identify and select ingredients from stor..." },
    ],
  },
  {
    id: "equipment",
    title: "Select, prepare and use equipment",
    expanded: true,
    items: [
      { id: "4", number: 4, text: "Select type and size of equipme...", attachments: 3 },
      { id: "5", number: 5, text: "Safely assemble and ensure cleanliness..." },
      { id: "6", number: 6, text: "Use equipment safely and hygienically..." },
      { id: "7", number: 7, text: "Analyze a simulated scenario and..." },
    ],
  },
  {
    id: "portion",
    title: "Portion and prepare ingredients",
    expanded: true,
    items: [
      { id: "8", number: 8, text: "Weigh and measure ingredients...", attachments: 3 },
      { id: "9", number: 9, text: "Prepare, cut and portion ingredients acc..." },
      { id: "10", number: 10, text: "Minimise waste to maximise profitability..." },
    ],
  },
  {
    id: "sanitise",
    title: "Sanitise Workstation",
    expanded: false,
    items: [],
  },
]

const INITIAL_MARKING_ITEMS: MarkingItem[] = [
  // CPR Techniques
  {
    id: "1",
    number: 1,
    question: "Confirm food production requirements from standard recipes:",
    bullets: [
      "Receives handover",
      "Accesses client assessments",
      "Reads nursing care plans",
      "Reads progress notes & client's history",
    ],
    achievement: null,
  },
  {
    id: "2",
    number: 2,
    question: "Calculate ingredient amounts according to requirements",
    achievement: null,
  },
  {
    id: "3",
    number: 3,
    question:
      "Identify and select ingredients from stores according to recipe, quality, freshness and stock rotation requirements",
    achievement: null,
  },
  // Select, prepare and use equipment
  {
    id: "4",
    number: 4,
    question: "Select type and size of equipment suitable to requirements",
    achievement: null,
  },
  {
    id: "5",
    number: 5,
    question: "Safely assemble and ensure cleanliness of equipment before use",
    achievement: null,
  },
  {
    id: "6",
    number: 6,
    question: "Use equipment safely and hygienically according to manufacturer instructions",
    achievement: null,
  },
  {
    id: "7",
    number: 7,
    question:
      "Analyze a simulated scenario and determine when to switch from abdominal thrusts to back blows",
    achievement: null,
  },
  // Portion and prepare ingredients
  {
    id: "8",
    number: 8,
    question: "Weigh and measure ingredients and create portions according to recipe",
    achievement: null,
  },
  {
    id: "9",
    number: 9,
    question: "Prepare, cut and portion ingredients according to recipe and cooking style",
    achievement: null,
  },
  {
    id: "10",
    number: 10,
    question: "Minimise waste to maximise profitability of food items prepared",
    achievement: null,
  },
]

/* ─── Global nav ─────────────────────────────────────────────────────────── */

function GlobalNav() {
  return (
    <div
      style={{
        width: 240,
        minWidth: 240,
        backgroundColor: "var(--bg-element)",
        borderRight: "1px solid var(--border-medium)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-medium)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <div
            style={{
              width: 22,
              height: 22,
              backgroundColor: "#22c55e",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m20 6-11 11-5-5" />
            </svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text)", whiteSpace: "nowrap" }}>
            aXcelerate
          </span>
          <span style={{ color: "var(--text-light)", display: "flex", alignItems: "center" }}>
            <ChevronDown size={14} />
          </span>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            borderRadius: 4,
            color: "var(--text-light)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <GridIcon />
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid var(--border-medium)",
          flexShrink: 0,
        }}
      >
        <Input
          placeholder="Search contacts"
          leftIcon={
            <i
              className="icon-contact-user-search-people"
              style={{ fontSize: 16, color: "var(--text-light)" }}
            />
          }
          style={{ height: 32, fontSize: 13 }}
        />
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, paddingTop: 8, overflowY: "auto" }}>
        <VerticalNavMenu>
          <NavItem
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            }
          >
            Dashboard
          </NavItem>
          <NavItem
            active
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            }
          >
            Placements
          </NavItem>
          <NavItem
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="20" y2="10" />
                <line x1="18" x2="18" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="16" />
              </svg>
            }
          >
            Reports
          </NavItem>
        </VerticalNavMenu>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: "1px solid var(--border-medium)", flexShrink: 0 }}>
        <VerticalNavMenu>
          <NavItem
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            }
          >
            Calendar
          </NavItem>
          <NavItem
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
              </svg>
            }
          >
            Help
          </NavItem>
        </VerticalNavMenu>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 12px" }}>
          <Avatar mode="initials" initials="SM" shape="circle" theme="shadow" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>Samuel Mackay</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Top bar ────────────────────────────────────────────────────────────── */

interface TopBarProps {
  status: "not-started" | "completed"
  onFinalise: () => void
}

function TopBar({ status, onFinalise }: TopBarProps) {
  const statusLabel = status === "completed" ? "Completed" : "Not started"
  const statusColor = status === "completed" ? "var(--text-positive)" : "var(--text-light)"

  return (
    <div
      style={{
        backgroundColor: "var(--bg-element)",
        borderBottom: "1px solid var(--border-medium)",
        padding: "14px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {["Sophia Johnson", "Milestones", "Japanese Cuisine"].map((crumb, i, arr) => (
          <React.Fragment key={crumb}>
            <span style={{ fontSize: 13, color: "var(--text-light)", lineHeight: "20px" }}>{crumb}</span>
            {i < arr.length - 1 && (
              <span style={{ color: "var(--text-light)", display: "flex", alignItems: "center" }}>
                <ChevronRight size={14} />
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text)",
              flexShrink: 0,
            }}
          >
            <BackArrow />
          </button>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", margin: 0, lineHeight: "20px" }}>
              Commercial Cookery Milestone Checklist Cuisine
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 13, color: statusColor, lineHeight: "16px" }}>{statusLabel}</span>
              <span style={{ color: "var(--text-light)", fontSize: 10, lineHeight: "16px" }}>•</span>
              <span style={{ fontSize: 13, color: "var(--text-light)", lineHeight: "16px" }}>
                Milestone checklist
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {status === "completed" && (
            <span style={{ fontSize: 13, color: "var(--text-positive)", display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m20 6-11 11-5-5" />
              </svg>
              Saved
            </span>
          )}
          <Button variant="default" leftIcon={<CheckmarkIcon />} onClick={onFinalise}>
            Finalise
          </Button>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text)",
            }}
          >
            <MoreVertical />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Attachment chip ────────────────────────────────────────────────────── */

function AttachmentChip({ count }: { count: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 24,
        padding: "0 6px",
        borderRadius: 3,
        backgroundColor: "var(--bg-element)",
        boxShadow: "var(--shadow-button)",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text)", lineHeight: 1 }}>{count}</span>
      <PaperclipIcon />
    </div>
  )
}

/* ─── Scoring panel (left checklist) ─────────────────────────────────────── */

interface ScoringPanelProps {
  sections: ChecklistSection[]
  checkedItems: Set<string>
  achievedIds: Set<string>
  totalItems: number
  onToggleItem: (id: string) => void
  onToggleSectionExpand: (sectionId: string) => void
  onSetItems: (ids: string[], value: boolean) => void
  onMarkAchieved: () => void
  onMarkNotAchieved: () => void
}

function ScoringPanel({
  sections,
  checkedItems,
  achievedIds,
  totalItems,
  onToggleItem,
  onToggleSectionExpand,
  onSetItems,
  onMarkAchieved,
  onMarkNotAchieved,
}: ScoringPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const allItemIds = sections.flatMap((s) => s.items.map((i) => i.id))
  const markedCount = checkedItems.size
  const progressPct = (markedCount / totalItems) * 100
  const allChecked = allItemIds.length > 0 && allItemIds.every((id) => checkedItems.has(id))
  const someChecked = allItemIds.some((id) => checkedItems.has(id))
  const hasSelections = checkedItems.size > 0

  return (
    <div
      style={{
        width: 352,
        minWidth: 352,
        backgroundColor: "var(--bg-secondary)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            border: "1px solid var(--border-medium)",
            borderRadius: 6,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header: count + progress */}
          <div
            style={{
              backgroundColor: "var(--bg-element)",
              padding: "16px 12px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", lineHeight: "20px" }}>
                {totalItems} Items
              </span>
              <span style={{ fontSize: 14, color: "var(--text-light)", lineHeight: "20px" }}>
                {markedCount}/{totalItems} marked
              </span>
            </div>
            <div
              style={{
                height: 4,
                borderRadius: 6,
                backgroundColor: "var(--primary-300)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 6,
                  backgroundColor: "var(--primary-700)",
                  width: `${progressPct}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Search */}
          <div
            style={{
              backgroundColor: "var(--bg-element)",
              borderTop: "1px solid var(--border-medium)",
              borderBottom: "1px solid var(--border-medium)",
              padding: "14px 12px",
              flexShrink: 0,
            }}
          >
            <Input
              placeholder="Search Items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <i
                  className="icon-contact-user-search-people"
                  style={{ fontSize: 16, color: "var(--text-light)" }}
                />
              }
            />
          </div>

          {/* Scrollable item list */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {/* Select all */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderBottom: "1px solid var(--border-medium)",
                backgroundColor: "var(--bg-element)",
              }}
            >
              <Checkbox
                checked={allChecked ? true : someChecked ? "indeterminate" : false}
                onCheckedChange={() => onSetItems(allItemIds, !allChecked)}
              />
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", lineHeight: "20px" }}>
                Select all
              </span>
            </div>

            {sections.map((section) => {
              const filteredItems = searchQuery
                ? section.items.filter((item) =>
                    item.text.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : section.items
              if (searchQuery && filteredItems.length === 0 && section.items.length > 0) return null

              const sectionAllChecked =
                filteredItems.length > 0 && filteredItems.every((i) => checkedItems.has(i.id))
              const sectionSomeChecked = filteredItems.some((i) => checkedItems.has(i.id))

              return (
                <div key={section.id}>
                  {/* Section header row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      backgroundColor: "var(--bg-element)",
                      borderBottom: "1px solid var(--border-medium)",
                      cursor: "pointer",
                    }}
                    onClick={() => onToggleSectionExpand(section.id)}
                  >
                    <Checkbox
                      checked={sectionAllChecked ? true : sectionSomeChecked ? "indeterminate" : false}
                      onCheckedChange={() =>
                        onSetItems(filteredItems.map((i) => i.id), !sectionAllChecked)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--text)",
                        lineHeight: "20px",
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {section.title}
                    </span>
                    <span style={{ color: "var(--text-light)", flexShrink: 0, display: "flex" }}>
                      {section.expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </span>
                  </div>

                  {/* Section items */}
                  {section.expanded &&
                    filteredItems.map((item) => {
                      const isAchieved = achievedIds.has(item.id)
                      return (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 12px",
                            backgroundColor: isAchieved ? "var(--bg-secondary-hover)" : "var(--bg-element)",
                            borderTop: "1px solid var(--border-medium)",
                          }}
                        >
                          <Checkbox
                            checked={checkedItems.has(item.id)}
                            onCheckedChange={() => onToggleItem(item.id)}
                          />
                          <span
                            style={{
                              flex: 1,
                              fontSize: 14,
                              color: isAchieved ? "var(--text-light)" : "var(--text)",
                              lineHeight: "20px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              minWidth: 0,
                            }}
                          >
                            {item.number}. {item.text}
                          </span>
                          {item.attachments && !isAchieved && <AttachmentChip count={item.attachments} />}
                          {isAchieved && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-positive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                              <path d="m20 6-11 11-5-5" />
                            </svg>
                          )}
                        </div>
                      )
                    })}
                </div>
              )
            })}
          </div>

          {/* Footer action buttons */}
          <div
            style={{
              backgroundColor: "var(--bg-element)",
              borderTop: "1px solid var(--border-medium)",
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <Button
              variant={hasSelections ? "default" : "secondary"}
              disabled={!hasSelections}
              leftIcon={<CheckmarkIcon />}
              style={{ width: "100%" }}
              onClick={onMarkAchieved}
            >
              Mark Items Achieved
            </Button>
            <Button
              variant={hasSelections ? "outline" : "secondary"}
              disabled={!hasSelections}
              leftIcon={<CircleOutline />}
              style={{ width: "100%" }}
              onClick={onMarkNotAchieved}
            >
              Mark Items Not Yet Achieved
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Section block (right panel header) ─────────────────────────────────── */

function SectionBlock({ title }: { title: string }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-element)",
        borderRadius: 6,
        padding: 20,
        boxShadow: "var(--shadow-el3)",
      }}
    >
      <h4 style={{ fontSize: 16, fontWeight: 500, color: "var(--text)", margin: 0, lineHeight: "20px" }}>
        {title}
      </h4>
    </div>
  )
}

/* ─── Marking item card ───────────────────────────────────────────────────── */

interface MarkingItemCardProps {
  item: MarkingItem
  onSetAchievement: (id: string, achievement: Achievement) => void
}

function MarkingItemCard({ item, onSetAchievement }: MarkingItemCardProps) {
  const isNotAchieved = item.achievement === "not-achieved"
  const isAchieved = item.achievement === "achieved"

  function handleNotAchieved() {
    onSetAchievement(item.id, isNotAchieved ? null : "not-achieved")
  }

  function handleAchieved() {
    onSetAchievement(item.id, isAchieved ? null : "achieved")
  }

  return (
    <div
      style={{
        backgroundColor: "var(--bg-element)",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "var(--shadow-el3)",
      }}
    >
      {/* Question + buttons */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 14, color: "var(--text)", lineHeight: "20px" }}>
          <p style={{ margin: 0 }}>
            {item.number}. {item.question}
          </p>
          {item.bullets && (
            <div style={{ marginTop: 4 }}>
              {item.bullets.map((bullet, i) => (
                <p key={i} style={{ margin: 0 }}>
                  • {bullet}
                </p>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Button
            variant={isNotAchieved ? "default" : "outline"}
            leftIcon={<CircleOutline />}
            onClick={handleNotAchieved}
          >
            Not yet achieved
          </Button>
          <Button
            variant={isAchieved ? "positive" : "outline"}
            leftIcon={<CheckCircle />}
            onClick={handleAchieved}
          >
            Achieved
          </Button>
        </div>
      </div>

      {/* Notes / Log tabs */}
      <Tabs defaultValue="notes">
        <TabsList style={{ borderTop: "1px solid var(--border-medium)" }}>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="log">Log</TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <div style={{ padding: 16 }}>
            <Button variant="tertiary" leftIcon={<PlusIcon />}>
              Add note
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="log">
          <div style={{ padding: 16 }}>
            <p style={{ fontSize: 13, color: "var(--text-light)", margin: 0 }}>No log entries yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ─── Toast ──────────────────────────────────────────────────────────────── */

interface Toast {
  id: number
  message: string
}

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 600,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            backgroundColor: "var(--bg-element)",
            borderRadius: 8,
            boxShadow: "var(--shadow-el3)",
            pointerEvents: "all",
            minWidth: 260,
            maxWidth: 360,
            animation: "toast-in 0.2s ease",
          }}
        >
          <span style={{ color: "var(--text-positive)", flexShrink: 0, display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <span style={{ flex: 1, fontSize: 13, color: "var(--text)", lineHeight: "18px" }}>{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              borderRadius: 4,
              color: "var(--text-light)",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <XIcon />
          </button>
        </div>
      ))}
    </div>
  )
}

/* ─── Signature modal ────────────────────────────────────────────────────── */

interface SignatureModalProps {
  onCancel: () => void
  onFinalise: () => void
}

function SignatureModal({ onCancel, onFinalise }: SignatureModalProps) {
  const [tab, setTab] = useState<"draw" | "type">("draw")
  const [typedSig, setTypedSig] = useState("")
  const [hasDrawing, setHasDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawing(false)
  }, [tab])

  function getPos(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ("touches" in e) {
      const touch = e.touches[0]
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  function startDraw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    drawing.current = true
    lastPos.current = getPos(e)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const pos = getPos(e)
    if (lastPos.current) {
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = "var(--text)"
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()
      setHasDrawing(true)
    }
    lastPos.current = pos
  }

  function endDraw() {
    drawing.current = false
    lastPos.current = null
  }

  function clearCanvas() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawing(false)
  }

  const canFinalise = tab === "draw" ? hasDrawing : typedSig.trim().length > 0

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "var(--bg-element)",
          borderRadius: 8,
          boxShadow: "var(--shadow-el3)",
          width: 480,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-medium)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>Provide Signature</span>
          <button
            onClick={onCancel}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 4,
              color: "var(--text-light)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <XIcon />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-medium)" }}>
          {(["draw", "type"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: "none",
                border: "none",
                borderBottom: tab === t ? "2px solid var(--primary-700)" : "2px solid transparent",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "var(--primary-700)" : "var(--text-light)",
                transition: "all 0.15s",
              }}
            >
              {t === "draw" ? "Draw" : "Type"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: 20 }}>
          {tab === "draw" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 6,
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-secondary)",
                  overflow: "hidden",
                }}
              >
                {!hasDrawing && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--text-light)" }}>Add your signature here</span>
                    <div style={{ width: "70%", height: 1, backgroundColor: "var(--border-medium)", marginTop: 32 }} />
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  width={440}
                  height={160}
                  style={{ display: "block", width: "100%", height: 160, cursor: "crosshair", touchAction: "none" }}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={endDraw}
                />
              </div>
              {hasDrawing && (
                <button
                  onClick={clearCanvas}
                  style={{
                    alignSelf: "flex-end",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "var(--text-light)",
                    padding: "2px 0",
                    textDecoration: "underline",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          ) : (
            <div>
              <Input
                placeholder="Type your full name"
                value={typedSig}
                onChange={(e) => setTypedSig(e.target.value)}
                style={{ fontFamily: "Georgia, serif", fontSize: 18, height: 48 }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid var(--border-medium)",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" disabled={!canFinalise} leftIcon={<CheckmarkIcon />} onClick={onFinalise}>
            Finalise
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export function SupervisorChecklistPage() {
  const [sections, setSections] = useState<ChecklistSection[]>(INITIAL_SECTIONS)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [markingItems, setMarkingItems] = useState<MarkingItem[]>(INITIAL_MARKING_ITEMS)
  const [showModal, setShowModal] = useState(false)
  const [status, setStatus] = useState<"not-started" | "completed">("not-started")
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastCounter = useRef(0)

  function showToast(message: string) {
    const id = ++toastCounter.current
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => dismissToast(id), 4000)
  }

  function dismissToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const allItemIds = sections.flatMap((s) => s.items.map((i) => i.id))
  const achievedIds = new Set(markingItems.filter((m) => m.achievement === "achieved").map((m) => m.id))

  function toggleItem(id: string) {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function setItems(ids: string[], value: boolean) {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => (value ? next.add(id) : next.delete(id)))
      return next
    })
  }

  function toggleSectionExpand(sectionId: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, expanded: !s.expanded } : s))
    )
  }

  function setAchievement(id: string, achievement: Achievement) {
    setMarkingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, achievement } : item))
    )
    if (achievement === "achieved") showToast("1 item marked 'Achieved'")
    else if (achievement === "not-achieved") showToast("1 item marked 'Not yet achieved'")
  }

  function markSelectedAchieved() {
    const count = checkedItems.size
    setMarkingItems((prev) =>
      prev.map((item) => (checkedItems.has(item.id) ? { ...item, achievement: "achieved" } : item))
    )
    setCheckedItems(new Set())
    showToast(`${count} ${count === 1 ? "item" : "items"} marked 'Achieved'`)
  }

  function markSelectedNotAchieved() {
    const count = checkedItems.size
    setMarkingItems((prev) =>
      prev.map((item) =>
        checkedItems.has(item.id) ? { ...item, achievement: "not-achieved" } : item
      )
    )
    setCheckedItems(new Set())
    showToast(`${count} ${count === 1 ? "item" : "items"} marked 'Not yet achieved'`)
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--bg-secondary)",
        minWidth: 1100,
      }}
    >
      <GlobalNav />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar status={status} onFinalise={() => setShowModal(true)} />

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <ScoringPanel
            sections={sections}
            checkedItems={checkedItems}
            achievedIds={achievedIds}
            totalItems={TOTAL_ITEMS}
            onToggleItem={toggleItem}
            onToggleSectionExpand={toggleSectionExpand}
            onSetItems={setItems}
            onMarkAchieved={markSelectedAchieved}
            onMarkNotAchieved={markSelectedNotAchieved}
          />

          {/* Questions / marking area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              {sections
                .filter((s) => s.items.length > 0)
                .map((section) => (
                  <React.Fragment key={section.id}>
                    <SectionBlock title={section.title} />
                    {section.items.map((sectionItem) => {
                      const markingItem = markingItems.find((m) => m.id === sectionItem.id)
                      if (!markingItem) return null
                      return (
                        <MarkingItemCard
                          key={markingItem.id}
                          item={markingItem}
                          onSetAchievement={setAchievement}
                        />
                      )
                    })}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <SignatureModal
          onCancel={() => setShowModal(false)}
          onFinalise={() => {
            setStatus("completed")
            setShowModal(false)
          }}
        />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default SupervisorChecklistPage
