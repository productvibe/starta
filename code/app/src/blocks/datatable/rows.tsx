import { useCallback, useEffect, useRef, useState } from "react"

import { Plus } from "lucide-react"

import { HeaderSlot } from "~/components/page/header-slot"
import { DateField } from "~/components/page/date-field"
import { DetailSheet, type Field } from "~/components/page/detail-sheet"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { NativeSelect, NativeSelectOption } from "~/components/ui/native-select"
import { Textarea } from "~/components/ui/textarea"

import { cn } from "~/lib/utils"
import { PeriodPicker } from "~/components/ui/period-picker"
import type { WriteResult } from "~/data/store"
import type { Module } from "~/modules/modules"

import { workIcon } from "./category-icons"
import {
  blankRow,
  DIRECTION_LABEL,
  OWNER_LABEL,
  draftName,
  fromDraft,
  isNamed,
  newId,
  rowTabs,
  toDraft,
  type Draft,
  type Row,
  type RowField,
} from "~/data/fields"
import {
  categoryLabel,
  STATUS_LABEL,
  STATUSES,
  WORK_CATEGORIES,
} from "~/data/status"

// A datatable module's rows, edited.
//
// A record is a form, not a document: a person is not half a person, and a task
// with a name but no type yet is a record you are still filling in. So the
// sheet holds a draft and writes it when you press Save, and closing without
// saving discards it. Save is the way out, and a record's own control belongs
// in the record.
//
// A row is edited in the sheet it was already read in, because a row's fields
// are what the sheet was always showing. There is no inline cell editor: the
// long fields (a note) do not fit in a cell and are the reason
// the sheet exists, and two places to edit the same row would each have to grow
// their own answer to saving.
//
// The whole set is posted on every write rather than the one row that changed.
// The rows of a module are one file, a change is as often a row appearing or
// leaving as a field moving, and it is what lets a write be checked against the
// mtime the page loaded — a per-row write could not say what it was written
// against. The sets are tens of rows; this is a few kilobytes.
//
// Nothing on screen moves until the store has taken the write: `items` is what
// was last read or last written, never what is being typed. A table that
// followed the draft would show a row renaming itself letter by letter, and a
// refused write would leave it saying something the store does not.

/** What the last write did. `idle` covers "nothing written yet" and "written" —
 *  a saved row closes its sheet, so there is no state to narrate afterwards. */
export type SaveState = "idle" | "saving" | "conflict" | "error"

/** The row the sheet is on. `index` is a position in `items`; `null` is a new
 *  row, which is not in the store until it is saved. */
type OpenRow = {
  index: number | null
  draft: Draft
  /** something has been typed — what separates a Save worth offering from a
   *  sheet that was only opened and read */
  edited: boolean
}

export type RowsEditor<T extends Row> = {
  items: T[]
  open: OpenRow | null
  /** Open the sheet on a row. */
  select(index: number): void
  /** Open the sheet on a new, empty row. */
  add(): void
  /** Leave the sheet, discarding anything unsaved. */
  close(): void
  change(key: string, value: string): void
  /** Write the open row and close the sheet. Does nothing while `savable` is
   *  false, so a caller cannot write a half-typed record by asking twice. */
  submit(): void
  /** Remove the open row, and close the sheet once the store has taken it. */
  remove(): void
  /** There is something to write: a named row, and either new or edited. */
  savable: boolean
  saving: boolean
  state: SaveState
}

/** One module's rows, editable.
 *
 *  `save` is a callback: this hook is the part worth keeping wherever the data
 *  lives, and a route action is the part that is not. */
