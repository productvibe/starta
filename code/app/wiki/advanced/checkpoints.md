---
title: Checkpoints and undo
description: How to save a point you can go back to, and how to go back, by asking Claude to use git.
order: 1
---

A checkpoint is a saved copy of your whole app at one moment: code, module
files, data and wiki. Undo means going back to a checkpoint. A checkpoint and
undo button inside the app is planned, not built. Today Claude does both for
you with git, a tool that records versions of a folder. You never touch git yourself; you ask in plain
words.

## When you need it

- **Before a change you are not sure about**, such as a new module, a new
  column or a change to a block.
- **After something works**, so you can always come back to a good state.
- **When a change went wrong** and you would rather go back than fix it.
- **Before taking a newer kit** ([Taking a newer kit](/wiki/advanced/kit-updates)).

A good habit: one checkpoint before each change, one after it works.

## How it works in your app

- **Git is not set up at first.** Setting up an app does not turn git on. The
  first time you ask for a checkpoint, Claude checks and, if needed, sets git
  up and saves a first checkpoint of everything as it is.
- **A checkpoint is a commit.** Claude saves every changed file with a short
  message you can read later, such as "Add Accounts module".
- **Data is included.** Your data files in `app/data/` (`tasks.json`,
  `people.json`, `about.md` and the rest) and your wiki pages are saved with
  the code. Going back restores your data too.
- **Some files are left out on purpose.** The app's `.gitignore` file tells
  git to skip installed packages, build output and `.env` files, which can
  hold passwords. Those are rebuilt or kept on your laptop only.
- **It stays on your laptop.** Nothing is sent anywhere. A checkpoint is not
  a backup to another machine.

## What to ask Claude

| You want to | Ask |
|---|---|
| Save a checkpoint | "Save a checkpoint called 'before Accounts'." |
| See your checkpoints | "List my last ten checkpoints with their dates." |
| See what changed | "What has changed since the last checkpoint, in plain words?" |
| Undo everything since the last checkpoint | "Undo everything since the last checkpoint." |
| Undo one file only | "Put the People module file back as it was at the last checkpoint, and leave everything else." |
| Go back further | "Go back to the checkpoint 'before Accounts'." |
| Keep data while undoing code | "Go back to the checkpoint 'before Accounts', but keep tasks.json and people.json as they are now." |

Claude tells you what it is about to restore before it does it. Read that
list.

## Example

Sam wants an Accounts module. Before they ask for it, they say: "Save a
checkpoint called 'before Accounts'." Claude finds no git folder, sets one up,
and saves the app as it is.

Sam builds Accounts, then asks Claude to change how the table looks. The
change breaks the page. They ask: "Go back to the checkpoint 'before
Accounts'." Claude warns them that this also removes the three accounts they
typed in since, and the two tasks they ticked off. Sam changes their mind: "Undo
only the code change, and keep my data files as they are now." Claude restores
the code and leaves `app/data/` alone. The page works again, with their rows.

## Pitfalls

{% callout title="Going back restores data too" %}
Rows you added, edited or ticked on screen after a checkpoint are lost when
you go back to it, unless you ask Claude to keep the data files. Ask "What
will I lose?" before you go back.
{% /callout %}

- **No checkpoint, no undo.** Changes made before the first checkpoint cannot
  be undone this way. Ask for the first one early.
- **Vague names are hard to find later.** Name a checkpoint for what comes
  next or what you finished: "before Accounts", "Accounts works".
- **Undo is not a fix.** If the same change keeps breaking, go back once,
  then describe the problem to Claude instead (see
  [When something breaks](/wiki/guides/fix-problems)).
- **Close open edits first.** If a row's sheet is open on screen while Claude
  restores its data file, your save is refused as a conflict. Close the sheet,
  then reload the page.
- **Do not paste passwords into data files.** Data files are saved in every
  checkpoint. Keep secrets in a `.env` file, which git skips.

To check a change before you keep it, see
[Read what Claude changed](/wiki/guides/review-a-change).
