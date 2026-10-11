// Module store — reads and writes `app/data/<file>.json`, and reads
// `app/data/<file>.md`.
//
// One file per module rather than one document. Two writers editing different
// modules can never clobber each other, and Claude can change one module
// without rewriting the others.
//
// Read at request time, so an edit to a file — by the user in the app, by
// Claude, or by hand in an editor — shows on the next page load with no
// rebuild.

import {
  mkdir,
  readdir,
  readFile,
  rename,
  stat,
  writeFile,
} from "node:fs/promises"
import { dirname, join } from "node:path"

import { moduleById } from "~/modules/modules"

import type {
  ModuleDoc,
  ModulePage,
  ModuleRows,
  ModuleStore,
  WriteResult,
} from "./store"

const DATA_DIR = join(process.cwd(), "data")

/** Freshness tokens are compared to the millisecond. On disk the token is an
 *  mtime, and a filesystem may keep coarser time than it reports, so an exact
 *  `!==` can report a conflict against our own write. One millisecond of slack
 *  is under any interval a second writer could land in. */
const MTIME_TOLERANCE_MS = 1

/** Where a module's content lives: its registry entry's `file`, in
 *  `app/data/`.
 *
 *  The path guard. The id is looked up in the registry rather than trusted, and
 *  the file name must be a plain `<name>.json` or `<name>.md` — so no user input is ever
 *  joined to a path, and nothing outside `app/data/` can be read or written.
 *  `.md` is a page module's Markdoc (About), read only through `readPage`. */
function moduleFilePath(moduleId: string): string {
  const file = moduleById(moduleId)?.file
  if (!file || !/^[\w-]+\.(json|md)$/.test(file))
    throw new Error(`"${moduleId}" is not a module with a data file`)
  return join(DATA_DIR, file)
}

/** Does the store still hold what the writer last read?
 *
 *  `undefined` on either side means "there was no file", and a file appearing
 *  since the read fails the check the same way a changed one does. */
function tokenMatches(
  current: number | undefined,
  expected: number | undefined
): boolean {
  if (current == null) return expected == null
  return expected != null && Math.abs(current - expected) <= MTIME_TOLERANCE_MS
}

/** One row module's bytes.
 *
 *  Two-space JSON with a trailing newline. The files are meant to be readable
 *  and hand-editable, and a save that reflowed the whole file would bury the
 *  actual change in any diff. */
function rowsFileText(items: unknown[]): string {
  return `${JSON.stringify({ items }, null, 2)}\n`
}

/** Is this entry machinery rather than content? Everything that begins with a
 *  dot — `.DS_Store`, a temp file — belongs to something else, and would
 *  otherwise reload the page for nothing. */
function isMachinery(name: string): boolean {
  return name.startsWith(".")
}

/** One module's file, parsed. No file is an empty module, not an error — that is
 *  the normal state of a fresh install. Malformed JSON still throws — that is a
 *  mistake in the file whoever edits it needs to see, not an absence. */
async function readJson(
  moduleId: string
): Promise<{ value?: unknown; updatedAt?: number }> {
  const path = moduleFilePath(moduleId)
  try {
    const [raw, info] = await Promise.all([readFile(path, "utf8"), stat(path)])
    return { value: JSON.parse(raw), updatedAt: info.mtimeMs }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {}
    throw new Error(`Could not read ${path}: ${(err as Error).message}`)
  }
}

/** One row module's rows: the file is `{ "items": [...] }`. */
export async function readRows<T>(moduleId: string): Promise<ModuleRows<T>> {
  const { value, updatedAt } = await readJson(moduleId)
  const items = (value as { items?: T[] } | undefined)?.items
  return { items: Array.isArray(items) ? items : [], updatedAt }
}

/** A module kept as one document: the whole file. */
export async function readDoc<T>(moduleId: string): Promise<ModuleDoc<T>> {
  const { value, updatedAt } = await readJson(moduleId)
  return { data: value as T | undefined, updatedAt }
}

