---
title: "Lesson 4: Add the people you work with"
description: Replace the example people with your own, once by asking Claude and once on screen.
order: 5
---

In this lesson you fill People with the people you work with. You do it two ways: by giving Claude a list, and by adding one person on screen yourself. Time: 7 minutes.

## Goal

People holds your own contacts instead of the examples, and you know both ways to add a row.

## Why it matters

People is the list your other modules point at. A task can name the person it waits on, and a module you build later, such as Accounts, can name people too. The sooner People holds your real contacts, the sooner the rest of the app is about your work.

You also learn the two ways data gets into your app: Claude writes it, or you type it on screen. Both end up in the same file.

## Steps

1. **Open People** in your browser and keep the tab open.
2. **Clear the examples.** In the Code tab, type:

   "Remove the example people from People. Keep the columns as they are."

   The table empties within a few seconds.
3. **Give Claude your list.** Paste or type the people you work with most, in any rough form. For example:

   "Add these people to People. Fill in what you can and leave the rest empty:
   Maya Okafor, head of operations, Tallow & Co, my main contact there, last spoke 8 October.
   Daniel Reyes, IT lead, Harbourline Logistics, owns their rollout, last spoke 6 October."

   Five to ten people is enough for now. You can paste rows from an Excel sheet too.
4. **Check the rows.** Read each row in the table. Click a row to open its sheet and see every field.
5. **Add one person on screen.** Click **Add item** at the top of the page. Fill in a name, role and organisation, then click **Save**.
6. **Add a working note.** Open one of your people and go to the Note tab in the sheet. Write one thing worth knowing before your next meeting, then save.

## What you see

| Column | What it holds |
|---|---|
| Name | The person's name |
| Role | Their job title |
| Organisation | Where they work, as plain text |
| How you know them | Where you met and what you work on together |
| Last contact | The date you last spoke |
| Notes | Working notes, on their own tab in the sheet |

The table has Sort and Filter controls at the top. Try sorting by Last contact to see who you have not spoken to in a while.

{% callout title="Work details only" %}
People holds work contact details and working notes. Do not store anything sensitive about a person, such as health, family or private opinions. Write notes you would be comfortable showing them.
{% /callout %}

Your example tasks still name the example people you removed. They show a short id instead of a name until you replace the tasks in lesson 5.

## If a save is refused

If Claude writes to `people.json` while you have a sheet open, your save is refused as a conflict, and the sheet says the file changed. Reload the page and make your change again. Only one of you should write a file at a time: let Claude finish before you edit on screen. More in [Data files](/wiki/how-it-works/data-files).

## You are done when

- The example people are gone.
- People holds at least five of your own contacts.
- You added one person yourself with **Add item**.
- One person has a working note.

## What changed on disk

| File | What happened |
|---|---|
| `app/data/people.json` | Claude removed the examples and wrote your list. Your on-screen row and note were written to the same file |

Each person is one row in this file, with an `id` made from their name, such as `maya-okafor`. Tasks use that id to point at a person. Ask Claude to show you one row: "Show me Maya Okafor's row in people.json."

## Sam's people

Sam pasted eight names from the account handover notes, with roles and companies. Claude wrote them all and said which fields it left empty. Sam added Lena Hoffmann, the support team lead, on screen with **Add item**, and wrote a note on Maya Okafor: "Wants the renewal proposal a week before the business review."

Next: [Lesson 5: Add your tasks](/wiki/learn/tasks).
