import { createBrowserClient } from '@supabase/ssr';

import { getSupabaseBrowserClient } from './supabase-browser-client';

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => ({ id: 'supabase-client' })),
}));

const env = {
  url: 'https://example.supabase.co',
  publishableKey: 'sb_publishable_test',
};

describe('getSupabaseBrowserClient', () => {
  it('creates one client from the config and reuses it on repeated calls', () => {
    const first = getSupabaseBrowserClient(env);
    const second = getSupabaseBrowserClient(env);

    expect(createBrowserClient).toHaveBeenCalledTimes(1);
    expect(createBrowserClient).toHaveBeenCalledWith(
      env.url,
      env.publishableKey
    );
    expect(first).toBe(second);
  });
});
