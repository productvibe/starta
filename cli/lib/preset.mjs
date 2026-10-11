// The theme: the options a Starta app's look is picked from, the preset code
// that packs a pick into a few characters, and the theme.css it gives.
//
// One copy of the theme data: the CLI writes app/src/theme.css and
// theme.json from it, and create's configurator imports this file for its
// pickers and its preview. The logos live here too: theme.json carries the
// picked one's drawing, which the kit's mark draws
// (components/brand/app-mark.tsx), so the list is in this file alone.
// Plain JavaScript with no imports, so it runs in Node and in the browser.
//
// Copied from shadcn: the Neutral greys from apps/v4/registry/themes.ts and
// the merge from its buildRegistryTheme; the code from
// packages/registry/src/preset/preset.ts, with our option lists and version
// letter "d" ("a", "b" and "c" codes still decode).

// ── options ─────────────────────────────────────────────────────────────────
// Each list's first entry is the default. Never reorder a list, only append:
// a code is a list of indexes. Reordering or dropping takes a new version
// letter and a LEGACY entry for the old one.

/** The app's own tokens, which no shadcn base sets: the overlay lines, inline
 *  code, the block and grid grounds, icons, faint text and the shortcut chip.
 *  In Neutral's cool greys (shadcn's scale); a style sets its own over them
 *  (Notion's warm ones are in its entry). `notes` are the comments theme.css
 *  carries above a token. */
const APP_TOKENS = {
  light: {
    "line-1": "oklch(0.82 0.09 0)",
    "line-2": "oklch(0.68 0.09 195)",
    "line-3": "oklch(0.74 0.11 70)",
    "line-4": "oklch(0.66 0.1 285)",
    "code-inline": "oklch(0.145 0 0)",
    "code-inline-bg": "oklch(0.97 0 0)",
    block: "oklch(0.985 0 0)",
    grid: "oklch(0.922 0 0)",
    icon: "oklch(0.556 0 0)",
    faint: "oklch(0.708 0 0)",
    kbd: "oklch(0.97 0 0)",
    "kbd-foreground": "oklch(0.556 0 0)",
  },
  dark: {
    "line-1": "oklch(0.86 0.09 0)",
    "line-2": "oklch(0.78 0.09 195)",
    "line-3": "oklch(0.82 0.11 70)",
    "line-4": "oklch(0.76 0.1 285)",
    "code-inline": "rgb(255 115 105)",
    "code-inline-bg": "rgb(135 131 120 / 15%)",
    block: "rgb(255 255 255 / 3%)",
    grid: "rgb(255 255 255 / 7%)",
    icon: "rgb(255 255 255 / 46%)",
    faint: "rgb(255 255 255 / 28%)",
    kbd: "rgb(255 255 255 / 9%)",
    "kbd-foreground": "rgb(255 255 255 / 46%)",
  },
  notes: {
    light: {
      "line-1": [
        "Overlay LINES only (a rate drawn over the grey bars). Muted, one hue each,",
        "so two or three rates on one chart stay apart where a grey ramp would read",
        "as the same series twice. Marks in a plot area are otherwise grey — see",
        "product/DESIGN.md.",
      ],
      grid: [
        "The table lines: shadcn draws them in --border.",
      ],
      icon: [
        "Sidebar and toolbar glyphs: one grey that does not change when the",
        "row is selected or hovered.",
      ],
      faint: [
        "The third text grey: placeholders and the shortcut chip.",
      ],
    },
    dark: {
      "line-1": [
        "A step lighter than the light theme's, to carry over a dark ground.",
      ],
    },
  },
}

/** The greys of every surface: shadcn's Neutral base colour (themes.ts),
 *  under every style; a style merges any greys of its own over them. The
 *  app's own tokens (APP_TOKENS) go under every one. */
const NEUTRAL = {
  light: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(1 0 0)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "oklch(0.205 0 0)",
    "primary-foreground": "oklch(0.985 0 0)",
    secondary: "oklch(0.97 0 0)",
    "secondary-foreground": "oklch(0.205 0 0)",
    muted: "oklch(0.97 0 0)",
    "muted-foreground": "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    "accent-foreground": "oklch(0.205 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
    "chart-1": "oklch(0.87 0 0)",
    "chart-2": "oklch(0.556 0 0)",
    "chart-3": "oklch(0.439 0 0)",
    "chart-4": "oklch(0.371 0 0)",
    "chart-5": "oklch(0.269 0 0)",
    sidebar: "oklch(0.985 0 0)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "oklch(0.205 0 0)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.97 0 0)",
    "sidebar-accent-foreground": "oklch(0.205 0 0)",
    "sidebar-border": "oklch(0.922 0 0)",
    "sidebar-ring": "oklch(0.708 0 0)",
  },
  dark: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.205 0 0)",
    "card-foreground": "oklch(0.985 0 0)",
    popover: "oklch(0.205 0 0)",
    "popover-foreground": "oklch(0.985 0 0)",
    primary: "oklch(0.922 0 0)",
    "primary-foreground": "oklch(0.205 0 0)",
    secondary: "oklch(0.269 0 0)",
    "secondary-foreground": "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    "muted-foreground": "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    "accent-foreground": "oklch(0.985 0 0)",
    destructive: "oklch(0.704 0.191 22.216)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.556 0 0)",
    "chart-1": "oklch(0.87 0 0)",
    "chart-2": "oklch(0.556 0 0)",
    "chart-3": "oklch(0.439 0 0)",
    "chart-4": "oklch(0.371 0 0)",
    "chart-5": "oklch(0.269 0 0)",
    sidebar: "oklch(0.205 0 0)",
    "sidebar-foreground": "oklch(0.985 0 0)",
    "sidebar-primary": "oklch(0.488 0.243 264.376)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.269 0 0)",
    "sidebar-accent-foreground": "oklch(0.985 0 0)",
    "sidebar-border": "oklch(1 0 0 / 10%)",
    "sidebar-ring": "oklch(0.556 0 0)",
  },
}

/** The overlays that float over the page: dialogs, menus and popovers. */
const OVERLAYS = [
  "dialog-content",
  "alert-dialog-content",
  "popover-content",
  "dropdown-menu-content",
  "select-content",
  "combobox-content",
  "hover-card-content",
  "context-menu-content",
]
  .map((s) => `[data-slot="${s}"]`)
  .join(",\n")

/** The surfaces: cards, a report's widgets (a table and a KPI tile framed,
 *  `.border`; a chart open, without) and the overlays. */
const SURFACES = `[data-slot="card"],\n[data-slot="widget"],\n${OVERLAYS}`

/** The buttons that draw an edge or a fill (default, secondary, outline);
 *  ghost and link buttons stay bare in every style. */
const SOLID_BUTTONS = `[data-slot="button"]:is(.bg-primary, .bg-secondary, .border-border)`

/** The fields: inputs, text areas, select triggers, input groups, and the
 *  sidebar's search box (a menu button with an edge). */
const FIELDS = [
  '[data-slot="input"]',
  '[data-slot="textarea"]',
  '[data-slot="select-trigger"]',
  '[data-slot="input-group"]',
  '[data-slot="sidebar"] [data-slot="sidebar-menu-button"].border',
].join(",\n")

