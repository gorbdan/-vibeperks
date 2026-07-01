# CLAUDE.md

## Project

VibePerks helps Claude Code CLI users turn a tiny terminal/status-line surface into passive affiliate income from useful AI-tool installs.

## Goal

Build a simple, reliable MVP that can manage offers, return one active offer, and display it where developers already work, before adding attribution and payouts.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Server Actions
- Node.js CLI
- ESLint
- Prettier
- Vercel

## Architecture

### Frontend

The frontend lives in `app/` and uses React Server Components by default. Client Components are allowed only when browser behavior is required.

### Backend

Backend code uses Next.js route handlers and Server Actions. API routes should stay thin and delegate data access to repositories.

### CLI

The CLI lives in `packages/cli/`. It calls the public API and prints compact output for terminal and Claude Code status line usage.

### Supabase

Supabase is the database layer. Schema changes must go through SQL migrations in `supabase/migrations/`.

## Rules

- Keep code simple.
- Do not overengineer.
- Prefer Server Components.
- Use the repository pattern for database access.
- Keep Supabase queries inside repository files.
- Do not duplicate types.
- Put shared types in `types/`.
- One responsibility per file.
- Keep commits small.
- Do not add features not described in `docs/MVP.md` or the current task.
- Do not introduce new libraries unless the task requires them.
- Preserve existing behavior during refactors.

## Folder Structure

- `app/` - Next.js pages, layouts, route handlers, and Server Actions.
- `components/` - shared UI components.
- `docs/` - product and planning documents.
- `docs/DEVELOPER_GUIDE.md` - first-read guide for external developers.
- `lib/` - repositories, config, logging, API helpers, and service code.
- `packages/cli/` - VibePerks CLI package.
- `public/` - static assets.
- `scripts/` - project scripts.
- `supabase/` - migrations and seed data.
- `types/` - shared TypeScript types.

## Coding Style

- Use TypeScript strict mode.
- Use functional React components.
- Do not use `any`.
- Prefer `async` / `await`.
- Keep functions small and named clearly.
- Use shared response helpers for API responses.
- Use the shared logger instead of direct logging in business logic.

## Development Workflow

Before starting a task:

1. Read `docs/MVP.md`.
2. Read `CLAUDE.md`.
3. Execute only one task.
4. Do not add features independently.
5. Run `npm run lint`, `npm run typecheck`, and `npm run build` before finishing.

## Future

TODO:

- Add authentication for admin access.
- Add impression tracking.
- Add click tracking.
- Add offer scheduling and rotation rules.
- Add deployment documentation.
- Publish the CLI package.
- Improve Claude Code installation instructions after the package is published.
