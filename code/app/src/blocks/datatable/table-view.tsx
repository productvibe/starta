import { Blank } from "~/components/page/detail-sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import type { WriteResult } from "~/data/store"
import { dateLabel } from "~/lib/dates"
import { periodLabel } from "~/lib/periods"
import { cn } from "~/lib/utils"
import { EmptyModule } from "~/modules/empty-module"
import type { Module } from "~/modules/modules"

import {
  DIRECTION_LABEL,
  OWNER_LABEL,
  type Row as RowData,
  type RowField,
} from "~/data/fields"
import {
  personName,
  RowSheet,
  RowsNotice,
  useEditableRows,
  AddRow,
  type Person,
} from "./rows"
import { categoryLabel, STATUS_LABEL, type WorkStatus } from "~/data/status"
import { applyTableQuery, Toolbar, type TableQuery } from "./toolbar"

// The table view: the rows, and the sheet a row is read and edited in. One
// generic table that renders the module's fields.
//
// The table is the app's own (ui/table): no fixed column widths, so cells wrap
// and the page never scrolls sideways. An enum is muted text, not a badge
// (product/DESIGN.md → Tables).
//
// The cells stay read-only. A row's editable fields are in its sheet, which is
// where the long ones — a note — already were: an inline cell editor would have
// to leave them out, and two ways to edit one row would grow two answers to
// saving. See `./rows`.

/** What a view needs to show and write one module. */
export type ViewProps = {
  module: Module
  rows: RowData[]
  /** the people module's rows, for a `person` field */
  people: Person[]
  /** the file's freshness token as the page read it */
  asOf?: number
  save: (items: unknown[], baseline: number | undefined) => Promise<WriteResult>
}

/** The columns: the fields on the sheet's first tab, or every field when
 *  there are no tabs. The rest — a note — is behind the row's click. */
export function columnsOf(fields: RowField[]): RowField[] {
  const first = fields[0]?.tab
  return first ? fields.filter((f) => f.tab === first) : fields
}

/** One cell's value, as words. */
export function cellValue(
  field: RowField,
  row: RowData,
  people: Person[]
): React.ReactNode {
  const value = row[field.key]
  const raw = Array.isArray(value) ? value.join(", ") : (value ?? "")
  if (!raw) return <Blank />
  switch (field.kind) {
    case "date":
      return dateLabel(raw)
    case "status":
      return STATUS_LABEL[raw as WorkStatus] ?? raw
    case "category":
      return categoryLabel(raw)
    case "person":
      return personName(people, raw)
    case "owner":
      return OWNER_LABEL[raw as keyof typeof OWNER_LABEL] ?? raw
    case "period":
      return periodLabel(raw)
    case "direction":
      return raw === "down" ? DIRECTION_LABEL.down : DIRECTION_LABEL.up
    default:
      return raw
  }
}

/** A stored row with no name. Nothing the app writes can produce one — a
 *  record is only saved once it is named — so this is a file somebody edited by
 *  hand, and it reads as the blank it is rather than as a missing row. */
export function Unnamed() {
  return <span className="text-muted-foreground italic">Unnamed</span>
}

export function TableView({
  module,
  rows: loaded,
  people,
  asOf,
  save,
  query,
}: ViewProps & {
  /** What the URL is asking the table to show. Applied here rather than by the
   *  loader, because the editor holds the whole set: the rows it writes back
   *  are every row the file has, filtered or not. A filter that narrowed what
   *  the editor was given would delete the rest on the next save. */
  query: TableQuery
}) {
  const fields = module.fields ?? []
  const editor = useEditableRows<RowData>({ fields, loaded, asOf, save })
  const rows = editor.items
  const shown = applyTableQuery(rows, fields, query)
  const columns = columnsOf(fields)

  return (
    <>
      <AddRow editor={editor} />
      <RowsNotice state={editor.state} module={module} />

      {rows.length === 0 ? (
        // An empty file, which is a different thing from a query that matched
        // nothing: one is a module nobody has filled in, the other is a table
        // holding rows back.
        <EmptyModule module={module} />
      ) : (
        <>
          <Toolbar fields={fields} query={query} />

          {shown.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing here matches.
            </p>
          ) : (
            // Sorted and filtered for reading, selected by position: what is on
            // screen is a view of `items`, and an index into `items` is what the
            // editor writes back through.
            <RowsTable
              columns={columns}
              rows={shown}
              people={people}
              rowKey={(row) => row.id || `new-${rows.indexOf(row)}`}
              onSelect={(row) => editor.select(rows.indexOf(row))}
              isSelected={(row) => editor.open?.index === rows.indexOf(row)}
            />
          )}
        </>
      )}

      <RowSheet fields={fields} editor={editor} people={people} />
    </>
  )
}

/** The rows as a table, in the order given. Read-only without `onSelect`: a
 *  slide's table block (`~/blocks/deck/slide-block`) draws a module's rows
 *  this way. */
export function RowsTable({
  columns,
  rows,
  people,
  rowKey = (row) => row.id,
  onSelect,
  isSelected,
}: {
  columns: RowField[]
  rows: RowData[]
  people: Person[]
  rowKey?: (row: RowData) => string
  onSelect?: (row: RowData) => void
  isSelected?: (row: RowData) => boolean
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((field) => (
            <TableHead key={field.key}>{field.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          // A row opens its details. `cursor-default` rather than
          // `pointer`: the row is not a link.
          <TableRow
            key={rowKey(row)}
            onClick={onSelect ? () => onSelect(row) : undefined}
            className={cn(
              onSelect && "cursor-default transition-colors hover:bg-muted/50",
              isSelected?.(row) && "bg-muted/60"
            )}
          >
            {columns.map((field, i) => (
              <TableCell
                key={field.key}
                className={cn(
                  "align-top",
                  // Text wraps; a date or an enum is short and stays on one
                  // line.
                  field.kind === "date" ||
                    field.kind === "period" ||
                    field.kind === "owner" ||
                    field.kind === "status" ||
                    field.kind === "category"
                    ? "text-muted-foreground"
                    : "whitespace-normal",
                  i === 0 && "font-medium"
                )}
              >
                {i === 0 && !row[field.key] ? (
                  <Unnamed />
                ) : (
                  cellValue(field, row, people)
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
