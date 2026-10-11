import { useEffect, useRef } from "react"
import { useMatches, useRevalidator } from "react-router"

import { changes } from "./changes"

// Reload the page's data when the store changes underneath it.
//
// Mounted once inside the shell, renders nothing. The transport is `./changes`;
// this holds only the decisions: is the reported version newer than what is on
// screen, and is now a safe moment to act on it.

/** The store version the page currently on screen was built from. Every loader
 *  returns it as `asOf`. The newest across every match, not the leaf's. */
function useLoadedVersion(): number | null {
  const matches = useMatches()
  let newest: number | null = null
  for (const match of matches) {
    const asOf = (match.loaderData as { asOf?: unknown } | undefined)?.asOf
    if (typeof asOf === "number" && (newest === null || asOf > newest))
      newest = asOf
  }
  return newest
}

export function useStoreSync({ paused }: { paused: boolean }) {
  const { revalidate, state } = useRevalidator()
  // What is on screen, and what has already been acted on. Compared against the
  // larger of the two: the loaded version alone would re-fire while a
  // revalidation is still in flight, and the acted-on version alone would go
  // stale when our own editor writes.
  const loaded = useRef<number | null>(null)
  loaded.current = useLoadedVersion()
  const acted = useRef<number | null>(null)
  // Read through refs so neither can restart the subscription.
  const pausedRef = useRef(paused)
  pausedRef.current = paused
  const busy = useRef(false)

  // A change that arrived at a moment we could not act on. Held rather than
  // dropped: writes come in bursts, and the one that lands while the previous
  // reload is still in flight is usually the one carrying the final state.
  const pending = useRef(false)

  const run = useRef(() => {})
  run.current = () => {
    if (busy.current) return
    // Held for an open editor rather than pulling content out from under the
    // typing. It stays pending, so it fires the moment the editor closes.
    if (pausedRef.current) return
    if (!pending.current) return

    pending.current = false
    busy.current = true
    void Promise.resolve(revalidate()).finally(() => {
      busy.current = false
      // Anything that arrived while we were reloading is still waiting.
      if (pending.current) run.current()
    })
  }

  useEffect(() => {
    return changes.subscribe((updatedAt) => {
      // A page with no version is a page showing an empty store, and it is the
      // one that most needs telling: the first file anyone writes lands on a
      // page that has never had a token to be behind. Zero is a version like
      // any other.
      const current = Math.max(loaded.current ?? 0, acted.current ?? 0)
      if (updatedAt <= current) return

      acted.current = updatedAt
      pending.current = true
      run.current()
    })
  }, [])

  // The editor closing is a moment, not an event: anything held while it was
  // open would sit there until the store happened to move again.
  useEffect(() => {
    if (!paused) run.current()
  }, [paused])

  // Exposed for a caller that wants to know a reload is in flight.
  return { syncing: state !== "idle" }
}

export function StoreSync() {
  useStoreSync({ paused: false })
  return null
}
