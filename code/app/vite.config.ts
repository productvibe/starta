import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { readdirSync, readFileSync } from "node:fs"
import { defineConfig } from "vite"

import { markdocPlugin } from "./src/wiki/vite-plugin"

// The npm packages only an installed block uses, from its block.json. They are
// pre-bundled like the rest, but only when the block is here: a block the app
// does not have has no package installed to bundle.
const blocksDir = `${import.meta.dirname}/src/blocks`
const blockPackages = readdirSync(blocksDir).flatMap((block) => {
  try {
    const meta = JSON.parse(
      readFileSync(`${blocksDir}/${block}/block.json`, "utf8")
    )
    return Object.keys(meta.packages ?? {})
  } catch {
    return []
  }
})

export default defineConfig({
  server: {
    port: 9950,
    // The module data files are read at request time through the data helper
    // (src/data/), and an open page reloads its data when one changes
    // (src/data/store-sync.tsx). Left watched, Vite reloads the whole page
    // instead, and an open row sheet loses what was typed in it.
    watch: { ignored: [`${import.meta.dirname}/data/**`] },
  },
  // Dedupe React so a transitive dep (e.g. recharts) can never pull in a second
  // copy — that's what produces "Invalid hook call / more than one copy of React".
  resolve: { tsconfigPaths: true, dedupe: ["react", "react-dom"] },
  // Pre-bundle the heavier client deps at startup. Without this, Vite discovers
  // recharts (and its victory-vendor d3 chunks) only when the first chart page
  // loads, then re-optimizes mid-session and forces a reload — during which
  // recharts renders against a null React context and the page crashes with
  // "Cannot read properties of null (reading 'useContext')".
  //
  // The same failure came back for base-ui on 2026-09-25 (MenuRoot: "Cannot
  // read properties of null (reading 'useRef')"): any package first met
  // mid-session is bundled in a SECOND pass whose chunks point at a different
  // React copy than the page's. So the list is every package the client
  // imports, not just the heavy ones — nothing is left to discover at runtime.
  // Add a package here when a client module starts importing it, or to its
  // block's block.json when only that block imports it.
  optimizeDeps: {
    include: [
      "recharts",
      "victory-vendor/d3-scale",
      "@base-ui/react",
      ...[
        "accordion",
        "alert-dialog",
        "avatar",
        "button",
        "checkbox",
        "collapsible",
        "context-menu",
        "dialog",
        "direction-provider",
        "input",
        "menu",
        "menubar",
        "merge-props",
        "navigation-menu",
        "popover",
        "preview-card",
        "progress",
        "radio",
        "radio-group",
        "scroll-area",
        "select",
        "separator",
        "slider",
        "switch",
        "tabs",
        "toggle",
        "toggle-group",
        "tooltip",
        "use-render",
      ].map((p) => `@base-ui/react/${p}`),
      "class-variance-authority",
      "clsx",
      "cmdk",
      "date-fns",
      "embla-carousel-react",
      "input-otp",
      "lucide-react",
      "next-themes",
      "react-day-picker",
      "react-resizable-panels",
      "sonner",
      "tailwind-merge",
      "vaul",
      ...blockPackages,
    ],
  },
  // Bundle recharts and its d3 vendor into the server build: left external,
  // Node has to recover the named exports of a CommonJS proxy at runtime,
  // which fails on some runtimes.
  ssr: { noExternal: ["recharts", "victory-vendor"] },
  plugins: [
    // The wiki's Markdoc pages, parsed and checked at build time so neither
    // Markdoc nor the files reach the browser (wiki/vite-plugin.ts).
    markdocPlugin(import.meta.dirname),
    tailwindcss(),
    reactRouter(),
  ],
})