/** Style: the look of a product people know, or a named design style.
 *  Each is a radius, any greys of its own (merged over Neutral's), and a few
 *  rules keyed on the components' `data-slot`, which theme.css carries after
 *  the tokens. `colour` and `font` are the picks nearest the style's own,
 *  which picking the style sets (create's panel). The shadcn component files
 *  are never forked: a style is CSS over them. Neutral, the default, is the
 *  kit's own look and adds no rules. */
export const STYLES = [
  {
    id: "neutral",
    label: "Neutral",
    radius: "0.625rem",
    note:
      "shadcn/ui's default look, measured on ui.shadcn.com (dashboard-01 and " +
      "the create page's preview, 2026-10-11): Neutral greys, a near-black " +
      "primary, 0.625rem corners, cards with a hairline and a faint shadow, " +
      "the open sidebar row on the accent grey, medium table headings, Geist",
    colour: "grey",
    font: "geist",
    css: `/* Cards: a hairline and shadcn's shadow-xs. */
[data-slot="card"] {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}
/* The open sidebar row on the accent grey, medium, its glyph in the text
   colour; rows 32px with 16px glyphs. */
[data-slot="sidebar-menu-button"] {
  height: 2rem;
}
[data-slot="sidebar-menu-button"] svg {
  width: 1rem;
  height: 1rem;
  color: var(--sidebar-foreground);
}
[data-slot="sidebar-menu-button"][data-active] {
  background-color: var(--sidebar-accent);
  color: var(--sidebar-accent-foreground);
  font-weight: 500;
}
[data-slot="sidebar-menu-button"][data-active] svg {
  color: var(--sidebar-accent-foreground);
}
/* Tables: row rules only, headings medium in the text colour, 40px tall. */
[data-slot="table-head"] {
  color: var(--foreground);
  font-weight: 500;
  height: 2.5rem;
}
[data-slot="table-head"],
[data-slot="table-cell"] {
  border-right-width: 0;
}`,
  },
  {
    id: "notion",
    label: "Notion",
    radius: "0.375rem",
    note:
      "Notion's palette, measured on app.notion.com (2026-09-29): warm greys, " +
      "text rgb(44 44 43), the sidebar rgb(249 248 247), one divider colour " +
      "for rules and table lines, 6px rows, flat cards with a hairline edge, " +
      "Notion blue for the primary action, the system face",
    colour: "blue",
    font: "system",
    light: {
      background: "rgb(255 255 255)",
      foreground: "rgb(44 44 43)",
      card: "rgb(255 255 255)",
      "card-foreground": "rgb(44 44 43)",
      popover: "rgb(255 255 255)",
      "popover-foreground": "rgb(44 44 43)",
      secondary: "rgb(244 244 243)",
      "secondary-foreground": "rgb(44 44 43)",
      muted: "rgb(244 244 243)",
      "muted-foreground": "rgb(125 122 117)",
      accent: "rgb(244 244 243)",
      "accent-foreground": "rgb(44 44 43)",
      destructive: "rgb(212 76 71)",
      border: "rgb(230 229 227)",
      input: "rgb(230 229 227)",
      sidebar: "rgb(249 248 247)",
      "sidebar-foreground": "rgb(95 94 89)",
      "sidebar-primary": "rgb(44 44 43)",
      "sidebar-primary-foreground": "rgb(255 255 255)",
      "sidebar-accent": "rgb(238 237 236)",
      "sidebar-accent-foreground": "rgb(44 44 43)",
      "sidebar-border": "rgb(240 239 237)",
      block: "rgb(249 248 247)",
      grid: "rgb(240 239 237)",
      icon: "rgb(142 139 134)",
      faint: "rgb(161 158 153)",
      "code-inline": "rgb(235 87 87)",
      "code-inline-bg": "rgb(135 131 120 / 15%)",
      kbd: "rgb(42 28 0 / 7%)",
      "kbd-foreground": "rgb(142 139 134)",
    },
    dark: {
      background: "rgb(25 25 25)",
      foreground: "rgb(212 212 212)",
      card: "rgb(32 32 32)",
      "card-foreground": "rgb(212 212 212)",
      popover: "rgb(37 37 37)",
      "popover-foreground": "rgb(212 212 212)",
      secondary: "rgb(255 255 255 / 5.5%)",
      "secondary-foreground": "rgb(212 212 212)",
      muted: "rgb(255 255 255 / 5.5%)",
      "muted-foreground": "rgb(155 155 155)",
      accent: "rgb(255 255 255 / 5.5%)",
      "accent-foreground": "rgb(212 212 212)",
      destructive: "rgb(230 91 86)",
      border: "rgb(255 255 255 / 9.4%)",
      input: "rgb(255 255 255 / 9.4%)",
      sidebar: "rgb(32 32 32)",
      "sidebar-foreground": "rgb(155 155 155)",
      "sidebar-primary": "rgb(212 212 212)",
      "sidebar-primary-foreground": "rgb(25 25 25)",
      "sidebar-accent": "rgb(255 255 255 / 5.5%)",
      "sidebar-accent-foreground": "rgb(212 212 212)",
      "sidebar-border": "rgb(255 255 255 / 5.5%)",
      block: "rgb(255 255 255 / 3%)",
      grid: "rgb(255 255 255 / 7%)",
      icon: "rgb(255 255 255 / 46%)",
      faint: "rgb(255 255 255 / 28%)",
    },
    css: `/* Notion draws its blocks flat: a hairline edge, no shadow. */
[data-slot="card"] {
  box-shadow: none;
  border: 1px solid var(--border);
}
/* Measured on Notion's own Projects & Tasks template (notion.site,
   2026-10-11). The open sidebar row: Notion's 5 % warm fill, the glyph
   staying grey. */
[data-slot="sidebar-menu-button"][data-active] {
  background-color: var(--sidebar-accent);
}
[data-slot="sidebar-menu-button"][data-active] svg {
  color: var(--icon);
}
/* View tabs: pills with no strip behind them, the chosen one on the fill. */
main [role="tablist"] {
  background: transparent;
  padding: 0;
  gap: 2px;
}
main [role="tab"] {
  border-radius: 9999px;
  padding-inline: 12px;
  font-weight: 500;
}
main [role="tab"][aria-selected="true"] {
  background-color: var(--accent);
  box-shadow: none;
}
/* Buttons: 6px corners, 14px text at every size. */
[data-slot="button"] {
  border-radius: 6px;
}
[data-slot="button"][class~="h-7"] {
  font-size: 14px;
}
/* The side peek: Notion's three faint layers, no edge. */
[data-slot="sheet-content"] {
  border-left-color: transparent;
  box-shadow:
    0 8px 12px rgb(25 25 25 / 2.7%),
    0 2px 6px rgb(25 25 25 / 2.7%),
    0 0 0 1px rgb(42 28 0 / 7%);
}
/* Rows take no fill under the pointer. */
[data-slot="table-body"] [data-slot="table-row"]:hover {
  background-color: transparent;
}
[data-slot="badge"] {
  font-weight: 400;
}`,
  },
  {
    id: "airbnb",
    label: "Airbnb",
    radius: "0.75rem",
    note:
      "Airbnb's look, measured on airbnb.com (2026-10-11) from its own design " +
      "tokens: white surfaces, text #222222 and #6C6C6C, #DDDDDD edges, " +
      "#F7F7F7 and #EBEBEB fills, Rausch #FF385C, 12px cards, 8px buttons, " +
      "round icon buttons, its soft elevation shadows, semibold headings " +
      "pulled in -0.18px, the system face (Cereal's own fallback)",
    colour: "red",
    font: "system",
    // Airbnb's tokens (--palette-*): text-primary #222222, text-secondary
    // #6C6C6C, text-tertiary #8C8C8C, border-secondary #DDDDDD, bg-secondary
    // #F7F7F7, bg-tertiary #EBEBEB, its round buttons' #F2F2F2, error
    // #C13515. The dark ones are its (prefers-color-scheme: dark) tokens.
    light: {
      background: "rgb(255 255 255)",
      foreground: "rgb(34 34 34)",
      card: "rgb(255 255 255)",
      "card-foreground": "rgb(34 34 34)",
      popover: "rgb(255 255 255)",
      "popover-foreground": "rgb(34 34 34)",
      secondary: "rgb(242 242 242)",
      "secondary-foreground": "rgb(34 34 34)",
      muted: "rgb(247 247 247)",
      "muted-foreground": "rgb(108 108 108)",
      accent: "rgb(247 247 247)",
      "accent-foreground": "rgb(34 34 34)",
      destructive: "rgb(193 53 21)",
      border: "rgb(221 221 221)",
      input: "rgb(221 221 221)",
      sidebar: "rgb(255 255 255)",
      "sidebar-foreground": "rgb(34 34 34)",
      "sidebar-accent": "rgb(247 247 247)",
      "sidebar-accent-foreground": "rgb(34 34 34)",
      "sidebar-border": "rgb(235 235 235)",
      grid: "rgb(235 235 235)",
      icon: "rgb(108 108 108)",
      faint: "rgb(140 140 140)",
    },
    dark: {
      background: "rgb(17 17 17)",
      foreground: "rgb(247 247 247)",
      card: "rgb(25 25 25)",
      "card-foreground": "rgb(247 247 247)",
      popover: "rgb(25 25 25)",
      "popover-foreground": "rgb(247 247 247)",
      secondary: "rgb(44 44 44)",
      "secondary-foreground": "rgb(247 247 247)",
      muted: "rgb(44 44 44)",
      "muted-foreground": "rgb(166 166 166)",
      accent: "rgb(34 34 34)",
      "accent-foreground": "rgb(247 247 247)",
      border: "rgb(44 44 44)",
      input: "rgb(44 44 44)",
      sidebar: "rgb(25 25 25)",
      "sidebar-foreground": "rgb(247 247 247)",
      "sidebar-accent": "rgb(34 34 34)",
      "sidebar-accent-foreground": "rgb(247 247 247)",
      "sidebar-border": "rgb(44 44 44)",
      grid: "rgb(44 44 44)",
      icon: "rgb(166 166 166)",
      faint: "rgb(108 108 108)",
    },
    css: `/* Cards lift on Airbnb's elevation 2; menus and dialogs on its
   elevation 3 (--elevation-elevation2/3-box-shadow). */
[data-slot="card"] {
  border-color: var(--border);
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 2%),
    0 2px 6px rgb(0 0 0 / 4%),
    0 4px 8px rgb(0 0 0 / 10%);
}
${OVERLAYS} {
  border-color: transparent;
  box-shadow:
    0 0 0 1px rgb(0 0 0 / 2%),
    0 8px 24px rgb(0 0 0 / 10%);
}
/* Buttons: 8px corners, medium weight; an icon button is round. */
[data-slot="button"] {
  border-radius: 8px;
  font-weight: 500;
}
[data-slot="button"]:is(
    [class~="size-6"],
    [class~="size-7"],
    [class~="size-8"],
    [class~="size-9"]
  ) {
  border-radius: 9999px;
}
/* Headings: semibold, pulled in, as its section titles are. */
h1,
h2,
[data-slot="card-title"] {
  font-weight: 600;
  letter-spacing: -0.18px;
}
/* Measured on airbnb.com (2026-10-11). A selection is never pink: the open
   row is its #F7F7F7 fill (--palette-bg-primary-selected) with dark text. */
[data-slot="sidebar-menu-button"][data-active] {
  background-color: var(--sidebar-accent);
  font-weight: 500;
}
[data-slot="sidebar-menu-button"][data-active] svg {
  color: var(--foreground);
}
/* Its working buttons are near-black with white text; Rausch stays for
   ticks, the focus ring and charts. */
[data-slot="button"][class~="bg-primary"] {
  background-color: var(--foreground);
  color: var(--background);
}
/* Segmented control: a 1px outline, the chosen segment white with a 2px
   dark edge (the edge estimated from a screenshot). */
main [role="tablist"],
[data-slot="tabs-list"] {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--border);
  border-radius: 16px;
  padding: 4px;
}
main [role="tab"],
[data-slot="tabs-trigger"] {
  border-radius: 12px;
}
main [role="tab"][aria-selected="true"],
[data-slot="tabs-trigger"][data-active] {
  background-color: var(--background);
  box-shadow: inset 0 0 0 2px var(--foreground);
}
/* The sheet on its elevation-high shadow; fields ringed, not bordered. */
[data-slot="sheet-content"] {
  box-shadow: 0 8px 28px rgb(0 0 0 / 28%);
}
[data-slot="input"],
[data-slot="textarea"] {
  border-color: transparent;
  box-shadow: inset 0 0 0 1px var(--border);
}`,
  },
  {
    id: "stripe",
    label: "Stripe",
    radius: "0.375rem",
    note:
      "Stripe's Dashboard, measured on dashboard.stripe.com/login and from " +
      "the Dashboard screenshot in docs.stripe.com/stripe-apps (2026-10-11): " +
      "#353A44 text, #21252C headings, #6A7383 secondary text, #F5F6F8 fills, " +
      "#E3E8EE dividers, fields ringed #D4DEE9 at 6px, flat sections, underline " +
      "tabs, small edged badges, blurple #635BFF, the system face",
    colour: "indigo",
    font: "system",
    // Text, secondary text and the fill from the Dashboard screenshot; the
    // headings' #21252C is estimated from it. Dividers and field rings from
    // the login page. Its dark look is not measured: Neutral's dark greys
    // stay.
    light: {
      background: "rgb(255 255 255)",
      foreground: "rgb(53 58 68)",
      card: "rgb(255 255 255)",
      "card-foreground": "rgb(53 58 68)",
      popover: "rgb(255 255 255)",
      "popover-foreground": "rgb(53 58 68)",
      secondary: "rgb(245 246 248)",
      "secondary-foreground": "rgb(33 37 44)",
      muted: "rgb(245 246 248)",
      "muted-foreground": "rgb(106 115 131)",
      accent: "rgb(245 246 248)",
      "accent-foreground": "rgb(33 37 44)",
      border: "rgb(227 232 238)",
      input: "rgb(212 222 233)",
      sidebar: "rgb(255 255 255)",
      "sidebar-foreground": "rgb(53 58 68)",
      "sidebar-accent": "rgb(245 246 248)",
      "sidebar-accent-foreground": "rgb(33 37 44)",
      "sidebar-border": "rgb(227 232 238)",
      grid: "rgb(236 241 246)",
      icon: "rgb(106 115 131)",
    },
    css: `/* Sections sit flat with a hairline; only menus and dialogs float, on
   Stripe's two-layer shadow. */
[data-slot="card"] {
  border-color: var(--border);
  box-shadow: none;
}
${OVERLAYS} {
  border-color: transparent;
  box-shadow:
    0 0 0 1px rgb(227 232 238),
    0 5px 15px rgb(0 0 0 / 12%),
    0 15px 35px rgb(48 49 61 / 8%);
}
/* Fields: a 1px ring alone. Outline and secondary buttons: the ring and
   Stripe's small lift. */
[data-slot="input"],
[data-slot="textarea"],
[data-slot="select-trigger"] {
  border-color: transparent;
  box-shadow: 0 0 0 1px rgb(212 222 233);
}
[data-slot="button"]:is([class~="bg-secondary"], [class~="border-border"]) {
  border-color: transparent;
  box-shadow:
    0 0 0 1px rgb(212 222 233),
    0 1px 1px rgb(0 0 0 / 12%),
    0 2px 5px rgb(48 49 61 / 8%);
}
[data-slot="button"] {
  font-weight: 500;
}
/* Headings near-black in light; in dark they keep the text colour. */
:root:not(.dark) :is(h1, h2, h3, [data-slot="card-title"]) {
  color: rgb(33 37 44);
}
/* The open sidebar row: no fill, text and glyph in Stripe's blurple. */
[data-slot="sidebar"] [data-slot="sidebar-menu-button"][data-active] {
  background-color: transparent;
  color: rgb(83 58 253);
  font-weight: 500;
}
[data-slot="sidebar"] [data-slot="sidebar-menu-button"][data-active] svg {
  color: rgb(83 58 253);
}
/* Underline tabs on a rule. */
main [role="tablist"],
[data-slot="tabs-list"] {
  background: transparent;
  border-radius: 0;
  box-shadow: inset 0 -1px 0 var(--border);
  gap: 16px;
  padding: 0;
}
main [role="tab"],
[data-slot="tabs-trigger"] {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding: 0 0 8px;
  color: var(--muted-foreground);
}
main [role="tab"][aria-selected="true"],
[data-slot="tabs-trigger"][data-active] {
  background: transparent;
  color: rgb(83 58 253);
  box-shadow: inset 0 -2px 0 rgb(83 58 253);
}
/* Badges: small, edged, on a pale fill. */
[data-slot="badge"] {
  border-radius: 4px;
  border-color: rgb(213 219 225);
  background-color: rgb(246 248 250);
  color: rgb(84 89 105);
}
/* Tables rule their rows only. */
[data-slot="table-head"],
[data-slot="table-cell"] {
  border-right-color: transparent;
}`,
  },
  {
    id: "neo-brutalist",
    label: "Neo-brutalist",
    radius: "0.3125rem",
    note:
      "after neobrutalism.dev's shadcn kit and Gumroad (measured " +
      "2026-10-11): 2px edges in the text colour, 5px corners, a hard 4px " +
      "4px 0 shadow on cards, buttons and menus, plain fields with the edge " +
      "alone, bold labels and titles over medium text; the shell a white " +
      "sidebar ruled off in black on Gumroad's off-white page, the open row " +
      "a solid block of the colour",
    colour: "orange",
    font: "geist",
    // The page is Gumroad's off-white (rgb 244 244 240, gumroad.com); cards,
    // menus and the sidebar stay white, as neobrutalism.dev draws them. Text
    // is pure black, and secondary text is that black at 50 %, as Gumroad's
    // is, never a grey of its own; icons are black too.
    light: {
      background: "rgb(244 244 240)",
      foreground: "rgb(0 0 0)",
      "card-foreground": "rgb(0 0 0)",
      "popover-foreground": "rgb(0 0 0)",
      "secondary-foreground": "rgb(0 0 0)",
      "accent-foreground": "rgb(0 0 0)",
      "muted-foreground": "rgb(0 0 0 / 50%)",
      border: "rgb(0 0 0)",
      input: "rgb(0 0 0)",
      sidebar: "rgb(255 255 255)",
      "sidebar-foreground": "rgb(0 0 0)",
      "sidebar-accent-foreground": "rgb(0 0 0)",
      "sidebar-border": "rgb(0 0 0)",
      icon: "rgb(0 0 0)",
      faint: "rgb(0 0 0 / 50%)",
      grid: "rgb(0 0 0)",
      secondary: "rgb(244 244 240)",
    },
    dark: {
      foreground: "rgb(255 255 255)",
      "card-foreground": "rgb(255 255 255)",
      "popover-foreground": "rgb(255 255 255)",
      "muted-foreground": "rgb(255 255 255 / 50%)",
      border: "rgb(255 255 255)",
      input: "rgb(255 255 255)",
      "sidebar-foreground": "rgb(255 255 255)",
      "sidebar-border": "rgb(255 255 255)",
      icon: "rgb(255 255 255)",
      faint: "rgb(255 255 255 / 50%)",
      grid: "rgb(255 255 255)",
    },
    css: `/* Surfaces: a 2px edge and a hard shadow, both in the text colour. */
[data-slot="card"],
${OVERLAYS} {
  border: 2px solid var(--foreground);
  box-shadow: 4px 4px 0 var(--foreground);
}
/* Filled and outlined buttons take the edge and the shadow, which they
   lose as they slide into it under the pointer; a ghost button stays bare. */
[data-slot="button"]:is(
    [class~="bg-primary"],
    [class~="bg-secondary"],
    [class~="border-border"]
  ) {
  border: 2px solid var(--foreground);
  box-shadow: 4px 4px 0 var(--foreground);
}
[data-slot="button"]:is(
    [class~="bg-primary"],
    [class~="bg-secondary"],
    [class~="border-border"]
  ):is(:hover, :active) {
  box-shadow: none;
  transform: translate(4px, 4px);
}
/* Fields and badges: the edge alone. */
[data-slot="input"],
[data-slot="textarea"],
[data-slot="select-trigger"],
[data-slot="badge"] {
  border: 2px solid var(--foreground);
}
[data-slot="badge"] {
  border-radius: var(--radius);
}
/* Labels and titles bold; the text around them medium. */
body {
  font-weight: 500;
}
label,
[data-slot="card-title"],
[data-slot="table-head"] {
  font-weight: 700;
}
/* Table headings in the text colour, as neobrutalism.dev's are. */
[data-slot="table-head"] {
  color: var(--foreground);
}
[data-slot="sidebar-container"] {
  border-right-width: 2px;
}
/* The shell, as neobrutalism.dev's sidebar: a 2px rule under the
   sidebar's header and over its footer. */
[data-slot="sidebar-header"] {
  border-bottom: 2px solid var(--foreground);
}
[data-slot="sidebar-footer"] {
  border-top: 2px solid var(--foreground);
}
[data-slot="sidebar-group-label"],
[data-slot="breadcrumb-page"] {
  font-weight: 700;
}
/* The open row, and a row under the pointer: a solid block of the colour
   with a 2px outline and the text in black. */
[data-slot="sidebar-menu-button"]:hover,
[data-slot="sidebar-menu-button"][data-active] {
  background-color: var(--primary);
  color: rgb(0 0 0);
  outline: 2px solid var(--foreground);
  border-radius: var(--radius);
}
[data-slot="sidebar-menu-button"]:hover svg,
[data-slot="sidebar-menu-button"][data-active] svg {
  color: rgb(0 0 0);
}
/* A filled button's text is black on the colour, as the kit's is. */
[data-slot="button"][class~="bg-primary"] {
  color: rgb(0 0 0);
}
/* Tabs: an edged strip of bold black labels; the chosen one a block of the
   colour with its own edge. The sheet's panel tabs are left as they are. */
[data-slot="tabs-list"],
main [role="tablist"] {
  border: 2px solid var(--foreground);
  background-color: var(--card);
}
main [role="tab"],
[data-slot="tabs-trigger"] {
  border: 2px solid transparent;
  font-weight: 700;
  color: var(--foreground);
}
main [role="tab"][aria-selected="true"],
[data-slot="tabs-trigger"][data-active] {
  background-color: var(--primary);
  color: rgb(0 0 0);
  border-color: var(--foreground);
  box-shadow: none;
}
/* Measured on neobrutalism.dev's table, checkbox, badge and card pages
   (2026-10-11). Tables: 2px rules under every row, no column lines and no
   frame (no theme frames a table); a row under the pointer takes a wash of
   the colour. */
[data-slot="table-row"] {
  border-bottom-width: 2px;
}
[data-slot="table-head"],
[data-slot="table-cell"] {
  border-right-width: 0;
}
[data-slot="table-body"] [data-slot="table-row"]:hover {
  background-color: color-mix(in oklab, var(--primary) 15%, transparent);
}
/* The task tick: a square 2px box, filled with the colour when ticked. */
[role="checkbox"] {
  border: 2px solid var(--foreground);
  border-radius: 0;
}
[role="checkbox"][aria-checked="true"] {
  background-color: var(--primary);
  color: rgb(0 0 0);
}
/* Badges: 24px tall on the page's off-white. */
[data-slot="badge"] {
  height: 1.5rem;
  padding-inline: 0.625rem;
}
/* Field-like popover triggers (sort, dates) take the field's edge. */
[data-slot="popover-trigger"][class~="border"] {
  border: 2px solid var(--foreground);
  color: var(--foreground);
}
[data-slot="card"] {
  border-radius: var(--radius);
}
[data-slot="sidebar-menu-button"] {
  font-weight: 500;
}`,
  },
]

