import { ArrowDownUp, CircleDot, SlidersHorizontal } from "lucide-react"
import { useLocation, useNavigate } from "react-router"

import {
  FilterControl,
  FilterGroup,
  FilterOption,
} from "~/components/page/list-filter"
import { cn } from "~/lib/utils"

import type { Row, RowField } from "~/data/fields"
import {
  isWorkCategory,
  STATUS_ORDER,
  WORK_CATEGORIES,
  type WorkCategory,
  type WorkStatus,
} from "~/data/status"

// The filter bar above a datatable, and what it asks of the rows.
//
// The reason the filter and the sort live in the URL rather than in component
// state: a narrowed list is a *place*. It survives a reload, it can be handed
// to someone, and Back undoes it.
//
// Which controls show follows the module's fields: the state switch where there
// is a status field, the type toggles where there is a type field, and the sort
// always.

/** Which half of the set is on screen. `open` is the default where a module
 *  has a status: the finished rows are out of the way until they are asked
 *  for. */
export type TableState = "open" | "closed" | "all"

export const TABLE_STATES: { id: TableState; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "closed", label: "Closed" },
  { id: "all", label: "All" },
]

export type TableQuery = {
  state: TableState
  categories: WorkCategory[]
  /** a field key to order by, or absent for the module's default order */
  sort?: string
}

/** The fields a row can be ordered by: the short ones. A note is not a sort
 *  key anyone wants. */
export function sortFields(fields: RowField[]): RowField[] {
  return fields.filter((f) => f.kind !== "text" && f.kind !== "lines")
}

/** The query a request is asking for. Anything unrecognised falls back to the
 *  default rather than 404ing or filtering to nothing — a stale link is worth
 *  less than a list. */
export function tableQuery(
  params: URLSearchParams,
  fields: RowField[]
): TableQuery {
  const state = params.get("state")
  const sort = params.get("sort") ?? undefined
  return {
    state: TABLE_STATES.some((option) => option.id === state)
      ? (state as TableState)
      : "open",
    categories: (params.get("category") ?? "")
      .split(",")
      .map((part) => part.trim())
      .filter(isWorkCategory),
    sort: sortFields(fields).some((f) => f.key === sort) ? sort : undefined,
  }
}

/** The query as search params, for a link that keeps the list as it is. The
 *  default state writes nothing, so a plain `/tasks` stays plain. */
export function tableQuerySearch(query: TableQuery): string {
  const params = new URLSearchParams()
  if (query.state !== "open") params.set("state", query.state)
  if (query.categories.length)
    params.set("category", query.categories.join(","))
  if (query.sort) params.set("sort", query.sort)
  const search = params.toString()
  return search ? `?${search}` : ""
}

function text(row: Row, key: string | undefined): string {
  const value = key ? row[key] : undefined
  return typeof value === "string" ? value : ""
}

/** Blanks last, then in order. */
function byText(a: string, b: string): number {
  if (!a || !b) return (a ? 0 : 1) - (b ? 0 : 1)
  return a.localeCompare(b)
}

/** The list as the query asks for it: filtered, then ordered.
 *
 *  Filters are and-ed across kinds and or-ed within one — the state *and* a
 *  type narrows, two types widen. A row with no type is kept only when no type
 *  is asked for.
 *
 *  The default order is the reading order: attention first (by status), then
 *  by the first date, then by name. */
export function applyTableQuery<T extends Row>(
  rows: T[],
  fields: RowField[],
  query: TableQuery
): T[] {
  const status = fields.find((f) => f.kind === "status")?.key
  const category = fields.find((f) => f.kind === "category")?.key
  const date = fields.find((f) => f.kind === "date")?.key
  const open = (row: T) => text(row, status) !== "done"

  const kept = rows.filter(
    (row) =>
      (!status ||
        query.state === "all" ||
        (query.state === "open" ? open(row) : !open(row))) &&
      (!category ||
        query.categories.length === 0 ||
        query.categories.includes(text(row, category) as WorkCategory))
  )

  return [...kept].sort((a, b) => {
    if (query.sort)
      return (
        byText(text(a, query.sort), text(b, query.sort)) ||
        byText(text(a, "name"), text(b, "name"))
      )
    return (
      (status
        ? (STATUS_ORDER[text(a, status) as WorkStatus] ?? 9) -
          (STATUS_ORDER[text(b, status) as WorkStatus] ?? 9)
        : 0) ||
      byText(text(a, date), text(b, date)) ||
      byText(text(a, "name"), text(b, "name"))
    )
  })
}

