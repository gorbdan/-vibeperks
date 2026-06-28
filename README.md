# VibePerks

VibePerks is a Vercel-ready Next.js project foundation for a future product that will show useful AI-related perks to builders.

This repository currently contains only the technical scaffold. It does not include authentication, database tables, offers, analytics, or business logic.

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

## API Stubs

The scaffold includes placeholder endpoints:

- `GET /api/offer`
- `POST /api/impression`
- `POST /api/click`

They currently return simple JSON stubs.

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
    supabase.ts
  types/
    index.ts
  public/
  supabase/
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