export function useEditableRows<T extends Row>({
  fields,
  loaded,
  asOf,
  save,
}: {
  /** the module's fields, from its registry entry */
  fields: RowField[]
  /** the rows as the page loaded them */
  loaded: T[]
  /** the store's freshness token as the page read it */
  asOf?: number
  save: (items: unknown[], baseline: number | undefined) => Promise<WriteResult>
}): RowsEditor<T> {
  const [items, setItems] = useState<T[]>(loaded)
  const [open, setOpen] = useState<OpenRow | null>(null)
  const [state, setState] = useState<SaveState>("idle")

  const baseline = useRef(asOf)
  // Set by a refused or failed write. Saving stops there rather than retrying:
  // the store holds rows this page never saw, and every further write would be
  // checked against the same stale token and refused for the same reason.
  const [stopped, setStopped] = useState(false)
  const saveProp = useRef(save)
  saveProp.current = save

  // A reload — a file changed on disk, or a revalidation after our own write —
  // replaces what is on screen, but only when there is nothing of the user's to
  // lose: no sheet open, and no write already refused.
  const lastLoaded = useRef(loaded)
  useEffect(() => {
    if (loaded === lastLoaded.current) return
    lastLoaded.current = loaded
    if (open || stopped) return
    baseline.current = asOf
    setItems(loaded)
  }, [loaded, asOf, open, stopped])

  /** Write a whole set of rows, and say whether the store took it. The one
   *  path to the store: saving a row and deleting one differ only in the set
   *  they hand over. */
  const write = useCallback(async (rows: T[]): Promise<boolean> => {
    setState("saving")
    let result: WriteResult
    try {
      result = await saveProp.current(rows, baseline.current)
    } catch {
      setStopped(true)
      setState("error")
      return false
    }
    if (!result.ok) {
      setStopped(true)
      setState(result.reason === "conflict" ? "conflict" : "error")
      return false
    }
    baseline.current = result.updatedAt
    setItems(rows)
    setState("idle")
    return true
  }, [])

  const select = useCallback(
    (index: number) => {
      const row = items[index]
      if (row) setOpen({ index, draft: toDraft(fields, row), edited: false })
    },
    [items, fields]
  )

  const add = useCallback(() => {
    setOpen({
      index: null,
      draft: toDraft(fields, blankRow(fields)),
      edited: false,
    })
  }, [fields])

  const close = useCallback(() => setOpen(null), [])

  const change = useCallback((key: string, value: string) => {
    setOpen((current) =>
      current
        ? {
            ...current,
            draft: { ...current.draft, [key]: value },
            edited: true,
          }
        : current
    )
  }, [])

  // The draft as a row, and whether it is worth writing. A row with no name is
  // never written: it is what an id is derived from, and a nameless row in a
  // table is a line you cannot pick out again.
  const row = open
    ? (fromDraft(fields, open.draft, rowAt(items, open.index)) as T)
    : null
  const savable =
    !!open &&
    !!row &&
    !stopped &&
    state !== "saving" &&
    isNamed(fields, row) &&
    (open.index == null || open.edited)

  const submit = useCallback(async () => {
    if (!savable || !open || !row) return
    const rows =
      open.index == null
        ? // A new row takes the id it will keep here, derived from the name it
          // was saved with. It is never derived again — a task's `person` names
          // a person's id, so a rename must not move it.
          [...items, withId(fields, row, items)]
        : items.map((existing, i) => (i === open.index ? row : existing))
    if (await write(rows)) setOpen(null)
  }, [savable, open, row, items, fields, write])

  const remove = useCallback(async () => {
    if (!open) return
    // A row that was never saved has nothing to delete: closing is the whole
    // of it.
    if (open.index == null) return setOpen(null)
    if (await write(items.filter((_, i) => i !== open.index))) setOpen(null)
  }, [open, items, write])

  return {
    items,
    open,
    select,
    add,
    close,
    change,
    submit,
    remove,
    savable,
    saving: state === "saving",
    state,
  }
}

/** The stored row a draft is based on, or undefined for a new one. What the
 *  editor does not own — an `id` — comes from here. */
function rowAt<T extends Row>(items: T[], index: number | null): T | undefined {
  return index == null ? undefined : items[index]
}

/** A new row with the id it will keep. */
function withId<T extends Row>(fields: RowField[], row: T, taken: T[]): T {
  const ids = taken.map((other) => other.id)
  return { ...row, id: newId(draftName(toDraft(fields, row)), ids) }
}

/** What one row is called in the sheet's words: "New item", "Delete item". */
export const ROW_NOUN = "item"

/** A row of the `people` module, for the person a task names. */
export type Person = Row & { name: string; organisation?: string }

/** The name to show for a stored person id. An id nobody matches — someone
 *  since removed — still renders, as the raw id rather than silently as
 *  nothing, so a dangling reference is visible instead of quietly dropped. */
export function personName(
  people: Person[],
  id: string | undefined
): string | null {
  if (!id) return null
  return people.find((p) => p.id === id)?.name ?? id
}

/** People in reading order: by organisation, then by name. */
export function sortPeople(people: Person[]): Person[] {
  return [...people].sort(
    (a, b) =>
      (a.organisation ?? "").localeCompare(b.organisation ?? "") ||
      (a.name ?? "").localeCompare(b.name ?? "")
  )
}

/** The open row's sheet: one control per field, and what can be done with them.
 *
 *  Every value is plain text: a phrase that renders as markdown means a stray
 *  asterisk changes what you typed. */
