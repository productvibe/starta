import { route } from "@react-router/dev/routes"

import type { Module } from "~/modules/modules"

// A profile module is one page: its Markdoc file, read-only.
export default function routes(module: Module) {
  return route(module.id, "blocks/profile/route.tsx", {
    id: `module/${module.id}`,
  })
}
