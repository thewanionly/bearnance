import type { ReactElement } from 'react';

import { SupabaseEnvProvider } from '#components/SupabaseEnvProvider/SupabaseEnvProvider';

import { createBrowserClient } from '@supabase/ssr';
import { render, renderHook, screen } from '@testing-library/react';

import { SupabaseProvider, useSupabaseClient } from './SupabaseProvider';

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => ({ id: 'supabase-client' })),
}));

const env = {
  url: 'https://example.supabase.co',
  publishableKey: 'sb_publishable_test',
};

function Consumer(): ReactElement {
  const client = useSupabaseClient();

  return <span>{client ? 'has-client' : 'no-client'}</span>;
}

describe('SupabaseProvider', () => {
  it('provides the Supabase client built from the runtime env', () => {
    render(
      <SupabaseEnvProvider value={env}>
        <SupabaseProvider>
          <Consumer />
        </SupabaseProvider>
      </SupabaseEnvProvider>
    );

    expect(screen.getByText('has-client')).toBeInTheDocument();
    expect(createBrowserClient).toHaveBeenCalledWith(
      env.url,
      env.publishableKey
    );
  });

  it('throws when useSupabaseClient is called outside the provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => renderHook(() => useSupabaseClient())).toThrow(
      'useSupabaseClient must be used within a SupabaseProvider.'
    );

    consoleError.mockRestore();
  });
});
