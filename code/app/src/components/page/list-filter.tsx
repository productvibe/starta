import { Check } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/lib/utils"

// The controls a list narrows itself with: a quiet word that opens a box of
// choices, and the rows inside it.
//
// Shared by every list that narrows itself — the datatable's toolbar today —
// which is the reason it is here rather than private to one. Two copies of the
// same control would drift in weight, in padding and in how the box marks what
// is on.
//
// Both write to the URL rather than to component state. A narrowed list is a
// place: it survives a reload, it can be handed to someone, and Back undoes it.

/** How a control in a list's strip looks, in one place: the popover's own
 *  trigger, and anything else standing beside it. Two hand-matched sets of
 *  classes in one strip is the drift this avoids.
 *
 *  Named options rather than a row of booleans: there are three of them now, and
 *  `(true, false, true)` at a call site says nothing about which is which. */
export type FilterControlLook = {
  /** holding something back, and filled at the ramp's active step to say so */
  active?: boolean
  /** The icon-only form, for a strip inside a pane you can drag to 180px: three
   *  words do not fit there, and a clipped control is worse than a mark you have
   *  to learn. The fill still says which ones are holding something back, so
   *  nothing about the state moves into a tooltip. */
  bare?: boolean
  /** Give the control its own edge — for the datatable toolbar's narrow form,
   *  which replaces the wide one whose type toggles are this geometry exactly
   *  with a border. Dropping the edge as the window narrows would make one
   *  control two looks. */
  bordered?: boolean
}

export function filterControlClasses({
  active,
  bare,
  bordered,
}: FilterControlLook = {}): string {
  return cn(
    "flex items-center gap-1.5 rounded-lg py-1 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground [&>svg]:size-4",
    bare ? "px-1.5" : "px-2.5",
    // The border is present either way and only changes colour, so a control
    // does not move by a pixel as it is switched on.
    bordered && (active ? "border border-transparent" : "border border-border"),
    active && "bg-foreground/8 text-foreground"
  )
}

/** One control: a quiet button that opens a box of rows. Filled at the ramp's
 *  active step while it is holding something back — a filter you cannot see is
 *  a list that lies about what it holds. Chrome size, 14px, like every other
 *  control in the app, and muted until it is holding something back. */
export function FilterControl({
  icon,
  name,
  label,
  active,
  bordered,
  children,
}: {
  icon: React.ReactNode
  /** What the control is, for the pointer and for a screen reader. Always
   *  given: an icon on its own has to say its own name somewhere. */
  name: string
  /** The words beside the icon. Left out where the strip has no room for them,
   *  and then `name` is the whole of what the control says. */
  label?: string
  active?: boolean
  /** See `FilterControlLook.bordered`. */
  bordered?: boolean
  children: React.ReactNode
}) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label={name}
        title={name}
        className={filterControlClasses({ active, bare: !label, bordered })}
      >
        {icon}
        {label}
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-52 gap-0 p-1">
        {children}
      </PopoverContent>
    </Popover>
  )
}

/** A heading inside a box that holds more than one kind of thing. */
export function FilterGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pt-2 pb-1 text-[11px] text-muted-foreground first:pt-1">
      {children}
    </div>
  )
}

/** One choice. The tick is the state and it holds its column whether or not it
 *  is showing, so a box of rows does not shuffle sideways as you click down
 *  it. */
export function FilterOption({
  checked,
  onSelect,
  children,
}: {
  checked: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={onSelect}
      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-accent"
    >
      <Check
        className={cn("size-3.5 shrink-0", !checked && "invisible")}
        aria-hidden
      />
      <span className="truncate">{children}</span>
    </button>
  )
}
