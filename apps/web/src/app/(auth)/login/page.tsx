import type { ReactElement } from 'react';

import Link from 'next/link';

import { Button } from '@bearnance/ui-web/components/Button';

import { AuthCard } from '../_components/AuthCard';

export default function LogInPage(): ReactElement {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <AuthCard title="Login">
        <Button asChild className="mb-8 w-full">
          <Link href="/?logged-in=true">Login</Link>
        </Button>
        <p className="text-grey-500 text-preset-4 text-center">
          Need to create an account?{' '}
          <Link href="/signup" className="text-grey-900 font-bold underline">
            Sign Up
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
