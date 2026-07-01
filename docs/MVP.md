# VibePerks MVP

VibePerks is an alpha product that shows useful AI-tool offers to Claude Code CLI users through a tiny terminal/status-line surface.

## Motivation

AI builders discover tools, credits, and launches through noisy channels:
newsletters, social feeds, Discords, and random product pages.

VibePerks makes discovery quiet and contextual. A developer can keep working in
Claude Code CLI and occasionally see one useful offer without opening another
tab.

## MVP Scope

The MVP proves the full loop:

1. Store offers in Supabase.
2. Manage offers from a simple admin page.
3. Return one active offer from a public API.
4. Print that offer from a Node.js CLI.
5. Allow the CLI output to be used in Claude Code CLI `statusLine`.

## Implemented

- Next.js App Router web app.
- TypeScript, Tailwind CSS, ESLint, and Prettier.
- Supabase client setup.
- SQL migration for the `offers` table.
- Seed data for Cursor, Railway, Supabase, OpenRouter, and Convex.
- Shared `Offer` type.
- `OfferRepository` for all Supabase access.
- `GET /api/offer`.
- Placeholder `POST /api/impression`.
- Placeholder `POST /api/click`.
- Admin offers CRUD at `/admin/offers`.
- CLI package in `packages/cli`.
- Claude Code CLI status line instructions.
- Landing page, README, changelog, contributing guide, and MIT license.

## Not Implemented Yet

- Admin authentication.
- Real impression tracking.
- Real click tracking.
- Offer scheduling.
- Billing or advertiser accounts.
- Hosted production deployment.
- Published npm package.
- Claude Desktop or Claude web app integration.

## Validation

The project should pass:

```bash
npm run lint
npm run typecheck
npm run build
```

With Supabase configured, these should work:

- `http://localhost:3000`
- `http://localhost:3000/admin/offers`
- `GET http://localhost:3000/api/offer`
- `npm run cli`
