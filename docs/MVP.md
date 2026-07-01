# VibePerks MVP

VibePerks is an alpha product that helps Claude Code CLI users turn a tiny terminal/status-line surface into passive affiliate income from AI-tool installs.

## Motivation

Claude Code and AI-tool subscriptions can become expensive for solo builders and
small teams.

VibePerks is built around a simple business idea: developers already spend hours
inside Claude Code CLI, so a tiny status-line offer can create a background
earning surface. When someone installs a partner tool through that surface,
future versions of VibePerks can attribute the install and pay the user.

## MVP Scope

The MVP proves the full loop:

1. Store offers in Supabase.
2. Manage offers from a simple admin page.
3. Return one active offer from a public API.
4. Print that offer from a Node.js CLI.
5. Allow the CLI output to be used in Claude Code CLI `statusLine`.

The MVP does not prove payouts yet. It proves that offers can be managed,
served, and displayed in the developer workflow.

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
- Install attribution.
- Payout tracking.
- Payment flows.
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
