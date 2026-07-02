import type { ReactElement, ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <section className="bg-grey-900 text-background">
      <header>
        <Link href="/">
          <div className="relative mb-6 aspect-173/36 w-full max-w-[173px] min-w-[140px]">
            <Image
              src="/logo.svg"
              alt="Bearnance"
              fill
              priority
              sizes="(max-width: 188px) 140px, (max-width: 221px) calc(100vw - 48px), 173px"
              className="object-contain"
            />
          </div>
        </Link>
        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <Link href="/">Overview</Link>
            </li>
            <li>
              <Link href="/transactions">Transactions</Link>
            </li>
            <li>
              <Link href="/budgets">Budgets</Link>
            </li>
            <li>
              <Link href="/pots">Pots</Link>
            </li>
            <li>
              <Link href="/recurring-bills">Recurring Bills</Link>
            </li>
            <li>
              <Link href="/?logged-in=false">Log out</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </section>
  );
}
