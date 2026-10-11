# CLAUDE.md

How to work on this app. What the app is, its words, data model, module and wiki formats are in `README.md`: read it first.

## The person

- They own, run, build and use this app; they do not write React: they ask, you build.
- They work in the Code tab of the Claude desktop app and are semi-technical: never ask them to type a command; run it yourself and say what it did.
- Explain each change in plain words, say what changed on screen, and suggest one next thing to try; no jargon they did not use first.
- Change content before code: module files, data files and wiki pages; touch code only when content cannot do it.
- Write a settled rule down: one module's rule in its wiki page or a code comment, a rule for every change in this file.
- Screens show labels, values and figures only; reasoning goes in the wiki or a code comment.

## The dev server

- Keep it running on port 9950, always: check with `lsof -iTCP:9950 -sTCP:LISTEN` at the start of work, and if nothing listens, run `npm run dev` from `app/` in the background.
- If you stop it for any reason (install, config change, crash), start it again on 9950 at once and confirm it listens before you reply; never end a turn with it down.
- Never touch ports 9910, 9911, 9920–9923, 9930, 9940, 9951 and 9952: they belong to other apps.

## Changing code

- Run every `npm` command from `app/`.
- After a change, run `npm run typecheck`, `npm run lint` and `npm run build`, then open the module you changed.
- Build all UI from `app/src/components/ui/`; never hand-roll what a shadcn component does; tables follow `product/DESIGN.md` → Tables.
- Screens never touch files: every read and write goes through the data helper.
- Never import a runtime value from a `*.server.ts` file into client code: it is silently `undefined` in the browser.
- Before changing a module, read the `README.md` in its block's folder where there is one.

## Changing data

- Never edit a data file while its sheet is open on screen: the person's save would be refused as a conflict.
- Fill `about.md` only by interviewing the person.
- Use fictional people and organisations in seed and example data.

## Adding a module

- A module the kit has: run `starta add <id>` from the repo root (`starta list` shows them).
- After `starta update`, merge every `<file>.kit` it lists with the person, then delete it.
- A new module on an installed block: write `app/src/modules/<id>.json` and `app/data/<id>.json` (`{ "items": [] }` or the person's rows), as `README.md` → Modules describes; no new code.

## Wiki

- Use only the tags `README.md` → Wiki allows; anything else fails the build.
- Write for the Code tab of the Claude desktop app, never for a terminal.
- A topic worth keeping becomes an article in `app/wiki/advanced/` (or a recipe in `guides/`), with a row in its `index.md`.
