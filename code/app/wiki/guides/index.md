---
title: Guides
description: Short recipes for the jobs you do on your app, to look up when you need one.
order: 4
icon: map
---

A guide is a recipe for one job, such as adding a column or bringing in a list
from Excel. Look one up when you need it. Each guide has the same shape: what
it is for, the steps with prompts you can copy, what to check, and the common
problems.

The guides assume you have done the first hour of [Learn](/wiki/learn): your
app runs at http://localhost:9920, and you talk to Claude in the Code tab of
the Claude desktop app, opened on your app's folder.

## The guides

| Guide | Use it when |
|---|---|
| [How to ask Claude](/wiki/guides/ask-claude) | A request did not come out the way you meant, or you are not sure how to phrase one |
| [Bring in data](/wiki/guides/import-data) | You have rows in Excel, a CSV, an email or your notes and want them in a module |
| [Change a column](/wiki/guides/columns) | You want to add, rename, reorder or remove a column in Tasks, People, Goals or your own module |
| [Manage modules](/wiki/guides/manage-modules) | You want to rename a module, move it in the sidebar, or take it out |
| [Add a wiki page](/wiki/guides/wiki-pages) | You want to keep what you learned from a meeting, a document or your own work |
| [When something breaks](/wiki/guides/fix-problems) | The page is blank, shows an error, will not open, or will not save |
| [Start your app on another day](/wiki/guides/start-each-day) | You closed the laptop and want the app back |
| [Review a change](/wiki/guides/review-a-change) | Claude changed something and you want to see what before you keep it |

## Three habits that make every guide work

- **One change at a time.** Ask for one thing, check it on screen, then ask
  for the next. A small change is quick to check and safe to take back.
- **Look at the screen, then tell Claude what you see.** "The Due column is
  empty for every row" helps Claude more than "it is broken".
- **Ask Claude to explain.** "What did you change, and why?" is always a fair
  question. You own the app, so you decide what stays.

{% callout title="Not built yet" %}
There is no undo button inside the app yet. Claude can save a checkpoint and
take a change back with git when you ask; see
[Checkpoints](/wiki/advanced/checkpoints).
{% /callout %}

## When no guide fits

Describe the job to Claude in your own words and ask it to say its plan
before it changes anything:

"I want to keep track of which customers have signed the new terms. What
would you change in my app to do that? Tell me the plan first."

If the job comes up again, the [prompt library](/wiki/reference/prompts) may
already have a prompt for it, and the [FAQ](/wiki/reference/faq) answers the
common questions.
