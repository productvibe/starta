---
title: Why build your own
description: A work app keeps you on top of your numbers and tasks, and gives your notes a real interface.
order: 1
---

You build your own app because your job does not fit a generic one. One app
and one data set, kept current every day, keeps you on top of the two
things most knowledge work turns on: **numbers** and **tasks**.

## The problem with generic tools

Most of your work already lives in tools made for everyone: email
for messages, Power BI or Excel for numbers, a planner or a notebook for
tasks. Each tool is fine on its own. The trouble is between them. You keep the
picture of your job in your head, and you rebuild it every morning.

A work app holds that picture in one place, shaped the way you work. You
decide what a module is called, which columns it has and what it shows first.
When your job changes, you change the app.

## Tasks

| | What the app does | Where the source stays | Module |
|---|---|---|---|
| Tasks | Holds what you have to do, and what you promised in meetings | Your app is the home for these | Tasks |

Tasks work from your first hour.

## A second brain with a real interface

People keep a "second brain" in notes: what they know about a customer, how a
process runs, what was agreed. Notes are good at holding things and poor at
showing them. You search, scroll and forget.

A work app gives the same knowledge a structure and a screen:

- **About** tells Claude who you are, so every answer starts from your role.
- **Goals** holds what you are measured on, and whether each is on track.
- **People** holds who you work with, with how you know them and when you last
  spoke.
- **Wiki** holds what you learn, as pages you and Claude can both read.
- **Your own modules**, such as Accounts, hold the things only your job has.

Because the data is in plain files, Claude can read all of it. Ask "What do I
know about Tallow & Co before tomorrow's meeting?" and Claude answers from your
People rows, your tasks and your wiki pages, not from a guess.

## A worked example

Sam, a customer success manager at Brightlane, has a business review with
Tallow & Co on Thursday. Without a work app, they open four tools and a
notebook. With one, they ask Claude in the Code tab:

> "Prepare me for Thursday's Tallow & Co business review. List what I owe them from
> Tasks, who I am meeting from People, and what my wiki says about them."

Claude reads Sam's files and gives them a short brief. After the meeting Sam
says:

> "Add a follow-up task: send Maya Okafor the renewal proposal by Friday.
> Set Maya's last contact to today."

Claude writes one row in `tasks.json` and changes one row in `people.json`.
Sam's browser reloads, and the task is there.

{% callout title="Why not ask someone to build it" %}
A tool built for you by someone else fits the day it ships and drifts after.
Only you notice the small changes your job needs, and you notice them every
week. When you can make them yourself, in minutes, the app keeps up with you.
See [Four roles](/wiki/idea/four-roles).
{% /callout %}

## What a work app is not for

- **It is not a system of record.** Workbooks, warehouse tables and
  messages stay where they are. The app reads them and stores only what has no
  other home, such as your account notes. See [Principles](/wiki/idea/principles).
- **It is not shared.** It runs on your laptop, for you.
- **It is not finished.** It starts small and grows as you need it to.

Next: [Four roles](/wiki/idea/four-roles).
