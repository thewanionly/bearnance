import { Button } from '@bearnance/ui-web/components/Button';

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold">Bearnance</h1>
      <Button className="mt-8">Start here</Button>
    </main>
  );
}
