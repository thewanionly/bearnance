import * as React from 'react';

import { cn } from '#lib/utils';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  LogOut,
  type LucideIcon,
  Menu,
  Plus,
  Search,
  Settings,
  TrendingUp,
  User,
  Wallet,
  X,
} from 'lucide-react';

import {
  type IconName,
  type IconSize,
  type SystemIconName,
  iconSizes,
} from '@bearnance/ui-core/icon';

import { brandIconRegistry } from '../icons/generated/registry';

/**
 * Curated Lucide system icons. Each `SystemIconName` maps to an explicit
 * `lucide-react` import so the set stays tree-shakeable. Keep in sync with
 * `systemIconNames` in `@bearnance/ui-core/icon`.
 */
const lucideIconMap: Record<SystemIconName, LucideIcon> = {
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  bell: Bell,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'credit-card': CreditCard,
  'log-out': LogOut,
  menu: Menu,
  plus: Plus,
  search: Search,
  settings: Settings,
  'trending-up': TrendingUp,
  user: User,
  wallet: Wallet,
  x: X,
};

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName;
  /** A named size token, or a raw pixel number. Defaults to `md` (20px). */
  size?: IconSize | number;
};

/**
 * Unified icon renderer. Resolves `name` against the Figma/brand icon registry
 * first (brand icons win on any collision), then falls back to the curated
 * Lucide system icons. Icons render with `currentColor`, so color is controlled
 * by the surrounding text color (e.g. Tailwind `text-*`).
 */
function Icon({ name, size = 'md', className, ...props }: IconProps) {
  const px = typeof size === 'number' ? size : iconSizes[size];

  const BrandIcon = (
    brandIconRegistry as Partial<
      Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>>
    >
  )[name];

  if (BrandIcon) {
    return (
      <BrandIcon
        aria-hidden
        focusable={false}
        width={px}
        height={px}
        className={cn('shrink-0', className)}
        {...props}
      />
    );
  }

  const SystemIcon = (lucideIconMap as Partial<Record<IconName, LucideIcon>>)[
    name
  ];

  if (!SystemIcon) {
    return null;
  }

  // Cast through the shared SVG prop shape: Lucide's own prop type pulls a
  // different `csstype` version in this monorepo, so spreading `SVGProps`
  // directly onto it trips a spurious `style` incompatibility.
  const SystemIconComponent = SystemIcon as unknown as React.ComponentType<
    React.SVGProps<SVGSVGElement> & { size?: number }
  >;

  return (
    <SystemIconComponent
      aria-hidden
      focusable={false}
      size={px}
      className={cn('shrink-0', className)}
      {...props}
    />
  );
}

export { Icon, lucideIconMap };
