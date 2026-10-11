---
title: Manage modules
description: Rename a module, move it in the sidebar, change its icon or view, or take it out.
order: 4
---

The sidebar is built from your module files, one file per module in
`app/src/modules/`. To rename, reorder or remove a module, Claude changes or
deletes that file. Your data file stays where it is unless you say otherwise.

## What a module file controls

| Key | What you see | Example |
|---|---|---|
| `title` | The name in the sidebar and on the page | `"People"` |
| `order` | The place in the sidebar, lowest first | `20` |
| `icon` | The mark beside the name | `"users"` |
| `view` | For Tasks, People, Goals and your own tables: `table`, `task` or `goal` | `"table"` |
| `purpose` | The line under the module's name in Settings | `"Who you work with…"` |
| `id` | The web address, such as `/people` | `"people"` |
| `file` | The data file in `app/data/` | `"people.json"` |

Settings shows these facts for each module. A module's section is read-only:
you change a module by asking Claude.

## Rename a module

"Rename the People module to Contacts in the sidebar. Keep its web address and
data file as they are."

This changes `title` only. The address stays `/people` and the data stays in
`people.json`, so nothing else breaks. Ask for a new address only if it
matters to you; Claude then changes the `id` and checks that nothing else
points to the old one.

## Reorder the sidebar

The starting order is:

| Module | Order |
|---|---|
| Tasks | 10 |
| People | 20 |
| Goals | 35 |
| Wiki | 60 |
| About | 70 |

The gaps of ten leave room for your own modules.

"Put Accounts between Tasks and People in the sidebar."

Claude gives Accounts an order of 15. The page you open at
http://localhost:9950 is the first module in the sidebar.

## Change the icon or the view

"Give Accounts the layers icon." The icons the app knows are `book`, `chart`,
`compass`, `layers`, `presentation`, `target` and `users`. A name it does not
know shows a plain default mark.

"Show People as a task list instead of a table." This switches `view` between
`table` and `task`. [Fields and views](/wiki/how-it-works/fields-and-views)
explains the difference.

## Take a module out

There is no hide switch yet. To take a module out of the sidebar, Claude
removes its module file and keeps the data file.

- **A kit module** (Goals, Tasks or People): "Remove the
  Goals module. Keep its data file." Claude runs the kit's remove command,
  which deletes the module and keeps `goals.json`. To bring it back later:
  "Add the Goals module again."
- **A module you built** (such as Accounts): "Remove the Accounts module from
  the sidebar. Keep `accounts.json` so I can bring it back." To bring it back,
  Claude writes the module file again.
- **Wiki and About** are part of how the app works. Keep them.

To delete the data too, say so, and save a checkpoint first: see
[Checkpoints](/wiki/advanced/checkpoints).

## Worked example

Sam used Tasks every hour and People once a day, and they had built
Accounts. They wanted Accounts second and People renamed to Contacts.

1. "Put Accounts second in the sidebar, after Tasks." They checked the
   sidebar.
2. "Rename People to Contacts in the sidebar. Keep the web address." They
   checked that their contacts and their tasks' Person links still showed.
3. "Give Accounts the layers icon."

Three small changes, each checked before the next.

## What to check

- The sidebar shows the module with the new name, place or icon.
- Open the module: your rows are all there.
- Open Settings: the module's facts match what you asked for.
- After a removal, the data file is still in `app/data/`. Ask: "Is
  accounts.json still there, and how many rows does it have?"

## Common problems

| Problem | What to do |
|---|---|
| A module is gone from the sidebar after a change | Its block may not be installed, or the module file has a mistake. Ask: "Accounts is missing from the sidebar. Find out why." |
| The page shows 404 after a rename | The `id` changed, so the old address no longer exists. Open the module from the sidebar, or ask Claude to change the `id` back. |
| Tasks lost their Person after renaming People | The People `id` changed. Ask Claude to put the `id` back to `people`. |
| Two modules sit in the wrong order | They share an `order` number. Ask Claude to give each its own. |

For several modules on the same block, such as Accounts beside People, see
[Many modules on one block](/wiki/advanced/second-module-same-block).
