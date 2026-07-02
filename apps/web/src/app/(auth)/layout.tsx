import type { ReactElement, ReactNode } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <section>
      <h1>AuthLayout</h1>
      {children}
    </section>
  );
}
