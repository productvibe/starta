---
title: Many modules on one block
description: How one block serves several modules, each with its own name, fields and data file, and no new code.
order: 2
---

A block is a screen and a data shape. A module is one use of that screen, with
its own name and its own data. Tasks and People already show this: both are
built on the datatable block, Tasks in the task view and People in the table
view. You can add as many more as your work needs, such as Accounts, Hiring or
a meeting log. Each new one is one module file and one data file. No code.

Lesson 7 builds your first one ([Build your first module](/wiki/learn/first-module)).
This article explains what is going on, so you can design the second, third
and tenth yourself.

## When you need it

- You keep a list in Excel or in your notes that you update every week.
- The list has the same few facts for every row: a name, a status, a date, a
  person.
- It has no other home. If the list already lives in a system of record, such
  as a CRM or Jira, read it from there instead of copying it.

## How it works in your app

Two files make a module:

| File | Holds | Example |
|---|---|---|
| `app/src/modules/<id>.json` | The name, block, view, icon, sidebar order, purpose and fields | `accounts.json` |
| `app/data/<id>.json` | The rows, as `{ "items": [...] }` | `accounts.json` |

The app finds its modules by reading the modules folder. A new module file gives you a
sidebar entry, a page at `/<id>` and a page in Settings, all from that file.
The block's code is shared: a fix to the datatable reaches every module on it.

The parts of a module file you choose:

- **`view`**: `table` for a reference list (People), `task` for a list you
  tick off (Tasks), `goal` for goal cards against targets (Goals).
- **`fields`**: the columns. Each has a `key`, a `label` and a `kind`: `line`,
  `text`, `lines`, `date`, `status`, `category`, `person`, `number`,
  `direction`, `period` or `owner`. A `person` field
  points at a row in People, so People must be in your app.
- **`tab`**: fields on the first tab are the table's columns; fields on other
  tabs show only when you open a row.
- **`order`**: its place in the sidebar, lowest first.
- **`icon`**: one of the names the app knows (`book`, `chart`, `compass`,
  `layers`, `presentation`, `target`, `users`). Another name shows a default
  mark.

The full format is in [The module file](/wiki/reference/module-file).

## Example

Sam has Accounts. Now they want a list of the onboarding steps for each new
customer. They ask:

"Add a module called Onboarding on the datatable block, in the task view. Fields:
step name, account, status, owner (a person), due date, and a note on a second
tab. Put it under Tasks in the sidebar."

Claude writes `app/src/modules/onboarding.json` and `app/data/onboarding.json`
with an empty list. Onboarding appears in the sidebar. Sam adds the first
steps for Fernwood Studio on screen, and ticks one off.

## What to ask Claude

- "Which modules use the datatable block?"
- "Add a module called Hiring on the datatable block, in the table view, with
  these columns: …"
- "Show me the module file for Accounts and explain each field in one line."
- "Copy the fields of People into a new module called Contacts at Tallow & Co,
  with an empty data file."

## Pitfalls

- **One data file per module.** Never point two modules at the same data file.
  Each module writes its whole file, so one would overwrite the other.
- **The `id` is the address.** Changing it changes the URL and the data file
  name. Ask Claude to rename the title instead, unless you mean to move it.
- **Removing the module file keeps the data.** The rows stay in `app/data/`
  until you ask Claude to delete them.
- **A change to the block changes every module on it.** If Accounts needs
  something Tasks does not, see [Changing a block](/wiki/advanced/changing-a-block)
  first.
- **No links between tables yet.** A field cannot point at an Accounts row the
  way a `person` field points at People. Use a `line` field with the account's
  name for now.

{% callout title="Not built yet" %}
There is no command that copies a kit module under a new name. Claude writes
the module file for you instead.
{% /callout %}
