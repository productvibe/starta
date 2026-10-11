---
title: How you build
description: "You build your app by vibe coding: describe, have Claude build, test, read enough to steer, debug by conversation, save checkpoints, iterate and ship."
order: 3
---

You build your work app by vibe coding. You describe what you want, Claude
builds it, and you check the result. You never write React and never type a
command. This page walks through the eight steps of the loop.

## The loop

| Step | What you do | What Claude does |
|---|---|---|
| 1. Describe | Say what you want, in plain words, one change at a time | Asks a question if the request is unclear |
| 2. Build | Approve the change | Edits the module file, data file or code |
| 3. Test | Look at the page in your browser and try it | Runs its own checks and tells you what changed on screen |
| 4. Read enough to steer | Read Claude's summary and the parts of the change you can follow | Explains each change in plain words |
| 5. Debug by conversation | Describe what you see when something is wrong | Finds the cause and fixes it |
| 6. Checkpoint | Ask Claude to save a checkpoint when it works | Saves the current state with git |
| 7. Iterate | Make the next small change | Suggests one next thing to try |
| 8. Ship | Start using it for real | Keeps the data current as you work |

## The steps

### 1. Describe

Say what you want and why, as you would to a colleague. Name the module and
what you expect to see. One change per message works better than five.

> "In People, I want each person's work phone. Add a column called Phone,
> after Organisation."

### 2. Build

Claude decides what to change. For most requests that is content, not code:
a module file in `app/src/modules/`, or a data file in `app/data/`. Claude
changes code only when content cannot do the job. When it needs to run a
command, it asks your approval first.

### 3. Test

Open the page and use it: add a row, tick a task, open a sheet. Check the
thing you asked for and one thing next to it.

### 4. Read enough to steer

You do not need to read code line by line. You need enough to tell if Claude
did what you meant. Ask:

> "What did you change, in plain words? Which files?"

A module file is short JSON. You can read it, and soon you can spot a wrong
label or a field in the wrong place. See [Review a change](/wiki/guides/review-a-change).

### 5. Debug by conversation

When something is wrong, describe what you see, not the cause you suspect.

> "The People page is blank since your last change. Before that it showed the
> table. What happened?"

Claude reads the error, finds the cause and fixes it. If you are stuck, see
[When something breaks](/wiki/guides/fix-problems).

### 6. Checkpoint

When a change works, save it. A checkpoint is a saved state you can go back
to.

> "This works. Save a checkpoint called 'People has Next meeting'."

A checkpoint button in the app is planned, not built. Claude saves
checkpoints with git, and can take you back to one when you ask. See
[Checkpoints](/wiki/advanced/checkpoints).

### 7. Iterate

Make the next change. Claude ends each change with one suggestion; take it
or leave it.

### 8. Ship

On your own laptop, shipping means using it: you open the app tomorrow and
it is part of how you work. The app runs on your laptop, for you.

## A worked example

Sam works with customers in Germany, the UK and Spain. They want to see
which language each contact prefers for meetings.

1. **Describe.** "In People, add a column called Language after Role. It
   is a short line, such as German."
2. **Build.** Claude adds one field to the People module file and says what
   it did.
3. **Test.** Sam opens People. There is no Language column in the table. When they
   open Maya Okafor's row, Language is there, on the Note tab of the sheet.
4. **Debug.** Sam tells Claude: "I can't see Language in the table, only when I
   open a person." Claude explains that only fields on the first tab show as
   columns, and moves Language to the Details tab.
5. **Steer.** Sam asks which file changed. Claude names the People module
   file and shows the new field: a key, a label, a kind and a tab. Sam can
   read it.
6. **Checkpoint.** "This works. Save a checkpoint: People has Language."
7. **Iterate.** Claude suggests filling Language for the people Sam already has.
   Sam says yes, and checks the result.
8. **Ship.** On Monday Sam opens People and sees each contact's language before booking a meeting.

{% callout title="Keep each step small" %}
The smaller the change, the faster you can test it, the less there is to
read, and the less you lose if you go back. If a request needs more than a few
sentences, split it.
{% /callout %}

## Where to practise

The [Learn](/wiki/learn) course takes you through this loop on real changes:
[Change a module](/wiki/learn/change) and
[Build your first module](/wiki/learn/first-module). For prompt patterns that
work, see [How to ask Claude](/wiki/guides/ask-claude).

Next: [Principles](/wiki/idea/principles).
