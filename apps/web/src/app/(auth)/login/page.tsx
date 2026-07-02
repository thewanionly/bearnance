import type { ReactElement } from 'react';

import Link from 'next/link';

import { Button } from '@bearnance/ui-web/components/Button';

export default function LogInPage(): ReactElement {
  return (
    <div>
      <h1>Log In</h1>
      <Button asChild>
        <Link href="/?logged-in=true">Login</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
