---
title: "Lesson 3: Set your goals"
description: Replace the example goals with what you are measured on, each with a start value, a target and a target date, and learn to read On track and Off track.
order: 4
---

In this lesson you put what you are measured on into Goals. Each goal gets a value, a start value, a target and a target date, so the app can tell you whether you are on track. If Claude already put your goals in Goals during [lesson 1](/wiki/learn/start), use this lesson to check them and fill any gaps. Time: 8 minutes.

## Goal

Goals shows your own goals, you can read On track and Off track, and you know how to update a value at a check-in.

## Why it matters

Your goals are why your tasks matter. With them in the app, you see at a glance which ones need attention this week, and Claude can weigh your tasks against them. A goal only gets a badge when it knows where it started, so the start value is the part not to skip.

## Steps

1. **Open Goals** in your browser and keep the tab open. It shows your goals from lesson 1, or the example goals, as cards, with the first one drawn large on top.
2. **List what you are measured on.** Your About page may already say. If you are not sure, ask:

   "Based on my About page, what am I most likely measured on? Suggest three to five goals, each with how it is counted. Change nothing yet."

3. **Replace the examples with yours**, if they are still there, or correct the goals Claude wrote. Type something like:

   "Remove the example goals. Then add these, each with where it stood at the start of the quarter, where it is now, the target and the target date:
   Renewals closed: started at 5, now 7, target 9 by the end of Q4.
   Net revenue retention: started at 105%, now 104%, target 110% by the end of Q4.
   Days to go live: started at 38 days, now 34, target 30 by the end of Q4. Lower is better.
   Healthy accounts: now 18, target 20 by the end of Q4. I do not know the start yet."

   Say whether higher or lower is better when it is not obvious, and whose goal it is: yours, your team's or the company's.
4. **Check the cards.** Each card shows the value against the target, the owner and the target date, such as "Team · By Q4 2026". Click a card to open its sheet and see every field.
5. **Read the badges.** Find one goal that is On track, one that is Off track and one with no badge. Ask Claude why, if a badge surprises you:

   "Why is Net revenue retention off track? Show me the sum."

6. **Update a value at a check-in.** When a number moves, tell Claude:

   "Renewals closed is now 8."

   Or open the card, change Value and click **Save**. The badge updates at once.

## What you see

| Field | What it holds |
|---|---|
| Name | What the goal is |
| Owner | Me, Team or Company |
| Value | Where it stands now |
| Start | Where it stood at the start of the period |
| Target | Where you want it to be |
| Unit | `%`, `days`, or blank for a count |
| Direction | Higher is better or lower is better |
| Target date | A day, a month or a quarter |
| Description | How it is counted |

| Badge | When it shows |
|---|---|
| On track | The goal is met, or it is ahead of an even pace from its start value to its target over its period |
| Off track | It is behind that pace, or the period has ended and the target was not met |
| No badge | The goal is not met and its period has not ended, and the start value is unknown or the target date is a single day, so there is no pace to measure |

An even pace means a straight line. If a quarter is one third gone, a goal that should rise from 5 to 8 should be at 6 or more to be on track.

{% callout title="Goals hold the numbers, not the data" %}
Goals keeps the few numbers you are judged on, typed in at a check-in. The detailed data stays in the systems that measure it. Once a week is often enough for most goals.
{% /callout %}

## You are done when

- The example goals are gone.
- Goals holds three to five of your own goals, each with a target and a target date.
- Most of them have a start value, and you can say why each badge shows what it shows.
- You have updated one value.

## What changed on disk

| File | What happened |
|---|---|
| `app/data/goals.json` | Claude replaced the examples with your goals. Your updated value was written to the same file |

Each goal is one row, with `value`, `start` and `target` stored as plain numbers and the target date as a `period`, such as `"2026-Q4"`. Ask Claude to show you one: "Show me one goal in goals.json and explain each line."

## Sam's goals

Sam is judged on renewals, customer health and how fast new customers go live. Claude suggested five goals from the About page, and Sam kept all five: net revenue retention, renewals closed, healthy accounts, days to go live and customer satisfaction. Sam knew the start values for four of them and left healthy accounts without one until the next monthly health check.

Renewals closed and days to go live showed On track. Net revenue retention showed Off track: it had slipped from 105% to 104% while it should be rising towards 110%. Sam made a note to look at it with Tom Becker.

Next: [Lesson 4: Add the people you work with](/wiki/learn/people).
