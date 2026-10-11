// The app's identity, read from `src/instance.json` — the one file an instance
// of this base edits. The code names no instance and no department.
import instance from "~/instance.json"

/** Display name: sidebar header, document
 *  titles, wiki export author. */
export const APP_NAME: string = instance.name

/** Machine id: the prefix of the app's cookies and of exported file names. */
export const APP_ID: string = instance.id

/** Where the instance is served — absolute links in exported documents. */
export const APP_URL: string = instance.url

/** What the app is, in one sentence. */
export const APP_DESCRIPTION: string = instance.description

/** The module id a request is for: the first segment of its path below the
 *  app's base, so it holds where the app is served under one (create serves
 *  the app at /create). */
export function moduleIdOf(request: Request): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  const path = new URL(request.url).pathname
  return (path.startsWith(`${base}/`) ? path.slice(base.length) : path).split(
    "/"
  )[1]
}
