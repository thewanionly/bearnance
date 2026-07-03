import Image from 'next/image';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarProvider,
  SidebarToggle,
} from '@bearnance/ui-web/components/Sidebar';

import { SideNavLinks } from './SideNavLinks';

const LogoFull = () => (
  <Link href="/">
    <div className="relative aspect-173/36 h-8 w-full">
      <Image
        src="/logo.svg"
        alt="Bearnance"
        fill
        priority
        sizes="(max-width: 188px) 140px, (max-width: 221px) calc(100vw - 48px), 173px"
        className="object-contain"
      />
    </div>
  </Link>
);

const LogoMark = () => (
  <Link href="/">
    <div className="relative aspect-13/12 h-8 w-full">
      <Image
        src="/logo-mark.svg"
        alt="Bearnance"
        fill
        priority
        className="object-contain"
      />
    </div>
  </Link>
);

export const SideNav = () => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader logo={<LogoFull />} logoMark={<LogoMark />} />
        <SidebarContent>
          <SidebarMenu>
            <SideNavLinks />
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarToggle />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
