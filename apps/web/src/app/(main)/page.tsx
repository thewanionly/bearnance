import type { ReactElement } from 'react';

import { redirect } from 'next/navigation';

import { primaryActionLabel } from '#lib/app-copy';

import { Button } from '@bearnance/ui-web/components/Button';

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
      <h1>Overview</h1>
      <Button className="mt-8" variant="secondary">
        {primaryActionLabel}
      </Button>
    </main>
  );
}
