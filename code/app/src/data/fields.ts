import { isWorkCategory, isWorkStatus } from "./status"

// What a row is, field by field: the one description of a datatable module's
// rows that both the editor and the writer read.
//
// A module's fields live in its registry entry (`~/modules/modules`), so this
// module names the kinds of field once and everything else follows: the
// details sheet renders a field per entry, and the route's action parses a
// posted row back through the same list. Two lists would drift within a
// release, and the drift would be silent — a field the sheet writes and the
// parser drops just disappears on save.
//
// Every value here is *plain text*, deliberately: a phrase in a cell that
// renders as markdown means a stray asterisk changes what you typed. What you
// type is what is stored.
//
// Client-safe: types and pure functions, no `fs`.

/** One row of a datatable module. Every row has an `id`, derived once from its
 *  name and never again, because other rows point at it. */
export type Row = { id: string } & Record<string, string | string[] | undefined>

/** How a field is typed into. Every one of them is text — the kinds differ only
 *  in the control that suits it, not in what is stored. */
export type FieldKind =
  /** one line */
  | "line"
  /** several lines of prose, still plain text */
  | "text"
  /** a list, one entry per line — stored as an array of strings */
  | "lines"
  /** a plain calendar date, "YYYY-MM-DD" */
  | "date"
  /** one of `STATUSES` */
  | "status"
  /** one of `WORK_CATEGORIES`, or nothing chosen */
  | "category"
  /** a row id of the `people` module, chosen from the people on file */
  | "person"
  /** a number, still stored as the text typed: "38.4", "4812" */
  | "number"
  /** which way is better: `up` or `down`; blank reads as `up` */
  | "direction"
  /** whose it is: `me`, `team` or `company` */
  | "owner"
  /** a day, a month or a quarter: "2026-10-31", "2026-10", "2026-Q4"
   *  (`~/lib/periods`) */
  | "period"

export type RowField = {
  /** where the value sits in a row and in a draft */
  key: string
  label: string
  kind: FieldKind
  /** What belongs in the field, shown as its placeholder. */
  hint?: string
  /** Which tab of the sheet it belongs to. A record whose fields all share one
   *  tab renders as a plain list — see `DetailSheet`. */
  tab?: string
}

/** A row being edited: every field as text, keyed by `RowField.key`. The editor
 *  holds one of these rather than a typed row, because half of typing a field is
 *  passing through states the type does not allow — a date mid-entry, an empty
 *  required name. It becomes a row again on the way to the store. */
export type Draft = Record<string, string>

/** The field that names a row: the sheet's title, and what an id is derived
 *  from. A row without it is not a row yet — see `isNamed`. */
const NAME_FIELD = "name"

/** The tabs a module's fields fall into, in field order, or `null` where they
 *  all sit in one list. */
export function rowTabs(fields: RowField[]): string[] | null {
  const tabs = [...new Set(fields.map((f) => f.tab ?? ""))]
  return tabs.length > 1 || tabs[0] ? (tabs as string[]) : null
}

/** The row's name, or "" — what the sheet titles itself with. */
export function draftName(draft: Draft): string {
  return (draft[NAME_FIELD] ?? "").trim()
}

/** A row with a name is a row; one without is something half-typed.
 *
 *  This is the whole rule for when a new row reaches the store: an unnamed row
 *  is not written, so opening the sheet and closing it again leaves nothing
 *  behind, and the id derived on the way in is derived from a settled name
 *  rather than from the first letter of one. */
export function isNamed(fields: RowField[], row: Row): boolean {
  return draftName(toDraft(fields, row)).length > 0
}

/** An empty row, ready for the sheet. A row with a status starts in the
 *  `backlog`, and one with a type starts as a `task`: both are the commonest
 *  answer, and both are one click from being changed. */
export function blankRow(fields: RowField[]): Row {
  const draft: Draft = Object.fromEntries(
    fields.map((field) => [field.key, ""])
  )
  for (const field of fields) {
    if (field.kind === "status") draft[field.key] = "backlog"
    if (field.kind === "category") draft[field.key] = "task"
  }
  return fromDraft(fields, draft)
}

/** A row as the flat map of strings the editor types into. A list becomes one
 *  entry per line — the way a list is written by hand, and the way it reads
 *  back. */
export function toDraft(fields: RowField[], row: Row): Draft {
  const draft: Draft = {}
  for (const field of fields) {
    const value = row[field.key]
    draft[field.key] = Array.isArray(value)
      ? value.join("\n")
      : typeof value === "string"
        ? value
        : ""
  }
  return draft
}

/** A draft back as a row.
 *
 *  `base` carries what the editor does not own: a row's `id`, which is
 *  referenced by other rows and must survive a rename. An absent field is
 *  written by leaving the key out rather than by storing `""`.
 *
 *  Key order is the stored order: `id`, then the fields in registry order. A
 *  writer that reordered keys would show every row as changed the first time
 *  anything was saved, and bury the actual edit in the diff. */