/** The highlights in the picked colour, in every style: the active menu
 *  row takes a wash of --primary and its icon the colour itself, so
 *  Settings → Appearance's accent moves it with the buttons. */
const HIGHLIGHTS = `/* The active menu row in the colour (--primary, so Settings → Appearance's
   accent moves it too). */
[data-slot="sidebar-menu-button"][data-active] {
  background-color: color-mix(in oklab, var(--primary) 12%, transparent);
}
[data-slot="sidebar-menu-button"][data-active] svg {
  color: var(--primary);
}`

/** Colour: the highlights (accent: buttons, checked controls, the focus
 *  ring, the active menu row) and the report charts (tint: a five-step ramp
 *  of the one hue) together. The ids are app.css's `[data-accent]` and
 *  `[data-tint]` (Settings → Appearance, which overrides either per
 *  viewer); the accents are Notion's text colours, Blue the default. */
export const COLOURS = [
  colour("blue", "Blue", 250, [
    "rgb(35 131 226)",
    "rgb(255 255 255)",
    "rgb(35 131 226 / 57%)",
  ]),
  colour(
    "green",
    "Green",
    155,
    ["rgb(68 131 97)", "rgb(255 255 255)", "rgb(68 131 97 / 57%)"],
    ["rgb(82 158 114)", "rgb(255 255 255)", "rgb(82 158 114 / 57%)"],
  ),
  colour(
    "purple",
    "Purple",
    300,
    ["rgb(144 101 176)", "rgb(255 255 255)", "rgb(144 101 176 / 57%)"],
    ["rgb(157 104 211)", "rgb(255 255 255)", "rgb(157 104 211 / 57%)"],
  ),
  colour(
    "orange",
    "Orange",
    55,
    ["rgb(217 115 13)", "rgb(255 255 255)", "rgb(217 115 13 / 57%)"],
    ["rgb(203 123 55)", "rgb(255 255 255)", "rgb(203 123 55 / 57%)"],
  ),
  colour(
    "pink",
    "Pink",
    350,
    ["rgb(193 76 138)", "rgb(255 255 255)", "rgb(193 76 138 / 57%)"],
    ["rgb(209 87 150)", "rgb(255 255 255)", "rgb(209 87 150 / 57%)"],
  ),
  // shadcn's Neutral primary and ring (themes.ts).
  colour(
    "grey",
    "Grey",
    null,
    ["oklch(0.205 0 0)", "oklch(0.985 0 0)", "oklch(0.708 0 0)"],
    ["oklch(0.922 0 0)", "oklch(0.205 0 0)", "oklch(0.556 0 0)"],
  ),
  // Airbnb's Rausch (--palette-bg-primary-core, airbnb.com 2026-10-11).
  colour("red", "Red", 15, [
    "rgb(255 56 92)",
    "rgb(255 255 255)",
    "rgb(255 56 92 / 57%)",
  ]),
  // Stripe's blurple (dashboard.stripe.com, 2026-10-11).
  colour("indigo", "Indigo", 275, [
    "rgb(99 91 255)",
    "rgb(255 255 255)",
    "rgb(99 91 255 / 57%)",
  ]),
]