/** A page module's Markdoc source (About): the file's text, parsed by the
 *  caller. No file is an empty module, as for the JSON modules. */
export async function readPage(moduleId: string): Promise<ModulePage> {
  const path = moduleFilePath(moduleId)
  try {
    const [source, info] = await Promise.all([
      readFile(path, "utf8"),
      stat(path),
    ])
    return { source, updatedAt: info.mtimeMs }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {}
    throw new Error(`Could not read ${path}: ${(err as Error).message}`)
  }
}

// `WriteResult`'s `updatedAt` is an mtime here. That is this store's answer to
// "the token a write is checked against" — the interface does not say mtime, and
// nothing above the store may assume it.

/** Replace one row module's rows.
 *
 *  The rows arrive parsed — `~/data/fields` is what turns a posted
 *  array into rows — so this is only the write. */
export async function writeRows(
  moduleId: string,
  items: unknown[],
  expectedUpdatedAt?: number
): Promise<WriteResult> {
  return writeGuarded(
    moduleFilePath(moduleId),
    rowsFileText(items),
    expectedUpdatedAt
  )
}

/** Write a module's file, but only if it still holds what the writer last read.
 *
 *  Written to a temp file and renamed rather than written in place: every page
 *  load reads these files, and `rename` inside one directory is atomic, so a
 *  request can never catch a half-written file. */
async function writeGuarded(
  path: string,
  text: string,
  expectedUpdatedAt?: number
): Promise<WriteResult> {
  const current = await currentMtime(path)

  if (!tokenMatches(current, expectedUpdatedAt)) {
    // An mtime that moved is not by itself a conflict. If the file already says
    // what this write was going to say, there is nothing to lose and nothing to
    // ask the user about: report the current mtime and let the editor carry on.
    if (current != null && (await fileText(path)).trim() === text.trim())
      return { ok: true, updatedAt: current }
    return { ok: false, reason: "conflict", updatedAt: current }
  }

  await mkdir(dirname(path), { recursive: true })
  const temp = `${path}.${process.pid}.tmp`
  await writeFile(temp, text, "utf8")
  await rename(temp, path)

  const info = await stat(path)
  return { ok: true, updatedAt: info.mtimeMs }
}

/** A file's raw text, or "" where there is none. */
async function fileText(path: string): Promise<string> {
  try {
    return await readFile(path, "utf8")
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return ""
    throw new Error(`Could not read ${path}: ${(err as Error).message}`)
  }
}

/** The file's mtime, or `undefined` when there is no file. */
async function currentMtime(path: string): Promise<number | undefined> {
  try {
    return (await stat(path)).mtimeMs
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return undefined
    throw new Error(`Could not read ${path}: ${(err as Error).message}`)
  }
}

/** The newest mtime under `app/data/`, or undefined when nothing is stored.
 *
 *  A directory's own mtime is not enough — it moves when a file is added or
 *  removed, not when one is written — so this takes the largest file mtime.
 *  That is a handful of files and one `readdir`, cheap enough to ask for on a
 *  few-second poll. A missing directory is an empty store, not an error. */
export async function latestUpdatedAt(): Promise<number | undefined> {
  let newest: number | undefined

  async function walk(dir: string): Promise<void> {
    let entries
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return
      throw err
    }
    await Promise.all(
      entries.map(async (entry) => {
        if (isMachinery(entry.name)) return
        const path = join(dir, entry.name)
        if (entry.isDirectory()) return walk(path)
        if (!entry.isFile()) return
        const { mtimeMs } = await stat(path)
        if (newest === undefined || mtimeMs > newest) newest = mtimeMs
      })
    )
  }

  await walk(DATA_DIR)
  return newest
}

/** This module as a `ModuleStore`: the one binding of the interface to the
 *  filesystem. */
export const store: ModuleStore = {
  readRows,
  readDoc,
  readPage,
  writeRows,
  latestUpdatedAt,
}
