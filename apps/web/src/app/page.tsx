import type { ReactElement } from 'react';

import { appName, primaryActionLabel } from '#lib/app-copy';

import { Button } from '@bearnance/ui-web/components/Button';

export default function Home(): ReactElement {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold">{appName}</h1>
      <Button className="mt-8">{primaryActionLabel}</Button>
    </main>
  );
}
