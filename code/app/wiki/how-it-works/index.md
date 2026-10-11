---
title: How it works
description: The three pieces of your work app, a folder, a browser tab and Claude, and what runs where.
icon: cog
order: 2
---

Your work app is three pieces on your own laptop: a **folder** of files, a
**browser tab** at `http://localhost:9950` that shows them, and **Claude** in
the Code tab of the Claude desktop app, which changes them. This page shows how
the three fit together. The pages below go into each part.

## The three pieces

| Piece | What it is | What you do with it |
|---|---|---|
| The folder | Your app: its data files, its wiki pages, its code | Nothing directly. You open it in the Code tab, and Claude reads and edits it |
| The browser tab | The app's screen, served from your laptop at `localhost:9950` | Read your modules, tick tasks, add and edit rows |
| The Code tab | Claude, opened on the folder | Ask for changes, new modules, imports, fixes and explanations |

`localhost` means "this computer". The address works only on your laptop, and
only while the app's server is running. Claude starts that server for you and
keeps it running on port 9950. If the tab ever says it cannot connect, ask
Claude: "Is my app running? Start it if not."

## What runs where

Everything runs on your laptop. There is no hosting, no sign-in and no
database.

| Part | Where it lives | Who changes it |
|---|---|---|
| Data files | `app/data/`, one per module | You on screen (datatable rows only) and Claude |
| Wiki pages and About | `app/wiki/` and `app/data/about.md` | Claude |
| Module files | `app/src/modules/`, one per module | Claude |
| Blocks and other code | `app/src/` | Claude, when content alone cannot do it |
| The dev server | A program on your laptop | Claude starts and restarts it |

Claude asks for your approval before it runs a command or changes files,
depending on your settings. You stay in charge of every change.

## Nothing leaves your laptop

The app itself sends nothing anywhere. Its data is plain files in your folder,
and the screen reads them through a small server on your own machine.

Two things do go beyond the laptop, and you control both:

- **Your conversation with Claude.** What you type, and the files Claude reads
  to answer you, go to Claude like any chat does.
- **Connectors, when you add them.** A connector lets Claude read from a tool
  such as SharePoint or Jira, with your own permissions. See
  [Agents and connectors](/wiki/how-it-works/connectors).

The app runs on your laptop, for you. Nothing is published.

## One change, two ways

Sam, a customer success manager at Brightlane, has their app open. Here is
the same kind of change made from each side.

**From the screen.** In Tasks they tick "Send Tallow & Co the renewal
proposal". The browser sends the change to the server on their laptop.
The server writes the row's status, `done`, into `app/data/tasks.json`.

**From Claude.** In the Code tab they type: "Add Daniel Reyes's colleague Eva
Strand to People: Head of operations at Harbourline Logistics, met at the
rollout call on 6 October." Claude adds a row to `app/data/people.json`. Within
about five seconds, the People page in their browser reloads by itself and shows
the new row.

Both changes end up in the same files. That is the whole design: one set of
data files, two writers, one screen.

## The pages in this section

| Page | Read it to understand |
|---|---|
| [Data files](/wiki/how-it-works/data-files) | Where your data lives, and what happens when you and Claude both write |
| [Modules and blocks](/wiki/how-it-works/modules-and-blocks) | How the sidebar is made, and how a new module needs no new code |
| [Fields and views](/wiki/how-it-works/fields-and-views) | Columns, field kinds, tabs, and the table and task views |
| [The wiki and About](/wiki/how-it-works/wiki-and-about) | How pages are written and why they use Markdoc |
| [Agents and connectors](/wiki/how-it-works/connectors) | How Claude reaches the tools where your work lives |
