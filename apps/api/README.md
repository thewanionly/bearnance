# Bearnance API

NestJS backend for Bearnance.

## Development

Run commands from the repository root.

```sh
pnpm --filter api dev
```

The API runs on [http://localhost:3002/api/v1](http://localhost:3002/api/v1).

## Commands

| Command                          | Description                   |
| -------------------------------- | ----------------------------- |
| `pnpm --filter api dev`          | Start the API in watch mode.  |
| `pnpm --filter api build`        | Build the API into `dist`.    |
| `pnpm --filter api start`        | Run the built API.            |
| `pnpm --filter api lint`         | Lint the API.                 |
| `pnpm --filter api check-types`  | Type-check the API.           |
| `pnpm --filter api test`         | Run unit tests.               |
| `pnpm --filter api test:e2e`     | Run end-to-end tests.         |
| `pnpm --filter api format:fix`   | Format the API with Prettier. |
| `pnpm --filter api format:check` | Check API formatting.         |

## Notes

- The public route is currently `GET /api/v1`.
- The app uses the repository's shared ESLint, Prettier, TypeScript, and Jest
  configs.
- Do not add barrel files.
