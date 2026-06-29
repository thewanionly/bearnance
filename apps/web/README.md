# Bearnance Web

The Next.js web frontend for Bearnance.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript 6
- Tailwind CSS 4
- Shared Bearnance ESLint, Prettier, and TypeScript configs

## Getting Started

Install dependencies from the repository root:

```sh
pnpm install
```

Start this app from the repository root:

```sh
pnpm --filter web dev
```

You can also run the local package script from this directory:

```sh
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

Run these from the repository root unless noted otherwise.

| Command                          | Description                                        |
| -------------------------------- | -------------------------------------------------- |
| `pnpm --filter web dev`          | Start the Next.js development server on port 3000. |
| `pnpm --filter web build`        | Build the app for production.                      |
| `pnpm --filter web start`        | Start the production server after a build.         |
| `pnpm --filter web lint`         | Run ESLint with zero warnings allowed.             |
| `pnpm --filter web check-types`  | Generate Next.js types and run `tsc --noEmit`.     |
| `pnpm --filter web format:check` | Check formatting for this app.                     |
| `pnpm --filter web format:fix`   | Format this app.                                   |

## Project Layout

```text
apps/web
|-- src/app/layout.tsx
|-- src/app/page.tsx
|-- src/app/globals.css
|-- next.config.ts
|-- postcss.config.mjs
|-- eslint.config.mjs
|-- prettier.config.mjs
`-- tsconfig.json
```

## Development Notes

- `src/app/layout.tsx` owns the root document shell and app metadata.
- `src/app/page.tsx` is the current home route.
- `src/app/globals.css` imports Tailwind and defines global theme variables.
- The `@/*` TypeScript path alias resolves to `src/*`.
- No environment variables are required for the app yet. Future `.env*` files
  are included in Turborepo build inputs.
