// The build step behind the wiki (vite.config.ts). Markdoc runs here, in
// Node, and never in the browser: `wiki/**/*.md` becomes its transformed
// tree, frontmatter, download source and search text (wiki/markdoc.ts). An
// unknown tag or variable fails the build.

import { readFileSync } from "node:fs"
import { join, relative } from "node:path"

import type { Plugin } from "vite"

import { parseWiki, type WikiVariables } from "./markdoc"

/** The wiki's Markdoc pages, parsed and checked at build time. */
export function markdocPlugin(appRoot: string): Plugin {
  const wikiDir = join(appRoot, "wiki") + "/"
  const instance = JSON.parse(
    readFileSync(join(appRoot, "src/instance.json"), "utf8")
  ) as { name: string; id: string; url: string }
  const wikiVars: WikiVariables = {
    appName: instance.name,
    appId: instance.id,
    appUrl: instance.url,
  }
  return {
    name: "wiki-markdoc",
    enforce: "pre",
    transform(source, id) {
      if (id.includes("?")) return null
      if (id.startsWith(wikiDir) && id.endsWith(".md")) {
        const file = relative(appRoot, id)
        const doc = parseWiki(source, file, wikiVars)
        if (doc.errors.length)
          this.error(
            `${file} is invalid:\n${doc.errors
              .map((e) => `  ${e.file}:${e.line} ${e.message}`)
              .join("\n")}`
          )
        const { errors: _e, ...page } = doc
        return { code: `export default ${JSON.stringify(page)}`, map: null }
      }
      return null
    },
  }
}
