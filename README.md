# VibePerks

Tiny AI offers for coding status lines.

## Structure

- `apps/web` - Next.js app, landing page, admin page, API routes.
- `packages/cli` - Node.js status-line CLI.
- `supabase/schema.sql` - database schema.
- `docs/API.md` - endpoint reference.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the web app:

```bash
npm run dev
```

Open `http://localhost:3000`.

By default the app uses a local JSON database at `apps/web/data/vibeperks.local.json`.
This is enough to test the MVP without creating Supabase credentials.

## Admin

Open `http://localhost:3000/admin`, paste token `dev`, then add or disable offers.

The admin page shows impressions and clicks.

## CLI

Run the local CLI against the local web app:

```bash
VIBEPERKS_API_URL=http://localhost:3000 npm run cli
```

It prints one short line:

```text
🎁 Railway gives credits for new projects → https://railway.app
```

Use the same command as a Claude Code status line command.

## Supabase Mode

For production-like data storage:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `apps/web/.env.example` to `apps/web/.env.local`.
4. Fill in:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_TOKEN=change-me
```

When `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set, API routes use Supabase instead of the local JSON file.

## Public Endpoints

- `GET /api/offers/active?client_id=<id>`
- `POST /api/impressions`
- `POST /api/clicks`

See `docs/API.md` for request bodies.
