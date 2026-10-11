import * as React from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
import {
  MONTH_NAMES,
  parsePeriod,
  periodLabel,
  periodText,
  quarterMonths,
  type PeriodGrain,
} from "~/lib/periods"
import { cn } from "~/lib/utils"

/** A when at the grain it is known at: a day, a month or a quarter.
 *
 *  Reads and writes the text `~/lib/periods` parses — `2026-10-31`,
 *  `2026-10`, `2026-Q4` — or `""` for none. The trigger is `DateField`'s box,
 *  so the two sit in a column of inputs as one family; the popover opens on
 *  the grain and year of the value it holds. Picking the chosen month or
 *  quarter again clears it, as picking the chosen day does. Colour is the
 *  theme's accent only. */
export function PeriodPicker({
  value,
  onChange,
  label,
  disabled,
  className,
}: {
  value: string
  onChange: (value: string) => void
  /** Names the control for a screen reader. */
  label: string
  disabled?: boolean
  className?: string
}) {
  const period = parsePeriod(value)
  const [open, setOpen] = React.useState(false)
  const [grain, setGrain] = React.useState<PeriodGrain>(
    period?.grain ?? "month"
  )
  const [year, setYear] = React.useState(
    period?.year ?? new Date().getFullYear()
  )

  // Reopening starts from the value again, not from wherever browsing left off.
  const onOpenChange = (next: boolean) => {
    if (next) {
      setGrain(period?.grain ?? "month")
      setYear(period?.year ?? new Date().getFullYear())
    }
    setOpen(next)
  }

  const pick = (next: string) => {
    onChange(next === value ? "" : next)
    setOpen(false)
  }

  const selectedDay =
    period?.grain === "day"
      ? new Date(period.year, period.month - 1, period.day)
      : undefined

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        aria-label={label}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none select-none hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-open:border-ring data-open:ring-[3px] data-open:ring-ring/50",
          className
        )}
      >
        <span className={period ? undefined : "text-muted-foreground"}>
          {period ? periodLabel(value) : "Day, month or quarter"}
        </span>
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-72 gap-3 p-3">
        <ToggleGroup
          aria-label="Grain"
          className="grid w-full grid-cols-3"
          value={[grain]}
          onValueChange={(next) => {
            const g = next[0] as PeriodGrain | undefined
            if (g) setGrain(g)
          }}
        >
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
          <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
        </ToggleGroup>

        {grain === "day" ? (
          <Calendar
            mode="single"
            required={false}
            weekStartsOn={1}
            className="mx-auto p-0"
            selected={selectedDay}
            defaultMonth={selectedDay ?? new Date(year, new Date().getMonth())}
            onSelect={(date) =>
              date
                ? pick(
                    periodText({
                      grain: "day",
                      year: date.getFullYear(),
                      month: date.getMonth() + 1,
                      day: date.getDate(),
                    })
                  )
                : pick(value)
            }
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Previous year"
                onClick={() => setYear((y) => y - 1)}
              >
                <ChevronLeft />
              </Button>
              <span className="text-sm font-medium tabular-nums">{year}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Next year"
                onClick={() => setYear((y) => y + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
            {grain === "month" ? (
              <div className="grid grid-cols-4 gap-1">
                {MONTH_NAMES.map((name, i) => {
                  const text = periodText({
                    grain: "month",
                    year,
                    month: i + 1,
                  })
                  return (
                    <Cell
                      key={name}
                      on={text === value}
                      onClick={() => pick(text)}
                    >
                      {name}
                    </Cell>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1">
                {[1, 2, 3, 4].map((quarter) => {
                  const text = periodText({ grain: "quarter", year, quarter })
                  const on = text === value
                  return (
                    <Cell
                      key={quarter}
                      on={on}
                      onClick={() => pick(text)}
                      className="h-14 flex-col gap-0.5"
                    >
                      <span>{quarterMonths(quarter)}</span>
                      <span
                        className={cn(
                          "text-xs font-normal",
                          !on && "text-muted-foreground"
                        )}
                      >
                        Q{quarter} {year}
                      </span>
                    </Cell>
                  )
                })}
              </div>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

/** A month or a quarter: a ghost button, the theme's accent when chosen. */
function Cell({
  on,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { on: boolean }) {
  return (
    <Button
      variant="ghost"
      aria-pressed={on}
      className={cn(
        "h-9 font-normal",
        on && "bg-accent font-medium text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}
