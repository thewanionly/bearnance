'use client';

import { type ReactElement, type ReactNode, createContext, use } from 'react';

import { useSupabaseEnv } from '#components/SupabaseEnvProvider/SupabaseEnvProvider';
import { getSupabaseBrowserClient } from '#lib/supabase-browser-client/supabase-browser-client';

import type { SupabaseClient } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | null>(null);

interface SupabaseProviderProps {
  children: ReactNode;
}

/**
 * Provides the singleton Supabase browser client to client components. Reads the
 * runtime public config from `useSupabaseEnv` (so it works across promoted Docker
 * images) and exposes the client through `useSupabaseClient`.
 */
export function SupabaseProvider({
  children,
}: SupabaseProviderProps): ReactElement {
  const env = useSupabaseEnv();
  const client = getSupabaseBrowserClient(env);

  return <SupabaseContext value={client}>{children}</SupabaseContext>;
}

export function useSupabaseClient(): SupabaseClient {
  const client = use(SupabaseContext);

  if (!client) {
    throw new Error(
      'useSupabaseClient must be used within a SupabaseProvider.'
    );
  }

  return client;
}
