---
title: Taking a newer kit
description: How Claude brings a newer version of the kit into your app while keeping your own changes.
order: 7
---

Your app started as a copy of the kit: the shell, the blocks and the modules.
From then on the code is yours, so fixes and new features in the kit do not
reach you by themselves. When you want them, Claude runs `starta update`. It
replaces only the files you never changed, keeps the ones you did, and asks
you to decide where both sides changed the same file.

## When you need it

- A colleague or mentor says the kit has a fix you want, such as a better
  table or a new icon.
- You want a module the kit has added since you started. That is a different
  job: ask "Which modules can I add?" and Claude runs `starta list` and
  `starta add`.
- Something is broken and the fix is known to be in a newer kit.

You do not need to take every update. Your app keeps working as it is.

## How it works

When your app was set up, a file called `starta.json` at its top recorded where
the kit came from, which version, which modules and blocks you have, and a
fingerprint of every code file it copied. That fingerprint is how the update
tells your changes from the kit's.

For each code file:

| Your file | The kit's file | What happens |
|---|---|---|
| Unchanged | Changed | Replaced with the kit's version |
| Changed | Unchanged | Kept as yours |
| Changed | Changed | Kept as yours; the kit's version is written beside it as `<file>.kit` |
| Deleted by you | Any | Left deleted, and listed |
| None | New | Copied in |
| Unchanged | Gone from the kit | Deleted |
| Changed | Gone from the kit | Kept, and listed |

What it never touches: your data files in `app/data/` and your wiki pages in
`app/wiki/`. Those are yours from the start. This also
means new wiki pages in the kit do not arrive with an update.

Your theme is redrawn from the look your app was made with: its preset code,
such as `fQnA`, kept in `starta.json`. If you changed the theme, yours is kept
and the preset's is written beside it as a `.kit` file.

## The `.kit` files

A `.kit` file is the kit's version of a file you also changed. Claude reads
both, tells you what each side changed in plain words, and proposes a merge
that keeps your change and takes the kit's fix. You decide. Then Claude
deletes the `.kit` file. Do not leave `.kit` files lying around: they are a
sign of a merge not finished.

## Example

Sam changed the datatable's row sheet so Accounts says "New account". A
newer kit fixes how dates show in tables. They ask:

"Save a checkpoint, then show me what a kit update would change, without
changing anything."

Claude saves the checkpoint and runs the update as a dry run. It lists two
files to replace, one new icon, and one file changed on both sides: the row
sheet. Sam says "Go ahead." Claude updates, then explains the `.kit` file: the
kit changed the date picker in the same file where Sam set the word for a row.
It merges both changes, deletes the `.kit` file, runs the checks and opens
Tasks, People and Accounts. Sam checks all three and asks for a checkpoint.

## What to ask Claude

- "Which version of the kit is my app on?"
- "Show me what a kit update would change, without changing anything."
- "Save a checkpoint, then update to the newer kit."
- "Update to the kit version tagged …" (when you are told a version)
- "List every .kit file and explain each one in plain words."
- "Merge this .kit file: keep my change, take the kit's fix."

## Pitfalls

{% callout title="Checkpoint first" %}
An update changes many files at once. Save a checkpoint before it, so one
request takes you back ([Checkpoints and undo](/wiki/advanced/checkpoints)).
{% /callout %}

- **Your changed files miss the kit's fixes** until you merge them. The more
  block files you change, the more there is to merge
  ([Changing a block](/wiki/advanced/changing-a-block)).
- **A file you deleted stays deleted.** If you want it back, ask Claude to
  restore it from the kit.
- **Removing a module leaves its packages.** `starta remove` keeps the module's
  data file and may leave the block's npm packages in the app. This does no
  harm.
- **Check every module after an update**, not only the one you care about.
