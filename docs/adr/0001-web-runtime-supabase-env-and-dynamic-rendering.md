# 1. Web reads Supabase public config at runtime (accepting a dynamic root)

- Status: Accepted
- Date: 2026-07-11

## Context

The web app (`apps/web`, Next.js App Router) needs the public Supabase config
(`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`) in the browser to create the auth
client.

Our deploy model builds **one Docker image** in CI and **promotes the same image**
staging → prod (see `render.yaml`, `.github/workflows/deploy.yml`). Next.js inlines
`NEXT_PUBLIC_*` variables into the client bundle at **build time**, so a
`NEXT_PUBLIC_` value would be frozen to whatever existed during `next build`
(nothing, in CI) and could not differ per environment. That is incompatible with
the promote-one-image model.

## Decision

Read the public config with **non-prefixed** env vars at **runtime**:

- `src/lib/supabase-env.ts` — `getSupabaseEnv()` calls `connection()` (forcing
  dynamic rendering) and reads `process.env` at request time on the server.
- `SupabaseEnvProvider` passes the resolved config to client components; the browser
  Supabase client (`@supabase/ssr` `createBrowserClient`) is built from it.

`getSupabaseEnv()` is awaited in the **root layout**, so the whole app is
dynamically rendered per request.

## Consequences

Positive:

- One Docker image works across all environments; env changes need no rebuild.
- No `NEXT_PUBLIC_` values baked into the bundle; the promotion model holds.

Trade-off:

- `connection()` in the root layout opts the **entire** route tree out of static
  prerendering and Next 16's Partial Prerendering (Cache Components). Every route —
  including the otherwise-static `(auth)/login` and `(auth)/signup` — renders per
  request.

Why this is acceptable now:

- bearnance is a fully-authenticated app; `(main)` pages are per-user and dynamic
  regardless. The only routes that lose static/PPR are the two auth pages, which are
  low-traffic and cheap to render.

Mitigation:

- `loading.tsx` boundaries (e.g. `app/(main)/loading.tsx`) stream an instant skeleton
  so the per-request render cost is hidden from users.

## Alternatives considered

- **`NEXT_PUBLIC_*` + per-environment builds** — the framework grain, but breaks the
  promote-one-image model (would require building separately for staging and prod).
- **Route handler** (`app/env/route.ts`) the client fetches on init — keeps the root
  static but adds a client-side fetch waterfall and a "client not ready" state.
- **Inject env into HTML via a dynamic hole** — best long-term (static shell + one
  Suspense-wrapped dynamic component writing `window.__PUBLIC_ENV__`); deferred as
  unnecessary complexity while everything is behind auth.

## Revisit trigger

Revisit if a genuinely **static, cacheable public tier** is added (e.g. marketing or
landing pages). At that point, move the runtime env read out of the root — preferred
approach is the "inject into HTML via a dynamic hole" alternative above — so those
pages stay statically prerenderable instead of forcing a dynamic root.
