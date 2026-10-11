// A period: when something is due, at the grain it is known at — a day
// (`2026-10-31`), a month (`2026-10`) or a quarter (`2026-Q4`). Stored as that
// text, like every field, and read by parts here.
//
// Client-safe: pure functions, no `fs`.

export type PeriodGrain = "day" | "month" | "quarter"

export type Period =
  | { grain: "day"; year: number; month: number; day: number }
  | { grain: "month"; year: number; month: number }
  | { grain: "quarter"; year: number; quarter: number }

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

/** A period's text by parts, or null when it is none of the three shapes.
 *  Months are 1–12 and quarters 1–4. */
export function parsePeriod(value: string | undefined): Period | null {
  const text = (value ?? "").trim()
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text)
  if (m) {
    const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])]
    const date = new Date(year, month - 1, day)
    return date.getMonth() === month - 1 && date.getDate() === day
      ? { grain: "day", year, month, day }
      : null
  }
  m = /^(\d{4})-(\d{2})$/.exec(text)
  if (m) {
    const month = Number(m[2])
    return month >= 1 && month <= 12
      ? { grain: "month", year: Number(m[1]), month }
      : null
  }
  m = /^(\d{4})-Q([1-4])$/i.exec(text)
  if (m) return { grain: "quarter", year: Number(m[1]), quarter: Number(m[2]) }
  return null
}

const pad = (n: number) => String(n).padStart(2, "0")

/** A period by parts, as the text it is stored as. */
export function periodText(period: Period): string {
  switch (period.grain) {
    case "day":
      return `${period.year}-${pad(period.month)}-${pad(period.day)}`
    case "month":
      return `${period.year}-${pad(period.month)}`
    case "quarter":
      return `${period.year}-Q${period.quarter}`
  }
}

/** A period as words: "31 Oct 2026", "Oct 2026", "Q4 2026". Always with the
 *  year, because a target is as often next year's as this one's. Anything else
 *  is returned untouched, as `dateLabel` does. */
export function periodLabel(value: string): string {
  const period = parsePeriod(value)
  if (!period) return value
  switch (period.grain) {
    case "day":
      return `${period.day} ${MONTH_NAMES[period.month - 1]} ${period.year}`
    case "month":
      return `${MONTH_NAMES[period.month - 1]} ${period.year}`
    case "quarter":
      return `Q${period.quarter} ${period.year}`
  }
}

/** A quarter's months as words: 4 → "Oct–Dec". */
export function quarterMonths(quarter: number): string {
  return `${MONTH_NAMES[quarter * 3 - 3]}–${MONTH_NAMES[quarter * 3 - 1]}`
}

/** The day a period starts, at local midnight: the quarter's or month's first
 *  day, or the day itself. */
export function periodStart(period: Period): Date {
  switch (period.grain) {
    case "day":
      return new Date(period.year, period.month - 1, period.day)
    case "month":
      return new Date(period.year, period.month - 1, 1)
    case "quarter":
      return new Date(period.year, period.quarter * 3 - 3, 1)
  }
}

/** The moment a period is over: midnight after its last day. */
export function periodEnd(period: Period): Date {
  switch (period.grain) {
    case "day":
      return new Date(period.year, period.month - 1, period.day + 1)
    case "month":
      return new Date(period.year, period.month, 1)
    case "quarter":
      return new Date(period.year, period.quarter * 3, 1)
  }
}
