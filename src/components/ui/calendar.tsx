import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("ax-calendar", className)}
      classNames={{
        months:       "ax-calendar-months",
        month:        "ax-calendar-month",
        caption:      "ax-calendar-caption",
        caption_label:"ax-calendar-caption-label",
        nav:          "ax-calendar-nav",
        nav_button:   "ax-calendar-nav-btn",
        nav_button_previous: "ax-calendar-nav-btn-prev",
        nav_button_next:     "ax-calendar-nav-btn-next",
        table:        "ax-calendar-table",
        head_row:     "ax-calendar-head-row",
        head_cell:    "ax-calendar-head-cell",
        row:          "ax-calendar-row",
        cell:         "ax-calendar-cell",
        day:          "ax-calendar-day",
        day_selected:     "ax-calendar-day--selected",
        day_today:        "ax-calendar-day--today",
        day_outside:      "ax-calendar-day--outside",
        day_disabled:     "ax-calendar-day--disabled",
        day_range_start:  "ax-calendar-day--selected",
        day_range_end:    "ax-calendar-day--selected",
        day_range_middle: "ax-calendar-day--range-middle",
        day_hidden:   "invisible",
        ...classNames,
      }}
      components={{
        IconLeft:  () => <ChevronLeft />,
        IconRight: () => <ChevronRight />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
