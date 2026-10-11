---
title: "Lesson 2: Tell Claude who you are"
description: Claude interviews you about your role and writes your About page.
order: 3
---

In this lesson Claude interviews you about your job and writes the About page from your answers. If you started from the setup prompt in [lesson 1](/wiki/learn/start), Claude has already interviewed you once: use this lesson to check About, correct it, or run a fuller interview. Time: 10 minutes.

## Goal

About describes your real role, in your words, and Claude reads it every time it helps you.

## Why it matters

About is how Claude knows who you are. With it, Claude can suggest columns that fit your work, draft tasks in your language and tell a customer from a colleague. Without it, every answer is generic. It is also the first time you see the pattern you will use all through the course: you talk, Claude writes the file, the screen updates.

## Steps

1. **Open About** in your browser. It shows the role Claude wrote in lesson 1, or the example role, a customer success manager at Brightlane, if Claude has not interviewed you yet. Keep the tab open.
2. **Start the interview.** In the Code tab, type:

   "Interview me to fill in About. Ask one question at a time, in plain words. Cover my job title, my team, my organisation, what my role is for, who I work with most, and what the first months are about. When you have enough, show me the draft before you write it."

3. **Answer each question.** Write the way you would explain your job to a new colleague. Short answers are fine. If a question does not fit your job, say so and Claude moves on.
4. **Read the draft.** Claude shows you the page before it writes it. Correct anything that is wrong: "My team is called Customer Success, not Account Management."
5. **Approve it.** Say "Write it." Claude replaces the example with your page.
6. **Watch the About tab.** Within a few seconds, the page reloads by itself and shows your role.
7. **Test it.** Ask Claude something that needs About:

   "Based on my About page, which three columns would be most useful in a module for the customer accounts I look after?"

   Keep the answer. You use it in lesson 7.

## What you see

About now shows your job title as the page title and a few short paragraphs about your role. You cannot edit About on screen; it is read-only. To change it later, ask Claude: "Update About: I now also look after our accounts in Germany."

## What goes in About, and what does not

| Goes in About | Stays out of About |
|---|---|
| Your job title, team and organisation | Numbers such as targets or volumes; targets belong in Goals, volumes in the systems that measure them |
| What the role is for | Private details about you or anyone else |
| Who you work with, in general terms | Lists of names; those belong in People |
| What you are focused on now | Tasks; those belong in Tasks |

{% callout title="Why Claude asks instead of guessing" %}
The rule in your app is that Claude fills About only by interviewing you. It never fills it from guesses or from documents on its own. Your role is yours to describe.
{% /callout %}

## You are done when

- Claude has interviewed you and you approved the draft.
- About shows your role, not the Brightlane example.
- You have asked Claude one question that uses About and kept its answer for lesson 7.

## What changed on disk

| File | What happened |
|---|---|
| `app/data/about.md` | Claude replaced the example with your role |

`about.md` is a Markdoc page, a plain text file. Its top lines hold your title, team and organisation, and the rest is your role in prose. Ask Claude to show it to you: "Show me about.md and explain its parts." To learn more about the format, see [Wiki and About](/wiki/how-it-works/wiki-and-about).

## Sam's interview

In lesson 1, Claude asked Sam a few quick questions. Here Sam asked for the fuller interview, and Claude asked seven questions. The answers were short: "Customer success manager." "Customer Success team, Brightlane." "I keep our mid-size customers happy, renewing and growing." "Mostly heads of operations and IT leads at our customers, and Product and Support inside Brightlane." "I am new, so the first months are about learning the accounts and getting the renewals right."

Claude showed Sam a draft of three paragraphs. Sam changed one line, from "manages accounts" to "keeps customers happy, renewing and growing", and said "Write it." The About tab reloaded with the new page.

Then Sam asked which columns would help in an accounts module. Claude suggested plan, renewal date and health. Sam wrote them down for lesson 7.

Next: [Lesson 3: Set your goals](/wiki/learn/goals).
