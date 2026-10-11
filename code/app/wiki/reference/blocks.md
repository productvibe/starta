---
title: Blocks
description: Every block in the kit, what it gives a module, its data shape and what you can change on screen.
order: 3
---

This page lists every block: the reusable screen and data shape a module is
built on. Blocks are named for their shape, modules for their purpose, so a
block and a module never share a name. Each block is a folder in
`app/src/blocks/`, except `pages` (the wiki), which is part of the app's base.

## All blocks

| Block | What it gives | Modules on it | Pages it serves | Editable on screen |
|---|---|---|---|---|
| `profile` | One read-only page about you: your role | About | `/about` | Nothing |
| `datatable` | Rows with fields set per module, in a table, task or goal view, with a sheet per row | Tasks, People, Goals, and your own | `/<module>` | Add, edit, delete rows; tick done in the task view |
| `pages` | Markdoc pages with a folder tree, a reader, search and downloads | Wiki | `/wiki/…` | Nothing; Claude writes pages |
| `datamart` | Local tables for drill-down | — | — | Later, not built |

## What each block's data file looks like

| Block | Data file shape |
|---|---|
| `profile` | `about.md`: frontmatter `title`, `team`, `organisation`, then your role as prose, with no metrics |
| `datatable` | `{ "items": [ { "id": "…", "name": "…", … } ] }`: one object per row, keys from the module's fields |
| `pages` | No data file: one `.md` file per page in `app/wiki/` |

## datatable

The block most of your own modules use. Tasks, People and Goals are three
modules on it, in three views.

| Part | What it does |
|---|---|
| Table view (`"view": "table"`) | Columns are the fields on the first tab. Cells are read-only; click a row to open its sheet |
| Task view (`"view": "task"`) | A checkbox list. Ticking a row sets its status to `done`. Shows Open, Done or All |
| Sheet | Every field of one row, grouped in tabs. You edit and delete here |
| Filter bar | Open, Closed or All where the module has a status field; type toggles where it has a type field; sort always |
| Sort | By any field except `text` and `lines` fields |
| Order | Attention first: In progress, Blocked, Backlog, Done; then by due date |
| New rows | A row is saved once it has a name. Status starts at Backlog, type at Task |
| Goal view (`"view": "goal"`) | Cards of value against target. The first row is the headline, drawn large on top. Reads the fields `name`, `start`, `value`, `target`, `unit` (`%` prints as a percentage), `direction`, `owner` and `due` (a `period`), shown as "Team · By Q4 2026", and `description`. A goal shows On track when it is met, or when it is at or ahead of an even pace from its start value to its target over the period of its target date (a month or a quarter). It shows Off track when it is behind that pace, or when the period has ended and the target is not met. With no start value, or a target date of a single day, there is no badge until the goal is met or late. Click a card to open its sheet |

The filter and sort live in the address bar, so a filtered list survives a
reload and you can bookmark it.

## block.json

Each block folder has a `block.json`. Every key is optional.

| Key | Holds | Used by |
|---|---|---|
| `needs` | The blocks it imports from | None of the kit's blocks yet |
| `packages` | Extra software only this block uses | None of the kit's blocks yet |
| `data` | Folders of content it starts with, copied once | None of the kit's blocks yet |

To change a block itself, read
[Changing a block](/wiki/advanced/changing-a-block) first: a block change
affects every module on it.
