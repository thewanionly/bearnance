import type { ReactElement } from 'react';

import Image from 'next/image';

import { primaryActionLabel } from '#lib/app-copy';

import { Button } from '@bearnance/ui-web/components/Button';

export default function Home(): ReactElement {
  return (
    <main className="bg-grey-900 flex min-h-dvh flex-col items-center justify-center px-6 text-white">
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
      <Button className="mt-8" variant="secondary">
        {primaryActionLabel}
      </Button>
    </main>
  );
}
