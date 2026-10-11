import { data } from "react-router"

import type { Route } from "./+types/route"
import { store } from "~/data/store.server"
import { APP_ID, APP_NAME, APP_URL, moduleIdOf } from "~/lib/app"
import { EmptyModule } from "~/modules/empty-module"
import { moduleById } from "~/modules/modules"
import { wikiComponents } from "~/wiki/components"
import { parseWiki } from "~/wiki/markdoc"
import { WikiArticle } from "~/wiki/page"
import { renderTree } from "~/wiki/render"

// The profile block: one page about the person — their role. Read-only on
// screen. The module's file is a Markdoc page, parsed and drawn as the wiki's
// pages are (`~/wiki/markdoc`, `~/wiki/render`): the frontmatter holds the
// role's title, team and organisation, the body says what the role is for.
// Claude fills it during the interview, and an open page reloads when it does
// (`~/data/store-sync`).

/** The role: who the person is at work, from the page's frontmatter. */
export type Role = {
  title?: string
  team?: string
  organisation?: string
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `${data?.title ?? "About"} — ${APP_NAME}` }]
}

export async function loader({ request }: Route.LoaderArgs) {
  // The module is the first segment of the path; the registry decides whether
  // there is one.
  const id = moduleIdOf(request)
  const module = moduleById(id)
  if (!module || module.block !== "profile")
    throw data(`No module "${id}"`, { status: 404 })
  const { source, updatedAt } = await store.readPage(module.id)
  const doc = source
    ? parseWiki(source, `app/data/${module.file}`, {
        appName: APP_NAME,
        appId: APP_ID,
        appUrl: APP_URL,
      })
    : undefined
  // A page the wiki would refuse to build is a mistake in the file, not an
  // absence: say where it is.
  if (doc?.errors.length)
    throw new Error(
      doc.errors.map((e) => `${e.file}:${e.line} ${e.message}`).join("\n")
    )
  const fm = doc?.frontmatter ?? {}
  const text = (v: unknown) => (v == null ? undefined : String(v))
  const role: Role = {
    title: text(fm.title),
    team: text(fm.team),
    organisation: text(fm.organisation),
  }
  return {
    id: module.id,
    title: module.title,
    role,
    content: doc?.tree ?? [],
    asOf: updatedAt,
  }
}

export default function ProfileRoute({ loaderData }: Route.ComponentProps) {
  const module = moduleById(loaderData.id)!
  const { role, content } = loaderData
  const hasRole = Object.values(role).some(Boolean) || content.length > 0

  // Drawn as a wiki page is (`~/wiki/page`): the frontmatter `title` is the
  // page's title, and `team` and `organisation` stay in the file, as a wiki
  // page's `description` does; the body is the role as prose.
  return (
    <WikiArticle title={role.title ?? module.title}>
      {hasRole ? (
        renderTree(content, wikiComponents)
      ) : (
        <EmptyModule module={module} label="role" />
      )}
    </WikiArticle>
  )
}
