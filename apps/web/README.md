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

## Docker

Run this app (with the api and Postgres) in Docker from the repository root:

```sh
pnpm dev:docker
```

The container hot-reloads from the bind-mounted source; `node_modules` live
in a container-only volume so the Linux-built dependencies aren't shadowed
by the host's. See the root `docker-compose.dev.yml`.

Build and run the production image directly:

```sh
docker build -f apps/web/Dockerfile -t bearnance-web .
docker run -p 3000:3000 bearnance-web
```

The build context must be the repository root (Turborepo prunes the
monorepo down to the `web` workspace). The production image runs Next.js
`output: 'standalone'` — see `apps/web/Dockerfile` for the stage layout.

## Deployment

Pushes to `main` build this image in GitHub Actions and publish it to GHCR
(`ghcr.io/<repo>/web`); Render pulls the prebuilt image and deploys it —
staging automatically, production behind a manual approval gate. See the
root README's [CI/CD & Deployment](../../README.md#cicd--deployment)
section and `render.yaml`.

## Development Notes

- `src/app/layout.tsx` owns the root document shell and app metadata.
- `src/app/page.tsx` is the current home route.
- `src/app/globals.css` imports the shared `@bearnance/ui-web` stylesheet.
- Local package imports use `#components/*`, `#hooks/*`, and `#lib/*`.
- No environment variables are required for the app yet. Future `.env*` files
  are included in Turborepo build inputs.
