#!/usr/bin/env node
// starta: start your own work app, and add, remove and update its modules.
//
// The person sees modules only. A module is built on a block; the block comes
// with it, and goes when no module uses it any more, but no command names one
// unless asked for the files (--dry-run).
//
// No command asks a question: each runs to the end or refuses with a reason,
// because Claude runs it as often as the person does.

import { execFileSync } from "node:child_process"
import { existsSync, readdirSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

import {
  appModules,
  apply,
  filesUnder,
  findApp,
  hashFile,
  hashText,
  missingPackages,
  readState,
  STATE_FILE,
  writeState,
} from "./lib/app.mjs"
import {
  BASE_BLOCKS,
  blockClosure,
  blockSeed,
  moduleFiles,
  openKit,
  readJson,
} from "./lib/kit.mjs"
import {
  DEFAULT_PRESET,
  decodePreset,
  encodePreset,
  PRESET_FIELDS,
  THEME_FILES,
  themeCss,
  themeJson,
  themePackages,
} from "./lib/preset.mjs"

const HERE = path.dirname(fileURLToPath(import.meta.url))
// The kit beside the CLI in the starta repo; run from GitHub (npx), the public repo.
const LOCAL_KIT = path.resolve(HERE, "..", "code")
const DEFAULT_KIT =
  process.env.STARTA_KIT ??
  (existsSync(path.join(LOCAL_KIT, "app", "src", "modules"))
    ? LOCAL_KIT
    : "github:productvibe/starta")

const HELP = `starta: start your own work app and add modules to it

  starta init <folder> [--preset <code>] [--modules <id,id>]
                                           start a new work app: About, Goals,
                                           Tasks, People and Wiki (or About and
                                           the modules named), drawn in the
                                           preset's theme
  starta list                              the modules you can add
  starta add <module>... | --all           add modules, or every one
  starta remove <module>                   take a module out; its data stays
  starta update [--to <tag>]               take a newer kit, keep your edits
  starta apply --preset <code>             redraw the app in a preset's theme

  --kit <folder|git url>   where the kit comes from (default: ${DEFAULT_KIT})
  --dry-run                show what would change, change nothing
  --json                   print the result as JSON
  --no-install             skip npm install
`

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    kit: { type: "string" },
    to: { type: "string" },
    preset: { type: "string" },
    modules: { type: "string" },
    all: { type: "boolean", default: false },
    "dry-run": { type: "boolean", default: false },
    json: { type: "boolean", default: false },
    "no-install": { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
})

const [command, ...args] = positionals
const dryRun = opts["dry-run"]
const result = { command, dryRun, notes: [], changes: [] }

const say = (line) => result.notes.push(line)

// ── commands ────────────────────────────────────────────────────────────────

function init([folder]) {
  if (!folder) throw new Error("name the folder: starta init <folder>")
  const root = path.resolve(folder)
  if (existsSync(root) && readdirSync(root).length)
    throw new Error(`${folder} is not empty`)

  const source = kitSource()
  const kit = openKit(source, opts.to)
  const modules = pickedModules(kit)
  const code = presetCode(opts.preset ?? encodePreset(DEFAULT_PRESET))

  const blocks = blocksFor(kit, modules)
  const changes = [
    ...kit.base.map((file) => ({ op: "copy", file, track: true })),
    // The person's from the start: the wiki pages and the package files.
    ...kit.content
      .filter((f) => !f.startsWith("app/data/"))
      .map((file) => ({ op: "seed", file })),
    ...blocks.flatMap((b) => blockChanges(kit, b)),
    ...modules.flatMap((id) => moduleChanges(kit, id)),
    ...themeChanges(root, { files: {} }, code),
    ...Object.entries(themePackages(decodePreset(code))).map(
      ([name, version]) => ({ op: "package", name, version }),
    ),
  ]
  const state = {
    kit: source,
    ref: opts.to ?? null,
    version: kit.version,
    preset: code,
    modules,
    blocks,
    files: {},
  }
  // The package files are the kit's, less what only the blocks left out use.
  for (const [name, block] of Object.entries(kit.blocks)) {
    if (blocks.includes(name)) continue
    for (const pkg of Object.keys(block.packages ?? {}))
      changes.push({ op: "unpackage", name: pkg })
  }

  commit(root, kit, changes, state, { install: true })
  say(`Started a work app in ${folder}, with ${titles(kit, modules)}.`)
  say(`Next: cd ${folder}/app && npm run dev`)
}

