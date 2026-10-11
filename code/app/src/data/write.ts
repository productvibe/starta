import { useCallback, useEffect, useRef } from "react"
import { useFetcher } from "react-router"

import type { WriteResult } from "./store"

// Saving, as this app does it: a POST to the route the editor is on. Its own
// module because every editor asks for the same thing — hand me a promise that
// resolves with what the store did — and because it is the one part of saving
// that knows a route exists.

/** A write, for this app: a POST to the route the caller is on.
 *
 *  `useFetcher` is event-shaped — submit now, data later — and every editor asks
 *  for a promise, so the two are bridged here. */
export function useWrite(
  /** Where to post, when it is not the route the caller is on. */
  action?: string
): (fields: Record<string, string>) => Promise<WriteResult> {
  const fetcher = useFetcher<WriteResult>()
  const pending = useRef<{
    resolve: (result: WriteResult) => void
    reject: (reason?: unknown) => void
  } | null>(null)

  useEffect(() => {
    if (!fetcher.data || !pending.current) return
    const { resolve } = pending.current
    pending.current = null
    resolve(fetcher.data)
  }, [fetcher.data])

  const submit = fetcher.submit
  return useCallback(
    (fields: Record<string, string>) =>
      new Promise<WriteResult>((resolve, reject) => {
        // A save that starts while another is outstanding supersedes it. The
        // editor ignores a superseded rejection; leaving the promise unsettled
        // would leak it instead.
        pending.current?.reject(new Error("superseded"))
        pending.current = { resolve, reject }
        submit(fields, { method: "post", action })
      }),
    [submit, action]
  )
}

/** "" is how "there was nothing stored" crosses the wire, and the action reads
 *  it back as undefined. An absent field would be indistinguishable from a bug
 *  in the caller. */
export function stamp(baseline: number | undefined): string {
  return baseline == null ? "" : String(baseline)
}