/** One colour: its accent (light, and dark when it differs) and its chart
 *  ramp, the hue in five steps light to dark; no hue is the grey ramp. A
 *  style's own colour may add `series`, its tool's categorical colours. */
function colour(
  id,
  label,
  hue,
  [primary, fg, ring],
  dark = [primary, fg, ring],
  series,
) {
  const vars = ([p, f, r]) => ({
    primary: p,
    "primary-foreground": f,
    ring: r,
    "sidebar-ring": r,
  })
  const ramp =
    hue === null
      ? [
          "oklch(0.87 0 0)",
          "oklch(0.556 0 0)",
          "oklch(0.439 0 0)",
          "oklch(0.371 0 0)",
          "oklch(0.269 0 0)",
        ]
      : [
          [0.87, 0.05],
          [0.72, 0.09],
          [0.6, 0.11],
          [0.49, 0.1],
          [0.37, 0.08],
        ].map(([l, c]) => `oklch(${l} ${c} ${hue})`)
  return {
    id,
    label,
    swatch: primary,
    ramp,
    series,
    light: vars([primary, fg, ring]),
    dark: vars(dark),
  }
}

/** Font: the system face (Notion's stacks: SF Pro on a Mac, Segoe UI on
 *  Windows), or a webfont from `@fontsource-variable`, which the CLI adds
 *  to the app's packages (the families are shadcn's,
 *  apps/v4/lib/font-definitions.ts, and Roboto). */
