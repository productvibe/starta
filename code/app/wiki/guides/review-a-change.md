---
title: Review a change
description: Read what Claude changed, in plain words and on screen, before you keep it.
order: 8
---

Before you keep a change, look at what Claude did. You do not need to read
code for this. Ask Claude to list what it changed, check the result on
screen, and then keep it, change it, or take it back. This guide shows how.

## Why review

You own the app, so you decide what stays. A review catches the common
slips early: a change in the wrong module, rows that went missing, or more
changed than you asked for. It also teaches you, a little at a time, how
your app is put together.

## Steps

### 1. Ask what changed

"What did you change? List each file and say in one line what changed in it."

A good answer is short:

| File | Change |
|---|---|
| `app/src/modules/people.json` | Added the field Customer after Organisation |
| `app/data/people.json` | Filled Customer for 9 of 12 rows |

If a file is on the list that you did not expect, ask about it: "Why did you
change `rows.tsx`? I asked for a data change only."

### 2. Look at the lines, if you want to

"Show me the lines you changed in people.json, before and after."

Claude shows the old lines and the new ones. For a module file or a data
file, you can read these: they are names and values. For code, ask Claude to
explain instead: "Explain the change in rows.tsx in two lines, without code."

### 3. Check it on screen

Open the module and look for three things:

- **The change you asked for** is there and looks right.
- **Nothing else moved.** The other columns, rows and modules look as they
  did.
- **It works.** Add or edit a test row if the change touches the table, then
  remove the test row.

### 4. Decide

| Decision | Ask Claude |
|---|---|
| Keep it | "Save a checkpoint called 'Customer column in People'." |
| Change it | "Keep the column, but put it after Role." |
| Take it back | "Take back the Customer column change. Leave everything else." |

{% callout title="Checkpoints use git" %}
There is no checkpoint or undo button in the app yet. Claude saves
checkpoints and takes changes back with git, a tool that keeps the history of
your app's folder. If your folder does not use git yet, ask Claude to set it
up. [Checkpoints](/wiki/advanced/checkpoints) explains how it works.
{% /callout %}

## Worked example

Sam asked Claude to fill a new Customer column in People from the
Organisation column. Then they asked:

"What did you change? List each file with one line per change."

Claude listed two files: the People module file and `people.json`. Sam asked
to see the data lines for Priya Nair, because Priya works at Brightlane and is
not a customer. Claude showed that Priya's row had Customer set to
"Brightlane".

"Brightlane is our own company, not a customer. Clear Customer for anyone at
Brightlane."

They checked People again, saw the column right, and said: "Save a checkpoint
called 'Customer column in People'."

## Questions worth asking

- "Did you change any code, or only module and data files?"
- "How many rows are in people.json now, and how many were there before?"
- "Is there anything you changed that I will not see on screen?"
- "What would break if I took this change back?"
- "Show me every change since my last checkpoint."

## What to check before you keep it

- The list of changed files matches what you asked for.
- The row count in each data file you care about is what you expect.
- Every module in the sidebar still opens.
- If Claude changed code, it says the app's checks passed. Claude runs a
  typecheck, lint and build after a code change; ask "Did the checks pass?"

## Common problems

| Problem | What to do |
|---|---|
| Claude cannot show what changed | The folder may not use git yet. Ask Claude to set it up and save a first checkpoint now; later changes can then be shown. |
| The list of changes is long | Ask for a summary by module: "Group the changes by module, one line each." |
| You kept a change and regret it | Ask: "Take back the Customer column change from this morning." With checkpoints, Claude can find it. |
| You edited rows on screen since the last checkpoint | Your edits show as changes too. Save a checkpoint before you ask Claude for a change, so the next review shows only Claude's. |
