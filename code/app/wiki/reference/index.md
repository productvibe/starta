---
title: Reference
description: Look-up facts about your work app, taken from its own files.
order: 6
icon: library
---

Use this section when you need a fact, not an explanation: what a word means,
which block a module is built on, what a field kind stores, where a file lives,
or a prompt to copy. Every table here is taken from the app's own files, so it
matches what you see on screen and on disk.

For the why, read [The idea](/wiki/idea). For the how, read
[How it works](/wiki/how-it-works). For step-by-step lessons, follow
[Learn](/wiki/learn).

## Pages

| Page | Look here for |
|---|---|
| [Words](/wiki/reference/words) | Every term the app and this wiki use, in one table |
| [Modules](/wiki/reference/modules) | Every module in the kit: its block, data file, place in the sidebar and what it needs |
| [Blocks](/wiki/reference/blocks) | Every block: what it gives you, its data shape and what you can change on screen |
| [The module file](/wiki/reference/module-file) | Every key of a module file, every field kind, the status and type values, the icons, and a full example |
| [Folders and files](/wiki/reference/folders) | The app's folder tree, what each file is for, and which files are yours |
| [Prompts](/wiki/reference/prompts) | A library of prompts to copy, grouped by task |
| [FAQ](/wiki/reference/faq) | Short answers to the questions people ask most |

## The facts on one screen

| Fact | Value |
|---|---|
| Address of your app | http://localhost:9920 |
| Where you talk to Claude | The Code tab of the Claude desktop app, opened on your app's folder |
| Where your data lives | `app/data/`, one file per module |
| Where module files live | `app/src/modules/`, one `.json` file per module |
| Where the wiki lives | `app/wiki/`, one `.md` file per page |
| Modules every app starts with | About, Goals, Tasks, People and Wiki |
| What you can change on screen | Rows of a datatable module (Tasks, People, Goals and your own): add, edit, delete, tick done |
| What Claude writes for you | About, module files, wiki pages and code |

{% callout title="If a fact here looks wrong" %}
The app's files are the truth, and this page is a copy. Ask Claude: "Check the
Reference pages in the wiki against the app's files and tell me what no longer
matches." Then ask it to fix the pages it names.
{% /callout %}
