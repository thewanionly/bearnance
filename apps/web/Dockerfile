# syntax=docker/dockerfile:1
#
# Multi-stage build for the Bearnance web app (Next.js standalone) in a
# pnpm + Turborepo monorepo. Build context MUST be the repo root:
#
#   docker build -f apps/web/Dockerfile -t bearnance-web .
#
# Stages: base -> pruner -> installer (build) -> runner (prod, LAST — the
# default `docker build` target) and a `dev` stage used by
# docker-compose.dev.yml for local development. `runner` is intentionally the
# final stage so a plain `docker build` (no --target) builds production.

# ---- base -------------------------------------------------------------------
FROM node:22-alpine AS base
# libc6-compat is needed by Next.js' SWC binary on Alpine.
RUN apk add --no-cache libc6-compat
RUN corepack enable
WORKDIR /app

# ---- dev ----------------------------------------------------------------
# Development image used by docker-compose.dev.yml (target: dev). Source is
# bind-mounted at runtime; node_modules live in container volumes (see
# compose file) so the Linux-built binaries are not shadowed by the host's.
# Install happens here so those volumes seed from a populated node_modules.
FROM base AS dev
ENV NODE_ENV=development
COPY . .
RUN pnpm install --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "--filter", "web", "dev"]

# ---- pruner -----------------------------------------------------------------
# Produce a minimal subset of the monorepo needed to build `web`.
FROM base AS pruner
COPY . .
RUN pnpm dlx turbo@2 prune web --docker

# ---- installer --------------------------------------------------------------
# Install deps against the pruned lockfile, then build the app.
FROM base AS installer
# Install dependencies first (best layer caching): only manifests + lockfile.
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
# Then copy the pruned source and build.
COPY --from=pruner /app/out/full/ .
RUN pnpm dlx turbo@2 run build --filter=web

# ---- runner -----------------------------------------------------------------
# Minimal production image running the Next.js standalone server.
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# The `node` user/group already exist in the base image.
USER node

# Standalone output already contains a pruned node_modules. Copy the server,
# then the static assets and public files the minimal server does not include.
COPY --from=installer --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=installer --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=node:node /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
