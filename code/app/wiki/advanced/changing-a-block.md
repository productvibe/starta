---
title: Changing a block
description: When a change needs the block's own code, what it affects, and how to make it safely.
order: 4
---

Most changes are content: a module file, a data file or a wiki page. Some are
not. When you want a screen to behave differently, not only show different
fields, Claude has to change the block's code in `app/src/blocks/<block>/`.
That code is shared by every module on the block, and it is the code the kit
may update later. This article covers what that means and how to do it well.

## When you need it

Ask first: "Can this be done in the module file, without changing code?" If
the answer is no, it is a block change. Typical cases:

| You want | Content or block |
|---|---|
| A new column, a renamed column, a different view | Content: the module file |
| Different rows, a fixed typo in a row | Content: the data file |
| A due date that turns red when it is late | Block |
| "New account" instead of "New item" on the add button | Block |
| A new kind of field, such as a number or a link | Block, plus the shared field code in `app/src/data/` |

## What a block change affects

- **Every module on that block.** Tasks and People are both on the datatable.
  So is any module you built on it, such as Accounts. A change to the table
  view shows in all of them, unless Claude makes it depend on a setting.
- **Every module on a block that needs it.** A block that uses parts of
  another lists it in its `block.json`, so a change to one can show up in the
  other.
- **Kit updates.** The app knows which block files you changed. When you take
  a newer kit, a file only you changed is kept, and a file both you and the
  kit changed gets the kit's version written beside it as `<file>.kit` for
  Claude to merge with you ([Taking a newer kit](/wiki/advanced/kit-updates)).
  The more block files you change, the more merging later.
- **Removing a module.** A block whose files you changed is kept when the last
  module on it is removed, so your work is not lost.

## How to do it well

1. **Save a checkpoint** ([Checkpoints and undo](/wiki/advanced/checkpoints)).
2. **Describe what you see now and what you want instead**, for one screen.
3. **Ask Claude to make it a setting** when only one module needs it. A new
   key in the module file keeps the other modules as they are.
4. **Let Claude check it.** After a code change, Claude runs the app's type
   check, lint and build, then opens the module. Ask it to open every module
   on the block, not only the one you changed.
5. **Look at each module on the block** in your browser.
6. **Save a checkpoint** when it works, and ask Claude to note the change in
   the block's `README.md` or a code comment.

## Example

Every datatable calls a row an "item": "New item", "Delete item". Sam wants
Accounts to say "New account". They ask:

"In Accounts, the add button should say 'New account' and the delete button
'Delete account'. Tasks and People should keep their words unless I set them.
Make it a setting in the module file."

Claude adds an optional word for a row to the module file format, reads it in
the datatable's row sheet, and sets it in `accounts.json`. Tasks and People
have no such setting, so they still say "item". Claude runs the checks and
opens all three modules. Sam checks each one, then asks: "Set the word to
'task' in Tasks and 'person' in People too."

## What to ask Claude

- "Is this a content change or a block change? Which modules would it affect?"
- "Make this a setting in the module file, so only Accounts changes."
- "Open every module on the datatable and tell me what each one looks like now."
- "Which block files have I changed since the app was set up?"
- "Write this change down in the block's README."

## Pitfalls

{% callout title="One block, many screens" %}
A change that looks right in the module you are looking at can break another.
Check every module on the block before you keep it.
{% /callout %}

- **Screens never touch files.** Every read and write goes through the data
  helper in `app/src/data/`. If Claude proposes reading a data file directly
  from a screen, ask it to use the helper.
- **Use the existing interface pieces.** Buttons, tables and sheets come from
  `app/src/components/ui/`. A hand-built copy looks almost right and drifts.
- **Tables follow a design rule.** `product/DESIGN.md` holds the table rules.
  Ask Claude to keep to them.
- **Several small changes beat one big one.** One change, one check, one
  checkpoint.
- **Read the block's README first** where there is one. It holds the data shape the screens expect.