export const FONTS = [
  {
    id: "system",
    label: "System",
    family:
      'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display",\n    "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif,\n    "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  webfont("inter", "Inter", "'Inter Variable', sans-serif"),
  webfont("geist", "Geist", "'Geist Variable', sans-serif"),
  webfont(
    "ibm-plex-sans",
    "IBM Plex Sans",
    "'IBM Plex Sans Variable', sans-serif",
  ),
  webfont("lora", "Lora", "'Lora Variable', serif"),
  webfont("roboto", "Roboto", "'Roboto Variable', sans-serif"),
]

function webfont(id, label, family) {
  return {
    id,
    label,
    family,
    package: `@fontsource-variable/${id}`,
    version: "^5.3.0",
  }
}

/** Logo: the app's mark, at the top of the sidebar beside its name, drawn
 *  duotone in the sidebar icons' grey (a 1.65px round stroke over an 18%
 *  fill of it) on a 24px grid. Lucide icons (ISC, lucide.dev) whose
 *  shapes are closed and read right filled, each `svg` its elements as
 *  Lucide draws them; Layers, the default, is the kit's own drawing,
 *  the mark before logos (its strokes set their own width). `tags` are
 *  extra words the configurator's search matches. theme.json carries the
 *  pick (`logo`) and its drawing (`mark`); theme.css does not. */
export const LOGOS = [
  logo("layers", "Layers", "stack default", [
    ["path", { d: "M12 2.75 21 7.5 12 12.25 3 7.5Z", "stroke-width": "1.5" }],
    [
      "path",
      { d: "M3 12 12 16.75 21 12", fill: "none", "stroke-width": "2.25" },
    ],
    [
      "path",
      { d: "M3 16.5 12 21.25 21 16.5", fill: "none", "stroke-width": "2.25" },
    ],
  ]),
  logo("database", "Database", "data storage", [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12" }],
  ]),
  logo("building", "Building", "office company", [
    ["path", { d: "M10 12h4" }],
    ["path", { d: "M10 8h4" }],
    ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3" }],
    [
      "path",
      {
        d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      },
    ],
    ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" }],
  ]),
  logo("star", "Star", "favourite", [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      },
    ],
  ]),
  logo("heart", "Heart", "love", [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      },
    ],
  ]),
  logo("shield", "Shield", "security", [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      },
    ],
  ]),
  logo("circle", "Circle", "dot round", [
    ["circle", { cx: "12", cy: "12", r: "10" }],
  ]),
  logo("square", "Square", "box", [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ]),
  logo("triangle", "Triangle", "", [
    [
      "path",
      {
        d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
      },
    ],
  ]),
  logo("hexagon", "Hexagon", "package box", [
    [
      "path",
      {
        d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      },
    ],
  ]),
  logo("diamond", "Diamond", "", [
    [
      "path",
      {
        d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
      },
    ],
  ]),
  logo("bookmark", "Bookmark", "save", [
    [
      "path",
      {
        d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
      },
    ],
  ]),
  logo("flag", "Flag", "", [
    [
      "path",
      {
        d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      },
    ],
  ]),
  logo("folder", "Folder", "files", [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      },
    ],
  ]),
  logo("briefcase", "Briefcase", "work business", [
    ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }],
    ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }],
  ]),
  logo("house", "House", "home", [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      },
    ],
  ]),
  logo("cloud", "Cloud", "weather", [
    ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }],
  ]),
  logo("zap", "Zap", "lightning bolt power", [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      },
    ],
  ]),
  logo("flame", "Flame", "fire", [
    [
      "path",
      {
        d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      },
    ],
  ]),
  logo("droplet", "Droplet", "water drop", [
    [
      "path",
      {
        d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      },
    ],
  ]),
  logo("leaf", "Leaf", "nature plant", [
    [
      "path",
      {
        d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      },
    ],
    ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" }],
  ]),
  logo("gem", "Gem", "diamond jewel", [
    ["path", { d: "M10.5 3 8 9l4 13 4-13-2.5-6" }],
    [
      "path",
      {
        d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
      },
    ],
    ["path", { d: "M2 9h20" }],
  ]),
  logo("crown", "Crown", "king", [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      },
    ],
    ["path", { d: "M5 21h14" }],
  ]),
  logo("trophy", "Trophy", "award cup win", [
    ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" }],
    ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" }],
    ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18" }],
    ["path", { d: "M4 22h16" }],
    ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" }],
    ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6" }],
  ]),
  logo("award", "Award", "badge medal", [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      },
    ],
    ["circle", { cx: "12", cy: "8", r: "6" }],
  ]),
  logo("rocket", "Rocket", "launch", [
    ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }],
    [
      "path",
      {
        d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
      },
    ],
    [
      "path",
      {
        d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
      },
    ],
    ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" }],
  ]),
  logo("bell", "Bell", "notification", [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      },
    ],
  ]),
  logo("message-square", "Message", "chat comment", [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      },
    ],
  ]),
  logo("message-circle", "Speech bubble", "chat comment", [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      },
    ],
  ]),
  logo("calendar", "Calendar", "date", [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }],
  ]),
  logo("map-pin", "Map pin", "location place", [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }],
  ]),
  logo("tag", "Tag", "label price", [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      },
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", "fill-opacity": "1" }],
  ]),
  logo("ticket", "Ticket", "", [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      },
    ],
    ["path", { d: "M13 5v2" }],
    ["path", { d: "M13 17v2" }],
    ["path", { d: "M13 11v2" }],
  ]),
  logo("file", "File", "document page", [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
  ]),
  logo("moon", "Moon", "night", [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      },
    ],
  ]),
  logo("apple", "Apple", "fruit", [
    ["path", { d: "M12 6.528V3a1 1 0 0 1 1-1h0" }],
    [
      "path",
      {
        d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
      },
    ],
  ]),
  logo("feather", "Feather", "write", [
    [
      "path",
      {
        d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
      },
    ],
    ["path", { d: "M16 8 2 22" }],
    ["path", { d: "M17.5 15H9" }],
  ]),
  logo("mountain", "Mountain", "", [
    ["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }],
  ]),
  logo("tree", "Tree", "pine forest", [
    [
      "path",
      {
        d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
      },
    ],
    ["path", { d: "M12 22v-3" }],
  ]),
  logo("sparkle", "Sparkle", "star shine", [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      },
    ],
  ]),
  logo("spade", "Spade", "cards", [
    ["path", { d: "M12 18v4" }],
    [
      "path",
      {
        d: "M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
      },
    ],
  ]),
  logo("club", "Club", "cards", [
    [
      "path",
      {
        d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",
      },
    ],
    ["path", { d: "M12 17.66L12 22" }],
  ]),
  logo("puzzle", "Puzzle", "piece", [
    [
      "path",
      {
        d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      },
    ],
  ]),
  logo("plane", "Plane", "travel flight", [
    [
      "path",
      {
        d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      },
    ],
  ]),
  logo("pie-chart", "Pie chart", "report", [
    [
      "path",
      {
        d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      },
    ],
    ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" }],
  ]),
  logo("lock", "Lock", "secure", [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }],
  ]),
  logo("landmark", "Landmark", "bank museum", [
    ["path", { d: "M10 18v-7" }],
    [
      "path",
      {
        d: "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",
      },
    ],
    ["path", { d: "M14 18v-7" }],
    ["path", { d: "M18 18v-7" }],
    ["path", { d: "M3 22h18" }],
    ["path", { d: "M6 18v-7" }],
  ]),
  logo("factory", "Factory", "industry", [
    ["path", { d: "M12 16h.01" }],
    ["path", { d: "M16 16h.01" }],
    [
      "path",
      {
        d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
      },
    ],
    ["path", { d: "M8 16h.01" }],
  ]),
]

