---
title: Data files
description: Where your data lives, what a row looks like, and what happens when you and Claude both write.
order: 1
---

All your data lives in plain files in `app/data/`, one file per module. The
screen shows them, Claude edits them, and you can open any of them and read it.
This page covers what is in the files, who writes them, and how the two writers
stay out of each other's way.

## One file per module

| Module | Data file | Format |
|---|---|---|
| Tasks | `tasks.json` | JSON rows |
| People | `people.json` | JSON rows |
| Goals | `goals.json` | JSON rows |
| About | `about.md` | A Markdoc page |
| Wiki | none | Pages in `app/wiki/` instead |

A module you build yourself, such as Accounts, gets its own file:
`accounts.json`. Each module reads only its own file, and a change to one never
touches another. That separation is what makes it safe to add, change or remove
a module.

## What a row looks like

A datatable module (Tasks, People, Goals, or one of your own) keeps its rows in one
list called `items`. Here is a row from Sam's `tasks.json`:

```json
{
  "id": "tallow-renewal-proposal",
  "name": "Send Tallow & Co the renewal proposal",
  "category": "followup",
  "status": "in-progress",
  "person": "maya-okafor",
  "due": "2026-10-14",
  "note": "Two options: same plan for two years, or the larger plan with reporting."
}
```

A few rules hold for every row:

- **Every row has an `id`**, made once from its name when the row is first
  saved. Renaming the row later does not change it, because other rows point at
  it. The `person` above is the id of Maya Okafor's row in People.
- **Every value is plain text.** What you type is what is stored. Dates are
  written `YYYY-MM-DD`.
- **An empty field is left out**, not stored as a blank.
- **Only the module's own fields are kept.** A key the module does not define is
  dropped on save. See [Fields and views](/wiki/how-it-works/fields-and-views).

## About is a page, not rows

`about.md` is a Markdoc page. A short header holds your title, team and
organisation; the rest is your role in a few paragraphs of prose:

```
---
title: Customer success manager
team: Customer Success
organisation: Brightlane
---

The role keeps Brightlane's mid-size customers happy, renewing and growing.
```

Claude fills it by interviewing you. See
[The wiki and About](/wiki/how-it-works/wiki-and-about).

## Two writers

Each file has two writers: you, on screen, and Claude, in the Code tab.

| Writer | Can change |
|---|---|
| You, on screen | Datatable rows only: add, edit, delete, tick done |
| Claude | Every file, including About |

About is read-only on screen. To change it, ask Claude.

A file is always written whole, in one step, so a page never reads a half-written
file.

## When both write at once: conflicts

When the screen loads a module, it notes the file's version. When you save, the
save carries that version with it. If the file changed in between, because
Claude edited it, the save is refused rather than overwriting Claude's change.

You then see a notice like this:

> Tasks changed on disk — Claude, or an editor — since this page loaded, so
> nothing was saved. Reload to see it. Copy anything you want to keep first.

Nothing is lost on disk. Copy what you typed, reload, and enter it again.

The way to avoid it: do not ask Claude to change a module while you have one of
its rows open for editing. Close the row first, then ask.

## The page reloads by itself

Every five seconds, the open page asks the server whether any data file has
changed. If one has, the page reloads its data, so Claude's edits appear without
you pressing anything. While you have a row open for editing, the reload waits
and happens as soon as you close it.

## Worked example

Sam asks Claude: "Mark the Harbourline security review task as done and set
Daniel Reyes's last contact to today." Claude edits two files, `tasks.json` and
`people.json`. A few seconds later, Tasks shows the task ticked off, and People
shows the new date on Daniel's row. If Sam had had Daniel's row open at that
moment, the page would have waited, and their own save would have been refused
as a conflict.

## Your data is yours

The files hold fictional example data until you replace it with your own. They
are plain text, so you can ask Claude to read them back to you, search them, or
bring in rows from Excel. Saving a checkpoint you can go back to is something
you ask Claude to do with git; a checkpoint button in the app is planned, not
built.
