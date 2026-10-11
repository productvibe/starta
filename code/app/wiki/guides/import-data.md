---
title: Bring in data
description: Turn a spreadsheet, CSV file, email or your notes into rows in a module.
order: 2
---

Claude can turn a list you already have into rows in Tasks, People, Goals or
a module of your own. You give it the source, say which module the rows go to,
and check a preview before anything is written. This guide covers Excel, CSV,
email and notes.

## Before you start

- Know the module the rows go to, and its columns. Settings shows each
  module's fields.
- Close any open row sheet in that module. If you are editing a row while
  Claude writes the file, your save is refused as a conflict.
- Decide what to do with rows that already exist: add to them, or replace
  them.

## Steps

### 1. Give Claude the source

| Source | How to give it |
|---|---|
| Excel file | Put the file in your app's folder, or tell Claude where it is: "The file is in Downloads, called customer-contacts.xlsx." If Claude has trouble reading it, save it as CSV from Excel and try again. |
| CSV file | The same as Excel. |
| Email | Copy the text of the email and paste it into the Code tab. |
| Notes | Paste them, or point Claude to the file. |
| A table in a document | Copy the table and paste it. |

### 2. Ask for a preview, not a write

"Read customer-contacts.xlsx and turn each row into a row for People. Map
Contact person to Name, Title to Role and Company to Organisation. Show me the
first five rows as a table, and tell me which columns you could not place. Do
not write anything yet."

Sam had a handover sheet from the previous customer success manager with 40
contacts. The preview showed that the sheet had a Phone column that People
does not have, and two contacts with no company.

### 3. Settle what does not fit

Answer each question Claude raises. Typical ones:

- **A column with no home.** Leave it out, put it in Notes, or add a column
  first ([Change a column](/wiki/guides/columns)).
- **Missing values.** Leave them empty, or fill them later.
- **Duplicates.** "If a person is already in People, update their row instead
  of adding a second one."

Sam said: "Put the phone number at the end of Notes. Leave the company empty
for the two contacts without one."

### 4. Write the rows

"Write them to People now. Add them to the existing rows."

The People page reloads by itself within a few seconds once the file
changes.

## The rules Claude follows

Claude knows these rules, but they explain what you see:

| Rule | What it means for your data |
|---|---|
| Every row has an `id` made from its name | "Maya Okafor" becomes `maya-okafor`. Two rows with the same name get `-2` on the second. |
| Dates are `YYYY-MM-DD` | "5 Oct" from an email becomes `2026-10-05`. Check the year. |
| Status is one of backlog, in-progress, blocked, done | Anything else becomes backlog. |
| Type (category) is one of project, deliverable, task, request, followup | Anything else is left empty. |
| Person in Tasks points to a People row | A task for "Maya" links only when Maya is in People. Add people first, tasks second. |

## From an email to tasks

For a long email thread, ask for the actions, not the text:

"Here is an email from Maya Okafor at Tallow & Co. List the things I have to
do, each with a due date if the email gives one, as a preview for Tasks.
Link each to Maya in People."

Keep the summary and the action. Your app is not a copy of your mailbox: the
full message stays in your mailbox.

## What to check

- The row count matches the source: "How many rows did you write, and how
  many did you skip?"
- Open three rows at random and compare them with the source.
- Dates, statuses and the Person links show as you expect.
- Nothing you already had has gone. If it has, see
  [Review a change](/wiki/guides/review-a-change).

## Common problems

| Problem | What to do |
|---|---|
| "Changed on disk — reload" when you save a row | Claude wrote the file while you had a row open. Copy what you typed, reload the page, and enter it again. |
| Every Person cell is empty in Tasks | The names did not match People rows. Ask: "Link each task to the right person in People by name, and list any you could not match." |
| Dates show the wrong year | Ask Claude to fix them: "Every due date in the rows you added should be in 2026." |
| Accents look wrong (Ã¸ instead of ø) | The CSV was saved in another encoding. Ask: "Read the file as Windows-1252 and write the rows again." |
| Too many rows to check | Import 10 first, check them, then the rest. |

{% callout title="Your data stays on your laptop" %}
The rows go into a data file in your app's folder, such as
`app/data/people.json`. Bring in only what you need for your work.
{% /callout %}
