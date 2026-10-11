// A datatable row's status and type.
//
// Open and closed are *derived*, never stored — `done` is closed, everything
// else is open. The four statuses stay because they carry more than a binary
// does: `blocked` is the loudest thing on the page (see DESIGN.md), and half of
// what is open at any time is open because it is waiting on somebody else. A
// stored `open` flag beside a stored `done` status could disagree with itself.
//
// Client-safe: types and pure functions, no `fs`.

export type WorkStatus = "backlog" | "in-progress" | "blocked" | "done"

export const STATUSES: WorkStatus[] = [
  "backlog",
  "in-progress",
  "blocked",
  "done",
]

export const STATUS_LABEL: Record<WorkStatus, string> = {
  // "Backlog", not "Not started": every other status says what is true of the
  // work, and this one used to say what is *not*.
  backlog: "Backlog",
  "in-progress": "In progress",
  blocked: "Blocked",
  done: "Done",
}

/** Status → pill classes. Greyscale only, and the shade *is* the meaning:
 *  darker reads as louder, so blocked work is the heaviest thing on the page and
 *  a finished item recedes. See DESIGN.md.
 *
 *  A row carries a type pill as well, and it is *outlined* rather than filled
 *  precisely so this ramp keeps working. See `CATEGORY_BADGE`. */
export const STATUS_BADGE: Record<WorkStatus, string> = {
  blocked: "border-transparent bg-foreground/15 text-foreground",
  "in-progress": "border-transparent bg-foreground/8 text-foreground",
  backlog: "border-transparent bg-muted text-muted-foreground",
  done: "border-transparent bg-muted/50 text-muted-foreground",
}

/** Row order: what needs attention first, what is finished last. */
export const STATUS_ORDER: Record<WorkStatus, number> = {
  "in-progress": 0,
  blocked: 1,
  backlog: 2,
  done: 3,
}

export function isWorkStatus(value: string): value is WorkStatus {
  return (STATUSES as string[]).includes(value)
}

/** What type of thing a row is. A closed set, in the order the cards and the
 *  filter offer them: biggest first, so the row reads from "a whole piece of
 *  work" down to "one thing to chase". Every label is one word: they are shown
 *  as cards, three to a row, and again in a filter bar. */
export const WORK_CATEGORIES = [
  { id: "project", label: "Project" },
  { id: "deliverable", label: "Deliverable" },
  { id: "task", label: "Task" },
  { id: "request", label: "Request" },
  { id: "followup", label: "Followup" },
] as const

export type WorkCategory = (typeof WORK_CATEGORIES)[number]["id"]

/** Type → pill classes, and there is only the one: an outline, no fill, the same
 *  for every type. A type is a fact about what this row *is*, not about how
 *  urgent it is, so it must not enter the ramp. */
export const CATEGORY_BADGE = "border-border text-muted-foreground"

/** A category's own word, or the raw value for one the set no longer has. */
export function categoryLabel(id: string): string {
  return WORK_CATEGORIES.find((kind) => kind.id === id)?.label ?? id
}

/** Whether a string off the wire is one of the declared categories. The set is
 *  closed, so anything else is dropped rather than stored. */
export function isWorkCategory(value: unknown): value is WorkCategory {
  return WORK_CATEGORIES.some((kind) => kind.id === value)
}
