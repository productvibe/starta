---
title: The wiki and About
description: How wiki pages and your About page are written, why they use Markdoc, and how folders make the tree.
order: 4
---

Two modules hold prose rather than rows. The **Wiki** holds what you learn and
how your work works, as pages. **About** holds one page: your role. Both are
Markdoc files, which is Markdown with a short list of extra tags. This page
explains how they are stored, how the tree is built, and why the format is
Markdoc.

## Wiki pages are files

Each page is one `.md` file under `app/wiki/`. A page starts with a short
header, then the text:

```
---
title: Tallow & Co
description: How Tallow & Co uses Brightlane, who is who, and what they expect.
order: 1
---

Tallow & Co is our largest account. Maya Okafor runs operations there.
```

| Header key | What it does |
|---|---|
| `title` | The page's title, in the tree and at the top of the page |
| `description` | One sentence under the title, and in search |
| `order` | Its place among its neighbours in the tree, lowest first |
| `icon` | For a folder's landing page: the mark beside it in the tree |
| `status: draft` | Marks a page that is not finished yet |

The text is ordinary Markdown: headings, lists, tables, links, bold. Pages link
to each other by address, such as `/wiki/how-it-works/data-files`.

## Folders make the tree

The wiki's left-hand tree is the folder structure:

- a **folder** is a section, such as `how-it-works/`;
- the folder's **`index.md`** is its landing page and carries the section's
  title and order;
- a folder without an `index.md` is titled from its name and sorts after the
  ordered items.

So the file `app/wiki/how-it-works/data-files.md` is the page at
`/wiki/how-it-works/data-files`. Keep your own pages in folders of your own,
beside the wiki's sections. For example, Sam keeps `accounts/`, with one page
per customer account.

## What a page may contain

Besides Markdown, a page may use only three things:

| Allowed | What it is |
|---|---|
| A callout | A set-off note with a title |
| A figure | An image with a caption, from `app/public/wiki/` |
| Three variables | The app's name, id and address, filled in when the page is shown |

A callout looks like this on the page:

{% callout title="A callout" %}
A short note set off from the text, for a warning or a rule worth seeing.
{% /callout %}

Anything else fails the build, with an error that names the page and the line.
That is deliberate: it keeps every page safe to render and consistent. The
writing rules Claude follows are in [About this wiki](/wiki/about).

## Why Markdoc

Markdoc was chosen over MDX, the other common format for pages with extra
tags, for four reasons:

- **Written text does not break pages.** Valid Markdown is valid Markdoc. MDX
  is compiled as code, so a stray `<` or `{` pasted from an email can stop a
  page from building.
- **Content cannot run code.** The wiki takes in outside material such as
  messages and articles. MDX can run JavaScript; Markdoc cannot.
- **Content stays data.** A page is read and shown at the moment you open it,
  with no build step per page.
- **Checking is built in.** Markdoc validates each page against the allowed
  tags, so a mistake is caught, not shown half-broken.

What is given up: MDX allows any component anywhere and is better known, so the
allowed tags are listed in the app's instructions for Claude and every page is
checked.

## About is your role

About is the profile block, with one file: `app/data/about.md`. Its header
holds your title, team and organisation, and the text describes your role in a
few paragraphs. It holds no figures.

```
---
title: Customer success manager
team: Customer Success
organisation: Brightlane
---

The role keeps Brightlane's mid-size customers happy, renewing and growing.
```

About is drawn like a wiki page: the title at the top, the prose below. The
team and organisation stay in the file and are not printed.

Three things set About apart:

- **It is read-only on screen.** Claude writes it.
- **Claude fills it by interviewing you**, never by guessing. Ask: "Interview me
  about my role and fill in About."
- **It tells Claude who you are.** Point Claude at it ("Read my About first")
  and its help fits your role, your team and your customers.

It sits last in the sidebar.

## Worked example

After their first meeting with Maya Okafor at Tallow & Co, Sam pastes their
notes into the Code tab and asks:

"Make a wiki page for Tallow & Co in an accounts folder, from these notes. Keep
the rules and what I learned, leave out the small talk."

Claude creates `app/wiki/accounts/tallow-co.md`, and `accounts/` appears in the
tree as a new section. A month later Sam asks Claude to add what changed, and
the page grows with them.

To write pages from meetings or documents step by step, see
[Add a wiki page](/wiki/guides/wiki-pages).
