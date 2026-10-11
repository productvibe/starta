// The modules: what the sidebar lists, what the routes serve and what Settings
// has a section for. This module holds the shape and the words only — every
// word of actual content lives in the module's data file (`app/data/<file>`),
// or for the wiki in `app/wiki/`, and is read at request time.
//
// Nothing here imports anything at runtime but JSON. That is load-bearing
// rather than tidy: the registry is read by the client, and by `routes.ts` at
// build time, and a sidebar icon imported here would drag `lucide-react` and
// React itself into that process. The marks live in `~/lib/module-icons`,
// keyed by `icon`.
//
// A module is one file, `modules/<id>.json`, plus its data file; a block is one
// folder, `blocks/<block>/`, with its `block.json`. Both are found by reading
// the folders, so adding either is copying files in (the work CLI does just
// that) and removing it is deleting them: the sidebar, the route and the
// Settings section are generated from what is here.

import type { RowField } from "../data/fields"

export type Module = {
  /** slug — also the URL segment */
  id: string
  title: string
  /** The reusable block the module is an instance of: a folder in `blocks/`,
   *  or `pages`, the wiki, which is part of the base. */
  block: string
  /** How a datatable module shows its rows: as a table, a task list or goal
   *  cards. */
  view?: "table" | "task" | "goal"
  /** The sidebar mark, by name (`~/lib/module-icons`). */
  icon: string
  /** The module's data file in `app/data/`: JSON, or a Markdoc page for
   *  About. The wiki has none: its pages are
   *  the Markdoc files in `app/wiki/`. */
  file?: string
  /** Where it sits in the sidebar, lowest first. */
  order: number
  /** A datatable module's columns, in the order the sheet shows them. */
  fields?: RowField[]
  /** one line on what the module holds, shown in Settings */
  purpose: string
}

/** What a block says of itself, in `blocks/<block>/block.json`. */
export type Block = {
  /** the blocks it imports from */
  needs?: string[]
  /** npm packages only it uses, as `package.json` lists them */
  packages?: Record<string, string>
  /** folders of the person's content it starts with, copied once when the
   *  block is added (the work CLI) and never updated */
  data?: string[]
}

const blockFiles = import.meta.glob<Block>("../blocks/*/block.json", {
  eager: true,
  import: "default",
})

/** The installed blocks, by name. */
export const blocks: Record<string, Block> = Object.fromEntries(
  Object.entries(blockFiles).map(([path, block]) => [
    path.split("/").at(-2)!,
    block,
  ])
)

const moduleFiles = import.meta.glob<Module>("./*.json", {
  eager: true,
  import: "default",
})

/** The modules, in sidebar order. A module whose block is not installed is
 *  left out rather than served by nothing. */
export const modules: Module[] = Object.values(moduleFiles)
  .filter((m) => m.block === "pages" || m.block in blocks)
  .sort((a, b) => a.order - b.order)

export function moduleById(id: string | undefined): Module | undefined {
  return modules.find((m) => m.id === id)
}
