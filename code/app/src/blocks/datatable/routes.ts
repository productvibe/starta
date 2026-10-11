import { route } from "@react-router/dev/routes"

import type { Module } from "~/modules/modules"

// A datatable module is one page: its rows as a table or a task list.
export default function routes(module: Module) {
  return route(module.id, "blocks/datatable/route.tsx", {
    id: `module/${module.id}`,
  })
}
