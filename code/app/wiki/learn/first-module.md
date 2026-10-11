---
title: "Lesson 7: Build your first module"
description: Design an Accounts module, have Claude build it on the datatable block, and fill it with your real accounts.
order: 8
---

In this lesson you design a module of your own and Claude builds it. The example is Accounts, for the customer accounts Sam looks after. If your work is about something else, such as suppliers, campaigns or experiments, use that instead. Time: 11 minutes.

## Goal

Your sidebar has a module you designed, with the columns you chose and your real rows in it.

## Why it matters

Until now you have changed what came in the box. Now you add something the box did not have. This is the step from modifier towards module builder, and it is the reason the app is yours: no starter set knows which things you track. Once you have built one module, you can build the next on your own.

## Steps

1. **Decide what one row is.** Say it in one sentence: "One row is one customer account." If you cannot say it in one sentence, you have two modules.
2. **Choose the columns.** Use the columns Claude suggested in [Lesson 2](/wiki/learn/about), or ask now:

   "I want a module for the customer accounts I look after. One row is one customer account. Based on my About page, suggest five to seven columns, and say which should be in the table and which only in the row's sheet."

   Keep the list short. You can add a column later in seconds, as you did in lesson 6.
3. **Ask Claude to build it.** Name the module, the view and each column. For example:

   "Add an Accounts module on the datatable block, in the table view, below People in the sidebar. Columns: Name, Plan, Renewal date (a date), Health (green, amber or red), Main contact (a person from People). Put a Notes field on a second tab. Start it empty."

4. **Check the plan.** Claude says which two files it will write before it writes them. Read that and say yes, or correct it.
5. **Open the module.** Accounts appears in the sidebar. Click it. The table is empty, with your columns.
6. **Add your real accounts.** Paste them to Claude in any form, from a list, an email or an Excel sheet:

   "Add these to Accounts: Tallow & Co, Business plan, renews 30 November, amber, main contact Maya Okafor. Harbourline Logistics, Business plan, renews 31 March, amber, main contact Daniel Reyes. Fernwood Studio, Starter plan, just signed, green."

7. **Add one account on screen.** Click **Add item**, fill it in and click **Save**.
8. **Look under the hood.** Type:

   "Show me the Accounts module file and explain each part in plain words."

## What you see

Accounts sits in the sidebar and looks like People, because both are built on the same block, the datatable, in the table view. It has Sort, Filter and **Add item**, a sheet for each row, and its own section in Settings.

| Field kind | Use it for | Example |
|---|---|---|
| Line | A short piece of text | Plan, Health |
| Text | A longer note | Notes |
| Date | A day | Renewal date |
| Person | Someone from People | Main contact |
| Status | Backlog, in progress, blocked, done | Onboarding stage |

The full list of field kinds is in [The module file](/wiki/reference/module-file).

{% callout title="No new code" %}
A new module on a block you already have is two files: a module file that describes it and a data file that holds its rows. Claude wrote no code. That is why Accounts took minutes, and why you can build the next one the same way: Business reviews, Feature requests, Projects.
{% /callout %}

Some things a datatable cannot do yet: a board view, formulas, and links between two of your own tables. The Main contact column can point at People, but a task cannot yet point at an account. Ask Claude for a plain text column in the meantime.

## You are done when

- Accounts, or your own module, is in the sidebar.
- It has the columns you chose.
- It holds your real rows, at least one added on screen.
- Claude has explained the module file to you.
- You have saved a checkpoint: "Save a checkpoint called 'Accounts module'."

## What changed on disk

| File | What happened |
|---|---|
| `app/src/modules/accounts.json` | New: the module's name, block, view, icon, order and fields |
| `app/data/accounts.json` | New: your accounts, one row each |

Compare `accounts.json` with `people.json` in `app/src/modules/`. They have the same shape. Only the name, the order and the fields differ. That is what "two modules on one block" means; see [Many modules on one block](/wiki/advanced/second-module-same-block).

## Sam's Accounts

Sam took Claude's three suggestions from lesson 2 (plan, renewal date, health) and added Main contact, so each account points at Sam's contact in People. Claude showed the plan, Sam said yes, and Accounts appeared below People. Sam pasted twelve accounts from the handover spreadsheet and added Fernwood Studio on screen. Then Sam saved a checkpoint.

Sam's hour ends here. Sam has their role in About, their goals in Goals, their contacts in People, this week's follow-ups in Tasks, and a module they designed themselves. Tomorrow Sam opens Tasks first.

## Your first hour is done

You are a runner and a modifier, and you have built your first module. From here you teach yourself, with Claude as your guide. The next lesson makes the app part of your day.

Next: [Lesson 8: Use it every day](/wiki/learn/daily).
