import { useCallback } from "react"
import { data, useSearchParams } from "react-router"

import type { Route } from "./+types/route"
import { upsertRow } from "~/data/rows-edit"
import type { WriteResult } from "~/data/store"
import { store } from "~/data/store.server"
import { stamp, useWrite } from "~/data/write"
import { APP_NAME, moduleIdOf } from "~/lib/app"
import { cn } from "~/lib/utils"
import { moduleById } from "~/modules/modules"

import { parseRows, type Row } from "~/data/fields"
import type { Person } from "./rows"
import { GoalView } from "./goal-view"
import { TableView } from "./table-view"
import { TaskView } from "./task-view"
import { tableQuery } from "./toolbar"

// The datatable block: a module's rows, in its view — a table or a task list —
// with a sheet per row. One route serves every datatable module; the module is
// the first segment of the path, and the registry decides whether there is one.
//
// Reads and writes go through the data helper (`~/data/store.server`). A write
// carries the `updatedAt` the page read, and a stale write comes back as a
// conflict rather than overwriting what Claude wrote.

/** The datatable module this request is for, or a 404. */
function moduleFor(request: Request) {
  const id = moduleIdOf(request)
  const module = moduleById(id)
  if (!module || module.block !== "datatable" || !module.fields)
    throw data(`No module "${id}"`, { status: 404 })
  return module
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data?.title ?? "Module"} — ${APP_NAME}` }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const module = moduleFor(request)
  // The people on file, for a `person` field: a task names a person by id.
  const wantsPeople = module.fields!.some((f) => f.kind === "person")
  const [own, people] = await Promise.all([
    store.readRows<Row>(module.id),
    wantsPeople && moduleById("people")?.file
      ? store.readRows<Person>("people")
      : Promise.resolve({ items: [] as Person[] }),
  ])
  return {
    id: module.id,
    title: module.title,
    rows: own.items,
    people: module.id === "people" ? (own.items as Person[]) : people.items,
    // this module's own file, not whichever was newest
    asOf: own.updatedAt,
  }
}

/** Save the module's rows — the whole set, from the sheet — or tick one row
 *  done from the task view.
 *
 *  `asOf` is the file's freshness token as the page loaded it, passed straight
 *  back: the write only lands if the file still has it. A conflict comes back
 *  as data rather than an error because it is a state the editor draws. */
export async function action({ request }: Route.ActionArgs) {
  const module = moduleFor(request)
  const fields = module.fields!
  const form = await request.formData()

  if (form.get("intent") === "done") {
    const status = fields.find((f) => f.kind === "status")?.key
    const id = form.get("id")?.toString()
    if (!status || !id) throw new Response("Nothing to tick", { status: 400 })
    // Unticked goes back to the backlog: the one status that says nothing
    // more than "open".
    return upsertRow(store, module.id, id, {
      [status]: form.get("done") === "true" ? "done" : "backlog",
    })
  }

  // "" means the page loaded a module with no file at all, which is a
  // distinct expectation from "some mtime" and has to survive the round trip.
  const asOf = form.get("asOf")
  const expected = asOf === "" || asOf == null ? undefined : Number(asOf)
  const rows = form.get("rows")
  if (typeof rows !== "string")
    throw new Response("No rows to write", { status: 400 })

  // Parsed, not passed through. What arrives is JSON a browser posted, and the
  // file is read by Claude and by whoever opens it — a shape nobody recognises
  // must not reach it.
  let items
  try {
    items = parseRows(fields, JSON.parse(rows))
  } catch (err) {
    throw new Response(`Cannot write ${module.id}: ${(err as Error).message}`, {
      status: 400,
    })
  }
  return store.writeRows(module.id, items, expected)
}

/** Save the rows — the whole set, as JSON. */
function useSaveRows() {
  const write = useWrite()
  return useCallback(
    (items: unknown[], baseline: number | undefined): Promise<WriteResult> =>
      write({ rows: JSON.stringify(items), asOf: stamp(baseline) }),
    [write]
  )
}

export default function DatatableRoute({ loaderData }: Route.ComponentProps) {
  const module = moduleById(loaderData.id)!
  const save = useSaveRows()
  const [params] = useSearchParams()
  const props = {
    module,
    rows: loaderData.rows,
    people: loaderData.people,
    asOf: loaderData.asOf,
    save,
  }
  return (
    // One measure for every list — a table that sets its own width makes the
    // sidebar's pages jump as you move between them. Goal cards sit three
    // across, so they get the reports' wider measure.
    <div
      className={cn(
        "mx-auto px-6 pt-10 pb-20 lg:px-8",
        module.view === "goal" ? "max-w-5xl" : "max-w-3xl"
      )}
    >
      {module.view === "goal" ? (
        <GoalView key={module.id} {...props} />
      ) : module.view === "task" ? (
        <TaskView key={module.id} {...props} />
      ) : (
        <TableView
          key={module.id}
          {...props}
          query={tableQuery(params, module.fields ?? [])}
        />
      )}
    </div>
  )
}