export function fromDraft(fields: RowField[], draft: Draft, base?: Row): Row {
  const row: Row = { id: base?.id ?? "" }
  for (const field of fields) {
    const value = draft[field.key]
    if (field.key === NAME_FIELD) {
      row[field.key] = line(value) ?? ""
      continue
    }
    switch (field.kind) {
      case "text":
        row[field.key] = text(value)
        break
      case "lines":
        row[field.key] = lines(value)
        break
      case "status": {
        const status = (value ?? "").trim()
        row[field.key] = isWorkStatus(status) ? status : "backlog"
        break
      }
      case "category": {
        const category = (value ?? "").trim()
        row[field.key] = isWorkCategory(category) ? category : undefined
        break
      }
      case "owner": {
        const owner = (value ?? "").trim()
        row[field.key] = owner in OWNER_LABEL ? owner : undefined
        break
      }
      case "direction": {
        const direction = (value ?? "").trim()
        row[field.key] =
          direction === "up" || direction === "down" ? direction : undefined
        break
      }
      default:
        row[field.key] = line(value)
    }
  }
  return prune(row)
}

/** An id for a row that has none yet: a slug of its name, numbered if that slug
 *  is taken. Derived once, when the row first reaches the store, and never
 *  again — a task's `person` names a person's id, so a rename must not move
 *  it. */
export function newId(name: string, taken: Iterable<string>): string {
  const slug =
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "row"
  const used = new Set(taken)
  if (!used.has(slug)) return slug
  for (let n = 2; ; n++) if (!used.has(`${slug}-${n}`)) return `${slug}-${n}`
}

/** Rows off the wire, as the module's rows.
 *
 *  The route's action is the only caller: what it is handed is JSON a browser
 *  posted, so nothing about its shape can be assumed. Anything the field list
 *  does not name is dropped rather than stored — the files are read by Claude
 *  and by whoever opens them, and a stray key would outlive the mistake that
 *  made it.
 *
 *  A malformed row throws rather than being skipped. The client posts what it
 *  loaded, so a row that will not parse is a bug in this app, and dropping it
 *  quietly would take the user's content with it. */
export function parseRows(fields: RowField[], value: unknown): Row[] {
  if (!Array.isArray(value)) throw new Error("Rows must be an array")
  return value.map((raw, i) => {
    if (!raw || typeof raw !== "object" || Array.isArray(raw))
      throw new Error(`Row ${i} is not a record`)
    const row = raw as Record<string, unknown>

    // The draft round trip is the parser: every stored field is one the field
    // list names, so anything else has nowhere to land. `id` is the exception —
    // it is not an editable field, and it is the one thing a row must have.
    const draft: Draft = {}
    for (const field of fields) {
      const stored = row[field.key]
      draft[field.key] = Array.isArray(stored)
        ? stored.filter((v) => typeof v === "string").join("\n")
        : typeof stored === "string"
          ? stored
          : ""
    }

    const id = typeof row.id === "string" ? row.id.trim() : ""
    if (!id) throw new Error(`Row ${i} has no id`)
    return fromDraft(fields, draft, { id })
  })
}

/** One line, trimmed, or `undefined` when there is nothing in it. Newlines
 *  collapse: the control is a single line, and a paste of two would otherwise
 *  store something the field cannot show back. */
function line(value: string | undefined): string | undefined {
  const trimmed = value?.replace(/\s*\n\s*/g, " ").trim()
  return trimmed ? trimmed : undefined
}

/** Several lines, trimmed at the ends and kept as typed inside. */
function text(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

/** A list, one entry per line. Blank lines drop out, so a trailing return while
 *  typing is not an empty bullet in the sheet. */
function lines(value: string | undefined): string[] | undefined {
  const list = (value ?? "")
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
  return list.length ? list : undefined
}

/** Drop the keys with nothing under them. An unset field is an absent key, not
 *  an empty string. */
function prune<T extends object>(row: T): T {
  return Object.fromEntries(
    Object.entries(row).filter(([, value]) => value !== undefined)
  ) as T
}

/** A `number` field's text as a number, or null when it is blank or not one.
 *  A comma reads as a decimal point and spaces are dropped, so "38,4" and
 *  "4 812" read as typed. */
export function toNumber(raw: string | string[] | undefined): number | null {
  if (typeof raw !== "string") return null
  const text = raw.replace(/\s/g, "").replace(",", ".")
  if (!text) return null
  const n = Number(text)
  return Number.isFinite(n) ? n : null
}

/** The words for an `owner` value, in the order the select lists them. */
export const OWNER_LABEL = {
  me: "Me",
  team: "Team",
  company: "Company",
} as const

/** The words for a `direction` value. */
export const DIRECTION_LABEL = {
  up: "Higher is better",
  down: "Lower is better",
} as const
