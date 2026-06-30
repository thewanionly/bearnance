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

- `packages/eslint-config`: shared ESLint flat configs.
- `packages/jest-config`: shared Jest configs and mocks.
- `packages/prettier-config`: shared Prettier config with import and Tailwind sorting.
- `packages/typescript-config`: shared TypeScript configs.
- `packages/ui-mobile`: shared React Native UI components.
- `packages/ui-web`: shared React/Tailwind UI components.

## Common Commands

Run commands from the repository root.

| Command                                   | Description                                   |
| ----------------------------------------- | --------------------------------------------- |
| `pnpm --filter web dev`                   | Start the primary web app on port 3000.       |
| `pnpm --filter api dev`                   | Start the backend API on port 3002.           |
| `pnpm --filter ui-docs dev`               | Start Storybook on port 6006.                 |
| `pnpm --filter ui-docs build:storybook`   | Build the UI docs into `storybook-static`.    |
| `pnpm --filter @bearnance/ui-mobile test` | Run the React Native UI package tests.        |
| `pnpm build`                              | Build every workspace through Turborepo.      |
| `pnpm lint`                               | Lint every workspace through Turborepo.       |
| `pnpm check-types`                        | Type-check every workspace through Turborepo. |
| `pnpm format:check`                       | Check formatting across the repository.       |
| `pnpm format:fix`                         | Format the repository.                        |
| `pnpm cz`                                 | Create a Conventional Commit with Commitizen. |

`pnpm dev` runs every workspace `dev` task through Turborepo. Prefer filtered
commands when you only need one app.

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
