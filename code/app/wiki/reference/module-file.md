---
title: The module file
description: Every key of a module file, every field kind, the status and type values and the icons, with a full example.
order: 4
---

A module is one file in `app/src/modules/`, named `<id>.json`, plus one data
file in `app/data/`. The sidebar entry, the page and the Settings section all
come from the module file, so adding the file adds the module and deleting it
removes the module. This page is the full format. You do not write these files
yourself; it helps to read them when you check what Claude made.

## Keys

| Key | Holds | Required | Example |
|---|---|---|---|
| `id` | The module's web address and its name in files; lower case, words joined by `-` | Yes | `"accounts"` → `/accounts` |
| `title` | The name in the sidebar and in Settings | Yes | `"Accounts"` |
| `block` | The block it is built on | Yes | `"datatable"` |
| `view` | For a datatable only: `"table"`, `"task"` or `"goal"` | Datatable | `"table"` |
| `icon` | The sidebar mark, by name (see Icons below) | Yes | `"users"` |
| `file` | Its data file in `app/data/`; the wiki has none | All but Wiki | `"accounts.json"` |
| `order` | Its place in the sidebar, lowest first | Yes | `25` |
| `purpose` | One line on what it holds, shown in Settings | Yes | `"The customer accounts I look after."` |
| `fields` | For a datatable only: its fields, in the order the sheet shows them | Datatable | see below |

A module whose `block` is not installed is left out of the sidebar rather than
breaking the app. The kit's orders run from 10 to 70, with About at 70, so a
number such as 25 places a module between People and Goals.

## Fields

A field is `{ "key", "label", "kind", "hint"?, "tab"? }`.

| Part | Holds |
|---|---|
| `key` | Where the value sits in a row in the data file, such as `"lastContact"` |
| `label` | The column header and the label in the sheet |
| `kind` | The control you type in and what is stored (table below) |
| `hint` | Grey placeholder text in the sheet, saying what belongs there |
| `tab` | The tab of the sheet the field sits on |

Rules:

- The first field is `name`. A row without a name is not saved.
- Fields on the first tab are the table's columns. Fields on later tabs show
  only in the row's sheet. With no tabs at all, every field is a column.
- When you save a row on screen, keys that no field names are dropped.

## Field kinds

Every value is stored as plain text, except `lines`, which is a list.

| Kind | Control | Stored as | Example value |
|---|---|---|---|
| `line` | One line of text | A string; line breaks collapse to spaces | `"Head of operations"` |
| `text` | Several lines | A string, kept as typed | `"Prefers the numbers a day before the meeting."` |
| `lines` | A list, one entry per line | A list of strings; blank lines drop out | `["Reporting", "Single sign-on"]` |
| `date` | A date picker | `"YYYY-MM-DD"` | `"2026-10-07"` |
| `status` | A choice of four | One status id; anything else becomes `backlog` | `"in-progress"` |
| `category` | A choice of five | One type id; anything else is dropped | `"followup"` |
| `person` | A choice from People | A People row id | `"maya-okafor"` |
| `number` | A text box | A string; a comma reads as a decimal point | `"38.4"` |
| `direction` | Higher is better or Lower is better | `"up"` or `"down"`; blank reads as up | `"down"` |
| `period` | A picker: Day, Month or Quarter | `"YYYY-MM-DD"`, `"YYYY-MM"` or `"YYYY-Q1"` to `"YYYY-Q4"` | `"2026-Q4"` |
| `owner` | A choice of Me, Team or Company | `"me"`, `"team"` or `"company"`; anything else is dropped | `"team"` |

An empty field is left out of the row, not stored as `""`. Sorting works on
every kind except `text` and `lines`.

## Status values

| Stored | Shown | Sort order | Open or closed |
|---|---|---|---|
| `in-progress` | In progress | 1st | Open |
| `blocked` | Blocked | 2nd | Open |
| `backlog` | Backlog | 3rd | Open |
| `done` | Done | 4th | Closed |

A new row starts at `backlog`. Blocked is the darkest pill, so it stands out;
Done is the lightest.

## Type values (`category`)

| Stored | Shown |
|---|---|
| `project` | Project |
| `deliverable` | Deliverable |
| `task` | Task |
| `request` | Request |
| `followup` | Followup |

A new row starts as `task`. The set is fixed; a new type means a code change.

## Row ids

Every row has an `id`, made once from its name when it is first saved: lower
case, accents removed, anything else turned into `-`, at most 48 characters. If
the id is taken, a number is added: `tallow-co-2`. The id never changes, even
when you rename the row, because other rows point at it: a task's `person`
holds a People row id.

## Icons

| `icon` name | Mark |
|---|---|
| `book` | An open book with text (Wiki) |
| `chart` | A bar chart |
| `compass` | A compass (About) |
| `layers` | Stacked layers (Tasks) |
| `presentation` | A presentation board |
| `target` | A target (Goals) |
| `users` | Two people (People) |

Any other name shows a pilcrow mark (¶) instead of failing. To use a new icon,
ask Claude to add it to `app/src/lib/module-icons.ts`; that is a small code
change.

## Full example: Accounts

Sam's first module. The module file, `app/src/modules/accounts.json`:

```json
{
  "id": "accounts",
  "title": "Accounts",
  "block": "datatable",
  "view": "table",
  "icon": "layers",
  "file": "accounts.json",
  "order": 25,
  "purpose": "The customer accounts I look after, and where each one stands.",
  "fields": [
    { "key": "name", "label": "Account", "kind": "line", "tab": "Details" },
    { "key": "plan", "label": "Plan", "kind": "line", "tab": "Details" },
    { "key": "renewal", "label": "Renewal date", "kind": "date", "tab": "Details" },
    { "key": "health", "label": "Health", "kind": "line", "hint": "Green, amber or red", "tab": "Details" },
    { "key": "contact", "label": "Main contact", "kind": "person", "tab": "Details" },
    { "key": "note", "label": "Notes", "kind": "text", "hint": "What to know before the next call", "tab": "Note" }
  ]
}
```

The data file, `app/data/accounts.json`:

```json
{
  "items": [
    {
      "id": "tallow-co",
      "name": "Tallow & Co",
      "plan": "Business",
      "renewal": "2026-11-30",
      "health": "Amber",
      "contact": "maya-okafor",
      "note": "Wants the renewal proposal a week before the business review."
    },
    {
      "id": "harbourline-logistics",
      "name": "Harbourline Logistics",
      "plan": "Business",
      "renewal": "2027-03-31",
      "health": "Amber",
      "contact": "daniel-reyes"
    },
    {
      "id": "fernwood-studio",
      "name": "Fernwood Studio",
      "plan": "Starter",
      "health": "Green"
    }
  ]
}
```

Result: Accounts appears in the sidebar between People and Goals, with five
columns (the Details tab) and the notes behind each row's click. To have
Claude make it, see [Build your first module](/wiki/learn/first-module).
