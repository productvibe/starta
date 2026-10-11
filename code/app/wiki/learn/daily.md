---
title: "Lesson 8: Use it every day"
description: Two short conversations a day, one at the start and one at the end, keep your app current and worth opening.
order: 9
---

This lesson turns your app into a habit: a start-of-day prompt that tells you what needs you today, and an end-of-day prompt that writes down what happened. An app that is a day behind is still useful. An app that is a month behind gets closed.

## Goal

By the end you have run one start of day and one end of day, and your Tasks and People match what is true today.

## Why it matters

Your app only knows what you or Claude write into it. Two short conversations a day are enough to keep Tasks, People and your own modules current, and each one takes a few minutes. You stay the one who decides what goes in: Claude drafts, you confirm.

## Steps

### 1. Start your app

If the app is not open in your browser, ask Claude to start it. The page [Start your app again on another day](/wiki/guides/start-each-day) has the prompt.

### 2. Start of day

Ask Claude for today's view:

> "Start of day. Read my Tasks and People. List what is overdue, what is due today and this week, and anything blocked. For each blocked task, say who it waits on. Suggest the three things I should do first, and change nothing."

Claude reads `tasks.json` and `people.json` and answers in the chat. Nothing changes on disk. Read the list, and say what is wrong:

> "The Tallow & Co renewal proposal is done, I sent it last night. Mark that task done. Move the Fernwood kick-off to Thursday."

### 3. During the day

Tick a task done on screen when you finish it. Add a task on screen when one comes up, or ask Claude:

> "Add a follow-up for me: send Maya Okafor the Q4 business review agenda by Friday."

### 4. End of day

Tell Claude what happened, in your own words, all at once:

> "End of day. I met Maya Okafor at Tallow & Co, with Lena Hoffmann from Support. Maya wants usage by month before the business review. Lena will send a written summary of the escalated case. Update my tasks and the last contact on both people, and add a short note on Maya. Show me the changes before you write them."

Claude drafts the changes and lists them. Check the list, correct it, then say "Write them." Claude writes the files, and the open page reloads by itself within a few seconds.

### 5. Once a week

Ask for a tidy-up:

> "Weekly review. List tasks with no due date, tasks done more than two weeks ago, and people I have not been in touch with for a month. Show which goals are off track. Suggest what to close or follow up, and change nothing yet."

Update your goals when new numbers come in, for example: "Renewals closed is now 8." See [Lesson 3: Set your goals](/wiki/learn/goals).

## What you see

| Prompt | What changes on screen |
| --- | --- |
| Start of day | Nothing. The answer is in the chat |
| A correction ("mark that done") | The task moves to Done in Tasks |
| End of day | New and changed tasks; new last contact dates and notes in People |
| Weekly review | Nothing until you say which suggestions to apply |
| A new goal value | The card in Goals shows the new value, and its badge may change |

## Worked example

Sam starts Tuesday with the start-of-day prompt. Claude lists two overdue tasks, the Tallow & Co renewal proposal due today, and the Harbourline security review blocked on sign-off. Sam sends the proposal, ticks the task on screen, and goes to the day's meetings. At 16:30 Sam types three sentences about the Tallow & Co meeting. Claude drafts two new tasks and two People updates, Sam changes one due date, and Claude writes them. Wednesday's start of day already knows about the meeting.

{% callout title="Not built yet" %}
There is no daily agenda skill in your app yet: you type the start-of-day prompt each time, or keep it in a wiki page to copy. Once you use the same prompt every day, you can ask Claude to turn it into a skill. See [Skills](/wiki/advanced/skills).
{% /callout %}

## Keep it current

- **One writer at a time.** Close a row's sheet on screen before Claude edits that module, or your save is refused as a conflict. See [Data files](/wiki/how-it-works/data-files).
- **Little and often.** Three sentences at the end of each day beat a long catch-up on Friday.
- **Ask for a checkpoint** after a good day's update: "Save a checkpoint called end of day Tuesday." See [Checkpoints](/wiki/advanced/checkpoints).
- **Keep what you learn.** A fact worth keeping beyond one person or task goes in the wiki: "Make a wiki page from what I learned about how Tallow & Co signs a renewal today." See [Add a wiki page](/wiki/guides/wiki-pages).

## You are done when

- You have run the start-of-day prompt and acted on its list.
- You have run the end-of-day prompt and checked Claude's draft before it was written.
- Tasks shows only what is still open and true.
- The people you met today have today's date as their last contact.

## What changed on disk

| File | What changed |
| --- | --- |
| `app/data/tasks.json` | New tasks, new due dates, tasks marked done |
| `app/data/people.json` | Last contact dates and notes |
| `app/data/goals.json` | New goal values, if you gave any |
| `app/wiki/…` | A new page, if you asked for one |

Nothing in the code changes in this lesson.

## Next

[What next](/wiki/learn/next)
