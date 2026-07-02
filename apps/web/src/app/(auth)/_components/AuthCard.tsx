import type { ReactElement, ReactNode } from 'react';

export type AuthCardProps = {
  children: ReactNode;
  title: string;
};

export function AuthCard({ title, children }: AuthCardProps): ReactElement {
  return (
    <div className="mx-4 rounded-xl bg-white px-5 py-6">
      <h1 className="text-preset-1 mb-8 font-bold">{title}</h1>
      {children}
    </div>
  );
}
