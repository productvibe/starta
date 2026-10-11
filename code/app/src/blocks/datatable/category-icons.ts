import {
  Bell,
  Inbox,
  Layers,
  Package,
  SquareCheck,
  Tag,
  type LucideIcon,
} from "lucide-react"

// The mark for each type of row (`WORK_CATEGORIES` in `./status`).
//
// Here rather than in `./status` because the words a type carries belong with
// the type; how it is drawn belongs to the screen.
//
// One family, one weight, and structure over metaphor: the mark should say what
// shape the thing is, not act it out.
const WORK_ICONS: Record<string, LucideIcon> = {
  project: Layers,
  // A thing that gets handed over, which is what separates a deliverable from
  // the task of making it.
  deliverable: Package,
  task: SquareCheck,
  request: Inbox,
  followup: Bell,
}

/** The mark for a type. A type added to `WORK_CATEGORIES` without one here gets
 *  `Tag` rather than a crash — the cards are generated from the list, and a
 *  missing icon should not be able to take the sheet down. */
export function workIcon(id: string): LucideIcon {
  return WORK_ICONS[id] ?? Tag
}
