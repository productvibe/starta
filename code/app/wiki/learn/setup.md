---
title: Before you start
description: What must be on your laptop before the first hour starts, and how to check it.
order: 1
---

Before lesson 1 you need three things on your laptop and one empty folder. This takes about five minutes if the tools are already installed, and it happens before the hour's clock starts.

If you are reading this inside your own running work app, your setup is done. Skip to [Lesson 1](/wiki/learn/start).

## Goal

Your laptop has everything the first hour needs, so setup takes minutes and does not fail.

## Why it matters

The first hour only works if nothing stops you in the first ten minutes. Installing tools, waiting for an admin or signing in to a service eats the hour. So the tools go on first, and the first hour needs no connectors at all.

## What you need

| What | Why | How to check |
|---|---|---|
| The Claude desktop app | You talk to Claude here | It opens and you are signed in with your work account |
| The Code tab in the desktop app | This is where Claude works on your app's folder | You see a Code tab at the top of the app |
| Node.js, version 20.12 or later | Your app runs on it, and the setup tool needs it | Ask Claude (see below) |
| An empty folder | Your work app will live here | You made it and it has no files in it |

Node.js and the Claude desktop app are usually installed for you by IT before the course. If one is missing, ask IT; do not install tools in the middle of the first hour.

## Steps

1. **Open the Claude desktop app** and sign in with your work account.
2. **Make an empty folder** for your app, for example `my-work` in your Documents folder. Use a short name with no spaces. The setup tool refuses a folder that already has files in it, so keep it empty.
3. **Open the Code tab** and choose your empty folder as the folder Claude works in.
4. **Ask Claude to check your laptop.** Type:

   "Check that this laptop is ready for a work app: which version of Node.js is installed, and is it 20.12 or later? Do not install anything yet. Tell me in plain words what is missing."

5. **Read Claude's answer.** If something is missing, stop here and ask IT. If all is in place, go to lesson 1.

## What you see

Claude asks for your approval before it runs anything on your laptop. That is normal: Claude runs commands for you, and you approve them. Each approval box shows the command Claude wants to run. You do not need to understand every command, but read the line Claude writes above it, which says what it is for.

Claude then answers with something like: "Node.js 22 is installed, which is newer than 20.12. You are ready to start."

{% callout title="Not built yet: a preflight check" %}
The kit is meant to check your laptop by itself and say what is missing before anything else happens. That check does not exist yet, so you ask Claude to do it, as in step 4.
{% /callout %}

## Where the starter kit comes from

Your app is copied from a starter kit: a set of files kept in a company repository. Claude fetches it in lesson 1. The kit's final address is not settled yet. Use the address you were given with this course, and paste it into the setup prompt when Claude asks for it. If the repository is private, you need to be signed in to GitHub on this laptop; Claude will tell you if you are not.

## You are done when

- The Claude desktop app is open and you are signed in.
- The Code tab is open on an empty folder.
- Claude has confirmed Node.js 20.12 or later is installed.
- You know the starter kit's address.

## What changed on disk

| File or folder | What happened |
|---|---|
| Your empty folder | You created it. Nothing is in it yet |

Nothing else changes. Claude only looked.

## Sam's setup

Sam made a folder called `sam-work` in their Documents folder, opened it in the Code tab and pasted the check prompt. Claude asked to run one command, Sam approved it, and Claude replied that Node.js was installed and new enough. Sam had the kit address from the course invite. Total time: four minutes.

Next: [Lesson 1: Start your app](/wiki/learn/start).
