---
title: "Lesson 1: Start your app"
description: Paste one prompt, let Claude make and start your work app, answer its first questions, and find your way around.
order: 2
---

In this lesson you paste one prompt, Claude makes your work app and opens it in your browser, and it asks you a few questions about your job. Then you learn where everything is. Time: 9 minutes.

## Goal

Your app runs at `http://localhost:9950`, and you can name its modules and find Settings, Search and the wiki.

## Why it matters

You are the one who runs this app. Nobody starts it for you, so the first thing you learn is how to start it and what you are looking at. Every later lesson builds on this screen.

## Steps

1. **Paste your setup prompt.** In the Code tab, on the folder from [Before you start](/wiki/learn/setup), paste the prompt you copied from **Get Code** on starta.dev/create. If you skipped that page, paste this one, which gives the default look:

   "Make me my own work app in a folder called my-work, and get it running straight away.
   1. Run `npx github:productvibe/starta init my-work --preset fQnA`. It gives the app its look (theme Neutral, colour Grey, font Geist, logo Rocket) and its modules: Tasks, People, Goals, Wiki, About.
   2. From then on, work inside my-work and follow its CLAUDE.md.
   3. Start the app and open it in my browser.
   4. Then interview me about my role, one short question at a time, and fill in About from my answers.
   5. Ask me what I am measured on, and replace the example goals in Goals with mine: each with where it stood at the start, its target and its target date.
   6. Tell me in plain words what I can do next, such as adding my own tasks and people in place of the examples."

2. **Approve the steps.** Claude runs the command, which makes the `my-work` folder, copies the kit into it and installs what the app needs. Then Claude starts the app. You approve each command. Installing takes a minute or two.
3. **Open the app.** Claude opens `http://localhost:9950` in your browser. If it does not, open that address yourself. Keep this tab open for the whole hour.
4. **Answer Claude's questions.** Claude interviews you about your role, one short question at a time, and writes About from your answers. Then it asks what you are measured on and puts your goals in Goals. Short answers are fine. Lessons 2 and 3 show you how to check and improve what Claude wrote.
5. **Look at the sidebar.** You see the modules you picked, five unless you picked fewer: Tasks, People, Goals, Wiki and About, with Settings at the bottom and a Search box at the top.
6. **Open each module once.** Click Tasks, then People, then Goals, then Wiki, then About. Tasks and People still hold example content.
7. **Open Settings.** Click Settings, then Tasks. This is the Tasks page in Settings. It shows the module's name, its block, its view, its data file and its fields. A module's Settings page is read-only: you change a module by asking Claude. The Appearance page sets the colour of buttons and charts in your browser.
8. **Make one change on screen.** Go back to Tasks and tick a task done. It moves out of the Open list. Click Done at the top to see it there, then untick it.
9. **Ask Claude where things are.** Type:

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
Nothing is hosted. The app runs on your own machine at localhost, and your data sits in files in your folder. If you close the Claude desktop app or restart your laptop, the app stops. To start it again on another day, open the Code tab on your `my-work` folder; see [Start your app again](/wiki/guides/start-each-day).
{% /callout %}

## If it does not open

Tell Claude what you see, in plain words: "The browser says it cannot reach localhost:9950." Claude checks whether the app is running and starts it again. More in [When something breaks](/wiki/guides/fix-problems).

## You are done when

- The app is open at `http://localhost:9950`.
- Claude has asked about your role and your goals.
- You have opened Tasks, People, Goals, Wiki and About.
- You have found the Tasks page in Settings.
- You have ticked a task done and unticked it.

## What changed on disk

Claude made a new folder, `my-work`, and it now holds a whole app. These are the parts you will meet in this course:

| File or folder | What it is |
|---|---|
| `CLAUDE.md` | How Claude works on your app. Claude reads it first |
| `app/data/` | Your data: one file per module, such as `tasks.json` and `people.json`, and `about.md` for About |
| `app/src/modules/` | One file per module: its name, block, view and fields |
| `app/wiki/` | This wiki, as one page per file |
| `starta.json` | Which modules came from the kit, and the code of your look |

When you ticked the task, the app wrote that change to `app/data/tasks.json`. Everything you do on screen ends up in a file like this.

## Sam's lesson

Sam pasted the prompt from **Get Code** and approved four commands. Two minutes later the app opened in the browser at http://localhost:9950, and Claude started asking about Sam's role. After a few short answers about the job and the goals, Sam clicked through the five modules, found that Maya Okafor at Tallow & Co was an example person, and ticked "Send Tallow & Co the renewal proposal" to see what happens.

Next: [Lesson 2: Tell Claude who you are](/wiki/learn/about).
