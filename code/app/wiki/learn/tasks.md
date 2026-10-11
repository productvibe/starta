---
title: "Lesson 5: Add your tasks"
description: Replace the example tasks with your own follow-ups, each linked to a person and a due date.
order: 6
---

In this lesson you put this week's real work into Tasks: your follow-ups, each with a due date and the person it concerns. Time: 6 minutes.

## Goal

Tasks shows what you have to do this week, and you know how to add, tick and change a task.

## Why it matters

Tasks is what you open tomorrow morning. If it holds your real follow-ups, the app is useful from day one, and you have a reason to come back to it. That habit is what keeps the app current.

## Steps

1. **Open Tasks** in your browser and keep the tab open.
2. **Clear the examples and add yours in one go.** In the Code tab, type something like:

   "Remove the example tasks from Tasks. Then add these as follow-ups, linked to the right person in People:
   Send Maya Okafor the renewal proposal by Wednesday.
   Chase the security review so Daniel Reyes can switch on single sign-on, by Tuesday.
   Read the Tallow & Co contract before Friday."

   Write your tasks the way you would in a note to yourself. Claude works out the dates, the type and the person.
3. **Check the list.** Each task shows its name, type, status, person and due date. Click a task to open its sheet.
4. **Add one task on screen.** Click **Add item**, give it a name, a type and a due date, and click **Save**.
5. **Change a status.** Open a task that is waiting on someone and set its Status to Blocked. Add a line in the Note tab saying what it waits for.
6. **Tick one off.** Tick a task you have already done. It moves to the Done list.
7. **Ask what is next.** Type:

   "Which of my tasks are due today or overdue? List them in order."

## What you see

The task view shows open tasks first, with those that need attention at the top and the rest by due date. Use Open, Done and All at the top to switch between them.

| Field | Values |
|---|---|
| Type | Project, deliverable, task, request or followup |
| Status | Backlog, in progress, blocked or done |
| Person | Someone from People: whose task it is, or who it waits on |
| Due | A date |
| Note | What the task is and what it waits for, on its own tab |

The Person field points at a row in People. That is why you filled People first: a task can only name someone who is in People. If Claude meets a name it cannot find, it asks you whether to add that person.

{% callout title="Keep it to what you will act on" %}
Start with this week only. A list of fifty tasks on day one is a list you stop opening. Add more as they come up, by asking Claude or with **Add item**.
{% /callout %}

## You are done when

- The example tasks are gone.
- Tasks holds this week's follow-ups, each with a due date and, where it fits, a person.
- You added one task on screen, set one to Blocked and ticked one done.
- Claude has told you what is due today.

## What changed on disk

| File | What happened |
|---|---|
| `app/data/tasks.json` | Claude replaced the examples with your tasks. Your new task, the status change and the tick were written to the same file |

A task's Person is stored as the person's id from `people.json`, such as `maya-okafor`, not as their name. Ask Claude to show you: "Show me one task in tasks.json and explain each line."

## Sam's tasks

Sam dictated six follow-ups from a notebook. Claude added them, linked four to people in People, and asked whether "Tom" meant someone new. Sam said yes, and Claude added Tom Becker, the account executive, to People as well. Sam set "Chase the security review for Harbourline" to Blocked with the note "Waiting on our security team to sign", and ticked off the one done that morning.

When Sam asked what was due today, Claude listed two tasks. That list is what Sam opens tomorrow.

Your app now holds your role, your goals, your people and your tasks. You have been a runner: you started the app and changed its data. Next you become a modifier and change a module itself.

Next: [Lesson 6: Change a module](/wiki/learn/change).
