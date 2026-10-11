---
title: Modules
description: Every module in the kit, with its block, data file, place in the sidebar and what it needs.
order: 2
---

This page lists every module the kit has, and what each one needs before it is
useful. The values come from the module files in `app/src/modules/` and the
kit's lists in `kit/`.

## All modules

| Module | id | Block | View | Data file | Order | Icon | Comes with |
|---|---|---|---|---|---|---|---|
| Tasks | `tasks` | `datatable` | `task` | `app/data/tasks.json` | 10 | `layers` | Every app (starter) |
| People | `people` | `datatable` | `table` | `app/data/people.json` | 20 | `users` | Every app (starter) |
| Goals | `goals` | `datatable` | `goal` | `app/data/goals.json` | 35 | `target` | Every app (starter) |
| Wiki | `wiki` | `pages` | — | `app/wiki/` (the pages) | 60 | `book` | Every app (starter) |
| About | `about` | `profile` | — | `app/data/about.md` | 70 | `compass` | Every app (starter) |

The sidebar lists modules by order, lowest first. About is always last.

## What each module needs

| Module | Purpose (as Settings shows it) | Needs | On screen you can |
|---|---|---|---|
| Tasks | What you have to do, and when each of it is due | Nothing more | Add, edit, delete and tick rows |
| People | Who you work with, and what to know about each of them | Nothing more | Add, edit and delete rows |
| Goals | What you are aiming for this year, and whether each is on track | Nothing more | Add, edit and delete goals |
| Wiki | What you learn: how your work works, kept as pages | Nothing more | Read, search and download pages |
| About | Who you are at work: your role | An interview with Claude | Read it |

Everything that is read-only on screen is written by Claude: you ask, and
Claude changes the data file. About is filled only by interviewing you.

## How a module arrives

| How | Modules | What you say to Claude |
|---|---|---|
| Starter, at setup | About, Goals, Tasks, People, Wiki | Part of setting up the app |
| Your own, on an installed block | Accounts, Projects, or anything else | "Add an Accounts module on the datatable block, with these columns: …" |

## The fields of Tasks, People and Goals

All three are datatable modules, so their rows are defined by fields in the module
file. Fields on the first tab (Details) are the table's columns; the Note tab
shows in the row's sheet.

**Tasks** (`tasks.json`)

| Key | Label | Kind | Tab | Hint |
|---|---|---|---|---|
| `name` | Name | `line` | Details | — |
| `category` | Type | `category` | Details | — |
| `status` | Status | `status` | Details | — |
| `person` | Person | `person` | Details | Whose it is, or who it is waiting on |
| `due` | Due | `date` | Details | — |
| `note` | Note | `text` | Note | What it is, and what it is waiting for |

**People** (`people.json`)

| Key | Label | Kind | Tab | Hint |
|---|---|---|---|---|
| `name` | Name | `line` | Details | — |
| `role` | Role | `line` | Details | — |
| `organisation` | Organisation | `line` | Details | — |
| `context` | How you know them | `text` | Details | Where you met, what you work on together |
| `lastContact` | Last contact | `date` | Details | — |
| `note` | Notes | `text` | Note | Working notes: anything worth knowing before the next meeting |

**Goals** (`goals.json`, in the goal view, with no tabs)

| Key | Label | Kind | Tab | Hint |
|---|---|---|---|---|
| `name` | Name | `line` | — | — |
| `owner` | Owner | `owner` | — | — |
| `start` | Start | `number` | — | Where it stood at the start of the period |
| `value` | Value | `number` | — | Where it stands now |
| `target` | Target | `number` | — | — |
| `unit` | Unit | `line` | — | %, days, or blank for a count |
| `direction` | Direction | `direction` | — | — |
| `due` | Target date | `period` | — | A day, a month or a quarter |
| `description` | Description | `text` | — | How it is counted |

A goal with a start value shows On track or Off track: it is on track when it
is at or ahead of an even pace from start to target over the period of its
target date. A goal with no start value shows no badge until it is met or the
period ends. See [Blocks](/wiki/reference/blocks).

The organisation is plain text for now. Links between tables come later.

## Modules you build yourself

Any new module on a block your app already has is one module file and one data
file, with no new code. The common first builds:

| Module | Block | View | Needs |
|---|---|---|---|
| Accounts | `datatable` | `table` | Nothing more. The first build in [Learn](/wiki/learn/first-module) |
| Projects | `datatable` | `task` | Nothing more |
| Models, Experiments, Insights | `datatable` | `table` | Nothing more |

For Sam, an Accounts module is the obvious next step: one row per customer
account, such as Tallow & Co and Harbourline Logistics, with the columns they name.
The file format is on [The module file](/wiki/reference/module-file), and the
blocks are on [Blocks](/wiki/reference/blocks).

## Removing a module

Ask: "Remove the Goals module." Claude runs `starta remove goals` for a kit
module, or deletes the module file for one of your own. The data file stays in
`app/data/`, so nothing you wrote is lost. See
[Manage modules](/wiki/guides/manage-modules).
