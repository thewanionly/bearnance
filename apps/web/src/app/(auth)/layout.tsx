import type { ReactElement, ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <div className="max-w-limit flex min-h-dvh flex-col lg:mx-auto">
      <header className="bg-grey-900 flex justify-center rounded-b-lg p-6 lg:hidden">
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
      <main className="flex w-full flex-1 flex-col pb-6 sm:pb-8 lg:min-w-0 lg:flex-row lg:items-center">
        <div className="relative m-250 hidden w-full max-w-140 shrink-0 overflow-hidden rounded-xl lg:block">
          <div className="aspect-560/920">
            <Image
              src="/images/auth-pages-illustration.png"
              alt=""
              fill
              sizes="35rem"
              className="object-cover"
            />
          </div>
          <Link href="/" className="absolute top-10 left-10">
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
          <div className="absolute bottom-0 left-0 m-10 text-white">
            <p className="text-preset-1 mb-6 font-bold">
              Keep track of your money and save for your future
            </p>
            <p className="text-preset-4">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
