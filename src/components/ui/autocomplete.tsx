"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface AutocompleteOption {
  value: string
  label: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value?: string
  onChange?: (value: string) => void
  onQueryChange?: (query: string) => void
  placeholder?: string
  leftIcon?: React.ReactNode
  loading?: boolean
  className?: string
}

const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  ({ options, value: controlledValue, onChange, onQueryChange, placeholder, leftIcon, loading = false, className }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string>("")
    const [query, setQuery] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(-1)

    const isControlled = controlledValue !== undefined
    const selectedValue = isControlled ? controlledValue : internalValue
    const selectedLabel = options.find((o) => o.value === selectedValue)?.label ?? ""
    const inputValue = selectedValue ? selectedLabel : query

    // When onQueryChange is provided, skip internal filtering — caller manages options
    const filtered = React.useMemo(() => {
      if (onQueryChange) return options
      if (!query) return options
      const q = query.toLowerCase()
      return options.filter((o) => o.label.toLowerCase().includes(q))
    }, [options, query, onQueryChange])

    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLUListElement>(null)

    const handleSelect = (option: AutocompleteOption) => {
      if (!isControlled) setInternalValue(option.value)
      onChange?.(option.value)
      setQuery("")
      setOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }

    const handleClear = () => {
      if (!isControlled) setInternalValue("")
      onChange?.("")
      onQueryChange?.("")
      setQuery("")
      setOpen(false)
      setActiveIndex(-1)
      inputRef.current?.focus()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedValue) {
        if (!isControlled) setInternalValue("")
        onChange?.("")
      }
      const q = e.target.value
      setQuery(q)
      setOpen(true)
      setActiveIndex(-1)
      onQueryChange?.(q)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter") {
          setOpen(true)
          setActiveIndex(0)
        }
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (activeIndex >= 0 && filtered[activeIndex]) {
          handleSelect(filtered[activeIndex])
        }
      } else if (e.key === "Escape") {
        setOpen(false)
        setActiveIndex(-1)
      }
    }

    React.useEffect(() => {
      if (activeIndex < 0 || !listRef.current) return
      const item = listRef.current.children[activeIndex] as HTMLElement
      item?.scrollIntoView({ block: "nearest" })
    }, [activeIndex])

    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
          setActiveIndex(-1)
        }
      }
      document.addEventListener("mousedown", handler)
      return () => document.removeEventListener("mousedown", handler)
    }, [])

    const mergedRef = (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }

    const hasValue = Boolean(selectedValue)
    const showDropdown = open && (loading || filtered.length > 0)

    return (
      <div ref={mergedRef} className={cn("ax-autocomplete", className)}>
        <div className={cn("ax-input-wrapper", "ax-autocomplete-input-wrap")}>
          {leftIcon && <span className="ax-field-icon-left">{leftIcon}</span>}
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            className={cn(
              "ax-input",
              leftIcon && "ax-input--has-icon-left",
              "ax-autocomplete-input"
            )}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              if (!selectedValue) setOpen(true)
            }}
            onKeyDown={handleKeyDown}
          />
          {hasValue && (
            <button
              type="button"
              className="ax-autocomplete-clear"
              aria-label="Clear"
              onMouseDown={(e) => {
                e.preventDefault()
                handleClear()
              }}
            >
              <i className="ax-icon icon-x-thick" />
            </button>
          )}
        </div>

        {showDropdown && (
          <div className="ax-autocomplete-dropdown">
            {loading ? (
              <div className="ax-autocomplete-loading">
                <Spinner />
                <span>Searching…</span>
              </div>
            ) : (
              <ul ref={listRef} role="listbox" className="ax-autocomplete-list">
                {filtered.map((opt, i) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={opt.value === selectedValue}
                    className={cn(
                      "ax-autocomplete-item",
                      opt.value === selectedValue && "ax-autocomplete-item--selected",
                      i === activeIndex && "ax-autocomplete-item--active"
                    )}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleSelect(opt)
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  }
)
Autocomplete.displayName = "Autocomplete"

export { Autocomplete }
export type { AutocompleteOption, AutocompleteProps }
