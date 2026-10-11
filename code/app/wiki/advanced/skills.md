---
title: Skills
description: How to teach Claude a job you repeat, so it is done the same way every time.
order: 6
---

A skill is a written set of instructions that Claude follows for one job,
saved as a file in your app. Instead of explaining the job each time, you
explain it once, check that it works, and from then on ask for it by name.
Claude reads the skill when the job comes up and follows its steps and rules.

## When you need it

- You type the same long request every week, such as preparing an account
  brief or planning your week.
- The job has rules you do not want Claude to forget: which sources, which
  order, what never to do.
- The result should look the same each time, so you can compare one week with
  the next.

If you have done the job only once, it is too early. Do it by conversation two
or three times first, then turn what worked into a skill.

## How it works in your app

- **A skill is a folder** in `.claude/skills/<name>/` at the top of your app,
  with a file called `SKILL.md`. The file starts with a `name` and a one-line
  `description` that tells Claude when to use it, followed by the steps and
  rules in plain words.
- **Claude finds it by itself.** In the Code tab, Claude sees the skills in
  your app's folder. It uses one when your request matches the description,
  or when you name it, for example by typing `/account-brief`.
- **It is yours.** A skill is a file like any other, saved in your checkpoints
  and changed by asking Claude.

{% callout title="Not built yet" %}
The kit's own skills are planned but not written, such as a daily agenda for
Tasks. Until they arrive, you can write your own versions. Ask Claude "Which
skills does my app have?" to see what is there.
{% /callout %}

## A good skill says

| Part | Example for an account brief |
|---|---|
| When to use it | Before a business review with a customer |
| What it reads | The customer's People rows, open Tasks for that account, the account's wiki page |
| What it writes | Nothing; the brief comes back in the conversation |
| The steps, in order | People, open tasks, notes from the wiki page, questions to ask |
| The rules | No message bodies; ask before writing to any data file |
| What done looks like | The brief fits on one screen and names each source |

## Example

Every Monday Sam asks for the same thing: open tasks due this week, grouped
by account, with anyone they have not contacted in a month. After the third
Monday they ask:

"Turn what you did for my week plan into a skill called week-plan. Read Tasks
and People only, and write nothing. Use the same layout as today."

Claude writes `.claude/skills/week-plan/SKILL.md` and shows it to them. Sam
reads it and adds one rule: "Leave out tasks with status blocked; list them at
the end instead." The next Monday Sam types "Run my week plan" and gets the
same layout.

## What to ask Claude

- "Which skills does my app have? Describe each in one line."
- "Turn what we did today into a skill called … ."
- "Show me the week-plan skill and explain each step."
- "The week-plan skill missed the blocked tasks. Change the skill, not only
  the answer."
- "Run the week-plan skill, and tell me where you were unsure."

## Pitfalls

- **Narrow beats clever.** One job per skill. A skill that "does my whole
  morning" is hard to check and hard to fix.
- **Say what it may write.** A skill that writes data files should name them,
  and ask before writing to a file you also edit on screen.
- **Fix the skill, not the answer.** When a result is wrong, ask Claude to
  change the skill file, or the same mistake comes back next week.
- **Check the description.** If Claude does not pick a skill up by itself, its
  description does not match how you ask. Ask Claude to rewrite it with the
  words you use.
