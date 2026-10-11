---
title: How to ask Claude
description: Prompt patterns that get the change you meant, one change at a time.
order: 1
---

You build your app by asking Claude in the Code tab. A good request names the
module, says what you want to see on screen, and asks for one change. This
guide gives you the patterns that work and the ones that go wrong.

## The shape of a good request

A request that works has three parts:

1. **Where.** The module or page: "In People", "On the Tasks page", "In the
   wiki page Tallow & Co".
2. **What you want to see.** The result on screen, not the code: "a column
   called Customer", "the tasks due this week first".
3. **Any rule that matters.** "Keep the existing rows", "dates as
   YYYY-MM-DD", "tell me the plan before you change anything".

For example:

"In People, add a column called Customer after Organisation. Leave it empty for
now. Keep the existing rows as they are."

## Patterns to copy

| You want to | Ask like this |
|---|---|
| Change data | "In Tasks, set the due date of 'Book the Fernwood kick-off with Tom' to 2026-10-14." |
| Change a module | "In People, rename the column 'How you know them' to 'Context'." |
| Build something new | "I want a module called Accounts for the customer accounts I look after. Suggest the columns first; do not build it yet." |
| Understand something | "Explain how the Tasks page decides its order. Keep it short and use no code words." |
| Check a change | "What did you change in that last step? List the files and say what changed in each." |
| Fix something | "The People page shows an error since your last change. Here is the message: … Find the cause and fix it." |
| Plan first | "Before you change anything, tell me your plan in three lines." |

## One change at a time

Ask for one change, look at the screen, then ask for the next. When you ask
for five things at once, it is hard to see which one went wrong, and harder to
take one back.

Sam wanted an Accounts module with five columns, their twelve accounts, and
a wiki page per account. They asked for it in three turns:

1. "Build an Accounts module on the datatable block with these columns:
   Account, Plan, Renewal date, Health, Main contact. No rows yet."
2. They opened Accounts, checked the columns, then: "Add these accounts as
   rows: Tallow & Co, Harbourline Logistics, Fernwood Studio."
3. Once the rows looked right: "Make a wiki folder called accounts with one
   page per account."

## Describe what you see

When something looks wrong, say what you see, where, and what you expected.

| Weak | Strong |
|---|---|
| "It is broken." | "When I open People, the page says 'Oops!' and 'Could not read people.json'." |
| "The dates are wrong." | "In Tasks, every due date shows as empty since you imported the list." |
| "Make it look better." | "In People, the Notes column is too wide. Move it to the row's sheet instead of the table." |

Copy the exact text of an error. Claude can read it; a summary loses the
detail that points to the cause.

## Let Claude ask you

You do not have to know the right word. Say what you want in your own words
and add: "Ask me anything you need before you start." Claude will ask about
the parts it cannot guess, such as which module a column belongs in.

When Claude uses a word you do not know, ask: "What does 'field kind' mean
here?" The [glossary](/wiki/reference/words) has the app's own words.

## Approving what Claude runs

Claude sometimes asks for approval to run a command, such as starting your app
or installing a package. Read the line it shows and the reason it gives. If
the reason is not clear, ask "What will that do?" before you approve.

## Common problems

| Problem | What to do |
|---|---|
| Claude changed more than you asked | Ask "What did you change?" and then "Take back everything except the new column." See [Review a change](/wiki/guides/review-a-change). |
| Claude changed the code when you wanted a data change | Say "Change only the data file, not the code." Content comes before code in this app. |
| The answer is long and technical | Ask "Say that again in three lines, with no code." |
| Claude says it cannot see something | Paste it, or tell it the file name and folder. |
| You do not know what to ask next | Ask "Suggest one next thing to try in my app." |

More prompts, grouped by task, are in the [prompt library](/wiki/reference/prompts).
