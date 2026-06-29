# Bearnance

Bearnance is a personal finance app for managing day-to-day money.

This repository is a pnpm/Turborepo monorepo. The primary product app lives in
`apps/web`, and the backend API lives in `apps/api`; the other workspace apps
and packages support shared tooling, configuration, and scaffolded test
surfaces.

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

## Workspace

### Apps

- `apps/api`: the Bearnance NestJS backend API.
- `apps/web`: the primary Bearnance Next.js app.

### Packages

- `packages/eslint-config`: shared ESLint flat configs.
- `packages/prettier-config`: shared Prettier config with import and Tailwind sorting.
- `packages/typescript-config`: shared TypeScript configs.
- `packages/jest-config`: shared Jest configs and mocks.

## Common Commands

Run commands from the repository root.

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `pnpm --filter web dev` | Start the primary web app on port 3000.       |
| `pnpm --filter api dev` | Start the backend API on port 3002.           |
| `pnpm build`            | Build every workspace through Turborepo.      |
| `pnpm lint`             | Lint every workspace through Turborepo.       |
| `pnpm check-types`      | Type-check every workspace through Turborepo. |
| `pnpm format:check`     | Check formatting across the repository.       |
| `pnpm format:fix`       | Format the repository.                        |
| `pnpm cz`               | Create a Conventional Commit with Commitizen. |

`pnpm dev` runs every workspace `dev` task through Turborepo. Prefer
`pnpm --filter web dev` when you only need the product app.

## Development Notes

- Workspaces are declared in `pnpm-workspace.yaml` under `apps/*` and
  `packages/*`.
- Turborepo task behavior is configured in `turbo.json`.
- Git hooks are installed by Husky. Staged files are formatted and linted before
  commit, and commit messages are checked with Commitlint.
- Commit messages follow
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  See `CONTRIBUTING.md` for the contribution workflow.
