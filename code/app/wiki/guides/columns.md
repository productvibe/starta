---
title: Change a column
description: Add, rename, reorder or remove a column in Tasks, People, Goals or a module of your own.
order: 3
---

A column is a field in the module's file, and Claude changes that file when
you ask. This guide covers the four changes you will want most: add, rename,
reorder and remove. None of them needs new code.

## Where a column lives

Each datatable module has a module file, such as `app/src/modules/people.json`.
Its `fields` list holds one entry per field:

```json
{ "key": "lastContact", "label": "Last contact", "kind": "date", "tab": "Details" }
```

| Part | What it does |
|---|---|
| `label` | The name you see on screen |
| `key` | The name in the data file. Each row stores its value under this key |
| `kind` | How the value is typed in: `line`, `text`, `lines`, `date`, `status`, `category`, `person`, `number`, `direction`, `period` or `owner` |
| `tab` | Which tab of the row's sheet it shows on. Fields on the first tab are the table's columns; the rest show only in the sheet |
| `hint` | An optional line of help under the field |

The order of the list is the order on screen. The first field is always
`name`. [Fields and views](/wiki/how-it-works/fields-and-views) explains the
kinds in full.

## Add a column

"In People, add a column called Customer after Organisation. Kind: line. Leave it
empty for every row."

Say the kind when you know it. If you do not, describe the value: "a date",
"a long note", "one of the people in People". Claude picks the kind and tells
you which.

To put a field in the sheet only, not in the table: "Put it on the Note tab,
not in the table."

## Rename a column

"In People, rename the column 'How you know them' to 'Context'."

A rename changes the `label`. Your data does not move. If you also want the
`key` changed, say so: "Change the key too, and update every row." Claude
must then rename the key in every row of the data file, or the values stop
showing.

## Reorder columns

"In Tasks, show Due before Person."

Claude moves the field in the list. Nothing else changes.

## Remove a column

"In People, remove the Last contact column. Tell me how many rows have a
value in it first."

Decide what happens to the values already stored:

| Choice | What happens |
|---|---|
| Remove the values too | Claude deletes the key from every row. Clean, but the values are gone unless you saved a checkpoint. |
| Keep the values in the file | The column goes from the screen, but the next time you save a row on screen, its value for that field is dropped. |
| Move them | "Add the last contact date to the end of Notes, then remove the column." |

To hide a field from the table but keep it, move it to another tab instead of
removing it.

## Worked example: Sam's Customer column

Sam's People table listed contacts at Tallow & Co and Harbourline Logistics,
but Organisation held both customers and colleagues at Brightlane. They wanted
a column for the customer alone.

1. "In People, add a column called Customer after Organisation, kind line."
2. They checked People: a new empty column.
3. "Fill Customer from Organisation for every row where Organisation is a
   customer. Show me the list first."
4. They checked the preview, then said "Write it."

## What to check

- The column shows in the place you asked for, with the right name.
- Open one row's sheet: the field is on the tab you expect.
- Add a test value on screen and save it. Delete the test value after.
- Existing values still show in the columns you did not touch.

## Common problems

| Problem | What to do |
|---|---|
| A column is empty after a rename | The key changed but the rows did not. Ask: "The Context column is empty since the rename. Fix the rows." |
| The new column is in the sheet, not the table | It is on another tab. Ask Claude to move it to the first tab. |
| A date column will not take your date | Type it as `YYYY-MM-DD`, such as `2026-10-14`. |
| A status shows as Backlog after you typed something else | Status takes only backlog, in-progress, blocked or done. |
| "Changed on disk — reload" when you save | Claude changed the file while your sheet was open. Copy what you typed and reload. |

{% callout title="Many columns at once" %}
Change one column, check it, then the next. If a change goes wrong, ask
Claude to take back that one change. See
[Review a change](/wiki/guides/review-a-change).
{% /callout %}
