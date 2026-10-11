---
title: Four roles
description: You are the owner, operator, builder and end user of your work app, and nobody else holds those roles for you.
order: 2
---

You hold all four roles in your work app: owner, operator, builder and end
user. Nobody else builds it, runs it or owns it for you. This page explains
what each role means in practice and why they belong to one person.

## The roles

| Role | It means | What you do | In Sam's week |
|---|---|---|---|
| Owner | The app, its code and its data are yours | Decide what the app is for and what goes in it | Sam decides People holds work contacts and working notes, nothing sensitive |
| Operator | You keep it running | Ask Claude to start the app, fix a problem, take a newer kit | Monday morning Sam asks Claude to start the app; it opens at localhost:9920 |
| Builder | You change and extend it | Describe a change, have Claude make it, check it | Sam asks for a "Next meeting" column in People |
| End user | You use it to do your job | Open it every day, tick tasks, read the wiki | Before a Tallow & Co meeting Sam reads their follow-ups and notes |

You do not need React or the command line for any of them. You direct Claude
in the Code tab of the Claude desktop app. Claude writes the code and runs the
commands, and asks your approval before it does.

## Why one person holds all four

In most software, the four roles belong to different people. A team builds,
IT runs, a manager owns, and you use. Every change then crosses a hand-off,
and small changes never happen, because they are not worth a request.

When you hold all four:

- **You notice what needs to change**, because you use the app every day.
- **You can make the change at once**, because you are the builder.
- **You can check it works**, because you run it on your own laptop.
- **You decide if it stays**, because you own it.

The loop from "this column is in the wrong place" to "fixed" takes minutes,
not a ticket.

## What other people do

You are not alone. Other people help, but none of them builds or runs your
app for you.

| Who | What they do | What they do not do |
|---|---|---|
| Claude | Writes the code and the data at your direction, explains each change, suggests one next step | Decide what your app is for |
| A power user | Mentors you: shows what they built, reviews a module file when you ask | Build your modules for you |
| IT or an organisation owner | Make sure tools are on your laptop and enable connectors such as Microsoft 365 | Own or run your app |

Power users are mentors, not builders. If a colleague offers to "set it up
for you", ask them to show you how instead. See
[Working with a mentor](/wiki/advanced/mentors).

## A worked example

Sam's People table shows Name, Role, Organisation and Last contact. Before
customer meetings they keep scrolling to find who they meet next. They take
each role in turn:

1. **End user.** Sam notices the problem: they want to see the next meeting
   date beside each person.
2. **Builder.** Sam asks Claude: "Add a column to People called Next meeting.
   It is a date. Show it after Last contact." Claude changes the People module
   file and tells Sam what changed.
3. **Operator.** The page reloads. The column is empty and the table looks
   right. If something had broken, Sam would describe what they see and ask
   Claude to fix it.
4. **Owner.** Sam decides to keep it, and asks Claude to save a checkpoint so
   they can go back if they change their mind.

No one else was involved, and it took a few minutes.

{% callout title="The test" %}
Every proposal for the app, from you, Claude or a colleague, is checked the
same way: does it grow your ability to build, run and change your own app? If
it makes you depend on someone else, it is wrong.
{% /callout %}

## What this asks of you

Holding four roles sounds like a lot. In practice it asks three habits:

- **Describe what you want in plain words.** Claude handles the code.
- **Look at the result before you keep it.** Check the screen, and read
  enough of what changed to steer. See [How you build](/wiki/idea/vibe-coding).
- **Save checkpoints.** Ask Claude to save one before a bigger change, so one
  step back is always possible. See [Checkpoints](/wiki/advanced/checkpoints).

The [Learn](/wiki/learn) course builds these habits one lesson at a time.

Next: [How you build](/wiki/idea/vibe-coding).
