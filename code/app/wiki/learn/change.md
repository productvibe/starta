---
title: "Lesson 6: Change a module"
description: Add a column, switch a view, rename and reorder a module, save a checkpoint with git and take one change back.
order: 7
---

In this lesson you stop changing what is in a module and start changing the module itself. You add a column, switch a view, rename and move a module, save a checkpoint and undo a change. Time: 9 minutes.

## Goal

You can change how a module looks by asking Claude, and you can get back to a version that worked.

## Why it matters

This is where you become a modifier. The app came as a starting point, not a finished product, and it only fits your job once you change it. A checkpoint makes that safe: whatever you try, you can return to the last version that worked. Once you trust that, you try more.

## Steps

Keep the app open in your browser beside the Code tab, so you see each change land.

1. **Save a checkpoint.** Type:

   "Save a checkpoint of my app now, called 'Before my first changes'. If the folder is not set up for checkpoints yet, set it up first and tell me what you did."

2. **Add a column.** Type:

   "Add a Region column to People, after Organisation, for the region a person works in. Make it a short line of text."

   Open People. The new column is there and empty. Open a person, fill in their region and save.

3. **Switch a view.** Type:

   "Show Tasks as a table instead of a task list."

   Open Tasks. Your tasks are now rows in a table with sortable columns, like People. Compare the two. Then choose the one you prefer and tell Claude: "Switch Tasks back to the task view," or "Keep it as a table."

4. **Move a module.** Type:

   "Put People above Tasks in the sidebar."

   Watch the sidebar change order.

5. **Rename a module, then undo it.** Type:

   "Rename the People module to Contacts."

   The sidebar now says Contacts. Now undo it:

   "Undo the last change."

   The sidebar says People again. You have undone a change.

6. **Save a second checkpoint.** Type: "Save a checkpoint called 'Region column and new order'."
7. **Ask what changed.** Type: "Show me what changed in the People module file since my first checkpoint, and explain each line."

## What you see

| You asked for | What changed on screen |
|---|---|
| A Region column | A new column in People, and a new field in each person's sheet |
| Tasks as a table | Tasks shows rows and columns instead of a list you tick |
| People above Tasks | The sidebar order |
| Rename, then undo | Contacts in the sidebar, then People again |

The People page in Settings now lists Region among its fields. Your data was not touched: every person you added is still there.

{% callout title="Checkpoints today, and later" %}
A checkpoint and undo button inside the app is planned, not built. Today a checkpoint is a version Claude saves with git, a tool that keeps every saved version of your folder, and undo means Claude puts files back from that history. A new app does not use git until Claude sets it up at your first checkpoint. You ask in words, as above. See [Checkpoints and undo](/wiki/advanced/checkpoints) for how it works and how to go back further than one step.
{% /callout %}

## One change at a time

Ask for one change, look at it, then ask for the next. If you ask for five at once and one is wrong, it is hard to tell which. When a change does not look right, describe what you see: "The Region column is at the end, not after Organisation." See [How to ask Claude](/wiki/guides/ask-claude).

## You are done when

- People has a Region column, and at least one person has a region filled in.
- You have seen Tasks as a table and chosen the view you want.
- The sidebar is in the order you want.
- You renamed a module and undid it.
- You have two checkpoints.

## What changed on disk

| File | What happened |
|---|---|
| `app/src/modules/people.json` | A new `region` field; a new `order`, which sets its place in the sidebar |
| `app/src/modules/tasks.json` | `view` changed from `task` to `table`, if you kept the table; a new `order` |
| `app/data/people.json` | The region you typed on screen |
| `.git/` | A hidden folder where your checkpoints are kept, created by Claude at the first checkpoint |

Every change in this lesson was a change to a module file, not to code. A module file is a short list of settings: its name, its block, its view and its fields. That is why Claude could make each change in seconds. The format is in [The module file](/wiki/reference/module-file), and more recipes are in [Columns](/wiki/guides/columns) and [Manage modules](/wiki/guides/manage-modules).

## Sam's changes

Sam saved a checkpoint, then added Region to People and filled in UK for Maya Okafor. Sam tried Tasks as a table, preferred the task list, and switched it back. Then Sam renamed People to Contacts, did not like it, and said "Undo the last change." Seeing the sidebar go back was the moment Sam started to try things without worrying.

Next: [Lesson 7: Build your first module](/wiki/learn/first-module).
