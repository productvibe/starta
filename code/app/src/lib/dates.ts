// Dates, in one place.
//
// The app keeps exactly one date format on disk — `YYYY-MM-DD`, a plain
// calendar date with no time and no zone — because every date it stores is a
// day rather than a moment: a task is due on the 30th, a person was last
// spoken to on Monday. A timestamp would be a lie with more digits.
//
// Everything here parses and formats by *parts*. `new Date("2026-09-30")` reads
// a bare date as UTC midnight, so west of UTC it is the 29th all day, and
// `toISOString().slice(0, 10)` converts back the same way and loses a day east
// of it. Both mistakes are silent and both are wrong by one day, so every date
// is parsed and formatted here.

/** True for a plain calendar date this app can read, e.g. "2026-09-30".
 *
 *  The store's own guard as well as the UI's: a date written by Claude or
 *  typed into a file by hand is checked with this before it is kept. */
export function isPlainDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

/** A stored `YYYY-MM-DD` as a local `Date` at midnight, or undefined for
 *  anything that is not one. */
export function parsePlainDate(value: string): Date | undefined {
  if (!isPlainDate(value)) return undefined
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  // A well-formed string can still name a day that does not exist — 2026-02-31
  // rolls forward to March. Refusing it here keeps the round trip honest: what
  // comes back out is the day that went in, or nothing.
  return date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : undefined
}

/** A `Date` as the plain calendar date it falls on in this machine's timezone —
 *  the day the user is having, not the day UTC is having. */
export function toPlainDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-")
}

/** Today, as a plain calendar date. */
export function today(): string {
  return toPlainDate(new Date())
}

/** A stored `YYYY-MM-DD` as "30 Sep", with the year when it is not this one.
 *
 *  The one way a date is written on screen: the tables' date columns, About's
 *  as-of dates — and the date field's own trigger, so the value reads the same
 *  while you are choosing it as it does everywhere it lands afterwards.
 *
 *  Anything that is not a plain date is returned untouched. The store is a
 *  folder of files a person edits, so a due date can be the word "Thursday";
 *  showing it back is more use than showing nothing. */
export function dateLabel(value: string, today = new Date()): string {
  const date = parsePlainDate(value)
  if (!date) return value
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(date.getFullYear() === today.getFullYear() ? {} : { year: "numeric" }),
  })
}
