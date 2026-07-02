import type { ReactElement } from 'react';

import Link from 'next/link';

export default function SignUpPage(): ReactElement {
  return (
    <div>
      <h1>SignUpPage</h1>
      <Link href="/login">Log In</Link>
    </div>
  );
}
