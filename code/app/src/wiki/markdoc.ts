// A wiki page (`wiki/**/*.md`) in Markdoc: parsed, checked and transformed at
// build time by the wiki's Vite plugin (wiki/vite-plugin.ts), so the wiki ships no Markdown engine to the browser. Plain
// Markdown is valid as it is. On top of it a page may use:
//
//   {% $appName %}, {% $appId %}, {% $appUrl %}   the instance's name, id and
//       URL (app/src/instance.json), so a page shared by every fork names none
//   {% callout title="…" %} … {% /callout %}       a set-off note
//   {% figure src="/wiki/x.png" caption="…" /%}    an image with its caption
//
// Nothing else: an unknown tag or variable fails the build.

import Markdoc from "@markdoc/markdoc"
import type { Config, Node, Schema } from "@markdoc/markdoc"
import yaml from "js-yaml"

const { Tag } = Markdoc

export type WikiVariables = { appName: string; appId: string; appUrl: string }

const STATIC_TAGS: Record<string, Schema> = {
  callout: {
    render: "Callout",
    attributes: { title: { type: String } },
  },
  figure: {
    render: "Figure",
    selfClosing: true,
    attributes: {
      src: { type: String, required: true },
      caption: { type: String },
    },
  },

}

// Markdown wraps lines inside **bold**, *italic* and links; Markdoc's
// schemas list no line break among their children, so allow one.
const INLINE_BREAKS = Object.fromEntries(
  (["strong", "em", "s", "link"] as const).map((k) => [
    k,
    {
      ...Markdoc.nodes[k],
      children: [
        ...(Markdoc.nodes[k].children ?? []),
        "softbreak",
        "hardbreak",
      ],
    },
  ])
)

const NODES: Record<string, Schema> = {
  ...INLINE_BREAKS,
  // `<pre><code class="language-x">`, the shape the page's code component
  // styles (a fenced block is the one mono face; wiki/components.tsx)
  fence: {
    ...Markdoc.nodes.fence,
    transform: (n, c) =>
      new Tag("pre", {}, [
        new Tag(
          "code",
          // no language: the chip, as MDX drew it
          n.attributes.language
            ? { className: `language-${n.attributes.language}` }
            : {},
          n.transformChildren(c)
        ),
      ]),
  },
  // Inline code fills the variables too (`{% $appId %}` in a command);
  // `\{% $appId %}` prints the tag as written.
  code: {
    ...Markdoc.nodes.code,
    transform: (n, c) =>
      new Tag("code", {}, [
        fill(String(n.attributes.content), c.variables as WikiVariables),
      ]),
  },
}

const VAR = /(\\?)\{%\s*\$(appName|appId|appUrl)\s*%\}/g

function fill(text: string, vars: WikiVariables) {
  return text.replace(VAR, (m: string, esc: string, k: keyof WikiVariables) =>
    esc ? m.slice(1) : vars[k]
  )
}

export type WikiError = { file: string; line: number; message: string }

export type WikiDoc = {
  frontmatter: Record<string, string | number>
  /** the page, transformed (JSON), for wiki/render.tsx */
  tree: unknown[]
  /** the Markdown for the downloads: variables filled, tags as Markdown */
  source: string
  /** one string per block, for search */
  plainText: string[]
  errors: WikiError[]
}

const textOf = (n: Node): string =>
  n.type === "text"
    ? String(n.attributes.content ?? "")
    : n.type === "code"
      ? String(n.attributes.content ?? "")
      : n.children.map(textOf).join("")

function blocks(n: Node, out: string[]) {
  if (["paragraph", "heading", "fence", "tr"].includes(n.type)) {
    const t = (n.type === "fence" ? String(n.attributes.content) : textOf(n))
      .replace(/\s+/g, " ")
      .trim()
    if (t) out.push(t)
    return
  }
  n.children.forEach((c) => blocks(c, out))
}

/** The page's Markdown for a download: variables filled in, and the static
 *  tags as the Markdown a reader expects. */
function downloadSource(body: string, vars: WikiVariables) {
  return fill(body, vars)
    .replace(/^\{%\s*\/?callout\b[^%]*%\}\s*$/gm, "")
    .replace(
      /\{%\s*figure\s+src="([^"]+)"(?:\s+caption="([^"]*)")?\s*\/%\}/g,
      (_, src: string, cap = "") => `![${cap}](${src})`
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

/** `vars`: the instance's values for the page's variables. */
export function parseWiki(
  raw: string,
  file: string,
  vars: WikiVariables
): WikiDoc {
  const TAGS = STATIC_TAGS
  const config: Config = { tags: TAGS, nodes: NODES, variables: vars }
  // Checked as written, so an error names the page's own line.
  const errors: WikiError[] = Markdoc.validate(Markdoc.parse(raw), config).map(
    (e) => ({
      file,
      line: (e.lines[0] ?? 0) + 1,
      message:
        e.error.id === "tag-undefined"
          ? `${e.error.message}. The wiki's tags: ${Object.keys(TAGS).join(", ")}`
          : e.error.message,
    })
  )
  const source = raw
  const ast = Markdoc.parse(source)
  let frontmatter: Record<string, string | number> = {}
  try {
    frontmatter = (yaml.load(ast.attributes.frontmatter ?? "") ??
      {}) as typeof frontmatter
  } catch (e) {
    errors.push({
      file,
      line: 1,
      message: `frontmatter: ${(e as Error).message.split("\n")[0]}`,
    })
  }
  const t = Markdoc.transform(ast.children, config)
  const tree = JSON.parse(
    JSON.stringify(Array.isArray(t) ? t : [t])
  ) as unknown[]
  const plainText: string[] = []
  blocks(ast, plainText)
  const body = source.replace(/^---\n[\s\S]*?\n---\n*/, "")
  return {
    frontmatter,
    tree,
    source: downloadSource(body, vars),
    plainText,
    errors,
  }
}
