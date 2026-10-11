import { moduleById } from "~/modules/modules"
import {
  blankRow,
  fromDraft,
  newId,
  toDraft,
  type Draft,
  type Row,
  type RowField,
} from "~/data/fields"

import type { ModuleRows, ModuleStore } from "./store"

// Changing one row of a module that is written whole.
//
// `writeRows` takes the entire set, and that is right: the rows of a module are
// one document as far as a writer is concerned, and sending the set is what
// makes the freshness guard mean anything. It is the wrong shape for a caller
// that knows about one row — ticking a task done — which would otherwise have
// to post every row to change one.
//
// So this reads the set, applies one row to it, and writes the set back under
// the token it just read. The whole-set write survives; the caller never sees
// it.

/** A datatable module's fields, from its registry entry. */
function fieldsOf(moduleId: string): RowField[] {
  const fields = moduleById(moduleId)?.fields
  if (!fields) throw new Error(`"${moduleId}" is not a datatable module`)
  return fields
}

/** Read one module's rows. */
export function readRowsOf(
  store: ModuleStore,
  moduleId: string
): Promise<ModuleRows<Row>> {
  return store.readRows<Row>(moduleId)
}

/** Match a row by what the caller called it: its id, case-insensitively. */
function matches(row: Row, key: string): boolean {
  return row.id.toLowerCase() === key.trim().toLowerCase()
}

export type RowPlan =
  | { ok: true; items: Row[]; row: Row; created: boolean; updatedAt?: number }
  | { ok: false; reason: "not-found" }

export type RowEdit =
  | { ok: true; row: Row; created: boolean; updatedAt: number }
  | { ok: false; reason: "conflict" | "not-found" }

/** What the set would become, without writing it.
 *
 *  `fields` is a partial draft — only the keys the caller is changing. An
 *  existing row is read into a draft, the given keys are laid over it, and it
 *  goes back through `fromDraft`, so a caller that says nothing about `note`
 *  leaves the note alone.
 *
 *  A new row gets its id derived here, once, from its name — the same rule the
 *  sheet follows, and the reason a rename cannot move it afterwards. */
export async function planUpsert(
  store: ModuleStore,
  moduleId: string,
  key: string | undefined,
  fields: Draft
): Promise<RowPlan> {
  const list = fieldsOf(moduleId)
  const current = await readRowsOf(store, moduleId)
  const index = key ? current.items.findIndex((row) => matches(row, key)) : -1

  if (key && index < 0) return { ok: false, reason: "not-found" }

  const base = index >= 0 ? current.items[index] : undefined
  const draft: Draft = { ...toDraft(list, base ?? blankRow(list)) }
  for (const [field, value] of Object.entries(fields)) draft[field] = value

  const row = fromDraft(list, draft, base)

  if (!row.id) {
    row.id = newId(
      (draft.name ?? "").trim() || "row",
      current.items.map((item) => item.id)
    )
  }

  return {
    ok: true,
    items:
      index >= 0
        ? current.items.map((item, i) => (i === index ? row : item))
        : [...current.items, row],
    row,
    created: index < 0,
    updatedAt: current.updatedAt,
  }
}

/** What the set would become with one row gone. Absent is reported rather than
 *  treated as success: a caller told "deleted" for a row that was never there
 *  will believe it did something. */
export async function planDelete(
  store: ModuleStore,
  moduleId: string,
  key: string
): Promise<RowPlan> {
  const current = await readRowsOf(store, moduleId)
  const index = current.items.findIndex((row) => matches(row, key))
  if (index < 0) return { ok: false, reason: "not-found" }

  return {
    ok: true,
    items: current.items.filter((_, i) => i !== index),
    row: current.items[index],
    created: false,
    updatedAt: current.updatedAt,
  }
}

/** Add or change one row, and write the set. */
export async function upsertRow(
  store: ModuleStore,
  moduleId: string,
  key: string | undefined,
  fields: Draft
): Promise<RowEdit> {
  return commit(store, moduleId, await planUpsert(store, moduleId, key, fields))
}

/** Remove one row, and write the set. */
export async function deleteRow(
  store: ModuleStore,
  moduleId: string,
  key: string
): Promise<RowEdit> {
  return commit(store, moduleId, await planDelete(store, moduleId, key))
}

async function commit(
  store: ModuleStore,
  moduleId: string,
  plan: RowPlan
): Promise<RowEdit> {
  if (!plan.ok) return plan
  const result = await store.writeRows(moduleId, plan.items, plan.updatedAt)
  return result.ok
    ? {
        ok: true,
        row: plan.row,
        created: plan.created,
        updatedAt: result.updatedAt,
      }
    : { ok: false, reason: "conflict" }
}
