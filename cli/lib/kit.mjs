// The kit: the code/ folder the CLI copies from, in starta or in the public
// repo. A local folder is read as it
// stands, uncommitted changes included; a git URL (or a local folder with a
// ref) is cloned at that ref into a temporary folder.
//
// What each file in the kit is follows from where it lives, not from a list:
//
//   module  app/src/modules/<id>.json and its data file app/data/<file> (copied once, never tracked)
//   block   app/src/blocks/<block>/, with block.json; its `data` folders
//           are copied once, never tracked
//   content app/data/, app/wiki/: the person's, copied once at init
//   setup   app/package.json, app/package-lock.json: copied at init, then
//           the person's; `update` only adds missing dependencies
//   theme   app/src/theme.css, app/src/theme.json: written from the preset
//           by the CLI (preset.mjs), never copied from the kit
//   base    every other file the kit's git tracks, outside kit/

import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"

import { THEME_FILES } from "./preset.mjs"

const MODULE_RE = /^app\/src\/modules\/([^/]+)\.json$/
const BLOCK_RE = /^app\/src\/blocks\/([^/]+)\//
const CONTENT_RE = /^app\/(data|wiki)\//
const SETUP = new Set(["app/package.json", "app/package-lock.json"])
const THEME = new Set(Object.values(THEME_FILES))

const isUrl = (source) => /^(github:|https?:|git@|ssh:|file:)/.test(source)

function git(dir, ...args) {
  return execFileSync("git", ["-C", dir, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim()
}

/** Fetch the kit and sort its files. `source` is a folder or a git URL. */
export function openKit(source, ref) {
  let dir = source
  if (isUrl(source) || ref) {
    const url = source.startsWith("github:")
      ? `https://github.com/${source.slice("github:".length)}.git`
      : source
    dir = mkdtempSync(path.join(tmpdir(), "starta-kit-"))
    const clone = dir
    process.on("exit", () => rmSync(clone, { recursive: true, force: true }))
    const args = ["clone", "--quiet", "--depth", "1"]
    if (ref) args.push("--branch", ref)
    execFileSync(
      "git",
      [...args, isUrl(url) ? url : `file://${path.resolve(url)}`, dir],
      {
        stdio: ["ignore", "ignore", "pipe"],
      },
    )
  } else {
    dir = path.resolve(source)
  }
  const MODULES_DIR = path.join("app", "src", "modules")
  if (
    !existsSync(path.join(dir, MODULES_DIR)) &&
    existsSync(path.join(dir, "code", MODULES_DIR))
  )
    dir = path.join(dir, "code")
  if (!existsSync(path.join(dir, MODULES_DIR)))
    throw new Error(`${source} is not a Starta kit (no app/src/modules/)`)

  const sha = git(dir, "rev-parse", "--short", "HEAD")
  const dirty =
    !ref && !isUrl(source) && git(dir, "status", "--porcelain", "--", ".") !== ""
  const version = ref ?? (dirty ? `${sha}+dirty` : sha)

  const files = git(
    dir,
    "ls-files",
    "--cached",
    "--others",
    "--exclude-standard",
  )
    .split("\n")
    .filter(
      (f) =>
        f &&
        !f.startsWith("kit/") &&
        !THEME.has(f) &&
        existsSync(path.join(dir, f)),
    )

  const kit = {
    dir,
    source,
    version,
    base: [],
    content: [],
    blocks: {},
    modules: {},
  }

  for (const file of files) {
    let m
    if ((m = file.match(MODULE_RE))) {
      kit.modules[m[1]] = { ...readJson(dir, file), path: file }
    } else if ((m = file.match(BLOCK_RE))) {
      ;(kit.blocks[m[1]] ??= { files: [] }).files.push(file)
    } else if (CONTENT_RE.test(file) || SETUP.has(file)) {
      kit.content.push(file)
    } else {
      kit.base.push(file)
    }
  }

  // Seed folders a block names (`data`) are content, not base.
  for (const [name, block] of Object.entries(kit.blocks)) {
    Object.assign(block, readJson(dir, `app/src/blocks/${name}/block.json`))
    for (const folder of block.data ?? []) {
      kit.base = kit.base.filter((f) => !f.startsWith(`${folder}/`))
    }
  }

  // What `init` gives without `--modules`: the default ticks on Create.
  kit.starter = readJson(dir, "kit/starter.json").modules

  return kit
}

export function readJson(dir, file) {
  return JSON.parse(readFileSync(path.join(dir, file), "utf8"))
}

/** The blocks a block stands on, itself last, each once. */
export function blockClosure(kit, name, seen = []) {
  if (seen.includes(name)) return seen
  const block = kit.blocks[name]
  if (!block) throw new Error(`the kit has no block "${name}"`)
  for (const need of block.needs ?? []) blockClosure(kit, need, seen)
  seen.push(name)
  return seen
}

/** A block's seed files: what its `data` folders hold in the kit. */
export function blockSeed(kit, name) {
  const folders = kit.blocks[name]?.data ?? []
  // With no paths, ls-files would list the whole kit.
  if (!folders.length) return []
  return git(
    kit.dir,
    "ls-files",
    "--cached",
    "--others",
    "--exclude-standard",
    ...folders,
  )
    .split("\n")
    .filter(Boolean)
}

/** Everything that makes up a module apart from its block: its file
 *  (tracked) and its data file (copied once). */
export function moduleFiles(kit, id) {
  const module = kit.modules[id]
  if (!module) throw new Error(`the kit has no module "${id}"`)
  return {
    tracked: [module.path],
    seed: module.file ? [`app/data/${module.file}`] : [],
  }
}

/** `pages` (the wiki) is part of the base, not a folder in blocks/. */
export const BASE_BLOCKS = new Set(["pages"])
