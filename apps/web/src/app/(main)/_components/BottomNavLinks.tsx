'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@bearnance/ui-web/components/Icon';
import { cn } from '@bearnance/ui-web/lib/utils';

import { navLinks } from '../_constants/navLinks';

export const BottomNavLinks = () => {
  const pathname = usePathname();

  return navLinks.map(({ href, iconName, label }) => (
    <li key={href}>
      <Link
        href={href}
        className={cn(
          'flex flex-col items-center gap-1 rounded-t-lg border-b-4 px-4.5 pt-2 pb-3 text-center md:px-6',
          pathname === href
            ? 'border-b-green bg-beige-100 text-grey-900 [&_svg]:text-green'
            : 'text-grey-300 hover:text-grey-100 border-b-transparent'
        )}
      >
        <Icon name={iconName} size="lg" aria-hidden />
        <span className="text-preset-5 hidden md:inline">{label}</span>
      </Link>
    </li>
  ));
};
