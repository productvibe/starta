import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { OWNER_LABEL, toNumber, type Row as RowData } from "~/data/fields"
import { formatDecimal, formatNumber } from "~/lib/format"
import { parsePeriod, periodEnd, periodLabel, periodStart } from "~/lib/periods"
import { cn } from "~/lib/utils"
import { EmptyModule } from "~/modules/empty-module"

import { AddRow, RowSheet, RowsNotice, useEditableRows } from "./rows"
import { Unnamed, type ViewProps } from "./table-view"

// The goal view: a module's rows as goal cards, each its value against its
// target and whether that is on track. The first row is the headline, drawn
// large on top; the rest are the grid below. A card opens the row's sheet,
// where it is edited as in any other view (`./rows`).
//
// The view reads its fields by key — `name`, `value`, `target`, `unit`,
// `direction`, `owner`, `due`, `description` — so a goal module's file declares those
// (`modules/goals.json`). Colour stays in the theme: the badge is greys only.

export function GoalView({
  module,
  rows: loaded,
  people,
  asOf,
  save,
}: ViewProps) {
  const fields = module.fields ?? []
  const editor = useEditableRows<RowData>({ fields, loaded, asOf, save })
  const rows = editor.items
  const [headline, ...goals] = rows

  const card = (row: RowData, index: number, large: boolean) => (
    <GoalCard
      key={row.id || `new-${index}`}
      row={row}
      large={large}
      selected={editor.open?.index === index}
      onSelect={() => editor.select(index)}
    />
  )

  return (
    <>
      <AddRow editor={editor} />
      <RowsNotice state={editor.state} module={module} />
      {rows.length === 0 ? (
        <EmptyModule module={module} />
      ) : (
        <div className="flex flex-col gap-6">
          {card(headline, 0, true)}
          {goals.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((row, i) => card(row, i + 1, false))}
            </div>
          )}
        </div>
      )}
      <RowSheet fields={fields} editor={editor} people={people} />
    </>
  )
}

function GoalCard({
  row,
  large,
  selected,
  onSelect,
}: {
  row: RowData
  large: boolean
  selected: boolean
  onSelect: () => void
}) {
  const value = toNumber(row.value)
  const target = toNumber(row.target)
  const unit = typeof row.unit === "string" ? row.unit : undefined
  const description =
    typeof row.description === "string" ? row.description : undefined
  const track = goalTrack(
    value,
    target,
    toNumber(row.start),
    row.direction === "down",
    typeof row.due === "string" ? row.due : undefined
  )
  const share = value != null && target ? value / target : null
  // Whose it is and by when, on one muted line: "Team · By Q4 2026".
  const meta = [
    typeof row.owner === "string" &&
      OWNER_LABEL[row.owner as keyof typeof OWNER_LABEL],
    typeof row.due === "string" && row.due && `By ${periodLabel(row.due)}`,
  ]
    .filter(Boolean)
    .join(" · ")
  const due = meta ? (
    <span className="text-xs text-muted-foreground">{meta}</span>
  ) : null
  const title = row.name ? (
    <span className="text-sm font-medium text-muted-foreground">
      {row.name}
    </span>
  ) : (
    <Unnamed />
  )

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "cursor-default gap-0 py-0 transition-colors hover:bg-muted/50",
        selected && "bg-muted/60"
      )}
    >
      {large ? (
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            {title}
            <ValueOverTarget
              value={value}
              target={target}
              unit={unit}
              size="text-4xl"
            />
            {due}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            {track !== null && <TrackBadge onTrack={track} />}
            {share !== null && (
              <span className="text-sm text-muted-foreground">
                {(share * 100).toFixed(0)}% of target
              </span>
            )}
          </div>
        </CardContent>
      ) : (
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            {title}
            {track !== null && <TrackBadge onTrack={track} />}
          </div>
          <ValueOverTarget
            value={value}
            target={target}
            unit={unit}
            size="text-3xl"
          />
          {due}
          {description && (
            <p className="text-xs leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  )
}

/** The value, large, then "/ target unit" quieter beside it. */
function ValueOverTarget({
  value,
  target,
  unit,
  size,
}: {
  value: number | null
  target: number | null
  unit?: string
  size: string
}) {
  const after = unit && unit !== "%" ? ` ${unit}` : ""
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className={cn(size, "font-semibold tracking-tight tabular-nums")}>
        {numberText(value, unit)}
      </span>
      <span className="text-sm font-medium text-muted-foreground tabular-nums">
        / {numberText(target, unit)}
        {after}
      </span>
    </div>
  )
}

/** Whether a goal is on track, or null for no badge. Met is on track; a
 *  target date passed unmet is off track. In between, a goal is paced: it
 *  should have moved from its start value towards its target in step with
 *  the time gone of its period (a quarter, a month), and it is on track at or
 *  beyond that point. With no start value, or a target date of a single day,
 *  there is no pace to measure, so no badge until it is met or late. */
function goalTrack(
  value: number | null,
  target: number | null,
  start: number | null,
  down: boolean,
  due: string | undefined,
  now = new Date()
): boolean | null {
  if (value == null || target == null) return null
  const atLeast = (a: number, b: number) => (down ? a <= b : a >= b)
  if (atLeast(value, target)) return true
  const period = parsePeriod(due)
  if (!period) return null
  const from = periodStart(period).getTime()
  const to = periodEnd(period).getTime()
  if (now.getTime() >= to) return false
  if (start == null || period.grain === "day") return null
  const gone = Math.min(1, Math.max(0, (now.getTime() - from) / (to - from)))
  return atLeast(value, start + (target - start) * gone)
}

function TrackBadge({ onTrack }: { onTrack: boolean }) {
  // Theme greys only, no status colour: off track is the same badge a shade
  // darker, so a preset recolours both.
  return (
    <Badge
      variant="secondary"
      className={cn(!onTrack && "bg-muted-foreground/20 text-foreground")}
    >
      {onTrack ? "On track" : "Off track"}
    </Badge>
  )
}

/** "%" prints as a percentage; any other unit goes after the target. */
function numberText(value: number | null, unit?: string): string {
  if (value == null) return "–"
  const text = Number.isInteger(value)
    ? formatNumber(value)
    : formatDecimal(value)
  return unit === "%" ? `${text}%` : text
}