/** The filter bar, in two forms.
 *
 *  Wide, it is the whole set laid out: a segmented control for which half of
 *  the rows is on screen, and a toggle per type. Narrow, it collapses to
 *  dropdowns from the same components. What it must never do is wrap: a control
 *  that reflows into a second row stops being a bar and becomes a paragraph of
 *  buttons.
 *
 *  The switch is a **container query**: the question is how much room this
 *  column has, which is not the size of the window. */
export function Toolbar({
  fields,
  query,
}: {
  fields: RowField[]
  query: TableQuery
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  /** Replace, not push: a run of clicks along this bar is one decision, and
   *  Back should leave the table rather than walk it backwards. */
  const go = (next: TableQuery) =>
    void navigate(`${pathname}${tableQuerySearch(next)}`, { replace: true })

  const toggle = (id: WorkCategory) => ({
    ...query,
    categories: query.categories.includes(id)
      ? query.categories.filter((kept) => kept !== id)
      : [...query.categories, id],
  })

  const hasStatus = fields.some((f) => f.kind === "status")
  const hasCategory = fields.some((f) => f.kind === "category")
  const state = TABLE_STATES.find((option) => option.id === query.state)!
  const filtered = query.categories.length > 0
  const sortable = sortFields(fields)
  const sortedBy = sortable.find((f) => f.key === query.sort)

  const sort = (
    <FilterControl
      bordered
      icon={<ArrowDownUp />}
      name="Sort"
      label={sortedBy ? `Sort · ${sortedBy.label}` : "Sort"}
      active={Boolean(sortedBy)}
    >
      <FilterOption
        checked={!sortedBy}
        onSelect={() => go({ ...query, sort: undefined })}
      >
        Default
      </FilterOption>
      {sortable.map((field) => (
        <FilterOption
          key={field.key}
          checked={field.key === query.sort}
          onSelect={() => go({ ...query, sort: field.key })}
        >
          {field.label}
        </FilterOption>
      ))}
    </FilterControl>
  )

  return (
    // No rule under it. The table's own head has one, and two hairlines a few
    // pixels apart read as a frame around nothing.
    <div className="@container mb-4">
      {/* Wide. `flex-nowrap` is the whole point: this row does not reflow, it
          is replaced. */}
      <div className="hidden flex-nowrap items-center gap-3 @2xl:flex">
        {hasStatus && (
          <div
            role="tablist"
            aria-label="Which rows to show"
            className="flex items-center gap-0.5 rounded-lg bg-muted/60 p-0.5"
          >
            {TABLE_STATES.map((option) => {
              const on = option.id === query.state
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => go({ ...query, state: option.id })}
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
        )}

        {hasStatus && hasCategory && (
          <span aria-hidden className="h-5 w-px shrink-0 bg-border" />
        )}

        {hasCategory && (
          <div className="flex flex-nowrap items-center gap-1">
            {WORK_CATEGORIES.map((kind) => {
              const on = query.categories.includes(kind.id)
              return (
                <button
                  key={kind.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => go(toggle(kind.id))}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 text-sm whitespace-nowrap transition-colors",
                    on
                      ? "border-transparent bg-foreground/8 font-medium text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {kind.label}
                </button>
              )
            })}
          </div>
        )}

        <div className="ml-auto">{sort}</div>
      </div>

      {/* Narrow. Each control says in its own label what it is holding, so the
          bar still answers "what am I looking at" without being opened. */}
      <div className="flex flex-nowrap items-center gap-1 @2xl:hidden">
        {hasStatus && (
          <FilterControl
            bordered
            icon={<CircleDot />}
            name="State"
            label={state.label}
            active={query.state !== "open"}
          >
            {TABLE_STATES.map((option) => (
              <FilterOption
                key={option.id}
                checked={option.id === query.state}
                onSelect={() => go({ ...query, state: option.id })}
              >
                {option.label}
              </FilterOption>
            ))}
          </FilterControl>
        )}

        {hasCategory && (
          <FilterControl
            bordered
            icon={<SlidersHorizontal />}
            name="Filter"
            label={
              filtered ? `Filtered · ${query.categories.length}` : "Filter"
            }
            active={filtered}
          >
            <FilterGroup>Type</FilterGroup>
            {WORK_CATEGORIES.map((kind) => (
              <FilterOption
                key={kind.id}
                checked={query.categories.includes(kind.id)}
                onSelect={() => go(toggle(kind.id))}
              >
                {kind.label}
              </FilterOption>
            ))}

            {filtered && (
              <FilterOption
                checked={false}
                onSelect={() => go({ ...query, categories: [] })}
              >
                <span className="text-muted-foreground">Clear filters</span>
              </FilterOption>
            )}
          </FilterControl>
        )}

        {sort}
      </div>
    </div>
  )
}
