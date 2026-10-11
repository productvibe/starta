// What a store has to be able to do, and nothing about where it keeps things.
//
// There is one implementation today — `./store.server`, reading files under
// `app/data/`. Everything above this line is written against the interface, so
// moving the data somewhere else is one binding rather than a sweep: the data
// helper rule, that screens never touch the files.
//
// The types live here rather than beside the filesystem implementation because
// they are the contract, not its details: `updatedAt` is "the token a write is
// checked against", which on disk happens to be an mtime and elsewhere will be a
// version number. Callers must not care which.

/** One row module's rows, plus the freshness token a write is checked
 *  against. */
export type ModuleRows<T> = { items: T[]; updatedAt?: number }

/** One whole-document module's content, or undefined when it has no
 *  file yet, plus the same freshness token. */
export type ModuleDoc<T> = { data?: T; updatedAt?: number }

/** One page module's Markdoc source (About), or undefined when it has no file
 *  yet, plus the same freshness token. */
export type ModulePage = { source?: string; updatedAt?: number }

/** What a write did, or why it did nothing.
 *
 *  `conflict` is the case that matters: the store changed since the editor read
 *  it, so writing would drop whatever the other writer put there. There are two
 *  writers by design — the user in the app and Claude editing the files — so a
 *  blind write is a real way to lose content. */
export type WriteResult =
  | { ok: true; updatedAt: number }
  | { ok: false; reason: "conflict"; updatedAt?: number }

/** A store key is a module id. Keys come from the registry, never off a URL. */
export type ModuleStore = {
  readRows<T>(moduleId: string): Promise<ModuleRows<T>>
  readDoc<T>(moduleId: string): Promise<ModuleDoc<T>>
  readPage(moduleId: string): Promise<ModulePage>
  /** Replace one row module's rows, guarded by the freshness token.
   *
   *  The whole set, not one row: the rows of a module are one document as far
   *  as a writer is concerned — they live in one file, and a change is as often
   *  a row appearing or leaving as a field changing. Sending the set is also
   *  what makes the guard mean anything, since a per-row write could not say
   *  what it was written against. */
  writeRows(
    moduleId: string,
    items: unknown[],
    expectedUpdatedAt?: number
  ): Promise<WriteResult>
  /** The newest freshness token across everything the store holds, or undefined
   *  when it holds nothing yet.
   *
   *  This is what lets an open page notice that Claude rewrote a file
   *  underneath it: the client watches this one number and reloads when it
   *  moves. */
  latestUpdatedAt(): Promise<number | undefined>
}
