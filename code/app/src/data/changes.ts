// How the app finds out that the store changed underneath it: ask the server,
// on a timer.
//
// There are two writers — the person in the app and Claude — and only one of
// them is in the tab. Without this, a page sits stale until someone thinks to
// reload, which is a poor property for an app whose premise is that Claude
// keeps it current.

export type StoreChanges = {
  /** Report the store's newest version whenever it may have moved — a number of
   *  the same kind `updatedAt` carries on a read, so the caller can compare it
   *  against the version its page was built from. Over-reporting is fine: the
   *  caller compares before it acts. Returns the unsubscribe. */
  subscribe(onChange: (updatedAt: number) => void): () => void
}

/** Slow enough to be free, fast enough that a change lands while you are still
 *  looking at the page that changed. */
const POLL_MS = 5_000

/** Ask what the store's newest version is. Null when the request fails — a
 *  dropped answer is not a change, and a server that is down for a moment
 *  should not make the page do anything. */
async function latest(signal: AbortSignal): Promise<number | null> {
  try {
    const response = await fetch("/sync", { signal })
    if (!response.ok) return null
    const { updatedAt } = (await response.json()) as {
      updatedAt: number | null
    }
    return typeof updatedAt === "number" ? updatedAt : null
  } catch {
    return null
  }
}

export const changes: StoreChanges = {
  subscribe(onChange) {
    const controller = new AbortController()
    let asking = false

    async function ask() {
      // Nothing to spend a request on in a tab nobody is looking at. The
      // visibility listener below covers the moment it comes back.
      if (document.hidden || asking) return
      asking = true
      try {
        const updatedAt = await latest(controller.signal)
        if (updatedAt != null) onChange(updatedAt)
      } finally {
        asking = false
      }
    }

    const timer = window.setInterval(ask, POLL_MS)
    // A tab returning to the front is the likeliest moment to be behind.
    document.addEventListener("visibilitychange", ask)
    void ask()

    return () => {
      controller.abort()
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", ask)
    }
  },
}