export function RowSheet<T extends Row>({
  fields,
  editor,
  people,
}: {
  fields: RowField[]
  editor: RowsEditor<T>
  /** Who a `person` field can be: the people module's rows. */
  people?: Person[]
}) {
  const { open, change, close, submit, remove, savable, saving, state } = editor
  const [confirming, setConfirming] = useState(false)

  // A sheet that moves to another row closes any confirmation with it — the
  // question was about the row you were on.
  const openIndex = open?.index ?? null
  useEffect(() => setConfirming(false), [openIndex, open == null])

  if (!open) return null
  const noun = ROW_NOUN
  const name = draftName(open.draft)
  const tabs = rowTabs(fields)

  const field = (spec: RowField): Field => ({
    label: spec.label,
    value: (
      <RowControl
        field={spec}
        value={open.draft[spec.key] ?? ""}
        onChange={(value) => change(spec.key, value)}
        people={people}
      />
    ),
  })

  const specs = fields
  return (
    <>
      <DetailSheet
        title={name || `New ${noun}`}
        description={`${noun} details`}
        // No printed heading: a record's name is the first field in the sheet,
        // so a heading over it says the same words twice. It stays as the
        // sheet's accessible name. Same rule the field labels follow against
        // their tab — see `DetailBody`.
        heading={false}
        onClose={close}
        {...(tabs
          ? {
              tabs: tabs.map((tab) => ({
                label: tab,
                fields: specs.filter((s) => s.tab === tab).map(field),
              })),
            }
          : { fields: specs.map(field) })}
        footer={
          <>
            {/* Nothing to delete on a row that is not in the store yet: a new
                one is discarded by closing the sheet, and offering to delete
                something that does not exist answers a question nobody
                asked. */}
            {open.index != null && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setConfirming(true)}
              >
                Delete {noun}
              </Button>
            )}

            <div className="ml-auto flex items-center gap-3">
              {/* A refused write is said here rather than only behind the
                  sheet: the text that was not written is still in these
                  fields, and the sentence about it has to be beside them. */}
              {(state === "conflict" || state === "error") && (
                <span className="text-sm text-muted-foreground">
                  {state === "conflict"
                    ? "Changed on disk — reload"
                    : "Could not save"}
                </span>
              )}
              {/* The only filled control in the sheet, because it is the only
                  one that ends it: Save writes the record and closes. Disabled
                  until there is something to write — a new row needs a name, an
                  existing one needs an edit — so a sheet you only opened cannot
                  move the store's mtime. */}
              <Button size="sm" disabled={!savable} onClick={submit}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </>
        }
      />

      {/* Deleting a record is the one irreversible thing in the app, so it asks
          in the ordinary way: a modal, named, with the destructive answer on
          the right and Cancel beside it. The sheet under it is non-modal and
          stays legible, which is the point — you can still read the record you
          are being asked about. */}
      <Dialog open={confirming} onOpenChange={setConfirming}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete this {noun}?</DialogTitle>
            <DialogDescription>
              {name ? `“${name}” ` : `This ${noun} `}
              will be removed from the module's file. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="sm" />}>
              Cancel
            </DialogClose>
            <Button
              size="sm"
              onClick={() => {
                setConfirming(false)
                remove()
              }}
            >
              Delete {noun}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/** One field's control. The kinds differ only in what suits typing the value —
 *  everything here writes a string. */
