# Contributing

Thanks for helping improve VibePerks.

## Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

## Guidelines

- Read `CLAUDE.md` before making changes.
- Keep changes small and focused.
- Do not add features outside the current task.
- Keep Supabase queries inside repository files.
- Put shared types in `types/`.
- Update README or CHANGELOG when behavior changes.
