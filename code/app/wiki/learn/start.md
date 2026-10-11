---
title: "Lesson 1: Start your app"
description: Set up your work app with one prompt, open it in your browser and find your way around.
order: 2
---

In this lesson you give Claude one instruction, your work app opens in your browser, and you learn where everything is. Time: 9 minutes.

## Goal

Your app runs at `http://localhost:9920`, and you can name its modules and find Settings, Search and the wiki.

## Why it matters

You are the one who runs this app. Nobody starts it for you, so the first thing you learn is how to start it and what you are looking at. Every later lesson builds on this screen.

## Steps

1. **Ask Claude to set up your app.** In the Code tab, on your empty folder, type:

   "Set up a work app in this folder from the starter kit at <kit address>. Then start it on port 9920 and tell me when I can open it."

   Replace `<kit address>` with the address from [Before you start](/wiki/learn/setup).

2. **Approve the steps.** Claude copies the kit into your folder, installs what the app needs, and starts it. You approve each command. Installing takes a minute or two.
3. **Open the app.** When Claude says it is ready, open `http://localhost:9920` in your browser. Keep this tab open for the whole hour.
4. **Look at the sidebar.** You see five modules: Tasks, People, Goals, Wiki and About, with Settings at the bottom and a Search box at the top.
5. **Open each module once.** Click Tasks, then People, then Goals, then Wiki, then About. Each one already has example content in it.
6. **Open Settings.** Click Settings, then Tasks. This is the Tasks section. It shows the module's name, its block, its view, its data file and its fields. Settings is read-only: you change a module by asking Claude.
7. **Make one change on screen.** Go back to Tasks and tick a task done. It moves out of the Open list. Click Done at the top to see it there, then untick it.
8. **Ask Claude where things are.** Type:

   "Explain in five lines what is in this folder and where the data for Tasks lives."

## What you see

The app opens on Tasks. The examples belong to Sam, a customer success manager at Brightlane, a fictional software company, with customers such as Tallow & Co and Harbourline Logistics. You replace them with your own in lessons 2 to 5.

| Module | What it holds | What you can do on screen |
|---|---|---|
| Tasks | What you have to do, as a task list | Add, edit, delete and tick tasks |
| People | Who you work with, as a table | Add, edit and delete rows |
| Goals | What you are measured on, as cards of value against target, with On track or Off track | Add, edit and delete goals |
| Wiki | This course and the pages about the app | Read; Claude writes pages |
| About | Your role | Read; Claude writes it by interviewing you |

Tasks, People and Goals look different but are built from the same block, the datatable, in three views: a task list, a table and goal cards. Lesson 7 uses that block to build a module of your own. The full story is in [Modules and blocks](/wiki/how-it-works/modules-and-blocks).

{% callout title="The app runs on your laptop" %}
Nothing is hosted. The app runs on your own machine at localhost, and your data sits in files in your folder. If you close the Claude desktop app or restart your laptop, the app stops. To start it again on another day, see [Start your app again](/wiki/guides/start-each-day).
{% /callout %}

## If it does not open

Tell Claude what you see, in plain words: "The browser says it cannot reach localhost:9920." Claude checks whether the app is running and starts it again. More in [When something breaks](/wiki/guides/fix-problems).

## You are done when

- The app is open at `http://localhost:9920`.
- You have opened Tasks, People, Goals, Wiki and About.
- You have found the Tasks section in Settings.
- You have ticked a task done and unticked it.

## What changed on disk

Your empty folder now holds a whole app. These are the parts you will meet in this course:

| File or folder | What it is |
|---|---|
| `CLAUDE.md` | How Claude works on your app. Claude reads it first |
| `app/data/` | Your data: one file per module, such as `tasks.json` and `people.json`, and `about.md` for About |
| `app/src/modules/` | One file per module: its name, block, view and fields |
| `app/wiki/` | This wiki, as one page per file |
| `starta.json` | Which modules came from the kit |

When you ticked the task, the app wrote that change to `app/data/tasks.json`. Everything you do on screen ends up in a file like this.

## Sam's lesson

Sam pasted the setup prompt and approved four commands. Two minutes later Claude wrote: "Your app is running. Open http://localhost:9920." Sam clicked through the five modules, found that Maya Okafor at Tallow & Co was an example person, and ticked "Send Tallow & Co the renewal proposal" to see what happens.

Next: [Lesson 2: Tell Claude who you are](/wiki/learn/about).
