# syntax=docker/dockerfile:1
#
# Multi-stage build for the Bearnance API (NestJS + Prisma driver adapter) in a
# pnpm + Turborepo monorepo. Build context MUST be the repo root:
#
#   docker build -f apps/api/Dockerfile -t bearnance-api .
#
# The API uses the Prisma `pg` driver adapter, so no query-engine binary is
# needed at runtime. The Prisma client is generated into src/generated/prisma
# (gitignored) and compiled into dist by `nest build`. Database migrations are
# NOT run here — they run in the deploy pipeline against DIRECT_URL.

# Stages: base -> pruner -> installer (build) -> runner (prod, LAST — the
# default `docker build` target) and a `dev` stage used by
# docker-compose.dev.yml for local development. `runner` is intentionally the
# final stage so a plain `docker build` (no --target) builds production.

# ---- base -------------------------------------------------------------------
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable
WORKDIR /app

# ---- dev ----------------------------------------------------------------
# Development image used by docker-compose.dev.yml (target: dev). Source is
# bind-mounted at runtime; node_modules live in container volumes. Install
# happens here so those volumes seed from a populated node_modules and the
# Prisma client is generated.
FROM base AS dev
ENV NODE_ENV=development
COPY . .
RUN pnpm install --frozen-lockfile
# `prisma generate` only reads the schema — it never opens a DB connection —
# but prisma.config.ts resolves DIRECT_URL at config-load time, which fails if
# unset. No env vars exist at build time (docker-compose's `environment:` only
# applies at container run), so this placeholder just satisfies that resolution;
# it's fully overridden by the real DIRECT_URL/DATABASE_URL at runtime.
RUN DIRECT_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
    pnpm --filter api run db:generate
EXPOSE 3002
CMD ["pnpm", "--filter", "api", "dev"]

# ---- pruner -----------------------------------------------------------------
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo@2 prune api --docker

# ---- installer (build) ------------------------------------------------------
FROM base AS installer
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
# Generate the Prisma client, then compile NestJS to dist/ (client compiled too).
# See the `dev` stage above for why DIRECT_URL is a build-time-only placeholder.
RUN DIRECT_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
    pnpm --filter api run db:generate
RUN pnpm dlx turbo@2 run build --filter=api

# ---- runner -----------------------------------------------------------------
# Fresh production-only install keeps pnpm's symlinked node_modules valid inside
# this stage (avoids fragile cross-stage node_modules copies). The API has no
# workspace runtime deps, so only external prod packages are installed.
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3002
COPY --from=pruner /app/out/json/ .
# The root workspace's `prepare: husky` script fails under --prod (husky is a
# devDependency, so its binary is never installed) and is meaningless here
# anyway (no .git in the build context). Drop it before installing — this only
# edits the copy inside this build stage, not the real repo file.
RUN pnpm pkg delete scripts.prepare
RUN pnpm install --prod --frozen-lockfile
COPY --from=installer /app/apps/api/dist ./apps/api/dist
RUN chown -R node:node /app
USER node
EXPOSE 3002
WORKDIR /app/apps/api
CMD ["node", "dist/main.js"]
