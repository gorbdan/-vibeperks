# VibePerks

VibePerks is a Vercel-ready Next.js project for showing useful AI-related perks to builders.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase client
- ESLint
- Prettier
- Vercel-ready project structure

## Installation

Install dependencies:

```bash
npm install
```

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

## Development

Start the project:

```bash
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/admin`

If port `3000` is busy, Next.js will print the next available local URL.

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

## Checks

Run a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Check formatting:

```bash
npm run format:check
```

## API

The project includes these endpoints:

- `GET /api/offer`
- `POST /api/impression`
- `POST /api/click`

`GET /api/offer` returns one active offer from Supabase.

If there is no active offer, it returns `404`.

## Admin

Offers can be managed at `http://localhost:3000/admin/offers`.

## Project Structure

```text
/
  docs/
    MVP.md
  app/
    admin/
    api/
    globals.css
    layout.tsx
    page.tsx
  components/
  lib/
    offer-repository.ts
    supabase.ts
  types/
    offer.ts
    index.ts
  public/
  supabase/
    migrations/
    seed.sql
  scripts/
  .env.example
  .eslintrc.json
  .gitignore
  .prettierrc
  next.config.mjs
  package.json
  postcss.config.mjs
  tailwind.config.ts
  tsconfig.json
```
