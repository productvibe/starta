import * as React from "react"

import { dateLabel, parsePlainDate, toPlainDate } from "~/lib/dates"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/lib/utils"
import { CalendarIcon } from "lucide-react"

/** A date on a row: the day it is, or the blank it usually is.
 *
 *  Reads and writes `YYYY-MM-DD` through `~/lib/dates`, which is where the
 *  parsing, the formatting and the reason both go by parts now live.
 *
 *  One control for every date in the app — a task's due date, a person's last
 *  contact — because a sheet's fields are one shape (see DESIGN.md) and two
 *  ways of answering "which day" is the sort of thing that reads as two
 *  different products.
 *
 *  It replaces `<input type="date">`. That control was the browser's own, which
 *  sounds like the cheapest possible answer and mostly was: it typed, it picked,
 *  and it spoke `YYYY-MM-DD` underneath. What it would not do is look like this
 *  app — the popup is the platform's, drawn in the platform's blue at the
 *  platform's size, and on a page this quiet it arrived like a notification.
 *
 *  What is given up with it is typing: this picks. A typed path would need to
 *  parse what was typed, and `07/09/2026` is the seventh of September to the
 *  user and the ninth of July to the parser unless someone states which — a
 *  decision worth taking on purpose rather than inheriting from a locale.
 */
export function DateField({
  value,
  onChange,
  label,
  disabled,
  className,
}: {
  /** `YYYY-MM-DD`, or `""` for no date. */
  value: string
  /** The new value, `""` when cleared — the empty string rather than undefined,
   *  because the callers hold it in form state where a field always has one. */
  onChange: (value: string) => void
  /** Names the control for a screen reader; the visible label is the field's
   *  own row in the sheet. */
  label: string
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const selected = parsePlainDate(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={label}
        disabled={disabled}
        // The field's own box, not a button's: it sits in a column of inputs
        // and reads as one of them, so it takes `Input`'s height, ring and
        // border. A date with no value shows the format it wants in the
        // placeholder's colour, which is what the native control did too.
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none select-none hover:bg-accent/40 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-open:border-ring data-open:ring-[3px] data-open:ring-ring/50",
          className
        )}
      >
        {/* `dateLabel`, the same formatter the tables use — so the date reads
            the same while you are choosing it as it does everywhere it lands
            afterwards. */}
        <span className={selected ? undefined : "text-muted-foreground"}>
          {selected ? dateLabel(value) : "dd/mm/yyyy"}
        </span>
        <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-auto gap-0 p-0">
        <Calendar
          mode="single"
          // `required={false}` is what makes picking the selected day again
          // clear the field, so the way out is the way in rather than a second
          // control saying "Clear".
          required={false}
          // Monday, as the native control had it here and as the placeholder
          // says: `react-day-picker`'s own default is Sunday, which is the one
          // thing the shadcn calendar gets wrong for this user.
          weekStartsOn={1}
          selected={selected}
          // A blank field opens on this month; a filled one opens on the month
          // it holds, which is the whole reason to reopen it.
          defaultMonth={selected}
          onSelect={(date) => {
            onChange(date ? toPlainDate(date) : "")
            setOpen(false)
          }}
          // The calendar is the popover's only content, so it takes the caret
          // on open — arrow keys move by day from there.
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