function RowControl({
  field,
  value,
  onChange,
  people,
}: {
  field: RowField
  value: string
  onChange: (value: string) => void
  people?: Person[]
}) {
  if (field.kind === "status") {
    return (
      <NativeSelect
        className="w-full"
        value={value || "backlog"}
        onChange={(e) => onChange(e.target.value)}
        aria-label={field.label}
      >
        {STATUSES.map((status) => (
          <NativeSelectOption key={status} value={status}>
            {STATUS_LABEL[status]}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    )
  }

  if (field.kind === "category") {
    // Cards, not a select. Every other field in the sheet is something you type,
    // and a select hides the alternatives behind a click and a scan to answer
    // the fastest question on the record. The marked cards are one glance and
    // one click, and they say what the set *is* — a select tells you only what
    // you picked.
    //
    // Generated from `WORK_CATEGORIES`, so a type added there appears here.
    // There is no way back to blank: a new row starts as a task, so unset is
    // not a state the app can produce, only one an older row can be in.
    return (
      <div
        role="radiogroup"
        aria-label={field.label}
        // Three to a row, two on a phone: at five across, a card is narrower
        // than the word "Deliverable" in the sheet's width.
        className="grid grid-cols-2 gap-1.5 sm:grid-cols-3"
      >
        {WORK_CATEGORIES.map((kind) => {
          const Icon = workIcon(kind.id)
          const on = value === kind.id
          return (
            <button
              key={kind.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(kind.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-sm transition-colors",
                on
                  ? "border-foreground/15 bg-foreground/8 font-medium text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" aria-hidden />
              {kind.label}
            </button>
          )
        })}
        {/* A stored type the set no longer has keeps its own card rather than
            reading as nothing chosen — the same rule the person field follows.
            It is last, and it is the only card that can appear here unlabelled
            by the registry. */}
        {value && !WORK_CATEGORIES.some((kind) => kind.id === value) && (
          <span className="col-span-full text-sm text-muted-foreground">
            Stored as “{categoryLabel(value)}”, which is no longer a type. Pick
            one above to replace it.
          </span>
        )}
      </div>
    )
  }

  if (field.kind === "person") {
    return (
      <NativeSelect
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={field.label}
      >
        {/* Nobody yet is a real answer, and the one the store keeps by leaving
            the key out. It reads as the blank it is. */}
        <NativeSelectOption value="">—</NativeSelectOption>
        {/* An id nobody matches still has to be selectable, or opening the
            sheet on a row whose person has left would silently reassign it
            on the next keystroke. */}
        {value && !people?.some((p) => p.id === value) && (
          <NativeSelectOption value={value}>{value}</NativeSelectOption>
        )}
        {sortPeople(people ?? []).map((person) => (
          <NativeSelectOption key={person.id} value={person.id}>
            {person.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    )
  }

  if (field.kind === "owner") {
    return (
      <NativeSelect
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={field.label}
      >
        <NativeSelectOption value="">—</NativeSelectOption>
        {Object.entries(OWNER_LABEL).map(([id, label]) => (
          <NativeSelectOption key={id} value={id}>
            {label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    )
  }

  if (field.kind === "direction") {
    return (
      <NativeSelect
        className="w-full"
        value={value || "up"}
        onChange={(e) => onChange(e.target.value)}
        aria-label={field.label}
      >
        <NativeSelectOption value="up">{DIRECTION_LABEL.up}</NativeSelectOption>
        <NativeSelectOption value="down">
          {DIRECTION_LABEL.down}
        </NativeSelectOption>
      </NativeSelect>
    )
  }

  if (field.kind === "period") {
    return (
      <PeriodPicker value={value} onChange={onChange} label={field.label} />
    )
  }

  if (field.kind === "date") {
    return <DateField value={value} onChange={onChange} label={field.label} />
  }

  if (field.kind === "line" || field.kind === "number") {
    return (
      <Input
        value={value}
        inputMode={field.kind === "number" ? "decimal" : undefined}
        placeholder={field.hint}
        // The browser's saved form data has nothing to do with the app's
        // own records, and its dropdown covers the field under it.
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        aria-label={field.label}
      />
    )
  }

  // `text` and `lines` are the same control: a list is written one entry per
  // line, which is how a list is typed and how it reads back. Saying so is the
  // placeholder's job on a field whose hint does not already imply it.
  return (
    <Textarea
      value={value}
      autoComplete="off"
      placeholder={
        field.kind === "lines" && field.hint
          ? `${field.hint} One per line.`
          : field.hint
      }
      onChange={(e) => onChange(e.target.value)}
      aria-label={field.label}
      className="min-h-9"
    />
  )
}

/** The page's Add control, in the header: the page's own control, not the
 *  sheet's, so unlike a record's Save it does not wait for something to be
 *  open. */
export function AddRow<T extends Row>({ editor }: { editor: RowsEditor<T> }) {
  return (
    <HeaderSlot>
      <Button variant="ghost" size="sm" onClick={editor.add}>
        <Plus />
        Add {ROW_NOUN}
      </Button>
    </HeaderSlot>
  )
}

/** What a module shows when a write has been refused. Nothing on screen is
 *  wrong — `items` is still what was last read — but nothing more will be
 *  written either, and the way back is a reload. The sheet says the short
 *  version beside its Save; this is the whole sentence, and the one that is
 *  still there after the sheet closes. */
export function RowsNotice({
  state,
  module,
}: {
  state: SaveState
  module: Module
}) {
  if (state !== "conflict" && state !== "error") return null
  return (
    <p className="mb-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
      {state === "conflict"
        ? `${module.title} changed on disk — Claude, or an editor — since this page loaded, so nothing was saved. Reload to see it. Copy anything you want to keep first.`
        : `${module.title} could not be saved. Reload to see what is stored, and copy anything you want to keep first.`}
    </p>
  )
}
