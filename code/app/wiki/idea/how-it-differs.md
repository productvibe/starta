---
title: How it differs
description: How a work app compares with a personal OS, a company brain, Excel, Notion and Power BI.
order: 5
---

A work app is personal like a personal OS, structured like a company brain,
and has a custom app on top. This page compares it with the ideas and tools
you already know, so you can tell what it is for and what it is not for.

## Personal OS, company brain, work app

A **personal OS** is one person's notes and files, used with an AI chat. A
**company brain** is a shared, governed knowledge platform for a team or a
whole company. A work app sits between them.

| | Personal OS | Company brain | Work app |
|---|---|---|---|
| Belongs to | One person | A team or company | One person |
| Interface | Chat and files | A shared platform | A custom app you build |
| Structure | Folders and markdown | Governed, with permissions | A JSON file per module; Markdoc for About and the wiki |
| Who changes it | You | An owner or admin | You, by directing Claude |
| Best at | Capturing what you know | Sharing what everyone needs | Running your own job day to day |

The difference that matters most is the interface. Notes in a personal OS
hold what you know but do not show it back in a useful shape. A work app has
screens made for your job: a task list you tick, a table of accounts you
sort, a list of goals that shows which are on track.

## Excel, Notion, Power BI

You will keep using these tools. A work app does not replace them; it works
beside them.

| Tool | What it is good at | How a work app relates to it |
|---|---|---|
| Excel | Calculating, modelling, workbooks others expect | A workbook that is the master stays the master. Your app keeps only what has no other home, such as your notes on it |
| Notion | Shared pages and databases for a team | Your app is yours alone, on your laptop, and Claude builds its screens to fit your job |
| Power BI | Governed dashboards for many viewers | Numbers stay in Power BI. Your app holds the notes, tasks and goals around them |

Three differences run through the table:

- **You build the screen.** In Excel or Notion you fit your work into the
  tool's shapes. In a work app you describe the shape you want and Claude
  builds it.
- **Claude can read and write all of it.** The data is plain files on your
  laptop. Claude keeps it current, answers from it, and changes the app itself
  when you ask.
- **It reads systems of record; it is not one.** Shared numbers and documents
  stay in the warehouse, Power BI, Excel and SharePoint. See
  [Principles](/wiki/idea/principles).

## A worked example

Sam's account numbers come from the warehouse. Their colleagues look at them
in Power BI. Sam's account notes used to be in a notebook, and their follow-ups
in Outlook flags.

| Need | Before | With a work app |
|---|---|---|
| What Sam knows about Tallow & Co | Search a notebook | A row in their Accounts module and a wiki page, both read by Claude |
| What Sam promised Daniel Reyes | Scroll Outlook | A task in Tasks, linked to Daniel's row in People |
| A brief before the meeting | Build it by hand from four tools | Ask Claude: "Write me a brief for the Tallow & Co business review from my app." |

Power BI stays the place where numbers are governed and shared. Outlook stays
the place where messages live. Sam's work app is where they run their own job.

{% callout title="When another tool is the better choice" %}
If many people need to see the same live numbers, use Power BI. If a team
needs to edit the same pages, use a shared tool. A work app is for one
person's job, and it runs on your laptop, for you.
{% /callout %}

## What is the same as tools you know

Some things will feel familiar:

- **Tables with columns, sort and filter**, as in Excel. There are no
  formulas yet.
- **Pages with headings and links**, as in Notion or a wiki. The wiki in your
  app is plain Markdown with a few extra tags.

To see how the pieces fit together, go to [How it works](/wiki/how-it-works).