const ALWAYS = "about"

/** The modules `init` makes: `--modules` (a comma list of the kit's module
 *  ids), else the kit's starter set. About is in every app, picked or not:
 *  Claude interviews the person into it. */
function pickedModules(kit) {
  if (opts.modules === undefined) return kit.starter
  const ids = opts.modules
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
  const unknown = ids.filter((id) => !kit.modules[id])
  if (unknown.length)
    throw new Error(
      `the kit has no module ${unknown.map((u) => `"${u}"`).join(", ")} (it has: ${Object.keys(kit.modules).join(", ")})`,
    )
  return [...new Set([ALWAYS, ...ids])]
}

function list() {
  const root = tryFindApp()
  const state = root && readState(root)
  const kit = openKit(kitSource(state), state?.ref ?? undefined)
  const installed = root ? appModules(root) : {}
  const rows = Object.entries(kit.modules)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([id, m]) => ({
      id,
      title: m.title,
      purpose: m.purpose,
      installed: id in installed,
    }))
  result.modules = rows
  for (const r of rows)
    say(
      `${r.installed ? "✓" : " "} ${r.id.padEnd(10)} ${r.title}: ${r.purpose}`,
    )
}

function add(named) {
  if (!named.length && !opts.all)
    throw new Error("name the module: starta add <module>, or starta add --all")
  const root = findApp(".")
  const state = readState(root)
  const kit = openKit(kitSource(state), state.ref ?? undefined)
  const have = appModules(root)
  // --all: every module of the kit the app does not have yet.
  const ids = opts.all
    ? Object.keys(kit.modules)
        .filter((id) => !(id in have))
        .sort((a, b) => kit.modules[a].order - kit.modules[b].order)
    : named.filter((id) => !(id in have))
  // A module the app already has is skipped, not refused, so one line from
  // the configurator's Existing app tab runs on any app.
  const skipped = named.filter((id) => id in have)
  if (skipped.length) say(`Already in this app: ${skipped.join(", ")}.`)
  if (!ids.length) {
    if (!skipped.length) say("This app already has every module in the kit.")
    return
  }

  for (const id of ids) {
    if (!kit.modules[id])
      throw new Error(
        `the kit has no module "${id}" (it has: ${Object.keys(kit.modules).join(", ")})`,
      )
  }

  const needed = blocksFor(kit, ids)
  const newBlocks = needed.filter(
    (b) =>
      !state.blocks.includes(b) && !existsSync(path.join(root, blockDir(b))),
  )
  const packages = Object.assign(
    {},
    ...needed.map((b) => kit.blocks[b].packages ?? {}),
  )
  const changes = [
    ...newBlocks.flatMap((b) => blockChanges(kit, b)),
    ...ids.flatMap((id) => moduleChanges(kit, id)),
    ...missingPackages(root, packages),
  ]
  state.modules = [...new Set([...state.modules, ...ids])]
  state.blocks = [...new Set([...state.blocks, ...newBlocks])]

  commit(root, kit, changes, state, {
    install: changes.some((c) => c.op === "package"),
  })
  say(`Added ${titles(kit, ids)}.`)
}

