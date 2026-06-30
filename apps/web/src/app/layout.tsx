import type { ReactElement, ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bearnance',
  description: 'A personal finance app that makes money management bearable.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
