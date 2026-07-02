import type { ReactElement } from 'react';

import Link from 'next/link';

import { Button } from '@bearnance/ui-web/components/Button';

import { AuthCard } from '../_components/AuthCard';

export default function SignUpPage(): ReactElement {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <AuthCard title="Sign Up">
        <Button className="mb-8 w-full">Create Account</Button>
        <p className="text-grey-500 text-preset-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-grey-900 font-bold underline">
            Login
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
