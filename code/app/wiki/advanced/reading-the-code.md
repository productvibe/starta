---
title: Finding your way in the code
description: A map of your app's folders, so you can read enough of the code to steer Claude.
order: 3
---

You do not need to write code, but knowing where things live makes you a
better director. When you can say "the task list" and know it is
`app/src/blocks/datatable/task-view.tsx`, Claude's answers get shorter and its
changes more precise. This article is the map. The full folder list is in
[Folders and files](/wiki/reference/folders).

## When you need it

- Claude asks which part you mean, and you are not sure.
- You want to check a change before you keep it
  ([Read what Claude changed](/wiki/guides/review-a-change)).
- You want to change a screen itself, not only its content
  ([Changing a block](/wiki/advanced/changing-a-block)).

## The map

Everything is under `app/`. Four places matter most.

| Where | What it is | You touch it |
|---|---|---|
| `app/src/modules/` | One small file per module: name, block, view, fields | Often, through Claude |
| `app/src/blocks/<block>/` | The screens of one block, shared by every module on it | Rarely |
| `app/src/data/` | The data helper: every read and write of a data file | Almost never |
| `app/src/components/ui/` | The interface pieces: buttons, tables, sheets, menus | Never directly |

And the content, which is yours from day one:

| Where | What it is |
|---|---|
| `app/data/` | One data file per module, and `about.md` |
| `app/wiki/` | These wiki pages |

## Inside a block

Each block folder has the same parts:

- **`routes.ts`**: which pages a module on this block gets.
- **`route.tsx`**: the page that loads the module's data and draws it.
- **Other `.tsx` files**: the parts of the screen. In `datatable/`,
  `table-view.tsx` draws the table, `task-view.tsx` the task list,
  `toolbar.tsx` the filter and sort bar, and `rows.tsx` the row sheet and
  its saving.
- **`block.json`**: which other blocks it needs and which packages it uses.
- **`README.md`**, where there is one: the block's data shape and rules.
  Read it before you change that block.

## The data helper

Screens never open files. They ask the data helper, and it reads or writes
the file. `store.ts` says what the helper can do; `store.server.ts` does it
with files on disk. This is why a later move to a database would mean
changing one place. It is also where the conflict check lives: when you save
a row that Claude changed after you opened it, the helper refuses, and the
screen asks you to reload.

## Reading signs

- **`.tsx`**: a screen or part of one. **`.ts`**: logic with no screen.
- **`.server.ts`**: runs only in the app's server part, never in your browser.
- **`~/`** at the start of an import means `app/src/`.
- **Comments at the top of a file** say what it is for. Most files have one.
  Start there.

## Example

Sam wants overdue tasks to stand out more. They ask: "Which file decides how
a due date looks in the task list? Show me only that part, and explain it in
three lines." Claude points at `cellValue` in `table-view.tsx`, which both
views use, and the date helper in `app/src/lib/dates.ts`. Now Sam can say
exactly what they want: "In the task list only, show a due date in red when it
is past and the task is not done." Sam also learns why "only" matters: the
same lines draw the Last contact column in People.

## What to ask Claude

- "Which files draw the People page? List them with one line each."
- "Explain this file in five lines, for someone who does not write React."
- "Where is the text 'New item' set?"
- "Which modules would a change to this file affect?"
- "Show me the part of the diff that changes what I see on screen."

## Pitfalls

- **Reading is not required to be thorough.** Read the top comment and the
  part Claude points at. Enough to steer is the goal.
- **Change content before code.** Many wishes are a module file or data file
  change. Ask "Can this be done without changing code?" first.
- **Do not edit `components/ui/` files.** They are shared by every screen.
  Ask Claude to use a component differently instead.
- **Names on screen are not file names.** Tasks is a module; its screen is
  the datatable block. Ask Claude when the two do not match.
