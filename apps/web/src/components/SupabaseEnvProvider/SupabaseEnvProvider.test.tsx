import type { ReactElement } from 'react';

import { render, renderHook, screen } from '@testing-library/react';

import { SupabaseEnvProvider, useSupabaseEnv } from './SupabaseEnvProvider';

const env = {
  url: 'https://example.supabase.co',
  publishableKey: 'sb_publishable_test',
};

function Consumer(): ReactElement {
  const { url, publishableKey } = useSupabaseEnv();

  return (
    <div>
      <span>{url}</span>
      <span>{publishableKey}</span>
    </div>
  );
}

describe('SupabaseEnvProvider', () => {
  it('exposes the Supabase env to consumers', () => {
    render(
      <SupabaseEnvProvider value={env}>
        <Consumer />
      </SupabaseEnvProvider>
    );

    expect(screen.getByText(env.url)).toBeInTheDocument();
    expect(screen.getByText(env.publishableKey)).toBeInTheDocument();
  });

  it('throws when useSupabaseEnv is called outside the provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => renderHook(() => useSupabaseEnv())).toThrow(
      'useSupabaseEnv must be used within a SupabaseEnvProvider.'
    );

    consoleError.mockRestore();
  });
});
