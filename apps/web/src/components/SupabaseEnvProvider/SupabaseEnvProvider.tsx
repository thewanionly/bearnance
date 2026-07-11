'use client';

import { type ReactElement, type ReactNode, createContext, use } from 'react';

import type { SupabaseEnv } from '#lib/supabase-env';

const SupabaseEnvContext = createContext<SupabaseEnv | null>(null);

interface SupabaseEnvProviderProps {
  value: SupabaseEnv;
  children: ReactNode;
}

/**
 * Carries the runtime-resolved public Supabase config from the server to client
 * components (see `getSupabaseEnv`). The browser Supabase client reads it via
 * `useSupabaseEnv` instead of `process.env`, so a single Docker image works
 * across environments.
 */
export function SupabaseEnvProvider({
  value,
  children,
}: SupabaseEnvProviderProps): ReactElement {
  return <SupabaseEnvContext value={value}>{children}</SupabaseEnvContext>;
}

export function useSupabaseEnv(): SupabaseEnv {
  const context = use(SupabaseEnvContext);

  if (!context) {
    throw new Error(
      'useSupabaseEnv must be used within a SupabaseEnvProvider.'
    );
  }

  return context;
}