function remove([id]) {
  if (!id) throw new Error("name the module: starta remove <module>")
  const root = findApp(".")
  const state = readState(root)
  const have = appModules(root)
  const module = have[id]
  if (!module) throw new Error(`"${id}" is not in this app`)

  const changes = [{ op: "delete", file: `app/src/modules/${id}.json` }]
  if (module.file)
    changes.push({
      op: "keep",
      file: `app/data/${module.file}`,
      why: "your data",
    })

  // Blocks the kit installed that this module was the last to use. One left
  // behind earlier (the person had changed it) is not raised again.
  const rest = Object.values(have).filter((m) => m.id !== id)
  const used = new Set(rest.flatMap((m) => appClosure(root, m.block)))
  const mine = appClosure(root, module.block)
  const unused = state.blocks.filter((b) => mine.includes(b) && !used.has(b))
  const dropped = []
  for (const b of unused) {
    const files = filesUnder(root, blockDir(b))
    const changed = files.filter(
      (f) =>
        !(f in state.files) || hashFile(path.join(root, f)) !== state.files[f],
    )
    if (changed.length) {
      for (const f of changed)
        changes.push({
          op: "keep",
          file: f,
          why: "you changed it, so its folder stays",
        })
    } else {
      changes.push(...files.map((file) => ({ op: "delete", file })))
      dropped.push(b)
    }
  }

  state.modules = state.modules.filter((m) => m !== id)
  state.blocks = state.blocks.filter((b) => !dropped.includes(b))
  commit(root, null, changes, state, { install: false })
  say(
    `Removed ${module.title}.${module.file ? ` Its data stays in app/data/${module.file}.` : ""}`,
  )
}

function update() {
  const root = findApp(".")
  const state = readState(root)
  const ref = opts.to ?? state.ref ?? undefined
  const kit = openKit(kitSource(state), ref)

  // Blocks the installed modules now need, which may include a new one.
  const blocks = [
    ...new Set([
      ...state.blocks.filter((b) => kit.blocks[b]),
      ...blocksFor(
        kit,
        state.modules.filter((m) => kit.modules[m]),
      ),
    ]),
  ]
  for (const b of state.blocks.filter((b) => !kit.blocks[b]))
    say(`The kit no longer has the files of "${b}"; yours stay.`)

  const expected = [
    ...kit.base,
    ...blocks.flatMap((b) => kit.blocks[b].files),
    ...state.modules
      .filter((m) => kit.modules[m])
      .flatMap((m) => moduleFiles(kit, m).tracked),
  ]
  const changes = []
  for (const file of expected) {
    const change = updateFile(root, kit, state, file)
    if (change) changes.push(change)
  }
  // The theme is the CLI's, not the kit's: redraw it from the app's preset,
  // which also gives an app made before presets its theme.css.
  state.preset ??= encodePreset(DEFAULT_PRESET)
  changes.push(...themeChanges(root, state, state.preset))
  const theme = Object.values(THEME_FILES)
  for (const file of Object.keys(state.files).filter(
    (f) => !expected.includes(f) && !theme.includes(f),
  )) {
    const abs = path.join(root, file)
    if (!existsSync(abs)) changes.push({ op: "forget", file })
    else if (hashFile(abs) === state.files[file])
      changes.push({ op: "delete", file })
    else
      changes.push({
        op: "keep",
        file,
        why: "the kit dropped it, but you changed it",
      })
  }
  for (const b of blocks.filter(
    (b) =>
      !state.blocks.includes(b) && !existsSync(path.join(root, blockDir(b))),
  ))
    changes.push(...blockSeed(kit, b).map((file) => ({ op: "seed", file })))

  // The kit's dependencies, less those only a block this app lacks uses.
  const kitPkg = readJson(kit.dir, "app/package.json")
  const notHere = Object.entries(kit.blocks)
    .filter(([b]) => !blocks.includes(b))
    .flatMap(([, block]) => Object.keys(block.packages ?? {}))
  const packages = Object.assign(
    {},
    kitPkg.dependencies,
    ...blocks.map((b) => kit.blocks[b].packages ?? {}),
  )
  for (const name of notHere) delete packages[name]
  Object.assign(packages, themePackages(decodePreset(state.preset)))
  changes.push(...missingPackages(root, packages))

  state.blocks = blocks
  state.version = kit.version
  state.ref = ref ?? null
  commit(root, kit, changes, state, {
    install: changes.some((c) => c.op === "package"),
  })

  const conflicts = changes.filter((c) => c.op === "kit")
  const replaced = changes.filter((c) => c.op === "copy").length
  say(
    `Updated to ${kit.version}: ${replaced} file${replaced === 1 ? "" : "s"} replaced or added.`,
  )
  if (conflicts.length)
    say(
      `You and the kit both changed ${conflicts.length} file${conflicts.length === 1 ? "" : "s"}; the kit's version is beside each as <file>.kit. Merge them, then delete the .kit files.`,
    )
}