function logo(id, label, tags, svg) {
  return { id, label, tags, svg }
}

// ── the code ────────────────────────────────────────────────────────────────
// Each pick is an index into its list, bit-packed into one integer, written in
// base62 behind the version letter. Only append fields, with their default at
// index 0, and stay under 53 bits: an appended field reads as its default in
// older codes of the same letter. Any other change to the fields bumps the
// letter; older letters stay readable (LEGACY).

export const PRESET_FIELDS = [
  { key: "style", label: "Theme", options: STYLES, bits: 4 },
  { key: "colour", label: "Colour", options: COLOURS, bits: 4 },
  { key: "font", label: "Font", options: FONTS, bits: 4 },
  { key: "logo", label: "Logo", options: LOGOS, bits: 6 },
]

// Neutral with its own colour and font (shadcn's look), and Starta's own
// logo, the rocket.
export const DEFAULT_PRESET = {
  ...Object.fromEntries(PRESET_FIELDS.map((f) => [f.key, f.options[0].id])),
  ...{ colour: STYLES[0].colour, font: STYLES[0].font },
  logo: "rocket",
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const VERSION = "f"

/** The styles, colours and fonts of "d" codes, by index; a style dropped
 *  since reads as Neutral. */
const D_STYLES = ["neutral", "neo-brutalist", "soft", "minimal"]
const D_COLOURS = ["blue", "green", "purple", "orange", "pink", "grey"]
/** The colours and fonts of "e" codes, by index ("theme", the style's
 *  own, and the faces dropped since read as the default). */
const E_COLOURS = ["theme", "blue", "green", "purple", "orange", "pink", "grey"]
const E_FONTS = [
  "theme",
  "system",
  "inter",
  "geist",
  "ibm-plex-sans",
  "lora",
  "segoe-ui",
  "tableau",
  "roboto",
]
/** The fonts of "a" to "d" codes, by index. */
const OLD_FONTS = ["system", "inter", "geist", "ibm-plex-sans", "lora"]
/** The accents of "a" and "b" codes, by index; the colour they read as. */
const OLD_ACCENTS = ["blue", "grey", "green", "purple", "orange", "pink"]
/** The accents of "c" codes' curated themes (base · accent), by index. */
const OLD_THEME_ACCENTS = [
  "blue",
  "orange",
  "green",
  "purple",
  "green",
  "blue",
  "pink",
]
/** The icons of "b" and "c" codes, by index; one not among the logos reads
 *  as the default. Building is now Lucide's building-2, the fuller shape. */
const OLD_ICONS = [
  "layers",
  "chart",
  "pie-chart",
  "gauge",
  "database",
  "table",
  "trending-up",
  "target",
  "briefcase",
  "building",
  "globe",
  "sparkles",
]

/** Codes of an older letter: their fields, each `{ key, bits }` with `ids`
 *  when its list differs from today's (null: a field dropped since). Every
 *  older code reads as the Neutral style (a "d" code's Neutral kept, its
 *  Neo-brutalist, Soft and Minimal dropped since), with its accent as the
 *  colour (a "c" code's theme gives its pair's accent; the greys and the
 *  charts pick are dropped), its font kept, and its icon as the logo when
 *  that is one, else Layers. "a" had no icon. */
const LEGACY = {
  a: [
    { key: null, bits: 5 },
    { key: "colour", bits: 5, ids: OLD_ACCENTS },
    { key: null, bits: 5 },
    { key: "font", bits: 5, ids: OLD_FONTS },
    { key: null, bits: 5 },
    { key: null, bits: 3 },
    { key: null, bits: 2 },
  ],
  b: [
    { key: null, bits: 5 },
    { key: "colour", bits: 5, ids: OLD_ACCENTS },
    { key: null, bits: 5 },
    { key: "font", bits: 5, ids: OLD_FONTS },
    { key: null, bits: 3 },
    { key: "logo", bits: 4, ids: OLD_ICONS },
  ],
  c: [
    { key: "colour", bits: 5, ids: OLD_THEME_ACCENTS },
    { key: null, bits: 5 },
    { key: "font", bits: 5, ids: OLD_FONTS },
    { key: "logo", bits: 4, ids: OLD_ICONS },
  ],
  d: [
    { key: "style", bits: 4, ids: D_STYLES },
    { key: "colour", bits: 4, ids: D_COLOURS },
    { key: "font", bits: 4, ids: OLD_FONTS },
    { key: "logo", bits: 6 },
  ],
  e: [
    { key: "style", bits: 4 },
    { key: "colour", bits: 4, ids: E_COLOURS },
    { key: "font", bits: 4, ids: E_FONTS },
    { key: "logo", bits: 6 },
  ],
}

function toBase62(num) {
  if (num === 0) return "0"
  let result = ""
  let n = num
  while (n > 0) {
    result = BASE62[n % 62] + result
    n = Math.floor(n / 62)
  }
  return result
}

function fromBase62(str) {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    const idx = BASE62.indexOf(str[i])
    if (idx === -1) return -1
    result = result * 62 + idx
  }
  return result
}

