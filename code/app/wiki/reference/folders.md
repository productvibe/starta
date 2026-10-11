---
title: Folders and files
description: The app's folder tree, what each folder and file is for, and which ones are yours to change.
order: 5
---

This page maps your app's folder: what lives where, and who writes it. You
rarely open these files yourself. Knowing the map lets you read what Claude
changed and point it at the right place: "Change the hint on the Due field in
the Tasks module file."

## The tree

```
your-app/
  CLAUDE.md                  how Claude works on your app
  README.md                  the app's facts: words, data, module and wiki formats
  starta.json                what the starta command installed, and from which kit
  product/
    DESIGN.md                the design rules, such as how tables look
  app/                       the app itself
    data/                    your content: one data file per module
    wiki/                    the wiki pages
    public/                  the app's icon
    src/
      modules/               one module file per module
      blocks/                one folder per block
      data/                  the data helper, fields and statuses
      wiki/                  the wiki's reader, tree, search and downloads
      components/ui/         the interface pieces screens are built from
      components/            the shell's own pieces: page, search, settings, brand
      routes/                the shell, Settings and search
      lib/                   small helpers, including module-icons.ts
      theme.css, theme.json  your colours, fonts and corners
    package.json             the software the app uses
```

The kit your app was copied from has one more folder, `kit/`, which your app
does not receive: `kit/starter.json` lists the starter modules (`about`,
`goals`, `tasks`, `people`, `wiki`).

## What is in each folder

| Folder or file | Holds | Who writes it |
|---|---|---|
| `app/data/` | `about.md`, `goals.json`, `tasks.json`, `people.json`, and one file per module you add | You on screen (datatable rows), Claude for everything else |
| `app/wiki/` | One `.md` page per file; a folder is a section, its `index.md` is the landing page | Claude, at your request |
| `app/src/modules/` | `about.json`, `goals.json`, `tasks.json`, `people.json`, `wiki.json`, and one file per module you add | Claude |
| `app/src/blocks/` | `profile/` and `datatable/` | The kit; Claude when you change a block |
| `app/src/data/` | `store.ts` and `store.server.ts` (every read and write), `fields.ts` (field kinds), `status.ts` (statuses and types) | The kit |
| `app/src/lib/module-icons.ts` | The icon names a module file may use | The kit; Claude to add an icon |
| `app/src/theme.css`, `theme.json` | The look of the app, written from a preset | The `starta` command; Claude when you ask for a new look |
| `CLAUDE.md` | The rules Claude follows on your app | You and Claude: add a rule when you settle one |
| `README.md` | The facts Claude reads first | The kit |
| `starta.json` | The kit's address and version, your modules and blocks, and a fingerprint of each kit file | The `starta` command only |

## Inside a block folder

| File | Holds |
|---|---|
| `block.json` | What the block needs: other blocks, extra software, starting folders |
| `routes.ts` | The pages one module on this block gets |
| `route.tsx` and other `.tsx` files | The screens |
| `README.md` | The data shape and rules, where there is one |

## The wiki's folders

| Folder | Section |
|---|---|
| `app/wiki/index.md` | The wiki's home page |
| `idea/` | The idea |
| `how-it-works/` | How it works |
| `learn/` | Learn, the course |
| `guides/` | Guides |
| `advanced/` | Advanced |
| `reference/` | Reference, this section |
| `about/` | How the wiki is written |

Keep pages about your own work in folders of your own beside these, such as
`accounts/`. The wiki shows any folder you add.

## Which files are yours

| Kind | Files | When the kit updates |
|---|---|---|
| Your content | `app/data/`, `app/wiki/` | Never overwritten. Copied once, then yours |
| Your modules | `app/src/modules/` | A kit module you did not change is updated; one you changed is kept |
| Code from the kit | `app/src/blocks/`, the rest of `app/src/`, `CLAUDE.md`, `README.md` | Replaced if you did not change it. If you both changed it, the kit's version is written beside yours as `<file>.kit` |

See [Kit updates](/wiki/advanced/kit-updates) for how a `.kit` file is merged.

## Folders to leave alone

| Folder | What it is |
|---|---|
| `app/node_modules/` | Software the app depends on, installed by Claude |
| `app/build/`, `app/.react-router/` | Generated when the app is built; rebuilt each time |
| `.git/` | The record of every checkpoint, once Claude has set up git. Claude works with it through git |
| `.claude/` | Claude's own settings for this folder |

None of these hold your content. If one goes missing, Claude can rebuild it,
except `.git/`, which holds your history.
