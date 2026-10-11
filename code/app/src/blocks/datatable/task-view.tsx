import { Check } from "lucide-react"
import { useFetcher, useSearchParams } from "react-router"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { cn } from "~/lib/utils"
import { EmptyModule } from "~/modules/empty-module"

import type { Row as RowData } from "~/data/fields"
import { AddRow, RowSheet, RowsNotice, useEditableRows } from "./rows"
import { cellValue, Unnamed, type ViewProps } from "./table-view"
import { applyTableQuery } from "./toolbar"

// The task view: the module's rows as a checkbox list. Ticking a row sets its
// status to `done` through the data helper; the rest of the row opens its
// sheet, the same sheet the table view uses.
//
// Open rows first and by default: what is done is a record, and this page is
// for what is not. Ordered by the module's default order — attention first,
// then by due date — so today's follow-ups are at the top.

/** Which half of the rows is on screen, in `?done=`. */
const TODO_STATES = [
  { id: "open", label: "Open" },
  { id: "done", label: "Done" },
  { id: "all", label: "All" },
] as const

type TodoState = (typeof TODO_STATES)[number]["id"]

function stateFrom(params: URLSearchParams): TodoState {
  const value = params.get("done")
  return TODO_STATES.some((state) => state.id === value)
    ? (value as TodoState)
    : "open"
}

export function TaskView({
  module,
  rows: loaded,
  people,
  asOf,
  save,
}: ViewProps) {
  const fields = module.fields ?? []
  const editor = useEditableRows<RowData>({ fields, loaded, asOf, save })
  const rows = editor.items
  const [params, setParams] = useSearchParams()
  const state = stateFrom(params)
  const status = fields.find((f) => f.kind === "status")?.key
  // The row's sentence, then what it is about: who, and when. The type and
  // the status are the sheet's business — the tick already says the status.
  const columns = fields.filter((f) => f.kind === "person" || f.kind === "date")
  const visible = applyTableQuery(rows, fields, {
    state: state === "done" ? "closed" : state,
    categories: [],
  })

  /** Replace, not push: flipping between halves of the same list is one
   *  decision, and Back should leave the page rather than walk it. */
  const go = (next: TodoState) => {
    const search = new URLSearchParams(params)
    if (next === "open") search.delete("done")
    else search.set("done", next)
    setParams(search, { replace: true })
  }

  return (
    <>
      <AddRow editor={editor} />
      <RowsNotice state={editor.state} module={module} />

      {rows.length === 0 ? (
        <EmptyModule module={module} />
      ) : (
        <>
          {/* One question — which half of the rows — with three answers, so a
              segmented control. Three short words fit in the narrowest pane,
              so it never collapses into a menu. */}
          <div className="mb-4">
            <div
              role="tablist"
              aria-label="Which tasks to show"
              className="inline-flex flex-nowrap items-center gap-0.5 rounded-lg bg-muted/60 p-0.5"
            >
              {TODO_STATES.map((option) => {
                const on = option.id === state
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => go(option.id)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-sm whitespace-nowrap transition-colors",
                      on
                        ? "bg-background font-medium text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing here matches.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {/* The checkbox column has no heading — "Done" over a column
                      of ticks is a word saying what the control already is. */}
                  {status && <TableHead className="w-0" />}
                  <TableHead>{fields[0]?.label ?? "Name"}</TableHead>
                  {columns.map((field) => (
                    <TableHead key={field.key}>{field.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((row) => {
                  const index = rows.indexOf(row)
                  return (
                    <TaskRow
                      key={row.id || `new-${index}`}
                      row={row}
                      status={status}
                      selected={editor.open?.index === index}
                      onSelect={() => editor.select(index)}
                    >
                      {columns.map((field) => (
                        <TableCell
                          key={field.key}
                          className="align-top text-muted-foreground"
                        >
                          {cellValue(field, row, people)}
                        </TableCell>
                      ))}
                    </TaskRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </>
      )}

      <RowSheet fields={fields} editor={editor} people={people} />
    </>
  )
}

/** One task. The row opens its sheet; the checkbox ticks it without going
 *  anywhere. */
function TaskRow({
  row,
  status,
  selected,
  onSelect,
  children,
}: {
  row: RowData
  /** the status field's key, or absent for a module with none */
  status?: string
  selected: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  // A fetcher per row rather than one for the list: ticking three things in a
  // row is three writes, and a shared fetcher would make each supersede the
  // last.
  const fetcher = useFetcher()

  // What the row shows while the write is in flight. The tick has to land on
  // the pixel, or a checkbox feels broken however fast the round trip is.
  const posted = fetcher.formData?.get("done")
  const done =
    posted == null
      ? status
        ? row[status] === "done"
        : false
      : posted === "true"

  const toggle = () =>
    fetcher.submit(
      { intent: "done", id: row.id, done: String(!done) },
      { method: "post" }
    )

  // The tick did not land: the file changed under the list.
  const refused =
    fetcher.data && (fetcher.data as { ok?: boolean }).ok === false

  return (
    <TableRow
      onClick={onSelect}
      className={cn(
        "cursor-default transition-colors hover:bg-muted/50",
        selected && "bg-muted/60"
      )}
    >
      {status && (
        <TableCell
          // The control, and the room around it: a click near a checkbox is a
          // click on it, and it must not also open the sheet.
          onClick={(event) => event.stopPropagation()}
          className="align-top"
        >
          <TaskCheck
            done={done}
            label={String(row.name ?? "")}
            onToggle={toggle}
          />
        </TableCell>
      )}
      <TableCell className="align-top whitespace-normal">
        <span className={cn(done && "text-muted-foreground line-through")}>
          {row.name || <Unnamed />}
        </span>
        {refused && (
          <span className="ml-2 text-xs text-muted-foreground">
            Changed on disk — reload.
          </span>
        )}
      </TableCell>
      {children}
    </TableRow>
  )
}

/** The tick itself. A `role="checkbox"` button is the whole of what a checkbox
 *  is to a screen reader. The box keeps its border when it is ticked: a filled
 *  square with no edge reads as a swatch. */
function TaskCheck({
  done,
  label,
  onToggle,
}: {
  done: boolean
  label: string
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={done}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "mt-0.5 flex size-4 items-center justify-center rounded-[4px] border border-foreground/25 transition-colors",
        done
          ? "bg-foreground/80 text-background"
          : "hover:border-foreground/50 hover:bg-foreground/5"
      )}
    >
      <Check className={cn("size-3", !done && "invisible")} aria-hidden />
    </button>
  )
}
