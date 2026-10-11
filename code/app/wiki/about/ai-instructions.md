---
title: Writing pages
description: How wiki pages are written, so that you and Claude keep the wiki consistent.
order: 1
---

Claude follows these rules when it writes a page for you. You can ask Claude
to apply them to a page you wrote yourself: "Tidy this page up using the
wiki's writing rules."

## Writing a page

- **Lead with the answer.** The first lines say what the page is for.
- **One table or one example carries the page.** A page that needs more is two
  pages.
- **Rules, processes and what you learned, not news.** A weekly update is a
  source, not a page. Numbers belong in the systems that measure them. A page
  quotes a number only when it is a target or a rule.
- **Date anything that changes**, for example "as of 2026-09".
- **Say it once.** Link to the page that holds a fact instead of repeating it.
- **Short words, short sentences.**
- **End with `## References`** when a page is built from sources: at most four,
  such as documents, presentations, Teams posts and emails, each with its link
  and date.

## The files

- One `.md` file per page under `app/wiki/`, in Markdoc. Plain Markdown is
  valid as it is. A folder is a section, and its `index.md` is the landing page.
- Frontmatter: `title`, `description`, `order`, and `status: draft` for a page
  that is not finished yet. Pages link to each other by URL, such as
  `/wiki/learn`.
- Keep your own pages in folders of your own, beside the wiki's own sections
  (`idea/`, `how-it-works/`, `learn/`, `guides/`, `advanced/`, `reference/`).
  For example, `accounts/` for what you learn about each customer account.

## Tags

Besides Markdown, a page may use only these. Anything else fails the
build, which keeps pages safe and consistent:

- `{% callout title="…" %}` … `{% /callout %}`: a set-off note;
- `{% figure src="/wiki/<file>" caption="…" /%}`: an image with a caption, with
  the file in `app/public/wiki/`;
- the variables `\{% $appName %}`, `\{% $appId %}` and `\{% $appUrl %}`. A
  backslash before one prints it as written.
