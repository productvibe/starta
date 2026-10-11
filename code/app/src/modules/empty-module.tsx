import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty"
import { moduleIcon } from "~/lib/module-icons"

import type { Module } from "./modules"

/** A module with nothing in it: the module's own icon and one line. Nothing is
 *  seeded into the file either, so an empty module reads as empty everywhere
 *  else too. */
export function EmptyModule({
  module,
  label,
}: {
  module: Module
  /** What is empty, when it is not the whole module: a section's name, so an
   *  empty Role section says "Nothing in role yet". */
  label?: string
}) {
  const name = (label ?? module.title).toLowerCase()
  const Icon = moduleIcon(module.icon)
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{`Nothing in ${name} yet`}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
