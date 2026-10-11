---
title: Fields and views
description: How a datatable module's columns are defined, what each field kind does, and how the table, task and goal views differ.
order: 3
---

A datatable module, such as Tasks, People or an Accounts module of your own, is
defined by its **fields**: the columns it has and the kind of value each one
holds. Its **view** decides whether the rows show as a table or as a checklist.
Both live in the module file, so changing either is a request to Claude, not a
code change.

## A field

Each field is one entry in the module file's `fields` list:

```json
{ "key": "lastContact", "label": "Last contact", "kind": "date", "tab": "Details" }
```

| Part | What it does |
|---|---|
| `key` | Where the value is stored in each row |
| `label` | The column heading and the label in the row's sheet |
| `kind` | The kind of value, which decides the control you type into |
| `hint` | Optional: the grey placeholder that says what belongs there |
| `tab` | Optional: which tab of the row's sheet the field sits on |

The first field is always `name`. It titles the row, and the row's `id` is made
from it. A row with no name is not saved.

## Field kinds

| Kind | Holds | You type into |
|---|---|---|
| `line` | One line of text | A text box |
| `text` | Several lines of prose | A larger text box |
| `lines` | A list, one entry per line | A text box, one entry per line |
| `date` | A calendar date, `YYYY-MM-DD` | A date picker |
| `status` | Backlog, In progress, Blocked or Done | A choice of four |
| `category` | Project, Deliverable, Task, Request or Followup | A choice of five |
| `person` | The id of a row in People | A choice of the people on file |
| `number` | A number, such as `38.4` | A text box |
| `direction` | Which way is better: `up` or `down` | Higher is better or Lower is better |
| `period` | A day, a month or a quarter | A picker with Day, Month and Quarter |
| `owner` | Whose it is: Me, Team or Company | A choice of three |

Every kind is stored as plain text. The kinds differ only in the control you use
and in what is accepted: a `status` that is not one of the four becomes
Backlog, and a `category` that is not one of the five is dropped.

There are no formulas. A field holds what you or Claude put in it.

## Status and category

These two kinds carry meaning the app uses.

**Status** says where a piece of work stands. A row is *open* unless its status
is Done, and *closed* when it is. Rows sort with what needs attention first:
In progress, then Blocked, then Backlog, then Done. Blocked is drawn darkest,
because it is usually waiting on someone else. A new row starts in Backlog.

**Category** says what kind of thing a row is, from biggest to smallest:
Project, Deliverable, Task, Request, Followup. In Tasks the field is labelled
"Type". A new row starts as a Task.

## Tabs: columns and the sheet

Clicking a row opens its **sheet**, a panel where you read and edit every
field. Tabs split the sheet into parts, and they also decide the table's
columns:

- the fields on the **first tab** are the table's columns;
- the fields on other tabs show only in the sheet.

In People, Name, Role, Organisation, How you know them and Last contact are on
the Details tab, so they are the columns. Notes is on its own Note tab, so long
notes stay out of the table and open with the row.

## The two views

| | Table view | Task view |
|---|---|---|
| Looks like | A table, one row per line, one column per first-tab field | A checklist, one line per row with who and when beside it |
| You can | Add, open, edit and delete rows | Add rows, tick a row done, and open it to edit |
| Shows first | Every row, or open rows when there is a status field | Open rows, attention first, then by due date |
| Used by | People | Tasks |

Ticking a row in the task view sets its status to Done. Both views open the
same sheet, and both write through the same path to the data file.

Goals uses a third view, the **goal view**: one card per row, with the value
against the target. It reads `start`, `value`, `target`, `unit`, `direction`
and `due`. A goal shows On track when it is ahead of an even pace from its start
value to its target over the period of its target date, and when it is met. It
shows Off track when it is behind that pace, or when the period has ended and
the target is not met. With no start value, it shows no badge until it is met
or late.

## The bar above the rows

The task view has one switch: **Open, Done, All**, with Open as the default.

The table view's controls follow the module's fields:

- **Open, Closed, All** appears when the module has a status field;
- **type toggles** appear when it has a category field;
- **Sort** is always there, by any field, with blanks last.

The filter and sort are part of the page address, so a narrowed list survives a
reload and the Back button undoes it.

## Worked example

Sam's People module has no field for the person's email. They ask Claude:

"Add an Email column to People, after Organisation, on the Details tab."

Claude adds one entry to the `fields` list in `app/src/modules/people.json`:

```json
{ "key": "email", "label": "Email", "kind": "line", "tab": "Details" }
```

Because it is on the first tab, Email becomes a column. Existing rows show it
empty until Sam fills them in. Next they ask: "Show Tasks as a table instead of a
checklist." Claude changes `"view": "task"` to `"view": "table"` in
`tasks.json`'s module file, and Tasks opens as a table. Neither change touches
code or Sam's data.

## Not built yet

A board view, links between tables other than the `person` field, and formulas
come later. Today the organisation on a person's row, for example, is plain
text.