/** A pick (any field left out takes its default) → its code, e.g. "e0". */
export function encodePreset(config = {}) {
  const merged = { ...DEFAULT_PRESET, ...config }
  // Multiplication, not bitwise ops: those truncate to 32 bits.
  let bits = 0
  let offset = 0
  for (const field of PRESET_FIELDS) {
    const idx = field.options.findIndex((o) => o.id === merged[field.key])
    bits += (idx === -1 ? 0 : idx) * 2 ** offset
    offset += field.bits
  }
  return VERSION + toBase62(bits)
}

/** A code → the pick, or null when it is not a code. An older letter's
 *  code gives today's nearest pick. */
export function decodePreset(code) {
  if (!isPresetCode(code)) return null
  const bits = fromBase62(code.slice(1))
  if (bits < 0) return null
  const result = { ...DEFAULT_PRESET }
  let offset = 0
  for (const field of LEGACY[code[0]] ?? PRESET_FIELDS) {
    const idx = Math.floor(bits / 2 ** offset) % 2 ** field.bits
    offset += field.bits
    if (!field.key) continue
    const options = PRESET_FIELDS.find((f) => f.key === field.key).options
    const id = field.ids ? field.ids[idx] : options[idx]?.id
    result[field.key] = options.some((o) => o.id === id) ? id : options[0].id
  }
  return result
}

