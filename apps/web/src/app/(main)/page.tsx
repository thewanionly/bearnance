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
      <h1 className="text-grey-900 text-preset-1 mb-8 font-bold">Overview</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="bg-grey-900 flex-1 rounded-lg p-6 text-white">
          <p className="text-preset-4 mb-3">Current Balance</p>
          <p className="text-preset-1 font-bold">$4,836.00</p>
        </div>
        <div className="text-grey-500 flex-1 rounded-lg bg-white p-6">
          <p className="text-preset-4 mb-3">Income</p>
          <p className="text-preset-1 text-grey-900 font-bold">$$3,814.25</p>
        </div>
        <div className="text-grey-500 flex-1 rounded-lg bg-white p-6">
          <p className="text-preset-4 mb-3">Expenses</p>
          <p className="text-preset-1 text-grey-900 font-bold">$1,700.50</p>
        </div>
      </div>
    </div>
  );
}
