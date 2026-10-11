# starta CLI

Starts a Starta work app, adds, removes and updates its modules, and sets its
theme. The code is copied into the app and is the person's from then on.
The person sees modules only; the block a module is built on comes and
goes with it.

```
node starta.mjs init <folder> [--preset <code>]
node starta.mjs list
node starta.mjs add <module>... | --all
node starta.mjs remove <module>
node starta.mjs update [--to <tag>]
node starta.mjs apply --preset <code>
```

`init` gives About, Goals, Tasks, People and Wiki (`kit/starter.json` in
the kit). `add --all` adds every module the app
does not have yet; a named module the app already has is skipped.

Options: `--kit <folder|git url>` (default: `$STARTA_KIT`, else `../code` beside the CLI, else the public repo `github:productvibe/starta`),
`--dry-run`, `--json`, `--no-install`. Run `list`, `add`, `remove`,
`update` and `apply` inside an app: they find it by its `starta.json`.

- **The kit** is `code/`, in the starta repo or in the public one. A folder is read as it stands; a git URL,
  or `--to <tag>`, is cloned at that ref. What a file is follows from its
  path (`lib/kit.mjs`).
- **`starta.json`** records the kit, the ref, the version, the modules and
  blocks, and the hash of every file copied. That is how `update` and
  `remove` tell the kit's files from the person's edits.
- **`update`** replaces a file only the kit changed, keeps one only the
  person changed, and when both changed writes the kit's version beside it
  as `<file>.kit` to merge.
- **Data is never overwritten**: `app/data/`, `app/wiki/` and a block's
  `data` folders are copied once. `remove` leaves the module's data file.
- **The theme** is `app/src/theme.css` (colours, radius, fonts) and
  `app/src/theme.json` (the accent and chart defaults Settings →
  Appearance falls back to), written whole from a preset code by
  `lib/preset.mjs`, never copied from the kit. `fQnA` is the default look (the rocket logo).
  `apply` keeps a theme the person changed and writes the preset's beside
  it as `theme.css.kit`; a webfont the preset picks is added as an
  `@fontsource-variable` package. `starta.json` records `preset`.
- No dependencies, no prompts. Node 20.12 or later.
