import type { ReactElement, ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { SupabaseEnvProvider } from '#components/SupabaseEnvProvider/SupabaseEnvProvider';
import { SupabaseProvider } from '#components/SupabaseProvider/SupabaseProvider';
import { getSupabaseEnv } from '#lib/supabase-env';

import './globals.css';

const publicSans = localFont({
  src: '../../node_modules/@fontsource-variable/public-sans/files/public-sans-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bearnance',
  description: 'A personal finance app that makes money management bearable.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): Promise<ReactElement> {
  const supabaseEnv = await getSupabaseEnv();

  return (
    <html lang="en">
      <body className={`${publicSans.className} bg-beige-100`}>
        <SupabaseEnvProvider value={supabaseEnv}>
          <SupabaseProvider>{children}</SupabaseProvider>
        </SupabaseEnvProvider>
      </body>
    </html>
  );
}