function applyPreset() {
  if (!opts.preset)
    throw new Error("name the preset: starta apply --preset <code>")
  const root = findApp(".")
  const state = readState(root)
  const code = presetCode(opts.preset)
  const preset = decodePreset(code)
  const changes = [
    ...themeChanges(root, state, code, { always: true }),
    ...missingPackages(root, themePackages(preset)),
  ]
  state.preset = code
  commit(root, null, changes, state, {
    install: changes.some((c) => c.op === "package"),
  })
  const picks = PRESET_FIELDS.map(
    (f) =>
      `${f.label.toLowerCase()} ${f.options.find((o) => o.id === preset[f.key]).label}`,
  ).join(", ")
  say(`Applied preset ${code}: ${picks}.`)
  if (changes.some((c) => c.op === "kit"))
    say(
      "You changed the theme, so yours stays; the preset's version is beside it as <file>.kit. Merge it, then delete the .kit file.",
    )
}

// ── planning ────────────────────────────────────────────────────────────────

/** One kit file against the app: what update does with it. */
function updateFile(root, kit, state, file) {
  const abs = path.join(root, file)
  const kitHash = hashFile(path.join(kit.dir, file))
  const recorded = state.files[file]
  if (!existsSync(abs)) {
    // Deleted by the person: leave it deleted.
    if (recorded) return { op: "keep", file, why: "you deleted it" }
    return { op: "copy", file, track: true }
  }
  const mine = hashFile(abs)
  if (mine === kitHash)
    return recorded === kitHash ? null : { op: "record", file, hash: kitHash }
  if (mine === recorded) return { op: "copy", file, track: true }
  if (recorded === kitHash) return null // only the person changed it
  return { op: "kit", file, hash: kitHash }
}

/** A preset code, checked, in its canonical spelling. */
function presetCode(code) {
  const preset = decodePreset(code)
  if (!preset) throw new Error(`"${code}" is not a preset code`)
  return encodePreset(preset)
}

/** theme.css and theme.json for a preset, against the app's copies. As
 *  update treats a kit file: the person's edit is kept, and the CLI's text
 *  goes beside it as <file>.kit. `always` (apply): write the .kit whenever
 *  the person's file differs, even if the theme they changed was this one. */
function themeChanges(root, state, code, { always = false } = {}) {
  const preset = decodePreset(code)
  const texts = { css: themeCss(preset), json: themeJson(preset) }
  const changes = []
  for (const [kind, file] of Object.entries(THEME_FILES)) {
    const text = texts[kind]
    const hash = hashText(text)
    const abs = path.join(root, file)
    const recorded = state.files[file]
    if (!existsSync(abs)) {
      changes.push({ op: "write", file, text, track: true })
      continue
    }
    const mine = hashFile(abs)
    if (mine === hash) {
      if (recorded !== hash) changes.push({ op: "record", file, hash })
    } else if (mine === recorded) {
      changes.push({ op: "write", file, text, track: true })
    } else if (always || recorded !== hash) {
      changes.push({ op: "kit", file, text, hash })
    }
  }
  return changes
}

/** The kit's blocks the modules stand on, each once, dependencies first. */
function blocksFor(kit, ids) {
  const seen = []
  for (const id of ids) {
    const block = kit.modules[id].block
    if (!BASE_BLOCKS.has(block)) blockClosure(kit, block, seen)
  }
  return seen
}

/** The blocks a block stands on in the app, by its block.json. */
function appClosure(root, name, seen = []) {
  if (BASE_BLOCKS.has(name) || seen.includes(name)) return seen
  seen.push(name)
  const file = path.join(blockDir(name), "block.json")
  const block = existsSync(path.join(root, file)) ? readJson(root, file) : {}
  for (const need of block.needs ?? []) appClosure(root, need, seen)
  return seen
}

