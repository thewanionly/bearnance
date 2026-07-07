# Bearnance

Bearnance is a personal finance app for managing day-to-day money.

This repository is a pnpm/Turborepo monorepo. The product frontend lives in
`apps/web`, the backend API lives in `apps/api`, and shared web/mobile UI
components are documented in `apps/ui-docs`.

## Requirements

- Node.js `^22.13.0 || >=24`
- pnpm `11.9.0`

Corepack is the easiest way to use the pinned pnpm version:

```sh
corepack enable
```

## Getting Started

Install dependencies from the repository root:

```sh
pnpm install
```

Start the Bearnance web app:

```sh
pnpm --filter web dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

Start the Bearnance API:

```sh
pnpm --filter api dev
```

The API runs at [http://localhost:3002/api/v1](http://localhost:3002/api/v1).

Start the UI component docs:

```sh
pnpm --filter ui-docs dev
```

Storybook runs at [http://localhost:6006](http://localhost:6006).

## Workspace

### Apps

- `apps/api`: the Bearnance NestJS backend API.
- `apps/ui-docs`: Storybook docs for shared web and mobile UI components.
- `apps/web`: the primary Bearnance Next.js app.

### Packages

- `packages/design-tokens`: shared design tokens (color, spacing, typography) and generated CSS.
- `packages/eslint-config`: shared ESLint flat configs.
- `packages/jest-config`: shared Jest configs and mocks.
- `packages/prettier-config`: shared Prettier config with import and Tailwind sorting.
- `packages/typescript-config`: shared TypeScript configs.
- `packages/ui-core`: cross-platform style/behavior contracts (variants, generated brand icons) consumed by `ui-web` and `ui-mobile`.
- `packages/ui-mobile`: shared React Native UI components.
- `packages/ui-web`: shared React/Tailwind UI components.

## Common Commands

Run commands from the repository root.

| Command                                   | Description                                               |
| ----------------------------------------- | --------------------------------------------------------- |
| `pnpm --filter web dev`                   | Start the primary web app on port 3000.                   |
| `pnpm --filter api dev`                   | Start the backend API on port 3002.                       |
| `pnpm --filter ui-docs dev`               | Start Storybook on port 6006.                             |
| `pnpm --filter ui-docs build:storybook`   | Build the UI docs into `storybook-static`.                |
| `pnpm --filter @bearnance/ui-mobile test` | Run the React Native UI package tests.                    |
| `pnpm build`                              | Build every workspace through Turborepo.                  |
| `pnpm lint`                               | Lint every workspace through Turborepo.                   |
| `pnpm check-types`                        | Type-check every workspace through Turborepo.             |
| `pnpm format:check`                       | Check formatting across the repository.                   |
| `pnpm format:fix`                         | Format the repository.                                    |
| `pnpm cz`                                 | Create a Conventional Commit with Commitizen.             |
| `pnpm dev:docker`                         | Run web + api + Postgres in Docker.                       |
| `pnpm dev:docker:build`                   | Rebuild the dev Docker images (after dependency changes). |

`pnpm dev` runs every workspace `dev` task through Turborepo. Prefer filtered
commands when you only need one app.

## Docker

Local development can run natively (`pnpm dev`) or fully inside Docker:

```sh
pnpm dev:docker
```

This starts `web` (`:3000`), `api` (`:3002`), and Postgres (`:5433`) as
containers, defined in `docker-compose.dev.yml`. Source is bind-mounted for
hot reload; `node_modules` for every workspace live in container-only named
volumes so the Linux-built native binaries (e.g. `sharp`, Prisma) are never
shadowed by the host's (macOS) install. After changing dependencies, rebuild
with `pnpm dev:docker:build`. Native `pnpm dev` remains the faster fallback.

Each app also has a production Dockerfile (`apps/web/Dockerfile`,
`apps/api/Dockerfile`) with `dev`, `pruner`, `installer`, and `runner`
stages built via `turbo prune --docker`; `runner` is the default
`docker build` target. Build context must be the repository root. See
`apps/web/README.md` and `apps/api/README.md` for build/run commands.

## CI/CD & Deployment

- **CI** (`.github/workflows/ci.yml`): every pull request and push to `main`
  runs formatting, lint, type-check, unit tests, and build through
  Turborepo.
- **Deploy** (`.github/workflows/deploy.yml`): every push to `main` builds
  the `web` and `api` Docker images, pushes them to GHCR, then deploys to
  the Render **staging** environment automatically. **Production** is a
  manual approval gate (a GitHub Environment with a required reviewer) that
  promotes the same image, unchanged, to production.
- Infra is declared in `render.yaml` (a Render Blueprint): one `bearnance`
  Render project with `production` and `staging` environments, each running
  `web` + `api` as prebuilt-image services on Render's free tier (images are
  pulled, not built, so no Render build minutes are used).
- The database is Supabase Postgres. Migrations run inside the deploy
  pipeline (`prisma migrate deploy` against `DIRECT_URL`), not at container
  boot — see `apps/api/README.md`.

## Development Notes

- Workspaces are declared in `pnpm-workspace.yaml` under `apps/*` and
  `packages/*`.
- Turborepo task behavior is configured in `turbo.json`.
- UI component stories live beside their components in `packages/ui-web/src` and
  `packages/ui-mobile/src`; `apps/ui-docs` discovers them from those packages.
- Git hooks are installed by Husky. Staged files are formatted and linted before
  commit, and commit messages are checked with Commitlint.
- Commit messages follow
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  See `CONTRIBUTING.md` for the contribution workflow.
