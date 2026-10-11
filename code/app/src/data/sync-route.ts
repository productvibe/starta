import { store } from "./store.server"

// Resource route: the newest freshness token in the store, and nothing else.
//
// The one thing an open page cannot work out for itself. Its own `asOf` is the
// version it loaded; this says what the store holds now, and the difference is
// how the page knows Claude rewrote a file underneath it.
//
// Deliberately a poll rather than a pushed stream: one number, one request.

export async function loader() {
  return Response.json(
    { updatedAt: (await store.latestUpdatedAt()) ?? null },
    // The answer is different every time it matters, so nothing may hold it.
    { headers: { "Cache-Control": "no-store" } }
  )
}
