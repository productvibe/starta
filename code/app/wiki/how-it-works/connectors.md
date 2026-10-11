---
title: Agents and connectors
description: How Claude keeps your modules current from the tools where your work lives, and why the permissions stay yours.
order: 5
---

Your app reads only its own files. It never connects to SharePoint, Jira or
any other tool itself. **Claude** does that: it reads from your tools through
**connectors** and writes what it finds into your data files. This page
explains that split and what stays in your hands.

## Agents and connectors

| Word | What it means here |
|---|---|
| Agent | Claude doing a job on your files: reading, deciding, writing. In the Code tab, Claude is the agent |
| Connector | A link that lets Claude use one of your tools, such as SharePoint or Jira |
| MCP | Model Context Protocol, the standard most connectors are built on. You will see the letters in settings |

The shape is always the same:

1. You ask Claude for something, such as "Update my Accounts from the shared workbook".
2. Claude reads from the tool through its connector, with your access.
3. Claude writes a small result into a data file: a summary, a total, a row.
4. Your app shows that file. The page reloads by itself.

The app holds the result, never the source. Workbooks and documents stay
where they are.

## No connectors in the first hour

About, Goals, Tasks, People, the Wiki and any datatable module you build need no
connector. You type, paste or import the data. That is deliberate: your first
hour cannot be blocked by a sign-in or an approval.

## Is a connector available to you?

Connectors are added in the Claude desktop app's Settings, under Connectors.
Whether a connector added there can be used from the Code tab is not settled
yet. Check before you rely on one:

"Which connectors can you use right now?"

Claude lists what it can reach in this session. If a connector you need is
missing, ask a colleague who has it working, or IT if it needs an organisation
owner to enable it.

## Permissions are yours

Claude acts as you. That has three consequences:

- **It can reach only what you can reach.** A connector carries your access, so
  your app never sees data you are not allowed to see.
- **You approve what it does.** Claude asks before it runs a command or uses a
  tool, depending on your settings. Read the request before you approve.
- **You decide what is kept.** Ask Claude to keep summaries, totals and links
  in your files, never copies of messages or rows of customer data.
