# VibePerks

[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![Supabase](https://img.shields.io/badge/Supabase-ready-3ecf8e.svg)
![Alpha](https://img.shields.io/badge/status-alpha-orange.svg)

Install VibePerks to discover useful AI tools in your Claude Code status line without leaving your flow.

![VibePerks demo](public/demo.gif)

## Install

```bash
npm install
npm run dev
```

Add VibePerks to Claude Code:

```json
{
  "statusLine": {
    "type": "command",
    "command": "cd /path/to/vibeperks && VIBEPERKS_API_URL=http://localhost:3000 ./node_modules/.bin/vibeperks"
  }
}
```

Done.

## Why?

- Find relevant AI tools while Claude Code is already working.
- Keep discovery inside a tiny status line, not another tab.
- Stay focused: one useful offer, no feed, no dashboard.

## Privacy

- We never read your prompts.
- We never read your code.
- We never send your conversations anywhere.

## Screenshots

![Landing page](public/screenshot-landing.png)

![Claude Code status line](public/screenshot-status-line.png)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

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

## Claude Code Integration

Claude Code supports a `statusLine` command in its settings. The command receives
Claude Code session data through stdin and displays whatever the command writes to
stdout.

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

## Release

- Version: `v0.1.0-alpha`
- License: MIT
- Changelog: `CHANGELOG.md`
- Release notes: `docs/RELEASE_NOTES_v0.1.0-alpha.md`

## Contributing

See `CONTRIBUTING.md`.
