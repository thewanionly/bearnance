import type { ReactElement, ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body className={`${publicSans.className} bg-beige-100`}>{children}</body>
    </html>
  );
}
