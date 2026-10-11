import type { WikiDoc } from "./markdoc"
import { buildTree, type WikiFrontmatter } from "./tree"

// Every wiki page, parsed at build time: `wiki/` is the app-root folder beside
// `src/`, and a page is added by dropping a `.md` file into it — no
// registration anywhere. The wiki's Vite plugin (wiki/vite-plugin.ts) turns each file into
// its transformed Markdoc tree, frontmatter, download source and search text
// (wiki/markdoc.ts), so the browser receives only the tree of the page it
// opens, from the route's loader. Server-only.

type WikiModule = Omit<WikiDoc, "errors" | "frontmatter"> & {
  frontmatter: WikiFrontmatter
}

const modules = import.meta.glob<WikiModule>("/wiki/**/*.md", {
  eager: true,
  import: "default",
})

export const wikiTree = buildTree(
  Object.entries(modules).map(([file, mod]) => ({
    file,
    frontmatter: mod.frontmatter,
  }))
)

/** The page's transformed tree (render.tsx draws it). */
export function treeFor(file: string): unknown[] {
  return modules[file]?.tree ?? []
}

/** The page's Markdown, variables filled in, for the downloads. */
export function sourceFor(file: string): string {
  return modules[file]?.source ?? ""
}

/** Every page's text blocks, keyed by file — for a search index. */
export function plainTextByFile(): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(modules).map(([file, mod]) => [file, mod.plainText ?? []])
  )
}
