---
title: Principles
description: The five rules behind every work app, and the one test every change has to pass.
order: 4
---

Five principles shape how a work app is built and grown. They decide what the
kit gives you, what you build yourself, and what stays outside the app. When
you are unsure about a change, check it against the test at the end.

## 1. Nothing arrives finished

Your app starts small on purpose, with five modules: About, Goals, Tasks,
People and Wiki. Every module opens with example data,
so you never face an empty screen, but none of it is yours yet.

You make it yours by changing it: your role in About, your people, your
tasks, your columns, your modules. An app that arrived finished would fit
someone else's job.

## 2. The starter set is a worked example

The starter modules and their blocks are starting material. Read them, change
them and outgrow them.

- **The starter set** is the same for everyone: About, Goals, Tasks, People
  and Wiki. There are no templates per job. You shape the set to your own job,
  and build your own modules on it.
- **A block** is the reusable piece a module is built from. Tasks and People
  are two modules on one block, the datatable, in two views. That shows you
  how to add your own: a new module on an installed block is one module file
  and one data file, with no new code.

The code is copied into your app, so you own every line. There is no package
that updates behind your back. When the kit has something newer, you choose
whether to take it. See [Kit updates](/wiki/advanced/kit-updates).

## 3. Systems of record stay where they are

Your company already has homes for its data: the warehouse for numbers,
Excel workbooks for budgets, email for messages, Jira for tickets.
Your app reads those systems. It does not copy them or replace them.

| Kind of data | Home | What the app keeps |
|---|---|---|
| Budgets in workbooks | Excel | Nothing, unless you choose to read a figure from it |
| Account notes, follow-ups, what you learned | Nowhere else | All of it: your app is the home |

The app stores only what has no other home. That keeps it small, keeps
numbers trustworthy, and keeps other people's words in the tools they wrote
them in.

## 4. Power users are mentors

Some colleagues know more: they have built several modules, or know the
code. They help you learn. They do not build your app
for you.

A good mentor shows you what they built, reviews a module file when you ask, and
points you to the right page. A mentor who builds your module leaves you with
something you cannot change. See [Working with a mentor](/wiki/advanced/mentors).

## 5. You are productive within an hour

The kit is made so that your first hour ends with a running app, your own
content in it, a module you designed, and a change you made yourself. If a
first run takes longer, the kit needs fixing, not you. After that hour, you
teach yourself, with Claude and this wiki as your guide.

## The test for every change

Every proposal, from you, from Claude or from a colleague, gets one question:

{% callout title="The test" %}
Does it grow your ability to build, run and change your own app? If it makes
you depend on someone else, it is wrong.
{% /callout %}

Some examples:

| Proposal | Passes? | Why |
|---|---|---|
| Claude explains each change in plain words and suggests one next step | Yes | You learn as you build |
| A colleague offers to build your Accounts module for you | No | You get a module you did not design and cannot steer |
| A colleague shows you their Accounts module, and you build yours from it | Yes | You learn from a worked example and own the result |
| Copying every warehouse row into a data file | No | The app becomes a second system of record that drifts |

## A worked example

A colleague in Customer Success offers to send Sam a finished Accounts module
with twenty columns. Sam checks it against the test. They would not know what
half the columns are for, and they could not change them with confidence. So
they ask the colleague to show them the module for ten minutes instead. Then
Sam asks Claude:

> "Build an Accounts module on the datatable block. Columns: Account, Plan,
> Renewal date, Health, Main contact. Start empty."

Sam has five columns they understand, and they can add the sixth themselves
when they need it. Their account notes live in their app, because they have
no other home. The accounts' revenue figures stay in the CRM.

Next: [How it differs](/wiki/idea/how-it-differs).
