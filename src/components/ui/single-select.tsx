"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SingleSelectOption {
  value: string
  label?: string
  icon?: React.ReactNode
  leftIcon?: React.ReactNode
}

interface SingleSelectProps {
  options: SingleSelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  borderless?: boolean
  error?: boolean
  iconOnly?: boolean
  inline?: boolean
  className?: string
}

const SingleSelect = React.forwardRef<HTMLDivElement, SingleSelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      borderless = false,
      error = false,
      iconOnly = false,
      inline = false,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      defaultValue ?? options[0]?.value
    )
    const value = controlledValue ?? internalValue

    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
    const [pillStyle, setPillStyle] = React.useState<React.CSSProperties>({})
    const [ready, setReady] = React.useState(false)

    const updatePill = React.useCallback((selectedValue: string | undefined) => {
      const btn = selectedValue ? buttonRefs.current.get(selectedValue) : null
      if (!btn) return
      setPillStyle({
        left: btn.offsetLeft,
        top: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
      })
    }, [])

    React.useLayoutEffect(() => {
      updatePill(value)
      setReady(true)
    }, [value, updatePill])

    const handleSelect = (optValue: string) => {
      if (controlledValue === undefined) setInternalValue(optValue)
      onChange?.(optValue)
    }

    const setRef = (el: HTMLButtonElement | null, optValue: string) => {
      if (el) buttonRefs.current.set(optValue, el)
      else buttonRefs.current.delete(optValue)
    }

    const mergedRef = (el: HTMLDivElement | null) => {
      containerRef.current = el
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }

    return (
      <div
        ref={mergedRef}
        className={cn(
          "ax-single-select",
          borderless && "ax-single-select--borderless",
          error && "ax-single-select--error",
          inline && "ax-single-select--inline",
          className
        )}
        role="radiogroup"
      >
        {/* Sliding pill */}
        <span
          className="ax-single-select-pill"
          style={{
            ...pillStyle,
            opacity: ready ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {options.map((opt) => {
          const selected = opt.value === value
          return (
            <button
              key={opt.value}
              ref={(el) => setRef(el, opt.value)}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "ax-single-select-option",
                iconOnly && "ax-single-select-option--icon-only",
                selected && "ax-single-select-option--selected"
              )}
            >
              {opt.leftIcon && <span className="ax-single-select-option-left-icon">{opt.leftIcon}</span>}
              {opt.icon && <span className="ax-single-select-option-icon">{opt.icon}</span>}
              {!iconOnly && opt.label && <span>{opt.label}</span>}
            </button>
          )
        })}
      </div>
    )
  }
)
SingleSelect.displayName = "SingleSelect"

export { SingleSelect }
export type { SingleSelectOption, SingleSelectProps }
