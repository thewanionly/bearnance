import type { ReactElement } from 'react';

import { redirect } from 'next/navigation';

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
    <div>
      <h1 className="text-grey-900 text-preset-1 font-bold">Overview</h1>
    </div>
  );
}
