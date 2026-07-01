# Developer Guide

This guide is for someone opening the repository for the first time.

## What VibePerks Is

VibePerks is a tiny discovery channel for Claude Code CLI users. It shows one
useful AI-tool offer in a terminal or status line while the developer is already
working.

The motivation is simple: developers should not need to scan feeds,
newsletters, and Discords to find useful AI tools or credits.

## Current Product Shape

VibePerks has four parts:

- Web landing page for explaining the product.
- Admin offers page for managing offers.
- Public API for returning one active offer.
- Node.js CLI for printing the offer in a compact format.

The project is alpha. It is a real working MVP, but not a hosted production
service yet.

## Quick Local Run

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/admin/offers`
- `http://localhost:3000/api/offer`

## Environment

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Without Supabase credentials, the landing page can still render, but the admin
page and offer API cannot return real data.

## Database

Migrations live in `supabase/migrations`.

Run migrations:

```bash
npx supabase db push
```

Seed demo offers:

```bash
npx supabase db reset
```

## CLI

Start the app first:

```bash
npm run dev
```

Then run:

```bash
npm run cli
```

Expected output:

```text
🎁 Cursor → AI code editor for faster product development.
```

If the API is unavailable, the CLI intentionally prints nothing.

## Claude Code CLI Status Line

VibePerks does not install into Claude Desktop or the Claude web app.

It can be used with Claude Code CLI `statusLine` because status line commands
display whatever they write to stdout.

Example:

```json
{
  "statusLine": {
    "type": "command",
    "command": "cd /path/to/vibeperks && VIBEPERKS_API_URL=http://localhost:3000 ./node_modules/.bin/vibeperks"
  }
}
```

## Code Map

- `app/page.tsx` - landing page.
- `app/admin/offers/page.tsx` - offers admin page.
- `app/admin/offers/actions.ts` - Server Actions for offer mutations.
- `app/api/offer/route.ts` - public offer API.
- `lib/offer-repository.ts` - all Supabase offer queries.
- `lib/supabase.ts` - Supabase client.
- `lib/config.ts` - shared environment config.
- `types/offer.ts` - shared Offer type.
- `packages/cli/src/index.js` - CLI entry point.
- `supabase/migrations/` - database schema changes.
- `supabase/seed.sql` - demo offers.

## Rules For Future Work

- Keep database access inside repositories.
- Keep shared types in `types/`.
- Keep API routes thin.
- Do not add new product behavior unless the task asks for it.
- Update this guide when setup or architecture changes.
