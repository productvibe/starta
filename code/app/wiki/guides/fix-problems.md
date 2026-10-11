---
title: When something breaks
description: What to do when the page is blank, shows an error, will not open, or will not save.
order: 6
---

When something breaks, Claude fixes it with you. Your part is to say what you
see and copy any message exactly. Nothing you do on screen can damage the
app's code, and a change Claude made can be taken back.

## The first three steps

1. **Reload the page** in your browser. Many problems go away.
2. **Copy what you see.** The exact error text, the address in the browser,
   and what you did last.
3. **Tell Claude:** "Since your last change, the People page shows this
   error: … I was adding a column. Find the cause and fix it."

If a recent change caused it, you can also say: "Take back your last change."

## What you see, and what to do

| You see | It usually means | Ask Claude |
|---|---|---|
| "This site can't be reached" or "Connection refused" at localhost:9950 | The app is not running. It stops when you close the Claude app or restart your laptop. | "Start my app." See [Start your app on another day](/wiki/guides/start-each-day). |
| A page that says "Oops!" with a message under it | Something in that page failed. In your app, the message says what. | "The Tasks page says: … Fix it." |
| "Could not read …tasks.json" | The data file has a mistake, often a missing comma or quote. | "tasks.json cannot be read. Find the mistake and fix it without losing rows." |
| "404" and "The requested page could not be found" | The address does not exist, often after a module's `id` changed. | Open the module from the sidebar, or "Why does /people show 404?" |
| A blank white page | The page failed before it could draw. | "The app shows a blank page at localhost:9950. Check the app's log and fix it." |
| "Changed on disk — reload" when you save a row | Claude, or another program, wrote the file after you opened the page. Nothing was saved. | Nothing. Copy what you typed, reload, and enter it again. |
| "… could not be saved. Reload to see what is stored" | The save failed for another reason. | Reload. If it happens again: "Saving a row in People fails. Find out why." |
| A module is gone from the sidebar | Its module file was removed, or has a mistake. | "Accounts is missing from the sidebar. Find out why." |
| The wiki fails after a new page | The page uses a tag the wiki does not allow. | "The wiki fails since the new page. Check its tags." |
| A change from Claude does not show | The page did not reload yet. | Wait five seconds, or reload the page. |

## Conflicts: two writers, one file

You and Claude both write your data files. When you open a row and Claude
writes the same file before you save, your save is refused, so it cannot
overwrite what Claude wrote. The sheet says that the module changed on disk
since the page loaded, and that nothing was saved.

To avoid it:

- Close any open row before you ask Claude to change that module's data.
- Let Claude finish before you edit on screen. The page reloads by itself
  within a few seconds of a change.

To recover: copy what you typed, reload the page, check whether your change
is already there, and enter it again if not.

## When Claude's fix does not work

- **Ask for the cause, not a fix.** "Before you change anything else, tell me
  what you think the cause is."
- **Go back one step.** "Take back everything you changed in the last ten
  minutes, then check the app opens." Claude can do this with git; see
  [Checkpoints](/wiki/advanced/checkpoints).
- **Start a new conversation** in the Code tab when a long one goes in
  circles. Open with what you see and what you already tried.
- **Ask a mentor.** A power user can look at the problem with you. See
  [Working with a mentor](/wiki/advanced/mentors).

## Worked example

Sam asked Claude to add a Customer column to People. When they opened People,
it said "Oops!" and "Could not read people.json: Unexpected token". They
copied the message and asked:

"People shows this error since you added the Customer column: Could not read
people.json: Unexpected token. Fix it without losing any rows."

Claude found a missing comma in the data file, fixed it, and checked that all
twelve rows were there. Sam reloaded People and saw their contacts, with the
new column empty.

## What to check after a fix

- The page that failed opens and shows your data.
- The other modules still open. Click through the sidebar once.
- Ask: "What was the cause, and what did you change?" See
  [Review a change](/wiki/guides/review-a-change).

{% callout title="Port 9950" %}
Your app always runs at http://localhost:9950. If Claude says something else
is using that port, ask it to find out what, and do not let it stop a program
you do not recognise.
{% /callout %}
