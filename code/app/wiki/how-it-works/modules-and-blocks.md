---
title: Modules and blocks
description: What a module, a block, a view and a section are, and why a new module needs no new code.
order: 2
---

The sidebar lists **modules**. Each module is built on a **block**, the
reusable screen underneath it. Knowing the difference is what lets you add your
own modules: most new modules are a new use of a block you already have, so
they need no new code.

## The words

| Word | What it means | Example |
|---|---|---|
| Module | What the sidebar lists: one use of a block, with its own name and data file | Tasks, People, Accounts |
| Block | The reusable screen and data shape a module is built from | datatable |
| Component | A small interface piece inside a block | A button, a table, a dialog |
| View | How a datatable module shows its rows | `table`, `task` or `goal` |
| Section | A part of Settings; each module has one | Settings → Tasks |

Blocks are named for their shape, modules for their purpose, so the two never
share a name.

## The blocks and the modules on them

| Block | What it gives | Modules on it |
|---|---|---|
| profile | One page about you | About |
| datatable | Rows with columns you define, in a table, task or goal view | Tasks, People, Goals, and your own |
| pages | Markdoc pages in a tree, with a reader | Wiki |

Every app starts with the same five modules: About, Goals, Tasks, People and
Wiki. There are no templates to choose from, and no module to add later: the
modules you add are the ones you build yourself, such as Accounts.

## Why Tasks and People share a block

Tasks and People look different, but they are the same block, datatable, used
twice:

- **Tasks** uses the task view: a checklist you tick off, with due dates and
  the person each task is waiting on.
- **People** uses the table view: a table of names, roles and organisations.

Each has its own name, its own columns and its own data file. The screen code
is shared. That is the point of showing them side by side: once you see that
Tasks and People are one block, a third module on the same block, such as
Accounts, is an obvious next step.

## The module file

Each module is one small file in `app/src/modules/`. Here is People's, without
its field list:

```json
{
  "id": "people",
  "title": "People",
  "block": "datatable",
  "view": "table",
  "icon": "users",
  "file": "people.json",
  "order": 20,
  "purpose": "Who you work with, and what to know about each of them.",
  "fields": []
}
```

| Key | What it sets |
|---|---|
| `id` | The address, `/people` |
| `title` | The name in the sidebar |
| `block` | The block it is built on |
| `view` | For a datatable: `table` or `task` |
| `icon` | The sidebar mark; an unknown name gets a default mark |
| `file` | Its data file in `app/data/` |
| `order` | Its place in the sidebar, lowest first |
| `purpose` | One line, shown in its Settings section |
| `fields` | For a datatable: its columns and their kinds |

## The sidebar comes from the module files

The app finds its modules by reading the folder of module files, and builds
three things from them: the sidebar, each module's page, and each module's section in
Settings. So:

- **Add a module file** and a new item appears in the sidebar, with its page and
  its Settings section.
- **Change `title` or `order`** and the sidebar changes.
- **Delete the module file** and the module disappears. Its data file stays in
  `app/data/` until you decide otherwise.

The kit's modules sit in this order: Tasks 10, People 20, Goals 35,
Wiki 60, About 70. About is always last.

A Settings section is read-only. It shows the module's name, block, view, data
file and fields. To change any of them, ask Claude.

## Worked example: Accounts

Sam wants a list of the customer accounts they look after. They ask Claude:

"Build an Accounts module on the datatable block, as a table. Columns: name,
plan, renewal date, health, main contact, and a notes tab."

Claude writes two files and no code:

| File | Holds |
|---|---|
| `app/src/modules/accounts.json` | The module: its title, block, view, order and fields |
| `app/data/accounts.json` | Sam's rows, starting with Tallow & Co and Harbourline Logistics |

Claude opens the new module to check it. Accounts now sits in the sidebar, with
its own page and its own Settings section. The datatable block is the same one Tasks and People use.

A module that needs a screen no block offers, such as a board, means changing a
block or building a new one. That is a bigger step, covered in
[Changing a block](/wiki/advanced/changing-a-block).
