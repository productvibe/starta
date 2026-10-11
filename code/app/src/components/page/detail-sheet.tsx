import { useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet"
import { cn } from "~/lib/utils"

// The row-detail sheet, shared by everything in the app that shows a record's
// fields: the datatable's rows, and About's role. It is the component that
// decides what "opening a row" looks like everywhere.
//
// It only draws. A field's value is whatever it is handed — a line of text where
// the record is being read, an input where it is being edited (see
// `~/blocks/datatable/rows`) — so both states are one shape by construction rather
// than by two components agreeing to look alike.

/** An empty value reads as "—" rather than as nothing, so a blank is visibly a
 *  blank instead of looking like a rendering failure. */
export function Blank() {
  return <span className="text-muted-foreground/40">—</span>
}

export type Field = { label: string; value: React.ReactNode }

/** One tab of a sheet that has more than a record's worth in it. `empty` is what
 *  the tab shows when it has no fields at all — a tab that can be empty is
 *  usually the interesting one (a persona nobody has written yet), and a blank
 *  panel says "broken" where a prompt says "your turn". */
export type SheetTab = { label: string; fields: Field[]; empty?: string }

/** Details sheet, on the right, top to bottom. The layout is what the editor pass
 *  needed: fields are stacked, label above value, each one a full-width block. A
 *  value that is an input needs the whole column — a label in a fixed left
 *  gutter leaves a text field squeezed into what is left, and reads badly on a
 *  phone besides.
 *
 *  One type scale throughout: every label is the same, every value is the same,
 *  and a long note is a field like any other rather than a section with styling
 *  of its own. `modal={false}` keeps what is behind it readable.
 *
 *  Takes `fields` for a record that is one list, or `tabs` for one that is two
 *  — a person is their details *and* their persona, and stacking both in one
 *  column buries whichever is second. Not both: a sheet with a tab strip and a
 *  loose set of fields above it has two answers to "where does a field go".
 */
type DetailSheetProps = {
  title: string
  description: string
  onClose: () => void
  /** What the record can have done to it, under its fields — a delete, today.
   *  Below rather than beside the title: the title names the row, and an action
   *  next to it is the one place a mis-click is most expensive. Absent on a
   *  sheet that only shows. */
  footer?: React.ReactNode
  /** Controls for the panel itself rather than for the record — where it sits,
   *  closing it. Beside the title, where a window's own controls go, and the
   *  only thing allowed up there for that reason. */
  action?: React.ReactNode
  /** Draw the sheet's own close button at the top right. Off where the panel
   *  supplies its own in `action`, so a record cannot end up with two ways to
   *  close it a few pixels apart. */
  showCloseButton?: boolean
  /** Print the title as a heading over the fields. Off where the record's own
   *  name is one of those fields — a row sheet, where "Name" sits under a
   *  heading saying the same words. It is the rule the field labels already
   *  follow against their tab: whatever has already been said is not said
   *  again. The sheet keeps the title as its accessible name either way.
   *
   *  A panel with no Name field keeps its heading, because there nothing
   *  else on screen says which record this is. */
  heading?: boolean
  /** Extra classes on the sheet's surface. For the one panel that is sometimes
   *  a sheet and sometimes a pane and has to look the same either way. */
  className?: string
} & ({ fields: Field[]; tabs?: never } | { tabs: SheetTab[]; fields?: never })

export function DetailSheet({
  title,
  description,
  fields,
  tabs,
  footer,
  action,
  heading = true,
  showCloseButton = true,
  className,
  onClose,
}: DetailSheetProps) {
  return (
    <Sheet
      open
      modal={false}
      disablePointerDismissal
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {/* Not docked: the sheet runs the full height of the window, over the
          page's header, as Notion's side peek does. What the header holds — a
          list's Add — belongs to the list, not to the record on top of it. */}
      <SheetContent
        overlay={false}
        showCloseButton={showCloseButton}
        className={cn(
          "no-scrollbar w-full gap-0 overflow-y-auto p-0 sm:max-w-md",
          className
        )}
      >
        {/* The sheet's own accessible name, said once for the dialog and once in
            ink by the body below — base UI needs a `SheetTitle` inside the
            popup, and the visible heading is `DetailBody`'s so that a pinned
            panel and a floating sheet are the same object on screen. */}
        <SheetHeader className="gap-0 p-0">
          <SheetTitle className="sr-only">{title}</SheetTitle>
          <SheetDescription className="sr-only">{description}</SheetDescription>
        </SheetHeader>
        {/* The close button is the sheet's, absolutely placed at the top right,
            so the body reserves room for it. */}
        <DetailBody
          title={title}
          fields={fields}
          tabs={tabs}
          footer={footer}
          action={action}
          heading={heading}
          reserveClose={showCloseButton}
        />
      </SheetContent>
    </Sheet>
  )
}

/** The record itself: its name, its fields, what can be done to it. Everything
 *  a details panel is, with nothing about *where* it is.
 *
 *  Its own component because there are two places now — the floating sheet, and
 *  the same fields laid on a page (About's role) — and they have to be the
 *  same object on screen rather than two that look alike. */
export function DetailBody({
  title,
  fields,
  tabs,
  footer,
  action,
  heading = true,
  reserveClose,
}: Omit<DetailSheetProps, "onClose" | "description"> & {
  /** leave room at the top right for a close button drawn by something else —
   *  the sheet's own */
  reserveClose?: boolean
}) {
  // One code path for both shapes: a plain field list is a single unnamed tab,
  // and the strip only appears once there is a choice to make.
  const panels: SheetTab[] = tabs ?? [{ label: "", fields: fields ?? [] }]
  const [active, setActive] = useState(0)
  const panel = panels[Math.min(active, panels.length - 1)]

  // Whatever is first on screen owns the top padding, and the close button is
  // absolutely placed, so whatever is first also has to clear it. Both move as
  // the heading comes and goes rather than being spelled out on each block.
  const top = cn("px-6 pt-6", reserveClose && "pr-12")
  /** Nothing above the fields at all — no heading, no action, no tab strip — so
   *  the fields themselves are the first thing in the sheet. */
  const bare = !heading && !action && panels.length < 2

  return (
    <>
      {(heading || action) && (
        <div className={cn("flex items-start gap-3 pb-5", top)}>
          {heading && (
            <h2 className="min-w-0 text-lg leading-snug font-medium break-words">
              {title}
            </h2>
          )}
          {action && (
            <div className="-mt-1 ml-auto flex shrink-0 items-center">
              {action}
            </div>
          )}
        </div>
      )}

      {/* The same segmented control the page header uses for its view
            choices: the one you are on is filled at the ramp's active step, the
            others are quiet. Switching panels inside a sheet and switching
            views inside a page are the same gesture, so they look the same. */}
      {panels.length > 1 && (
        <div
          role="tablist"
          className={cn(
            "flex items-center gap-1",
            heading || action ? "-mt-1 mb-5 px-6" : cn("pb-5", top)
          )}
        >
          {panels.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-md px-2.5 py-1 text-sm transition-colors",
                i === active
                  ? "bg-foreground/8 font-medium text-foreground"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {panel.fields.length === 0 && panel.empty ? (
        <p
          className={cn(
            "pb-8 text-sm leading-relaxed text-muted-foreground",
            bare ? top : "px-6"
          )}
        >
          {panel.empty}
        </p>
      ) : (
        <dl className={cn("flex flex-col gap-5 pb-8", bare ? top : "px-6")}>
          {panel.fields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              {/* A field whose label repeats the tab it is on goes without
                    one: the strip above has already named it, and "Note" over a
                    box on a tab called Note is the same word twice. The field
                    keeps its label as its identity and its accessible name —
                    only the printed one goes. */}
              {field.label !== panel.label && (
                <dt className="text-sm text-muted-foreground">{field.label}</dt>
              )}
              <dd className="text-sm leading-relaxed text-foreground">
                {field.value ?? <Blank />}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {footer && (
        // Pinned to the bottom of the sheet, not parked after the fields: on
        // a record with a long note the footer is a screen down, and Save is
        // not something you should have to go looking for. `bg-background`
        // because it is scrolled under.
        <div className="sticky bottom-0 z-10 mt-auto flex items-center border-t border-border bg-background px-4 py-3">
          {footer}
        </div>
      )}
    </>
  )
}
