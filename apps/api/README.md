# Bearnance API

NestJS backend for Bearnance. PostgreSQL via Prisma, authentication via
Supabase Auth (the API only verifies Supabase-issued JWTs — it does not
issue or manage credentials itself).

## Setup

Run commands from the repository root.

1. Copy the env file and fill in values:

   ```sh
   cp apps/api/.env.example apps/api/.env
   ```

   - `DATABASE_URL` / `DIRECT_URL`: for local dev, both point at the
     docker-compose Postgres below. For staging/production, point them at
     Supabase's **pooled** (`DATABASE_URL`, port 6543) and **direct**
     (`DIRECT_URL`, port 5432) connection strings respectively — migrations
     always run against the direct connection since Supabase's pooler
     doesn't support the prepared statements Prisma Migrate needs.
   - `SUPABASE_URL`: your Supabase project URL, used to verify auth JWTs.
   - `SUPABASE_JWT_SECRET`: only needed if the Supabase project uses the
     legacy symmetric (HS256) JWT signing key (Project Settings → API → JWT
     Secret). Newer projects use asymmetric keys verified via JWKS and can
     leave this unset.
   - `WEB_APP_URL`: origin of the frontend, used for CORS.

2. Start local Postgres (dev/test only — **not** used for staging/prod,
   which point at Supabase instead):

   ```sh
   docker compose -f apps/api/docker-compose.yml up -d
   ```

3. Run migrations and generate the Prisma client:

   ```sh
   pnpm --filter api db:migrate
   ```

4. Start the API:

   ```sh
   pnpm --filter api dev
   ```

The API runs on [http://localhost:3002/api/v1](http://localhost:3002/api/v1).

## Supabase project setup

Auth (sign-up, login, Google OAuth) is entirely handled by Supabase, driven
from the frontend via `supabase-js` — this API never sees a password, only
verifies the resulting JWT on each request.

1. Create a Supabase project.
2. Under **Auth → Providers**, enable **Google** and add your Google OAuth
   client ID/secret.
3. Under **Project Settings → API**, copy the project URL into
   `SUPABASE_URL`. Check the JWT signing key type — if it's the legacy
   symmetric key, copy the JWT secret into `SUPABASE_JWT_SECRET`.
4. Under **Project Settings → Database**, copy the pooled and direct
   connection strings into `DATABASE_URL` / `DIRECT_URL` for
   staging/production environments.

## Docker

Run the api (with web and Postgres) in Docker from the repository root:

```sh
pnpm dev:docker
```

This starts `api` in watch mode against a containerized Postgres, with
`DATABASE_URL`/`DIRECT_URL`/`SUPABASE_URL`/`WEB_APP_URL` injected by
`docker-compose.dev.yml` — no local `.env` needed for the default flow.
Native `pnpm --filter api dev` remains the faster fallback.

Build and run the production image directly:

```sh
docker build -f apps/api/Dockerfile -t bearnance-api .
docker run -p 3002:3002 --env-file apps/api/.env bearnance-api
```

The build context must be the repository root. The image ships the
compiled `dist/` plus a production-only `node_modules` — no Prisma
query-engine binary is needed, since the API uses the `pg` driver adapter.
Migrations are **not** run at container boot; see Deployment below.

## Deployment

Pushes to `main` build this image in GitHub Actions and publish it to GHCR
(`ghcr.io/<repo>/api`). The pipeline runs `pnpm --filter api run db:deploy`
(`prisma migrate deploy`) against Supabase's `DIRECT_URL` before deploying,
so the schema is current before the new image goes live. Render pulls the
image — staging deploys automatically on every push to `main`; production
requires a manual approval (a GitHub Environment reviewer gate) and
promotes the same image. See the root README's
[CI/CD & Deployment](../../README.md#cicd--deployment) section and
`render.yaml`.

## Endpoints

All routes are protected (require `Authorization: Bearer <supabase_access_token>`)
except `GET /api/v1`.

| Method | Path                       | Description                                                                             |
| ------ | -------------------------- | --------------------------------------------------------------------------------------- |
| GET    | `/api/v1`                  | Health check / API metadata (public).                                                   |
| GET    | `/api/v1/users/me`         | Current user profile. Lazily creates the Profile + Wallet on first request.             |
| GET    | `/api/v1/wallet`           | Current balance.                                                                        |
| POST   | `/api/v1/transactions`     | Deposit or withdraw (`{ type: "DEPOSIT" \| "WITHDRAWAL", amountMinor, description? }`). |
| GET    | `/api/v1/transactions`     | Paginated transaction list (`?page&pageSize&type`).                                     |
| GET    | `/api/v1/transactions/:id` | Single transaction (ownership-checked).                                                 |

Money amounts are integer minor units (e.g. cents), returned as strings in
responses since JSON can't represent `BigInt`.

## Commands

| Command                                               | Description                      |
| ----------------------------------------------------- | -------------------------------- |
| `pnpm --filter api dev`                               | Start the API in watch mode.     |
| `pnpm --filter api build`                             | Build the API into `dist`.       |
| `pnpm --filter api start`                             | Run the built API.               |
| `pnpm --filter api lint`                              | Lint the API.                    |
| `pnpm --filter api check-types`                       | Type-check the API.              |
| `pnpm --filter api test`                              | Run unit tests.                  |
| `pnpm --filter api test:e2e`                          | Run end-to-end tests.            |
| `pnpm --filter api format:fix`                        | Format the API with Prettier.    |
| `pnpm --filter api format:check`                      | Check API formatting.            |
| `pnpm --filter api db:migrate`                        | Create/apply a migration (dev).  |
| `pnpm --filter api db:deploy`                         | Apply migrations (staging/prod). |
| `pnpm --filter api db:generate`                       | Regenerate the Prisma client.    |
| `pnpm --filter api db:studio`                         | Open Prisma Studio.              |
| `docker compose -f apps/api/docker-compose.yml up -d` | Start local Postgres (dev/test). |

## Notes

- The app uses the repository's shared ESLint, Prettier, TypeScript, and
  Jest configs.
- Do not add barrel files.
- Prisma manages the `public` schema only. Supabase's own `auth` schema
  (where `auth.users` lives) is owned and migrated by Supabase — never
  touch it from Prisma migrations.
- The generated Prisma client (`src/generated/prisma`) is build output, not
  committed — regenerate it with `pnpm --filter api db:generate` after
  pulling schema changes.
- **E2E tests**: Prisma 7's query compiler is WASM-only and loads via a
  real dynamic `import()`, which Jest's default CJS runtime can't execute
  without a broader migration of this package to native ESM. For now,
  `test/app.e2e-spec.ts` overrides `PrismaService` with a no-op so the
  health check can still boot the module tree under Jest; e2e tests that
  need a real database connection are deferred. Business-logic coverage
  comes from unit tests (`pnpm --filter api test`) plus manual end-to-end
  verification against the real running app.
