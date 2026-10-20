# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

## Coding standards

How code here is placed, named, exported, styled, typed, and tested. Read `docs/coding-conventions/index.md` before writing, reviewing, or moving any code.

## What I need from you

- End every turn where you're blocked on me, or where the next step needs me, with a short "**What I need from you**" section. Numbered, one concrete action or decision per item: exactly what to do, where (which site, app, file or person), and what to send back. e.g. "Open the Convex dashboard, add `OPENAI_API_KEY` under Settings → Environment Variables, then reply 'done'", not "I need the API key set up".
- If there are several, put the quickest or most blocking one first, and say what you'll get on with in the meantime.
- If you don't need anything from me, say "Nothing needed from you right now", and say whether the work is finished or still going.
- Never bury a request for me in the middle of a long update.

## When to stop and ask me

- When something is unclear or you're unsure
- before anything destructive: deleting data, force-pushing, or changing anything outside this repository

## Agent skills

### Issue tracker

Issues are tracked as GitHub Issues in `MhL5/portfolio`, using the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), used as-is. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