function blockChanges(kit, name) {
  return [
    ...kit.blocks[name].files.map((file) => ({
      op: "copy",
      file,
      track: true,
    })),
    ...blockSeed(kit, name).map((file) => ({ op: "seed", file })),
  ]
}

function moduleChanges(kit, id) {
  const { tracked, seed } = moduleFiles(kit, id)
  return [
    ...tracked.map((file) => ({ op: "copy", file, track: true })),
    ...seed.map((file) => ({ op: "seed", file })),
  ]
}

function dropTracked(root, state, file) {
  const same =
    file in state.files && hashFile(path.join(root, file)) === state.files[file]
  return same
    ? { op: "delete", file }
    : { op: "keep", file, why: "you changed it" }
}

const blockDir = (name) => `app/src/blocks/${name}`

// ── running ─────────────────────────────────────────────────────────────────

function commit(root, kit, changes, state, { install }) {
  result.changes = changes
    .filter((c) => !(c.op === "seed" && existsSync(path.join(root, c.file))))
    .map(({ text: _text, ...c }) => c)
  if (dryRun) return
  apply(root, kit?.dir, changes, state)
  writeState(root, state)
  if (install && !opts["no-install"]) {
    execFileSync("npm", ["install", "--no-audit", "--no-fund"], {
      cwd: path.join(root, "app"),
      stdio: opts.json ? ["ignore", 2, 2] : "inherit",
    })
  }
}

function kitSource(state) {
  if (opts.kit) return isLocal(opts.kit) ? path.resolve(opts.kit) : opts.kit
  return state?.kit ?? DEFAULT_KIT
}

const isLocal = (s) => !/^(github:|https?:|git@|ssh:|file:)/.test(s)

function tryFindApp() {
  try {
    return findApp(".")
  } catch {
    return null
  }
}

function titles(kit, ids) {
  const names = ids.map((id) => kit.modules[id].title)
  return names.length > 1
    ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`
    : names[0]
}

const MARK = {
  unpackage: "-",
  copy: "+",
  seed: "+",
  write: "+",
  kit: "!",
  record: "=",
  delete: "-",
  forget: "-",
  keep: "·",
  package: "+",
}

function print() {
  if (opts.json) {
    console.log(JSON.stringify(result, null, 2))
    return
  }
  if (dryRun) {
    for (const c of result.changes) {
      if (c.op === "record" || c.op === "forget") continue
      const what =
        c.op === "package"
          ? `package ${c.name}@${c.version}`
          : c.op === "unpackage"
            ? `package ${c.name}`
            : c.op === "kit"
              ? `${c.file}.kit`
              : c.file
      console.log(`${MARK[c.op]} ${what}${c.why ? `  (${c.why})` : ""}`)
    }
    console.log(`\nDry run: nothing changed. ${STATE_FILE} is untouched.`)
    return
  }
  // A real run names only the files that need the person: kept or to merge.
  for (const c of result.changes) {
    if (c.op !== "kit" && c.op !== "keep") continue
    const what = c.op === "kit" ? `${c.file}.kit` : c.file
    console.log(`${MARK[c.op]} ${what}${c.why ? `  (${c.why})` : ""}`)
  }
  for (const line of result.notes) console.log(line)
}

// ── main ────────────────────────────────────────────────────────────────────

try {
  if (opts.help || !command) {
    process.stdout.write(HELP)
    process.exit(command || opts.help ? 0 : 1)
  }
  const run = { init, list, add, remove, update, apply: applyPreset }[command]
  if (!run) throw new Error(`unknown command "${command}"\n\n${HELP}`)
  run(args)
  print()
} catch (err) {
  if (opts.json)
    console.log(JSON.stringify({ ...result, error: err.message }, null, 2))
  else console.error(`starta ${command ?? ""}: ${err.message}`)
  process.exit(1)
}
