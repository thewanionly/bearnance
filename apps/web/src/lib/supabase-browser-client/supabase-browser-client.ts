import type { SupabaseEnv } from '#lib/supabase-env';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | undefined;

/**
 * Returns the singleton Supabase browser client, creating it on first call from
 * the runtime-resolved public config (see `getSupabaseEnv` / `useSupabaseEnv`).
 *
 * Uses `@supabase/ssr`'s `createBrowserClient` so the session is persisted in
 * cookies (readable by the Next.js server for route protection in Story 3),
 * rather than localStorage. The instance is reused for the whole browser session
 * so we don't spin up multiple GoTrue auth listeners or duplicate session state.
 */
export function getSupabaseBrowserClient(env: SupabaseEnv): SupabaseClient {
  browserClient ??= createBrowserClient(env.url, env.publishableKey);

  return browserClient;
}
