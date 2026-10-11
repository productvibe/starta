---
title: Start your app on another day
description: Get your app running again after you closed the Claude app or restarted your laptop.
order: 7
---

Your app runs on your laptop only while Claude keeps it running. When you
close the Claude desktop app or restart your laptop, it stops. To start it
again, open the Code tab on your app's folder and ask Claude to start it. It
takes about a minute.

Your data does not go anywhere when the app stops. It sits in the files in
your app's folder, and the app reads them again when it starts.

## Steps

### 1. Open the Code tab on your app's folder

Open the Claude desktop app and go to the Code tab. Choose the same folder
you set up in [Lesson 1](/wiki/learn/start), such as `my-work`. Claude reads
the app's instructions from that folder, so the folder matters: in another
folder, Claude does not know your app.

### 2. Ask Claude to start the app

"Start my app and give me the link."

Claude checks whether the app is already running on port 9920. If not, it
starts it, and may ask you to approve the command. When it is ready, Claude
says so and gives you http://localhost:9920.

### 3. Open it in your browser

Open http://localhost:9920. The app opens on the first module in the
sidebar, Tasks unless you changed the order. Bookmark the address: it is the
same every day.

### 4. Start your day

Now ask for what you need, for example:

"What is due today and this week in Tasks? List anything overdue first."

[Lesson 8](/wiki/learn/daily) has prompts for the start and the end of the
day.

## Worked example: Monday morning

Sam closed their laptop on Friday. On Monday they opened the Claude desktop
app, picked the Code tab and their `my-work` folder, and typed:

"Start my app. Then tell me what is due this week, who I have not been in
touch with for a month, and which goals are off track."

Claude started the app, said it was running at http://localhost:9920, and
listed four tasks, two people (Daniel Reyes at Harbourline Logistics and one
other) and one goal off track: Renewals closed. Sam opened the app from their
bookmark and called Daniel first.

## What to check

- The browser shows your app at http://localhost:9920, with your own rows,
  not the example ones.
- The sidebar lists every module you built.
- A change you made on screen last time is still there.

## Common problems

| Problem | What to do |
|---|---|
| "This site can't be reached" | The app is not running yet. Ask Claude: "Is my app running? Start it if not." |
| Claude does not know your app | The Code tab is open on the wrong folder. Choose your app's folder and ask again. |
| The app shows example data, not yours | You may have opened another copy of the app. Ask: "Which folder is this app running from?" |
| Claude says port 9920 is in use | Something else holds the port, perhaps an earlier copy of your app. Ask: "What is using port 9920? If it is my app from before, use it; if not, tell me what it is." |
| Claude says something is missing, such as Node.js | Your laptop may have been updated. Ask Claude what is missing and how to install it; see [Before you start](/wiki/learn/setup). |
| The app stops while you work | Closing the conversation or the Claude app can stop it. Ask Claude to start it again. |

{% callout title="Keep the conversation open" %}
Leave the Code tab open while you use the app during the day. You will want
to ask Claude things anyway, and it keeps the app running for you.
{% /callout %}
