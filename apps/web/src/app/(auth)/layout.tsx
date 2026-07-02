import type { ReactElement, ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <div className="max-w-limit flex min-h-dvh flex-col lg:mx-auto lg:pl-8">
      <header className="bg-grey-900 flex justify-center rounded-b-lg p-6">
        <Link href="/">
          <div className="relative aspect-173/36 w-full max-w-[173px] min-w-[140px]">
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
      </header>
      <main className="bg-beige-100 flex w-full flex-1 flex-col pb-6 sm:pb-8 lg:min-w-0 lg:pl-[96px]">
        {children}
      </main>
    </div>
  );
}
