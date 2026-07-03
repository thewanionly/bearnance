'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@bearnance/ui-web/components/Icon';
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@bearnance/ui-web/components/Sidebar';

import { navLinks } from '../_constants/navLinks';

export const SideNavLinks = () => {
  const pathname = usePathname();

  return navLinks.map(({ label, href, iconName }) => (
    <SidebarMenuItem key={label}>
      <SidebarMenuButton asChild isActive={pathname === href}>
        <Link href={href} className="flex items-center gap-4">
          <Icon name={iconName} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
};
