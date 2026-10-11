// Draws a wiki page's transformed Markdoc tree (wiki/markdoc.ts) with a
// component map: lowercase names are the Markdown elements, capitalised ones
// the wiki's tags. The
// parse ran at build time; this is all the browser gets.

import { createElement, type ComponentType, type ReactNode } from "react"

type Node =
  | string
  | number
  | null
  | { name: string; attributes: Record<string, unknown>; children: Node[] }

export function renderTree(
  nodes: unknown[],
  components: Record<string, ComponentType<any>>
): ReactNode {
  const draw = (n: Node, key: number): ReactNode => {
    if (n == null || typeof n !== "object") return n
    const C = components[n.name] ?? n.name
    const { class: className, ...attrs } = n.attributes as Record<
      string,
      unknown
    >
    return createElement(
      C,
      { key, ...(className ? { className } : {}), ...attrs },
      ...(n.children.length ? n.children.map(draw) : [])
    )
  }
  return (nodes as Node[]).map(draw)
}
