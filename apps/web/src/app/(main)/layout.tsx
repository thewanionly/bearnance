import type { ReactElement, ReactNode } from 'react';

import { BottomNav } from './_components/BottomNav';
import { SideNav } from './_components/SideNav';

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <div className="max-w-limit flex min-h-dvh flex-col lg:mx-auto lg:flex-row">
      <SideNav />
      <main className="flex w-full flex-1 flex-col px-4 py-6 md:px-10 md:py-8 lg:min-w-0 lg:flex-row">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
