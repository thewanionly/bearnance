import type { ComponentType } from 'react';

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
} from 'lucide-react-native';
import type { SvgProps } from 'react-native-svg';

import { type ColorToken, colors } from '@bearnance/design-tokens/colors';
import {
  type IconName,
  type IconSize,
  type SystemIconName,
  iconSizes,
} from '@bearnance/ui-core/icon';

import { brandIconRegistry } from '../icons/generated/registry';

/**
 * Curated Lucide system icons. Each `SystemIconName` maps to an explicit
 * `lucide-react-native` import so the set stays tree-shakeable. Keep in sync
 * with `systemIconNames` in `@bearnance/ui-core/icon`.
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

export type IconProps = {
  name: IconName;
  /** A named size token, or a raw pixel number. Defaults to `md` (20px). */
  size?: IconSize | number;
  /** A design-token color name, or any raw color string. Defaults to `grey900`. */
  color?: ColorToken | string;
};

const resolveColor = (color: ColorToken | string | undefined) => {
  if (color === undefined) {
    return colors.grey900;
  }

  return color in colors ? colors[color as ColorToken] : color;
};

/**
 * Unified icon renderer. Resolves `name` against the Figma/brand icon registry
 * first (brand icons win on any collision), then falls back to the curated
 * Lucide system icons. Brand icons render via `react-native-svg` with the
 * resolved `color` mapped to `currentColor`.
 */
export function Icon({ name, size = 'md', color }: IconProps) {
  const px = typeof size === 'number' ? size : iconSizes[size];
  const resolvedColor = resolveColor(color);

  const BrandIcon = (
    brandIconRegistry as Partial<Record<IconName, ComponentType<SvgProps>>>
  )[name];

  if (BrandIcon) {
    return <BrandIcon width={px} height={px} color={resolvedColor} />;
  }

  const SystemIcon = (lucideIconMap as Partial<Record<IconName, LucideIcon>>)[
    name
  ];

  if (!SystemIcon) {
    return null;
  }

  return <SystemIcon size={px} color={resolvedColor} />;
}
