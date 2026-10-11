---
title: Add a wiki page
description: Turn a meeting, a document or something you learned into a wiki page you will find again.
order: 5
---

The wiki is where you keep what you learn about your work: how a customer
works, a rule, a process, the outcome of a meeting. Claude writes the page
from your source and puts it in your own folder. This guide shows how.

## What makes a good page

A wiki page holds what stays true for a while. News and numbers go elsewhere.

| Belongs in the wiki | Belongs elsewhere |
|---|---|
| How Tallow & Co decides on a renewal | This quarter's renewals target (Goals) |
| What was agreed at the Q4 business review | The meeting's action items (Tasks) |
| Who decides what at Harbourline Logistics | Daniel Reyes's phone number (People) |
| A checklist for onboarding a new customer | A one-off email (your mailbox) |

The [writing rules](/wiki/about/ai-instructions) say how pages are written.
Claude follows them; you can point to them when a page comes out wrong.

## Where your pages go

Keep your own pages in folders of your own, beside the wiki's sections. For
example, `accounts/` for one page per customer, or `processes/` for how things
get done. A folder appears in the wiki tree once it has a page, and its
`index.md` is its landing page.

## Steps

### 1. Give Claude the source

Paste your meeting notes, a document's text or an email. Or point to a file:
"The notes are in Downloads, called q4-business-review.docx." If Claude
cannot read a file, copy its text and paste it. Or say it in your own words.

### 2. Say what the page is for

"Write a wiki page from these notes in my accounts folder, called Tallow & Co.
Keep what we agreed and how Tallow & Co works. Leave out the small talk and the
action items. Show me the draft before you save it."

### 3. Move the actions to Tasks

A meeting usually gives you both knowledge and actions. Keep them apart:

"From the same notes, list the action items for me as a preview for Tasks,
with due dates and the person each one is waiting on."

### 4. Check the draft, then save

Read the draft in the Code tab. Ask for changes until it is right, then:
"Save it." Open the wiki in your browser and find the page in the tree.

## Worked example: after the Tallow & Co review

Sam met Maya Okafor and her team at Tallow & Co. Sam's notes were half
a page of short lines. They pasted them and asked:

"Make a wiki page in accounts called Tallow & Co. Start with a short summary of
how they work with us, then a table of what was agreed, with the date
2026-10-02. Add a References section that names these notes. Draft first."

The draft had a summary, a table of three agreements, and a references line.
They asked for one change: "Maya is head of operations, not head of
finance." Then they said "Save it", and asked for the two action items as
tasks.

The next month, they asked: "Update the Tallow & Co page with these notes from
today's meeting. Keep what still holds and mark what changed."

## Useful prompts

- "Make a page in processes called Onboarding a customer, from this checklist."
- "Here is a PDF of our customer contract. Write a page with the rules I need
  day to day, each with the section it comes from."
- "Add what I learned today to the Tallow & Co page: they want the usage
  numbers a day before each review."
- "Mark the Tallow & Co page as a draft until I have checked it." (This sets
  `status: draft` on the page.)
- "Move my account pages into one folder called accounts, and make a landing
  page that lists them."

## What to check

- The page shows in the wiki tree where you expect it.
- The title and the first lines say what the page is for.
- Facts match your source. Names, dates and roles are the usual mistakes.
- Dates sit next to anything that changes, such as "as of 2026-10".
- Links to other pages open.

## Common problems

| Problem | What to do |
|---|---|
| The page is not in the tree | Reload the wiki. If it is still missing, ask: "Where did you save the Tallow & Co page?" |
| The wiki shows an error after a new page | The page may use a tag the wiki does not allow. Ask: "The wiki shows an error since the new page. Check its tags against the writing rules." |
| The page repeats the whole meeting | Ask: "Keep only what will still matter in a month." |
| The page sits at the end of its folder | Ask Claude to give it an `order`. |
| A fact from the source is missing | Ask for it by name: "Add the renewal date from the notes." |
