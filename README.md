# VibePerks

[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![Supabase](https://img.shields.io/badge/Supabase-ready-3ecf8e.svg)
![Alpha](https://img.shields.io/badge/status-alpha-orange.svg)

VibePerks helps Claude Code CLI users turn a tiny terminal status line into passive affiliate income from useful AI-tool installs.

![VibePerks demo](public/demo.gif)

## Why Install This?

Claude Code subscriptions and AI tools are expensive. VibePerks is built around
a simple idea: if a developer is already working in the terminal all day, a tiny
status-line offer can help pay for that workflow when someone installs a tool
through it.

You should install it if you want:

- a chance to offset Claude Code and AI-tool subscription costs;
- passive monetization from a surface you already use;
- one small, relevant offer instead of a feed, dashboard, or noisy ad unit.

## What Works Today

- Landing page.
- Supabase `offers` table with migration and seed data.
- Admin page for creating, editing, disabling, and deleting offers.
- `GET /api/offer` for one active offer.
- CLI command that prints one compact offer.
- Claude Code CLI `statusLine` command example.

## Current Limits

- Alpha project, not production hosted yet.
- npm package metadata is prepared, but the package is not published yet.
- Claude Desktop and Claude web app extensions are not supported.
- Impression and click endpoints exist as placeholders only.
- Install attribution, payout tracking, and payments are not implemented yet.
- Admin authentication is not implemented yet.

## Install

```bash
npm install
npm run dev
```

Use it as a terminal command:

```bash
npm run cli
```

Or add it to Claude Code CLI status line:

```json
{
  "statusLine": {
    "type": "command",
    "command": "cd /path/to/vibeperks && VIBEPERKS_API_URL=http://localhost:3000 ./node_modules/.bin/vibeperks"
  }
}
```

Done.

> VibePerks integrates with Claude Code CLI status line. It does not install inside Claude Desktop or the Claude web app.

## Why?

- Offset expensive AI subscriptions with affiliate-style installs.
- Monetize one tiny terminal/status-line surface without interrupting work.
- Keep it focused: one useful offer, no feed, no dashboard.

## Privacy

- We never read your prompts.
- We never read your code.
- We never send your conversations anywhere.

## Screenshots

![Landing page](public/screenshot-landing.png)

![Claude Code CLI status line](public/screenshot-status-line.png)

## Quick Start

Clone the repository, install dependencies, and start the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To use real offer data, create `.env.local`, add Supabase credentials, run the
database migration, and seed the demo offers.

For the CLI:

```bash
npm run cli
npx vibeperks --version
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase client
- ESLint
- Prettier
- Vercel-ready project structure

## Environment

Create a local environment file:

```bash
cp .env.example .env.local
```

Fill in Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database

Database changes live in `supabase/migrations`.

The first migration creates the `offers` table:

```text
supabase/migrations/20260628220000_create_offers.sql
```

Run migrations with the Supabase CLI:

```bash
npx supabase db push
```

Seed test offers:

```bash
npx supabase db reset
```

The seed file is:

```text
supabase/seed.sql
```

## API

- `GET /api/offer`
- `POST /api/impression`
- `POST /api/click`

`GET /api/offer` returns one active offer from Supabase. If there is no active
offer, it returns `404`.

## Admin

Offers can be managed at `http://localhost:3000/admin/offers`.

The admin page talks to Supabase through Server Actions and the repository
layer. There is no admin auth in the alpha.

## CLI Usage

Start the web app first:

```bash
npm run dev
```

Then run the CLI:

```bash
npm run cli
```

The CLI requests `GET /api/offer` and prints the active offer:

```text
🎁 Cursor → AI code editor for faster product development.
```

Use a custom API URL:

```bash
VIBEPERKS_API_URL=https://your-domain.com npm run cli
```

If the API is unavailable, the CLI prints nothing and exits without an error.

## Claude Code CLI Integration

Claude Code supports a `statusLine` command in its settings. The command receives
Claude Code session data through stdin and displays whatever the command writes to
stdout.

This is for Claude Code CLI. It is not a Claude Desktop extension.

For a deployed API:

```json
{
  "statusLine": {
    "type": "command",
    "command": "VIBEPERKS_API_URL=https://your-domain.com npx vibeperks"
  }
}
```

## FAQ

### Who is this for?

Claude Code CLI users and AI builders who want their everyday developer
workflow to help pay for itself.

### Why would a developer install this?

Because AI subscriptions are becoming a real monthly cost. VibePerks is meant
to turn a small, low-distraction status-line placement into passive income from
tool installs and partner offers.

### Is this an ad network?

Not yet. The MVP is the technical foundation: offers in Supabase, an API, admin
CRUD, and a CLI/status-line surface. Attribution, partner billing, and payouts
are future work.

### Does the alpha pay users today?

No. The alpha proves the product surface and offer delivery. Real install
tracking and payout mechanics are not implemented yet.

### Does VibePerks read my code?

No.

### Does it send Claude Code prompts anywhere?

No. The current CLI does not read or forward stdin.

### Do I need Supabase locally?

Supabase is required for real offer data. The app can still build and render the
landing page without Supabase credentials.

### Is the npm package published?

Not yet. The package metadata is prepared for a future publish step.

## Roadmap

- Admin authentication.
- Impression tracking.
- Click tracking.
- Offer scheduling and rotation.
- Hosted demo deployment.
- Published npm CLI package.
- Better install flow for Claude Code users.

## Development

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

## Architecture

- `app/` contains routes, pages, and server actions.
- `lib/offer-repository.ts` is the only layer that queries Supabase tables.
- `lib/supabase.ts` creates the Supabase client from shared config.
- `lib/config.ts` centralizes environment variables.
- `lib/api-response.ts` centralizes API success and error responses.
- `lib/logger.ts` centralizes logging for server-side code.
- `types/` contains shared TypeScript types.
- `packages/cli/` contains the VibePerks CLI and its CLI-specific config.

API routes should stay thin: call repositories, return shared response helpers,
and log unexpected errors through `logger`.

For a developer handoff, start with `docs/DEVELOPER_GUIDE.md`.

## Release

- Version: `v0.1.0-alpha`
- License: MIT
- Changelog: `CHANGELOG.md`
- Release notes: `docs/RELEASE_NOTES_v0.1.0-alpha.md`

## Contributing

See `CONTRIBUTING.md`.
