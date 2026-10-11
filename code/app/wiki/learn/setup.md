---
title: Before you start
description: What must be on your laptop before the first hour starts, and where your setup prompt comes from.
order: 1
---

Before lesson 1 you need a few things on your laptop and a setup prompt to paste. This takes about five minutes if the tools are already installed, and it happens before the hour's clock starts.

If you are reading this inside your own running work app, your setup is done. Skip to [Lesson 1](/wiki/learn/start).

## Goal

Your laptop has everything the first hour needs, and you have the prompt that makes your app, so setup takes minutes and does not fail.

## Why it matters

The first hour only works if nothing stops you in the first ten minutes. Installing tools, waiting for an admin or signing in to a service eats the hour. So the tools go on first, and the first hour needs no connectors at all.

## What you need

| What | Why | How to check |
|---|---|---|
| The Claude desktop app | You talk to Claude here | It opens and you are signed in with your work account |
| The Code tab in the desktop app | This is where Claude works on your app's folder | You see a Code tab at the top of the app |
| Node.js, version 20.12 or later | Your app runs on it, and the command that makes it needs it | Ask Claude (see below) |
| Git | The command that makes your app uses it to fetch the starter kit | Ask Claude (see below) |
| A folder to work in | Claude makes your app in a new folder inside it, called `my-work` | Your Documents folder is fine |

Node.js, Git and the Claude desktop app are usually installed for you by IT before the course. If one is missing, ask IT; do not install tools in the middle of the first hour.

## Steps

1. **Open the Claude desktop app** and sign in with your work account.
2. **Open the Code tab** and choose the folder Claude should work in, such as your Documents folder. Your app gets its own new folder, `my-work`, inside it, so there must not already be a `my-work` folder with files in it.
3. **Ask Claude to check your laptop.** Type:

   "Check that this laptop is ready for a work app: which version of Node.js is installed, is it 20.12 or later, and is Git installed? Do not install anything yet. Tell me in plain words what is missing."

4. **Read Claude's answer.** If something is missing, stop here and ask IT.
5. **Get your setup prompt.** Open [starta.dev/create](https://starta.dev/create) in your browser. Pick a look (theme, colour, font and logo) and watch the preview change, then click **Get Code** and copy the prompt on the Prompt tab. You can also skip the page and use the prompt in [Lesson 1](/wiki/learn/start), which gives the default look.

## What you see

Claude asks for your approval before it runs anything on your laptop. That is normal: Claude runs commands for you, and you approve them. Each approval box shows the command Claude wants to run. You do not need to understand every command, but read the line Claude writes above it, which says what it is for.

Claude then answers with something like: "Node.js 22 and Git are installed. Node.js 22 is newer than 20.12. You are ready to start."

On starta.dev/create you choose from five themes (Neutral, which is shadcn/ui's default look and the default here, then Notion, Airbnb, Stripe and Neo-brutalist), eight colours (Grey is the default), six fonts (Geist is the default) and 48 logos (Rocket is the default). You can change the look later by asking Claude.

{% callout title="Not built yet: a preflight check" %}
The kit is meant to check your laptop by itself and say what is missing before anything else happens. That check does not exist yet, so you ask Claude to do it, as in step 3.
{% /callout %}

## Where your app comes from

Your app is copied from a starter kit kept in a public repository on GitHub, `productvibe/starta`. The prompt asks Claude to run one command, which fetches the kit and makes your app in `my-work`. You need no GitHub account and no address to paste: the prompt holds everything.

## You are done when

- The Claude desktop app is open and you are signed in.
- The Code tab is open on the folder you work in.
- Claude has confirmed Node.js 20.12 or later and Git are installed.
- You have copied your setup prompt from starta.dev/create, or you will use the one in lesson 1.

## What changed on disk

Nothing. Claude only looked.

## Sam's setup

Sam opened the Code tab on their Documents folder and pasted the check prompt. Claude asked to run two commands, Sam approved them, and Claude replied that Node.js and Git were installed and new enough. Then Sam opened starta.dev/create, kept the default look, clicked **Get Code** and copied the prompt. Total time: four minutes.

Next: [Lesson 1: Start your app](/wiki/learn/start).
