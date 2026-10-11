---
title: FAQ
description: Short answers to the questions people ask most about their work app.
order: 7
---

Short answers, each with a link to the page that says more.

## The basics

**Do I need to know how to code?**
No. You describe what you want in the Code tab, Claude changes the files, and
you check the result in the browser. You read enough to steer. See
[How you build](/wiki/idea/vibe-coding).

**Do I ever type a command?**
No. Claude runs every command and asks your approval first. You type prompts.

**Where does my app run? Can anyone else see it?**
On your own laptop, at http://localhost:9920. Nobody else can open it. Nothing
is hosted, and there is no sign-in.

**Where is my data?**
In `app/data/`, one file per module, on your laptop. See
[Folders and files](/wiki/reference/folders).

**Who builds my app if I get stuck?**
You do, with Claude. A power user can mentor you: look at what you made, review
a module file, share an idea. They do not build it for you. See
[Working with a mentor](/wiki/advanced/mentors).

## Using it

**What can I change on screen?**
Rows of a datatable module, such as Tasks, People, Goals or your own Accounts:
add, edit, delete and tick done. About is read-only on screen; ask
Claude to change it.

**Why can I not edit a cell in the table?**
Cells are read-only. Click the row: its sheet opens, and you edit there.

**My save was refused as a conflict. What happened?**
Claude changed the same data file after your page loaded. The app refused your
save so it would not overwrite Claude's change, and says "Changed on disk —
reload". Copy what you typed, reload the page, and make your edit again. Avoid it by not editing a row while Claude is
writing the same module. See [Fix problems](/wiki/guides/fix-problems).

**Claude changed a file. Do I need to reload the page?**
No. The open page reloads by itself within a few seconds.

**How do I start my app on another day?**
Open the Claude desktop app, open the Code tab on your app's folder and ask:
"Start my work app." See [Start each day](/wiki/guides/start-each-day).

## Changing it

**How do I add a column?**
Ask: "Add a [Next business review] column to Accounts, as a date." See
[Columns](/wiki/guides/columns).

**How do I add a new module?**
On an installed block it is one module file and one data file, with no code.
Ask: "Add an Accounts module on the datatable block." See
[Build your first module](/wiki/learn/first-module).

**Can I have a drop-down with my own choices, such as Priority?**
Not as a field kind yet. The choices are fixed: status (four values) and type
(five values). A new choice list is a code change; ask Claude what it would
take. See [The module file](/wiki/reference/module-file).

**Can an Accounts row link to its people?**
A `person` field points at one People row. Links between other tables come
later.

**What if I break something?**
Ask Claude to undo it. Claude keeps checkpoints with git when you ask it to
save one, so save one before a bigger change: "Save a checkpoint called
[before Accounts]." Undo inside the app is not built yet. See
[Checkpoints](/wiki/advanced/checkpoints).

**Can I change how the app looks?**
Settings → Appearance sets the colour of charts and of buttons, kept per
browser. For fonts, corners or other colours, ask Claude.

## Connectors and sharing

**Can Claude read my other tools?**
Only through a connector. Whether a connector you added in Settings →
Connectors of the desktop app works in the Code tab is not settled. Ask Claude:
"Which connectors can you use right now?" See
[Connectors](/wiki/how-it-works/connectors).

**Can I share my app with my team?**
No. The app runs on your laptop, for you.

## The kit

**What is the kit?**
The source your app was copied from: its code, its modules and its blocks.

**Will a kit update overwrite my changes?**
No. Your data and wiki pages are never overwritten. A code file you changed is
kept, and the kit's version is written beside it as a `.kit` file for you and
Claude to merge. See [Kit updates](/wiki/advanced/kit-updates).

**Are the names in the example data real?**
No. Brightlane, Tallow & Co, Harbourline Logistics, Fernwood Studio, Maya
Okafor, Daniel Reyes and the rest are fictional. Replace them with your own.
