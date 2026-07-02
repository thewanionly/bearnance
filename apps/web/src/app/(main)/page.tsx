import type { ReactElement } from 'react';

import { redirect } from 'next/navigation';

import { primaryActionLabel } from '#lib/app-copy';

import { Button } from '@bearnance/ui-web/components/Button';
import { Icon } from '@bearnance/ui-web/components/Icon';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ 'logged-in'?: string }>;
}): Promise<ReactElement> {
  const { 'logged-in': loggedIn = 'true' } = await searchParams;
  const isLoggedIn = loggedIn === 'true';

  if (!isLoggedIn) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-white">
      <Icon name="bearnance-warehouse" size="lg" aria-hidden />
      <h1 className="mt-4">Overview</h1>
      <Button className="mt-8" variant="secondary">
        <Icon name="wallet" />
        {primaryActionLabel}
      </Button>
    </main>
  );
}