export function isPresetCode(value) {
  if (typeof value !== "string" || value.length < 2 || value.length > 10)
    return false
  if (value[0] !== VERSION && !LEGACY[value[0]]) return false
  for (let i = 1; i < value.length; i++)
    if (BASE62.indexOf(value[i]) === -1) return false
  return true
}

// ── the files ───────────────────────────────────────────────────────────────

/** The two files a preset writes, app-root relative. theme.json carries the
 *  colour as the accent and the chart tint lib/appearance.ts falls back to,
 *  and the logo with the drawing the shell's mark draws
 *  (components/brand/app-mark.tsx). */
export const THEME_FILES = {
  css: "app/src/theme.css",
  json: "app/src/theme.json",
}

const option = (key, id) => {
  const field = PRESET_FIELDS.find((f) => f.key === key)
  return field.options.find((o) => o.id === id) ?? field.options[0]
}

/** The pick's options; `ownColour`: the colour is the style's own, so a
 *  chart's series take the style's tool colours (STYLES `series`). */
export function resolvePreset(preset) {
  const r = Object.fromEntries(
    PRESET_FIELDS.map((f) => [f.key, option(f.key, preset?.[f.key])]),
  )
  return { ...r, ownColour: r.colour.id === r.style.colour }
}

/** The colour and font a style picks (create's panel sets them with it). */
export function styleDefaults(styleId) {
  const style = option("style", styleId)
  return { colour: style.colour, font: style.font }
}
const resolve = resolvePreset

/** The npm packages a preset's fonts need, as package.json lists them. */
export function themePackages(preset) {
  const { font } = resolve(preset)
  return font.package ? { [font.package]: font.version } : {}
}

/** The text of app/src/theme.json. */
export function themeJson(preset) {
  const { style, colour, logo } = resolve(preset)
  const json = {
    preset: encodePreset(preset),
    style: style.id,
    accent: colour.id,
    tint: colour.id,
    logo: logo.id,
    mark: logo.svg,
  }
  return JSON.stringify(json, null, 2) + "\n"
}

/** The CSS a `<style>` tag takes at run time: theme.css from its tokens on
 *  (`:root`, `.dark`, the highlights and the style's rules), without the
 *  build-time `@import` and `@theme inline` above them. create's preview
 *  injects it to swap the look live. */
export function themeRuntimeCss(preset) {
  const css = themeCss(preset)
  return css.slice(css.search(/^:root/m))
}

/** The text of app/src/theme.css: Neutral's greys and the app's own
 *  tokens, with the style's radius and greys, the colour's accent and chart
 *  ramp merged over them, as shadcn's buildRegistryTheme does, the font
 *  stacks, then the highlights and the style's rules. Headings take the
 *  body font. */
export function themeCss(preset) {
  const r = resolve(preset)
  const { style, colour, font, ownColour } = r

  const light = {
    ...NEUTRAL.light,
    ...APP_TOKENS.light,
    ...style.light,
    ...colour.light,
  }
  const dark = {
    ...NEUTRAL.dark,
    ...APP_TOKENS.dark,
    ...style.dark,
    ...colour.dark,
  }
  // The ramp, and a tool's own categorical colours for a chart's series
  // (report-charts.tsx falls back to the ramp where they are not set).
  const charts = {}
  colour.ramp.forEach((v, i) => (charts[`chart-${i + 1}`] = v))
  const series = ownColour ? style.series : undefined
  series?.forEach((v, i) => (charts[`series-${i + 1}`] = v))
  Object.assign(light, charts)
  Object.assign(dark, charts)
  light.radius = style.radius
  // A chart's bar corners (report-charts.tsx), where the style squares them.
  if (style.barRadius !== undefined)
    light["chart-bar-radius"] = String(style.barRadius)
  if (style.barGap) light["chart-bar-gap"] = style.barGap

  const notes = APP_TOKENS.notes
  const block = (vars, note) =>
    Object.entries(vars)
      .flatMap(([k, v]) => [...comment(note[k], "  "), `  --${k}: ${v};`])
      .join("\n")

  const fontNote =
    font.id === "system"
      ? comment(
          [
            "Notion's own stacks (measured on app.notion.com, 2026-09-29): the system",
            "face, not a webfont — SF Pro on a Mac, Segoe UI on Windows.",
          ],
          "  ",
        ).join("\n") + "\n"
      : ""
  const imports = font.package ? [font.package] : []
  // The logo is theme.json's alone, so theme.css names only the look.
  const picks = PRESET_FIELDS.filter((f) => f.key !== "logo")
    .map((f, i) => `${i ? f.label.toLowerCase() : f.label} ${r[f.key].label}`)
    .join(", ")
  // A reader's other tint (Settings → Appearance, app.css `[data-tint]`)
  // gives the series back to the ramp.
  const theme = series
    ? `
/* The ${style.label} series give way to the ramp under another tint. */
[data-tint]:not([data-tint="${colour.id}"]) {
${series.map((_, i) => `  --series-${i + 1}: initial;`).join("\n")}
}
`
    : ""
  const rules = style.css
    ? `
/* The ${style.label} style: ${style.note}. Rules over the components'
   \`data-slot\`, after the tokens; the component files stay shadcn's. */
${style.css}
`
    : ""

  return `/* The app's look: its style, colour and font. Preset ${encodePreset(preset)}:
   ${wrap(picks + ".", 75).join("\n   ")}
   \`starta apply --preset <code>\` writes this file and theme.json whole
   (cli/lib/preset.mjs); edit it by hand and \`apply\` keeps your copy.
   Settings → Appearance overrides the accent and the charts per viewer
   (app.css \`[data-accent]\`, \`[data-tint]\`). */
${imports.map((p) => `@import "${p}";\n`).join("")}
@theme inline {
${fontNote}  --font-heading: var(--font-sans);
  --font-sans:
    ${font.family};
  --font-mono:
    "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier,
    monospace;
}

/* \`.slide-paper\` is a slide's page (blocks/deck/): always the light palette,
   as a printed page is, whatever the app's theme. */
:root,
.slide-paper {
${block(light, notes.light)}
}

.dark {
${block(dark, notes.dark)}
}

${HIGHLIGHTS}
${theme}${rules}`
}

function comment(lines, indent) {
  if (!lines?.length) return []
  return lines.map((line, i) => {
    const open = i === 0 ? "/* " : "   "
    const close = i === lines.length - 1 ? " */" : ""
    return `${indent}${open}${line}${close}`
  })
}

function wrap(text, width) {
  const lines = [""]
  for (const word of text.split(" ")) {
    const last = lines.length - 1
    if (lines[last] && (lines[last] + " " + word).length > width)
      lines.push(word)
    else lines[last] = lines[last] ? `${lines[last]} ${word}` : word
  }
  return lines
}
