import type { ReactElement, ReactNode } from 'react';

import Link from 'next/link';

import { Icon } from '@bearnance/ui-web/components/Icon';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <div className="max-w-limit flex min-h-dvh flex-col lg:mx-auto">
      <main className="flex w-full flex-1 flex-col px-4 py-6 lg:min-w-0 lg:flex-row lg:items-center">
        {children}
      </main>
      <nav
        className="bg-grey-900 fixed bottom-0 w-full rounded-t-lg px-6 py-4 lg:hidden"
        aria-label="primary"
      >
        <ul className="text-grey-300 flex justify-evenly gap-4">
          <li>
            <Link href="/">
              <Icon name="bearnance-house" size="lg" aria-hidden />
            </Link>
          </li>
          <li>
            <Link href="/transactions">
              <Icon name="bearnance-arrows-down-up" size="lg" aria-hidden />
            </Link>
          </li>
          <li>
            <Link href="/budgets">
              <Icon name="bearnance-chart-donut" size="lg" aria-hidden />
            </Link>
          </li>
          <li>
            <Link href="/pots">
              <Icon name="bearnance-jar-fill" size="lg" aria-hidden />
            </Link>
          </li>
          <li>
            <Link href="/recurring-bills">
              <Icon name="bearnance-receipt" size="lg" aria-hidden />
            </Link>
          </li>
          <li>
            <Link href="/?logged-in=false">
              <Icon name="log-out" size="lg" aria-hidden />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
