# Starta

Starta is a starter kit for your own work app: a custom app you build for your
own job, one maintained set of data with a structured interface on top, kept
current by Claude. You are its owner, operator, builder and end user. It runs
on your own machine, with no hosting, sign-in or connectors.

It starts with five modules in the sidebar, each with a section in Settings:

- **Tasks** (`/tasks`): what you have to do, as a task list you tick off;
  the app opens here;
- **People** (`/people`): who you work with, as a table;
- **Goals** (`/goals`): what you are measured on, as cards with a value, a
  target and a period;
- **Wiki** (`/wiki`): the explainer, the **Learn** course, Advanced articles
  and what you learn, as pages;
- **About** (`/about`), last: your role, as a wiki page. Claude fills it in by
  interviewing you.

Tasks, People and Goals are three modules on the same block, the datatable, in
three views. Adding your own module, such as Partners, is one module file and one data
file: ask Claude.

The app root is `app/`, so run all `npm` from there. `npm run dev` serves on
**:9950**.

## Words

| Word | Meaning |
| --- | --- |
| Work app | The whole app: a custom app for one person's job |
| Module | What the sidebar lists: an instance of a block, with its own name and data file |
| Block | The reusable thing a module is built from: a screen and a data shape (`app/src/blocks/`) |
| Component | A shadcn piece inside a block (`app/src/components/ui/`) |
| View | How a datatable module shows its rows: `table`, `task` or `goal` |
| Section | A part of Settings; each module has one |

Blocks are named for their shape, modules for their purpose: `profile`
(About), `datatable` (Tasks, People, Goals) and `pages` (Wiki).

## Layout

```
CLAUDE.md                    how Claude works on this app
product/DESIGN.md            the table rules
kit/starter.json             the modules a new app starts with
starta.json                  the modules installed from the kit (in an app made by `starta init`)
app/                         the React Router app
  data/                      one data file per module: about.md (Markdoc), and tasks, people, goals
                             as JSON; committed
  wiki/                      the wiki pages (Markdoc): idea/, how-it-works/, learn/, guides/, advanced/, reference/, about/
  src/modules/               one file per module: sidebar, routes and Settings come from them
  src/blocks/                profile (About), datatable (Tasks, People, Goals)
  src/data/                  the data helper: every read and write, with the freshness check
  src/wiki/                  the wiki: pages, tree, reader, downloads
  src/components/ui/         the shadcn components the screens are built from
  src/routes/                the shell, Settings and search
```

## How data flows

- One data file per module in `app/data/`, written whole and committed to git.
  A datatable's file is `{ "items": [...] }`. About's is `about.md`, a Markdoc
  page: frontmatter `title`, `team`, `organisation`, then the role as prose,
  with no metrics.
- Screens read and write only through the data helper:
  `app/src/data/store.ts` (the interface) and `app/src/data/store.server.ts`
  (the files).
- Two writers share each file: the person on screen and Claude. A screen write
  carries the `updatedAt` it read, and a stale one is refused as a conflict.
- When Claude edits a data file, the open page reloads by itself within a few
  seconds (`app/src/data/store-sync.tsx`).
- The screen writes only datatable rows: add, edit, delete and tick done.
  About is read-only on screen; Claude writes `about.md` by interviewing the
  person.

## Modules

A module is one file in `app/src/modules/` plus one data file, with no new
code. The sidebar, the route and the Settings section come from that file, and
deleting it removes the module.

A module file has:

| Key | Holds |
| --- | --- |
| `id` | The URL |
| `title` | The sidebar name |
| `block` | The block it is built on |
| `view` | For a datatable: `table`, `task` or `goal` (cards, the first row as the headline) |
| `icon` | A name in `app/src/lib/module-icons.ts`; unknown names get a default mark |
| `file` | Its data file, `<id>.json` |
| `order` | Its place in the sidebar, lowest first; About is last |
| `purpose` | One line |
| `fields` | For a datatable: its fields |

A field is `{ key, label, kind, hint?, tab? }`, and the first field is `name`.
Kinds: `line`, `text`, `lines`, `date` (`YYYY-MM-DD`), `status` (backlog,
in-progress, blocked, done), `category` (project, deliverable, task, request,
followup), `person` (a People row id), `number` (text such as `38.4`),
`direction` (`up` or `down`: which way is better) and `period` (a day, month
or quarter: `2026-10-31`, `2026-10`, `2026-Q4`) and `owner`
(`me`, `team` or `company`). Fields on the first tab are the
table's columns; the rest show in the row's sheet. Every row has an `id`: a
slug of its name.

The kit's modules are added with the `starta` command: `starta list` shows
them, `starta add <id>` copies a module and its block and records it in
`starta.json`, and `starta update` takes a newer kit, writing `<file>.kit`
beside any file changed on both sides. `starta apply --preset <code>` changes
the look.

## Blocks

A block is a folder in `app/src/blocks/`: its screens, its `routes.ts` (the
pages one module gets) and its `block.json` (`needs`: the blocks it imports
from; `packages`: npm packages only it uses; `ownHeader`). A block's
`README.md`, where there is one, holds its data shape and rules.

## Wiki

One Markdoc page per file in `app/wiki/`; a folder is a section and its
`index.md` is the landing page. Frontmatter: `title`, `description`, `order`.

It has seven sections, in this order: `idea/` and `how-it-works/` (the
explainer), `learn/` (the course: lessons with a goal, prompts to try and a
"you are done when" check), `guides/` (how-to recipes), `advanced/` (look-up
articles, not lessons), `reference/` (glossary, formats, prompt library) and
`about/` (how pages are written).

Plain Markdown is valid. Besides it, only these are allowed, and anything else
fails the build:

- `{% callout title="…" %}` … `{% /callout %}`: a set-off note;
- `{% figure src="/wiki/<file>" caption="…" /%}`: an image with a caption
  (files in `app/public/wiki/`);
- the variables `{% $appName %}`, `{% $appId %}` and `{% $appUrl %}`.

## Commands (from `app/`)

| cmd | what |
| --- | --- |
| `npm install` | install the dependencies |
| `npm run dev` | dev server on :9950 |
| `npm run build` / `npm start` | build / serve |
| `npm run typecheck` | typegen + tsc |
| `npm run lint` | ESLint |

## Stack and conventions

React Router 7 in framework mode (SSR), React 19, TypeScript, Tailwind 4 with
shadcn (`base-nova` on Base UI), lucide icons and Markdoc for the wiki.

- `.server.ts` files are server-only; client code imports only their types.
- `~` maps to `app/src/`.
- Data files hold fictional seed data until you replace it with your own.
