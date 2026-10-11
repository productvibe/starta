---
title: Words
description: A glossary of every term your work app and this wiki use.
order: 1
---

This page defines the words you meet in the app, in this wiki and in Claude's
replies. Each word means one thing. When Claude uses a word that is not here,
ask it: "Explain what you mean by that, in one sentence."

## The app and its parts

| Word | Meaning |
|---|---|
| Work app | A custom app you build for your own job: one maintained set of data with a structured screen on top, kept current by Claude |
| Starter | The modules every work app starts with: About, Goals, Tasks, People and Wiki |
| Kit | The source a work app is copied from: its code, its modules and its blocks |
| Module | What the sidebar lists, such as Tasks or People. A module is one module file plus one data file, built on a block |
| Block | The reusable thing a module is built from: a screen and a data shape. One block can serve many modules |
| Component | A small interface piece inside a block, such as a button, a table or a sheet. They come from shadcn |
| View | How a datatable module shows its rows: `table` (a table), `task` (a checkbox list) or `goal` (goal cards) |
| Section | A part of Settings. Each module has one, and there is one for Appearance |
| Sidebar | The list of modules on the left of the app, in the order set by each module file |
| Settings | The page that shows each module's name, block, view, data file and fields, which are read-only, and Appearance, where you pick the colour of buttons and charts |

## Data

| Word | Meaning |
|---|---|
| Data file | The one file a module keeps its content in, in `app/data/`. JSON for most modules, Markdoc for About |
| Module file | The `.json` file in `app/src/modules/` that describes a module: its name, block, icon, order and fields |
| Row | One entry in a datatable module, such as one task or one person |
| Row id | A row's fixed name in the file, made once from its name, such as `maya-okafor`. It never changes, even when you rename the row |
| Field | One piece of a row, such as Name, Due or Notes. Each field has a key, a label and a kind |
| Field kind | What a field holds and the control you type it in: `line`, `text`, `lines`, `date`, `status`, `category`, `person`, `number`, `direction`, `period` or `owner` |
| Tab | A group of fields in a row's sheet. Fields on the first tab are the table's columns |
| Sheet | The panel that opens when you click a row. You read and edit the row there |
| Status | Where a piece of work stands: Backlog, In progress, Blocked or Done |
| Type | What kind of work a row is: Project, Deliverable, Task, Request or Followup. In the files it is called `category` |
| Data helper | The one part of the code that reads and writes data files. Screens never touch files directly |
| Conflict | When you save a row that Claude changed since your page loaded. The app refuses your save rather than overwrite Claude's change |
| JSON | The plain-text format of most data and module files: names in quotes, lists in square brackets |
| Markdoc | The format of wiki pages and About: Markdown plus a few safe tags |
| Frontmatter | The lines between `---` at the top of a Markdoc file: `title`, `description`, `order` |
| Callout | A set-off note in a wiki page |

## Building and running

| Word | Meaning |
|---|---|
| Code tab | The part of the Claude desktop app where Claude works on your app's folder |
| Get Code | The button on starta.dev/create that gives you the setup prompt to paste into the Code tab, and the command it runs |
| Dev server | The program that serves your app at http://localhost:9950. Claude starts it and keeps it running |
| localhost | Your own laptop, as a web address. Nothing on it is visible to anyone else |
| Vibe coding | How you build: describe, have Claude build, test, read enough to steer, debug by conversation, checkpoint, iterate, ship |
| Checkpoint | A saved state of your app you can go back to. Claude makes one with git when you ask; a checkpoint button in the app is planned, not built |
| Git | The tool that records every saved version of your files. Claude runs it for you |
| Commit | One checkpoint in git, with a short message saying what changed |
| Diff | The lines that changed between two versions of a file |
| `starta` command | The command Claude runs to make your app (`init`), list, add, remove and update kit modules, and change the look (`apply`) |
| `starta.json` | The file at your app's root where the `starta` command records your kit, modules and blocks |
| `.kit` file | A file `starta update` writes beside one you and the kit both changed, such as `tasks.json.kit`. Claude merges it with you, then deletes it |
| Skill | A written set of instructions that teaches Claude a repeatable job for your app |
| Preset | Your app's look, a theme, a colour, a font and a logo, as a short code such as `fQnA` (the default: Neutral, Grey, Geist, Rocket). You pick it on starta.dev/create, and the `starta` command writes it into your theme |

## Connectors

| Word | Meaning |
|---|---|
| Connector | A link from Claude to one of your tools, such as SharePoint or Jira. Also called an MCP server |
| MCP | The standard way Claude connects to outside tools |
| As of | The date a number or a list was last correct |

## People and roles

| Word | Meaning |
|---|---|
| Owner, operator, builder, end user | The four roles you hold for your own app. See [Owner, operator, builder, end user](/wiki/idea/four-roles) |
| Artifact maker | Where you start: you already make small things with Claude in chat |
| Runner | You start your app, find your way around and change words and data by asking Claude |
| Modifier | You change existing modules and can take a change back |
| Module builder | You design a new module for your own work and have Claude build it on a block |
| Power user | A colleague who has built more. A mentor who reviews and shares, not someone who builds for you |

## Later

These words name parts that are not built yet: **board view**, **links
between tables**, **formulas**, and a **checkpoint and undo button** in the
app.
