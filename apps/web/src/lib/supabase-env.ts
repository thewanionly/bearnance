import { connection } from 'next/server';

export interface SupabaseEnv {
  url: string;
  publishableKey: string;
}

/**
 * Reads the public Supabase config from the environment at REQUEST time.
 *
 * These vars are intentionally NOT prefixed with `NEXT_PUBLIC_`. The web app
 * ships as a single Docker image that is promoted across environments, and
 * Next.js freezes `NEXT_PUBLIC_*` values at build time — so build-time inlining
 * would bake one environment's Supabase project into every deploy. `connection()`
 * opts this read into dynamic rendering so each environment supplies its own
 * values at runtime; they're then handed to the browser client via
 * `SupabaseEnvProvider`.
 */
export async function getSupabaseEnv(): Promise<SupabaseEnv> {
  await connection();

  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      'Missing Supabase config: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.'
    );
  }

  return { url, publishableKey };
}
